import { CONFIG, getWordImage } from './config.js';
import { getSeedData, getSeedCatalog, getSeedStories } from './seed.js';
import { migrateStudentToChapters } from './chapter-progress.js';
import { CHAPTERS } from './config.js';
import { isCloudConfigured } from './supabase-config.js';
import { fetchCloudData, pushCloudData } from './cloud.js';

let cache = null;
let initialized = false;
let cloudEnabled = false;
let cloudSynced = false;
let saveTimer = null;
let lastSyncAt = null;
let syncError = null;

const CLOUD_TIMEOUT_MS = 15000;

function withTimeout(promise, ms = CLOUD_TIMEOUT_MS) {
  return Promise.race([
    promise,
    new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Délai de connexion dépassé')), ms);
    }),
  ]);
}

function migrateData(data) {
  if (!data || typeof data !== 'object') return data;

  (data.classes || []).forEach(c => {
    if (!c.roster) c.roster = [];
  });
  if (!data.activityResults) data.activityResults = [];
  if (!data.wordLists) data.wordLists = [];

  try {
    const seed = getSeedCatalog();
    const existingListIds = new Set(data.wordLists.map(l => l.id));
    for (const list of seed.wordLists) {
      if (!existingListIds.has(list.id)) data.wordLists.push(list);
    }

    const SYNC_LIST_IDS = ['list_image_match'];
    for (const listId of SYNC_LIST_IDS) {
      const seedList = seed.wordLists.find(l => l.id === listId);
      const existing = data.wordLists.find(l => l.id === listId);
      if (seedList && existing) {
        existing.name = seedList.name;
        existing.theme = seedList.theme;
        existing.words = seedList.words.map(w => ({ ...w }));
      }
    }

    const seedClasses = Object.fromEntries(seed.classes.map(c => [c.id, c]));
    for (const cls of data.classes || []) {
      if (!cls.assignedListIds) cls.assignedListIds = [];
      const seedCls = seedClasses[cls.id];
      if (!seedCls) continue;
      for (const listId of seedCls.assignedListIds) {
        if (!cls.assignedListIds.includes(listId)) cls.assignedListIds.push(listId);
      }
      if (!cls.assignedStoryIds) cls.assignedStoryIds = [];
      for (const storyId of seedCls.assignedStoryIds || []) {
        if (!cls.assignedStoryIds.includes(storyId)) cls.assignedStoryIds.push(storyId);
      }
      if (!cls.assignedChapterIds) cls.assignedChapterIds = CHAPTERS.map(c => c.id);
      for (const chapterId of seedCls.assignedChapterIds || []) {
        if (!cls.assignedChapterIds.includes(chapterId)) cls.assignedChapterIds.push(chapterId);
      }
      if (!cls.assignedActivities) cls.assignedActivities = [];
      for (const act of seedCls.assignedActivities || []) {
        if (!cls.assignedActivities.includes(act)) cls.assignedActivities.push(act);
      }
    }

    if (!data.stories) data.stories = [];
    const existingStoryIds = new Set(data.stories.map(s => s.id));
    for (const story of getSeedStories()) {
      if (!existingStoryIds.has(story.id)) data.stories.push(story);
    }
    for (const story of data.stories) {
      if (!story.chapterId) story.chapterId = 'musculation';
    }
  } catch (err) {
    console.error('GymWord seed merge error:', err);
  }

  try {
    for (const list of data.wordLists) {
      if (!list.chapterId) list.chapterId = 'musculation';
      for (const word of list.words || []) {
        if (word.english) word.imageUrl = getWordImage(word.english);
      }
    }
  } catch (err) {
    console.error('GymWord image refresh error:', err);
  }

  try {
    for (const student of data.students || []) {
      migrateStudentToChapters(student);
    }
  } catch (err) {
    console.error('GymWord chapter migration error:', err);
  }

  return data;
}

function readLocalCache() {
  const raw = localStorage.getItem(CONFIG.STORAGE_KEY);
  if (!raw) return null;
  try {
    return migrateData(JSON.parse(raw));
  } catch {
    return null;
  }
}

function writeLocalCache() {
  if (!cache) return;
  try {
    localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(cache));
  } catch (err) {
    console.error('GymWord local save error:', err);
  }
}

function scheduleCloudSave() {
  if (!cloudEnabled || !cache) return;
  clearTimeout(saveTimer);
  saveTimer = setTimeout(async () => {
    try {
      await pushCloudData(cache);
      writeLocalCache();
      lastSyncAt = new Date();
      syncError = null;
    } catch (err) {
      syncError = err.message || 'Échec de la synchronisation';
      cloudSynced = false;
      console.error('GymWord cloud save error:', err);
    }
  }, 600);
}

export function isCloudEnabled() {
  return cloudEnabled;
}

export function getSyncStatus() {
  return { cloudEnabled, cloudSynced, lastSyncAt, syncError };
}

export async function initStorage() {
  if (initialized) return cache;

  cloudEnabled = isCloudConfigured();
  cloudSynced = false;
  let local = null;
  try {
    local = readLocalCache();
  } catch (err) {
    console.error('GymWord local cache error:', err);
  }

  cache = local || getSeedData();
  initialized = true;
  writeLocalCache();

  if (!cloudEnabled) return cache;

  try {
    const remote = await withTimeout(fetchCloudData());
    const hasRemote = remote && Object.keys(remote).length > 0
      && (remote.classes?.length || remote.students?.length || remote.wordLists?.length);

    if (hasRemote) {
      cache = migrateData(remote);
      if (local && (local.students?.length > (remote.students?.length || 0))) {
        cache = migrateData(local);
      }
    } else if (!local) {
      cache = getSeedData();
    }

    writeLocalCache();
    cloudSynced = true;
    syncError = null;
    withTimeout(pushCloudData(cache), CLOUD_TIMEOUT_MS)
      .then(() => { lastSyncAt = new Date(); syncError = null; })
      .catch(err => {
        syncError = err.message || 'Échec de la synchronisation';
        console.error('GymWord cloud save error:', err);
      });
  } catch (err) {
    console.error('GymWord cloud load error:', err);
    cloudSynced = false;
    syncError = err.message || 'Connexion au cloud impossible';
    cache = local || cache || getSeedData();
    writeLocalCache();
  }

  return cache;
}

export function loadData() {
  if (!cache) {
    cache = readLocalCache() || getSeedData();
  }
  return cache;
}

export function saveData() {
  if (!cache) return;
  writeLocalCache();
  scheduleCloudSave();
}

export async function flushStorage() {
  if (!cloudEnabled || !cache) return;
  clearTimeout(saveTimer);
  await pushCloudData(cache);
  lastSyncAt = new Date();
  syncError = null;
}

export async function reloadFromCloud() {
  if (!cloudEnabled) return false;
  try {
    const remote = await fetchCloudData();
    if (remote && Object.keys(remote).length > 0) {
      cache = migrateData(remote);
      writeLocalCache();
      lastSyncAt = new Date();
      syncError = null;
      cloudSynced = true;
      return true;
    }
  } catch (err) {
    syncError = err.message;
    cloudSynced = false;
  }
  return false;
}

export function resetData() {
  cache = getSeedData();
  saveData();
  return cache;
}

export function getClasses() {
  return loadData().classes;
}

export function getClassById(id) {
  return loadData().classes.find(c => c.id === id);
}

export function updateClass(id, updates) {
  const data = loadData();
  const idx = data.classes.findIndex(c => c.id === id);
  if (idx >= 0) {
    data.classes[idx] = { ...data.classes[idx], ...updates };
    saveData();
  }
}

export function getWordLists(chapterId = null) {
  const lists = loadData().wordLists;
  return chapterId ? lists.filter(l => l.chapterId === chapterId) : lists;
}

export function getWordListById(id) {
  return loadData().wordLists.find(l => l.id === id);
}

export function saveWordList(list) {
  const data = loadData();
  const idx = data.wordLists.findIndex(l => l.id === list.id);
  if (idx >= 0) data.wordLists[idx] = list;
  else data.wordLists.push(list);
  saveData();
}

export function deleteWordList(id) {
  const data = loadData();
  data.wordLists = data.wordLists.filter(l => l.id !== id);
  saveData();
}

export function getStories() {
  return loadData().stories;
}

export function getStoryById(id) {
  return loadData().stories.find(s => s.id === id);
}

export function getStudents() {
  return loadData().students;
}

export function getStudentById(id) {
  const student = loadData().students.find(s => s.id === id);
  if (!student) return null;
  migrateStudentToChapters(student);
  return student;
}

export function findOrCreateStudent(classId, firstName, lastName) {
  const data = loadData();
  const fn = firstName.trim();
  const ln = lastName.trim();
  let student = data.students.find(
    s => s.classId === classId && s.firstName.toLowerCase() === fn.toLowerCase() && s.lastName.toLowerCase() === ln.toLowerCase()
  );
  if (!student) {
    student = createStudentRecord({ classId, firstName: fn, lastName: ln });
    data.students.push(student);
    saveData();
  }
  return student;
}

function createStudentRecord({ classId, firstName, lastName, rosterId = null }) {
  return {
    id: 'student_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7),
    rosterId,
    classId,
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    chapterData: {},
    gdprAccepted: false,
    createdAt: new Date().toISOString(),
  };
}

export function getRosterByClass(classId) {
  const cls = getClassById(classId);
  return cls?.roster || [];
}

export function addRosterStudent(classId, firstName, lastName) {
  const result = addRosterStudentsBulk(classId, [{ firstName, lastName }]);
  if (result.added === 1) {
    return getRosterByClass(classId).find(
      r => r.firstName.toLowerCase() === firstName.trim().toLowerCase()
        && r.lastName.toLowerCase() === lastName.trim().toLowerCase()
    ) || null;
  }
  return null;
}

export function addRosterStudentsBulk(classId, entries) {
  const data = loadData();
  const cls = data.classes.find(c => c.id === classId);
  if (!cls) return { added: 0, skipped: 0, invalid: 0 };

  if (!cls.roster) cls.roster = [];

  let added = 0;
  let skipped = 0;
  let invalid = 0;

  for (const entry of entries) {
    const fn = (entry.firstName || '').trim();
    const ln = (entry.lastName || '').trim();
    if (!fn || !ln) {
      invalid++;
      continue;
    }
    const exists = cls.roster.some(
      r => r.firstName.toLowerCase() === fn.toLowerCase() && r.lastName.toLowerCase() === ln.toLowerCase()
    );
    if (exists) {
      skipped++;
      continue;
    }
    cls.roster.push({
      id: 'roster_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7),
      firstName: fn,
      lastName: ln,
    });
    added++;
  }

  if (added > 0) {
    cls.roster.sort((a, b) => a.lastName.localeCompare(b.lastName, 'fr') || a.firstName.localeCompare(b.firstName, 'fr'));
    saveData();
  }

  return { added, skipped, invalid };
}

export function removeRosterStudent(classId, rosterId) {
  const data = loadData();
  const cls = data.classes.find(c => c.id === classId);
  if (!cls?.roster) return;
  cls.roster = cls.roster.filter(r => r.id !== rosterId);
  data.students = data.students.filter(s => s.rosterId !== rosterId);
  saveData();
}

export function loginStudentByRoster(classId, rosterId) {
  const data = loadData();
  const cls = data.classes.find(c => c.id === classId);
  const rosterEntry = cls?.roster?.find(r => r.id === rosterId);
  if (!rosterEntry) return null;

  let student = data.students.find(s => s.rosterId === rosterId);
  if (!student) {
    student = createStudentRecord({
      classId,
      rosterId,
      firstName: rosterEntry.firstName,
      lastName: rosterEntry.lastName,
    });
    data.students.push(student);
    saveData();
  }
  return student;
}

export function updateStudent(student) {
  const data = loadData();
  const idx = data.students.findIndex(s => s.id === student.id);
  if (idx >= 0) {
    data.students[idx] = student;
    saveData();
  }
}

export function deleteStudent(id) {
  const data = loadData();
  data.students = data.students.filter(s => s.id !== id);
  saveData();
}

export function getStudentsByClass(classId) {
  return loadData().students.filter(s => s.classId === classId);
}

export function getWordsForClass(classId, chapterId) {
  const cls = getClassById(classId);
  if (!cls || !chapterId) return [];
  const lists = cls.assignedListIds
    .map(getWordListById)
    .filter(l => l && l.chapterId === chapterId);
  return lists.flatMap(l => l.words.map(w => ({
    ...w,
    listId: l.id,
    listName: l.name,
    listTheme: l.theme,
    chapterId: l.chapterId,
  })));
}

export function getStoriesForClass(classId, chapterId) {
  const cls = getClassById(classId);
  if (!cls || !chapterId) return [];
  const storyIds = new Set(cls.assignedStoryIds || []);
  return loadData().stories.filter(s => s.chapterId === chapterId && storyIds.has(s.id));
}

export function getChaptersForClass(classId) {
  const cls = getClassById(classId);
  if (!cls) return [];
  const ids = cls.assignedChapterIds || CHAPTERS.map(c => c.id);
  return CHAPTERS.filter(c => ids.includes(c.id));
}

export function getActivityResults() {
  return loadData().activityResults || [];
}

export function addActivityResult(result) {
  const data = loadData();
  if (!data.activityResults) data.activityResults = [];
  data.activityResults.push({ ...result, id: 'result_' + Date.now(), date: new Date().toISOString() });
  saveData();
}

export function getSession() {
  try {
    return JSON.parse(localStorage.getItem(CONFIG.SESSION_KEY) || 'null');
  } catch {
    return null;
  }
}

export function setSession(session) {
  if (session) localStorage.setItem(CONFIG.SESSION_KEY, JSON.stringify(session));
  else localStorage.removeItem(CONFIG.SESSION_KEY);
}

export function clearSession() {
  setSession(null);
}
