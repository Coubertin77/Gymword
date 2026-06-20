import { CONFIG, ACTIVITY_LABELS, getWordImage, CHAPTERS, getChapterById, getActivitiesForChapter, APP_VERSION } from './config.js';
import {
  initStorage, loadData, getClasses, getClassById, getWordsForClass, getStories, getStoryById,
  getStoriesForClass, getChaptersForClass,
  loginStudentByRoster, updateStudent, getStudentById, getStudentsByClass,
  getRosterByClass, addRosterStudent, addRosterStudentsBulk, removeRosterStudent,
  getWordLists, saveWordList, deleteWordList, updateClass,
  getSession, setSession, clearSession, addActivityResult,
  getSyncStatus, reloadFromCloud, flushStorage,
} from './storage.js';
import {
  getLevel, countWordsByStatus, recordWordAttempt, awardPoints,
  recordActivityScore, recordStoryScore, checkBadges, getLeaderboard, getVocabularyProgress, getActivityProgress,
} from './gamification.js';
import { renderActivity, renderStoryQuiz } from './activities.js';
import { getChapterProgress, getTotalPoints, migrateStudentToChapters } from './chapter-progress.js';
import { parseStudentLines, readCsvFile } from './roster-import.js';
import { toast, escapeHtml, uid } from './utils.js';

const app = document.getElementById('app');

function cloudStatusHtml(sync, { compact = false } = {}) {
  const tag = compact ? 'span' : 'p';
  const cls = compact ? 'cloud-badge cloud-badge-sm' : 'cloud-badge';
  const localCls = `${cls} cloud-badge-local`;
  if (!sync.cloudEnabled) {
    if (!compact) return '';
    return `<span class="${localCls}" title="Supabase non configuré">💾 Local uniquement</span>`;
  }
  if (sync.cloudSynced && !sync.syncError) {
    return `<${tag} class="${cls}" title="Données synchronisées en ligne">☁️ En ligne — données synchronisées</${tag}>`;
  }
  if (sync.syncError) {
    return `<${tag} class="${localCls}" title="Mode hors ligne sur cet appareil">📱 Hors ligne — l'app fonctionne sur cet appareil</${tag}>`;
  }
  return `<${tag} class="${cls}">☁️ Connexion en cours…</${tag}>`;
}

export function navigate(view, params = {}) {
  if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  const routes = {
    home: renderHome,
    studentLogin: renderStudentLogin,
    teacherLogin: renderTeacherLogin,
    studentChapterSelect: renderStudentChapterSelect,
    studentDashboard: renderStudentDashboard,
    studentActivity: () => renderStudentActivity(params.type),
    studentStories: renderStudentStories,
    studentStory: () => renderStudentStory(params.storyId),
    studentLeaderboard: renderStudentLeaderboard,
    teacherDashboard: renderTeacherDashboard,
  };
  (routes[view] || renderHome)();
  window.scrollTo(0, 0);
}

function requireStudentSession() {
  const session = getSession();
  if (!session?.studentId) { navigate('studentLogin'); return null; }
  const student = getStudentById(session.studentId);
  if (!student) { clearSession(); navigate('studentLogin'); return null; }
  if (!session.chapterId) { navigate('studentChapterSelect'); return null; }
  return student;
}

function getSessionChapterId() {
  return getSession()?.chapterId || null;
}

function requireTeacherSession() {
  const session = getSession();
  if (!session?.isTeacher) { navigate('teacherLogin'); return false; }
  return true;
}

function renderHome() {
  const sync = getSyncStatus();
  app.innerHTML = `
    <div class="page" style="display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100dvh">
      <div class="home-icons" aria-hidden="true">
        <span class="home-icon" title="English">🇬🇧</span>
        <span class="home-icon" title="Badminton">🏸</span>
      </div>
      <h1 class="logo-big">SportWord Section Euro</h1>
      <p class="logo-sub">Revise PE vocabulary in English</p>
      <p class="app-version" aria-label="Application version">v${APP_VERSION}</p>
      ${cloudStatusHtml(sync)}
      <div class="card" style="width:100%;max-width:400px">
        <button class="btn btn-primary btn-block" id="btn-student" style="margin-bottom:0.75rem">I'm a Student 💪</button>
        <button class="btn btn-secondary btn-block" id="btn-teacher">I'm a Teacher 👩‍🏫</button>
      </div>
      <p class="gdpr-notice" style="max-width:400px">
        This app stores your first name and learning progress. Data is used only for vocabulary revision in PE class.
      </p>
    </div>
  `;
  app.querySelector('#btn-student').onclick = () => navigate('studentLogin');
  app.querySelector('#btn-teacher').onclick = () => navigate('teacherLogin');
}

function renderStudentLogin() {
  const classes = getClasses();

  function studentOptions(classId) {
    const roster = getRosterByClass(classId);
    if (!roster.length) {
      return '<option value="">No students in this class yet — ask your teacher</option>';
    }
    return '<option value="">Select your name…</option>' + roster.map(r =>
      `<option value="${r.id}">${escapeHtml(r.firstName)} ${escapeHtml(r.lastName)}</option>`
    ).join('');
  }

  app.innerHTML = `
    <div class="page">
      <button class="nav-back" id="back">← Back</button>
      <h1 class="page-title">Student Login</h1>
      <div class="card">
        <form id="login-form">
          <div class="form-group">
            <label>Your class</label>
            <select id="classId" required>
              <option value="">Select your class…</option>
              ${classes.map(c => `<option value="${c.id}">${escapeHtml(c.name)}</option>`).join('')}
            </select>
          </div>
          <div class="form-group">
            <label>Your name</label>
            <select id="rosterId" required disabled>
              <option value="">Select your class first…</option>
            </select>
          </div>
          <label style="display:flex;align-items:flex-start;gap:0.5rem;font-size:0.85rem;margin-bottom:1rem;cursor:pointer">
            <input type="checkbox" id="gdpr" required style="width:auto;margin-top:0.2rem">
            <span>I agree that my name and progress are stored for this learning activity (GDPR).</span>
          </label>
          <button type="submit" class="btn btn-primary btn-block">Start training! 🚀</button>
        </form>
      </div>
    </div>
  `;

  const classSelect = app.querySelector('#classId');
  const rosterSelect = app.querySelector('#rosterId');

  classSelect.onchange = () => {
    const classId = classSelect.value;
    if (!classId) {
      rosterSelect.disabled = true;
      rosterSelect.innerHTML = '<option value="">Select your class first…</option>';
      return;
    }
    rosterSelect.disabled = false;
    rosterSelect.innerHTML = studentOptions(classId);
  };

  app.querySelector('#back').onclick = () => navigate('home');
  app.querySelector('#login-form').onsubmit = e => {
    e.preventDefault();
    const classId = classSelect.value;
    const rosterId = rosterSelect.value;
    if (!classId) return toast('Please select your class', 'error');
    if (!rosterId) return toast('Please select your name', 'error');
    const student = loginStudentByRoster(classId, rosterId);
    if (!student) return toast('Student not found', 'error');
    student.gdprAccepted = true;
    updateStudent(student);
    setSession({ studentId: student.id, classId });
    toast(`Welcome, ${student.firstName}! 💪`, 'success');
    navigate('studentChapterSelect');
  };
}

function renderStudentChapterSelect() {
  const session = getSession();
  if (!session?.studentId) { navigate('studentLogin'); return; }
  const student = getStudentById(session.studentId);
  if (!student) { clearSession(); navigate('studentLogin'); return; }

  const chapters = getChaptersForClass(student.classId);

  app.innerHTML = `
    <div class="page">
      <button class="nav-back" id="back">← Back</button>
      <h1 class="page-title">Choose your sport 🏆</h1>
      <p class="page-subtitle">Hi ${escapeHtml(student.firstName)}! Pick a chapter to start.</p>
      <div class="chapter-grid">
        ${chapters.map(ch => `
          <button type="button" class="card card-clickable chapter-card" data-chapter="${ch.id}" style="--chapter-color:${ch.color}">
            <div class="chapter-icon">${ch.icon}</div>
            <div class="card-label">${escapeHtml(ch.name)}</div>
          </button>
        `).join('')}
      </div>
    </div>
  `;
  app.querySelector('#back').onclick = () => { clearSession(); navigate('home'); };
  app.querySelectorAll('.chapter-card').forEach(card => {
    card.onclick = () => {
      setSession({ ...session, chapterId: card.dataset.chapter });
      navigate('studentDashboard');
    };
  });
}

function renderTeacherLogin() {
  app.innerHTML = `
    <div class="page">
      <button class="nav-back" id="back">← Back</button>
      <h1 class="page-title">Teacher Login</h1>
      <div class="card">
        <form id="teacher-form">
          <div class="form-group">
            <label>Password</label>
            <input type="password" id="password" required placeholder="Enter teacher password">
          </div>
          <button type="submit" class="btn btn-primary btn-block">Enter dashboard</button>
        </form>
      </div>
    </div>
  `;
  app.querySelector('#back').onclick = () => navigate('home');
  app.querySelector('#teacher-form').onsubmit = e => {
    e.preventDefault();
    if (app.querySelector('#password').value === CONFIG.TEACHER_PASSWORD) {
      setSession({ isTeacher: true });
      navigate('teacherDashboard');
    } else {
      toast('Wrong password', 'error');
    }
  };
}

function renderStudentDashboard() {
  const student = requireStudentSession();
  if (!student) return;
  const chapterId = getSessionChapterId();
  const chapter = getChapterById(chapterId);
  const cls = getClassById(student.classId);
  const progress = getChapterProgress(student, chapterId);
  const words = getWordsForClass(student.classId, chapterId);
  const counts = countWordsByStatus(progress, words);
  const level = getLevel(progress.points);
  const vocabProgress = getVocabularyProgress(counts, words.length);
  const activityTypes = getActivitiesForChapter(cls?.assignedActivities, chapterId);
  const activityProgress = getActivityProgress(progress, activityTypes, ACTIVITY_LABELS);
  const badges = CONFIG.BADGES.map(b => ({ ...b, earned: progress.badges.includes(b.id) }));

  app.innerHTML = `
    <div class="page">
      <div class="page-header">
        <div>
          <h1 class="page-title">${chapter.icon} ${escapeHtml(chapter.name)}</h1>
          <p class="page-subtitle">Hi, ${escapeHtml(student.firstName)}! · <span class="level-badge">⭐ Level ${level}</span></p>
        </div>
        <button class="btn btn-ghost btn-sm" id="logout">Logout</button>
      </div>
      <div class="stats-bar">
        <div class="stat-pill"><span class="icon">🏆</span> ${progress.points} pts</div>
        <div class="stat-pill"><span class="icon">📚</span> ${escapeHtml(cls?.name || '')}</div>
        <button class="btn btn-ghost btn-sm" id="change-chapter">Change sport</button>
      </div>
      <div class="word-status-grid">
        <div class="status-box status-learned"><span class="status-count">${counts.learned}</span>Learned</div>
        <div class="status-box status-learning"><span class="status-count">${counts.learning}</span>Learning</div>
        <div class="status-box status-review"><span class="status-count">${counts.review}</span>To review</div>
      </div>
      <div class="card">
        <p class="section-title">Vocabulary mastery</p>
        <p class="progress-summary">${vocabProgress.learned} / ${vocabProgress.total} words mastered</p>
        <div class="progress-track" role="progressbar" aria-valuenow="${vocabProgress.percent}" aria-valuemin="0" aria-valuemax="100">
          <div class="progress-fill" style="width:${vocabProgress.percent}%"></div>
        </div>
        ${counts.review > 0 ? `<p class="progress-hint">📌 ${counts.review} word${counts.review > 1 ? 's' : ''} to review today</p>` : ''}
      </div>
      <div class="card">
        <p class="section-title">My best scores</p>
        ${activityProgress.length
          ? `<div class="score-list">${activityProgress.map(a => `
              <div class="score-row">
                <span class="score-label">${a.icon} ${escapeHtml(a.title)}</span>
                <div class="score-bar-track">
                  <div class="score-bar-fill" style="width:${a.best ?? 0}%"></div>
                </div>
                <span class="score-value">${a.attempts ? `${a.best}%` : '—'}</span>
              </div>
            `).join('')}</div>`
          : '<p class="progress-hint">Complete an activity to see your scores here.</p>'}
      </div>
      <div class="card">
        <p class="section-title">My Badges</p>
        <div class="badges-row">
          ${badges.map(b => `<span class="badge ${b.earned ? '' : 'locked'}" title="${escapeHtml(b.desc)}">${b.icon} ${escapeHtml(b.name)}</span>`).join('')}
        </div>
      </div>
      <p class="section-title">Choose an activity</p>
      <div class="card-grid" id="activity-grid"></div>
      <p class="section-title" style="margin-top:1.5rem">More</p>
      <div class="card-grid">
        <div class="card card-clickable" id="go-stories">
          <div class="card-icon">📖</div>
          <div class="card-label">Stories & Quiz</div>
          <div class="card-desc">Read gym stories and answer questions</div>
        </div>
        <div class="card card-clickable" id="go-leaderboard">
          <div class="card-icon">🏅</div>
          <div class="card-label">Leaderboard</div>
          <div class="card-desc">See your class ranking</div>
        </div>
      </div>
    </div>
  `;

  app.querySelector('#logout').onclick = () => { clearSession(); navigate('home'); };
  app.querySelector('#change-chapter').onclick = () => navigate('studentChapterSelect');
  app.querySelector('#go-stories').onclick = () => navigate('studentStories');
  app.querySelector('#go-leaderboard').onclick = () => navigate('studentLeaderboard');

  const grid = app.querySelector('#activity-grid');
  getActivitiesForChapter(cls?.assignedActivities, chapterId).forEach(type => {
    const info = ACTIVITY_LABELS[type];
    if (!info) return;
    const best = progress.activityScores[type]?.best;
    const card = document.createElement('div');
    card.className = 'card card-clickable';
    card.innerHTML = `
      <div class="card-icon">${info.icon}</div>
      <div class="card-label">${escapeHtml(info.title)}</div>
      <div class="card-desc">${escapeHtml(info.desc)}${best ? ` · Best: ${best}%` : ''}</div>
    `;
    card.onclick = () => navigate('studentActivity', { type });
    grid.appendChild(card);
  });
}

function handleActivityComplete(student, chapterId, type, words, result) {
  const progress = getChapterProgress(student, chapterId);
  const pts = result.score * CONFIG.POINTS.CORRECT;
  awardPoints(progress, pts, type);
  recordActivityScore(progress, type, result.score, result.total);
  words.forEach(w => recordWordAttempt(progress, w.english.toLowerCase(), true));
  const newBadges = checkBadges(progress, {
    activityCompleted: true,
    perfectScore: result.perfect,
  });
  updateStudent(student);
  addActivityResult({ studentId: student.id, classId: student.classId, chapterId, activityType: type, ...result, points: pts });
  return { pts, newBadges };
}

function renderStudentActivity(type) {
  const student = requireStudentSession();
  if (!student) return;
  const chapterId = getSessionChapterId();
  const info = ACTIVITY_LABELS[type];
  const words = getWordsForClass(student.classId, chapterId);

  app.innerHTML = `
    <div class="page">
      <button class="nav-back" id="back">← Dashboard</button>
      <h1 class="page-title">${info?.icon || ''} ${escapeHtml(info?.title || type)}</h1>
      <div id="activity-area"></div>
      <div id="result-area" class="hidden"></div>
    </div>
  `;
  app.querySelector('#back').onclick = () => navigate('studentDashboard');
  const area = app.querySelector('#activity-area');

  renderActivity(type, words, area, result => {
    const quizWords = (type === 'qcm' || type === 'muscle_region') ? [] : words.slice(0, 5);
    const { pts, newBadges } = handleActivityComplete(student, chapterId, type, quizWords, result);
    area.classList.add('hidden');
    const resultArea = app.querySelector('#result-area');
    resultArea.classList.remove('hidden');
    resultArea.innerHTML = `
      <div class="result-banner success">
        <h2>Great job! 💪</h2>
        <p>Score: ${result.score}/${result.total} · +${pts} points</p>
        ${newBadges.length ? `<p>New badge unlocked!</p>` : ''}
      </div>
      <div class="btn-group">
        <button class="btn btn-primary" id="retry">Try again</button>
        <button class="btn btn-secondary" id="home-btn">Back to dashboard</button>
      </div>
    `;
    resultArea.querySelector('#retry').onclick = () => navigate('studentActivity', { type });
    resultArea.querySelector('#home-btn').onclick = () => navigate('studentDashboard');
    toast(`+${pts} points!`, 'success');
  }, chapterId);
}

function renderStudentStories() {
  const student = requireStudentSession();
  if (!student) return;
  const chapterId = getSessionChapterId();
  const chapter = getChapterById(chapterId);
  const progress = getChapterProgress(student, chapterId);
  const stories = getStoriesForClass(student.classId, chapterId);

  app.innerHTML = `
    <div class="page">
      <button class="nav-back" id="back">← Dashboard</button>
      <h1 class="page-title">📖 ${escapeHtml(chapter.name)} Stories</h1>
      <div class="card-grid">
        ${stories.length ? stories.map(s => {
          const best = progress.storyScores[s.id]?.best;
          return `
            <div class="card card-clickable story-card" data-id="${s.id}">
              <div class="card-icon">📖</div>
              <div class="card-label">${escapeHtml(s.title)}</div>
              <div class="card-desc">${s.questions.length} questions${best ? ` · Best: ${best}%` : ''}</div>
            </div>
          `;
        }).join('') : '<p class="empty-state">No stories for this sport yet.</p>'}
      </div>
    </div>
  `;
  app.querySelector('#back').onclick = () => navigate('studentDashboard');
  app.querySelectorAll('.story-card').forEach(card => {
    card.onclick = () => navigate('studentStory', { storyId: card.dataset.id });
  });
}

function renderStudentStory(storyId) {
  const student = requireStudentSession();
  if (!student) return;
  const story = getStoryById(storyId);
  if (!story) return navigate('studentStories');

  app.innerHTML = `
    <div class="page">
      <button class="nav-back" id="back">← Stories</button>
      <div id="story-area"></div>
      <div id="result-area" class="hidden"></div>
    </div>
  `;
  app.querySelector('#back').onclick = () => navigate('studentStories');
  const area = app.querySelector('#story-area');

  renderStoryQuiz(story, area, result => {
    const chapterId = getSessionChapterId();
    const progress = getChapterProgress(student, chapterId);
    const pts = result.score * CONFIG.POINTS.CORRECT + CONFIG.POINTS.STORY_COMPLETE;
    awardPoints(progress, pts, 'story');
    recordStoryScore(progress, storyId, result.score, result.total);
    checkBadges(progress, { storyCompleted: true, perfectScore: result.perfect });
    updateStudent(student);
    area.classList.add('hidden');
    const resultArea = app.querySelector('#result-area');
    resultArea.classList.remove('hidden');
    resultArea.innerHTML = `
      <div class="result-banner success">
        <h2>Story complete! 📖</h2>
        <p>Score: ${result.score}/${result.total} · +${pts} points</p>
      </div>
      <button class="btn btn-primary btn-block" id="home-btn">Back to dashboard</button>
    `;
    resultArea.querySelector('#home-btn').onclick = () => navigate('studentDashboard');
    toast(`+${pts} points!`, 'success');
  });
}

function renderStudentLeaderboard() {
  const student = requireStudentSession();
  if (!student) return;
  const chapterId = getSessionChapterId();
  const chapter = getChapterById(chapterId);
  const board = getLeaderboard(student.classId, getStudentsByClass(student.classId), chapterId);

  app.innerHTML = `
    <div class="page">
      <button class="nav-back" id="back">← Dashboard</button>
      <h1 class="page-title">🏅 ${escapeHtml(chapter.name)} Leaderboard</h1>
      <div class="card">
        <table class="leaderboard-table">
          <thead><tr><th>Rank</th><th>Name</th><th>Level</th><th>Points</th></tr></thead>
          <tbody>
            ${board.map(entry => `
              <tr class="${entry.rank <= 3 ? 'top-' + entry.rank : ''}">
                <td>${entry.rank <= 3 ? ['🥇','🥈','🥉'][entry.rank - 1] : entry.rank}</td>
                <td>${escapeHtml(entry.firstName)}${entry.firstName.toLowerCase() === student.firstName.toLowerCase() ? ' (you)' : ''}</td>
                <td>Lv.${entry.level}</td>
                <td><strong>${entry.points}</strong></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        ${board.length === 0 ? '<p class="empty-state">No scores yet. Be the first!</p>' : ''}
      </div>
    </div>
  `;
  app.querySelector('#back').onclick = () => navigate('studentDashboard');
}

function renderTeacherDashboard() {
  if (!requireTeacherSession()) return;
  let activeTab = 'classes';

  function render() {
    const sync = getSyncStatus();
    app.innerHTML = `
      <div class="page">
        <div class="page-header">
          <h1 class="page-title">Teacher Dashboard 👩‍🏫</h1>
          <div style="display:flex;align-items:center;gap:0.5rem;flex-wrap:wrap">
            ${cloudStatusHtml(sync, { compact: true })}
            <button class="btn btn-ghost btn-sm" id="refresh-cloud" title="Reload latest data">🔄 Refresh</button>
            <button class="btn btn-ghost btn-sm" id="logout">Logout</button>
          </div>
        </div>
        <div class="tabs">
          <button class="tab ${activeTab === 'classes' ? 'active' : ''}" data-tab="classes">Students</button>
          <button class="tab ${activeTab === 'lists' ? 'active' : ''}" data-tab="lists">Word Lists</button>
          <button class="tab ${activeTab === 'assign' ? 'active' : ''}" data-tab="assign">Assignments</button>
          <button class="tab ${activeTab === 'results' ? 'active' : ''}" data-tab="results">Results</button>
        </div>
        <div id="tab-content"></div>
      </div>
    `;
    app.querySelector('#logout').onclick = () => { clearSession(); navigate('home'); };
    app.querySelector('#refresh-cloud')?.addEventListener('click', async () => {
      const ok = await reloadFromCloud();
      toast(ok ? 'Données mises à jour depuis le cloud' : 'Synchronisation indisponible pour le moment', ok ? 'success' : 'info');
      if (ok) render();
    });
    app.querySelectorAll('.tab').forEach(tab => {
      tab.onclick = () => { activeTab = tab.dataset.tab; render(); };
    });
    const content = app.querySelector('#tab-content');
    if (activeTab === 'classes') renderClassesTab(content);
    else if (activeTab === 'lists') renderListsTab(content);
    else if (activeTab === 'assign') renderAssignTab(content);
    else if (activeTab === 'results') renderResultsTab(content);
  }
  render();
}

function renderClassesTab(container) {
  container.innerHTML = getClasses().map(cls => {
    const roster = getRosterByClass(cls.id);
    const progressMap = Object.fromEntries(getStudentsByClass(cls.id).map(s => [s.rosterId, s]));
    return `
      <div class="card" data-class-id="${cls.id}">
        <h3 class="section-title">${escapeHtml(cls.name)} (${cls.level})</h3>
        <p class="card-desc">${roster.length} student(s) in the list</p>

        <details class="quick-add-panel" open>
          <summary>⚡ Quick add — paste or import CSV</summary>
          <p class="bulk-hint">
            One student per line. Examples:<br>
            <code>Jean,Dupont</code> · <code>Dupont;Jean</code> · <code>Jean Dupont</code><br>
            CSV from Excel: use comma or semicolon. Header row is detected automatically.
          </p>
          <div class="form-group">
            <label>Column order (CSV / separated values)</label>
            <select class="bulk-format">
              <option value="first-last">First name, Last name</option>
              <option value="last-first">Last name, First name (Pronote / Excel FR)</option>
            </select>
          </div>
          <textarea class="bulk-textarea bulk-text" placeholder="Jean,Dupont&#10;Marie,Martin&#10;Lucas,Bernard"></textarea>
          <div class="btn-group">
            <button type="button" class="btn btn-primary btn-sm bulk-add">Add all lines</button>
            <label class="btn btn-secondary btn-sm" style="cursor:pointer">
              📁 Import CSV file
              <input type="file" accept=".csv,.txt,text/csv" class="csv-file hidden" style="display:none">
            </label>
          </div>
        </details>

        <details class="single-add-panel">
          <summary>+ Add one student manually</summary>
          <div class="form-row" style="margin-top:0.75rem;margin-bottom:0.75rem">
            <div class="form-group" style="margin-bottom:0">
              <label>First name</label>
              <input type="text" class="add-first-name" placeholder="First name">
            </div>
            <div class="form-group" style="margin-bottom:0">
              <label>Last name</label>
              <input type="text" class="add-last-name" placeholder="Last name">
            </div>
          </div>
          <button type="button" class="btn btn-secondary btn-sm add-roster-student">Add student</button>
        </details>

        ${roster.length ? `
          <table class="data-table" style="margin-top:1rem">
            <thead><tr><th>Name</th><th>Points</th><th>Level</th><th></th></tr></thead>
            <tbody>
              ${roster.map(r => {
                const s = progressMap[r.id];
                return `
                  <tr>
                    <td>${escapeHtml(r.firstName)} ${escapeHtml(r.lastName)}</td>
                    <td>${s ? s.points : '—'}</td>
                    <td>${s ? 'Lv.' + getLevel(s.points) : '—'}</td>
                    <td><button type="button" class="btn btn-ghost btn-sm remove-roster-student" data-roster-id="${r.id}">Remove</button></td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        ` : '<p class="card-desc" style="margin-top:1rem">No students yet. Use quick add above.</p>'}
      </div>
    `;
  }).join('');

  container.querySelectorAll('.bulk-add').forEach(btn => {
    btn.onclick = () => {
      const card = btn.closest('.card');
      handleBulkAdd(card);
    };
  });

  container.querySelectorAll('.csv-file').forEach(input => {
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;
      const card = input.closest('.card');
      try {
        const text = await readCsvFile(file);
        card.querySelector('.bulk-text').value = text;
        handleBulkAdd(card);
      } catch {
        toast('Could not read the file', 'error');
      }
      input.value = '';
    };
  });

  container.querySelectorAll('.add-roster-student').forEach(btn => {
    btn.onclick = () => {
      const card = btn.closest('.card');
      const classId = card.dataset.classId;
      const firstName = card.querySelector('.add-first-name').value;
      const lastName = card.querySelector('.add-last-name').value;
      const entry = addRosterStudent(classId, firstName, lastName);
      if (!entry) {
        toast('Enter a name, or this student is already in the list', 'error');
        return;
      }
      toast(`${entry.firstName} added!`, 'success');
      renderClassesTab(container);
    };
  });

  container.querySelectorAll('.remove-roster-student').forEach(btn => {
    btn.onclick = () => {
      const card = btn.closest('.card');
      const classId = card.dataset.classId;
      if (confirm('Remove this student from the list? Their progress will also be deleted.')) {
        removeRosterStudent(classId, btn.dataset.rosterId);
        toast('Student removed', 'info');
        renderClassesTab(container);
      }
    };
  });
}

function handleBulkAdd(card) {
  const classId = card.dataset.classId;
  const text = card.querySelector('.bulk-text').value;
  const columnOrder = card.querySelector('.bulk-format').value;

  if (!text.trim()) {
    toast('Paste your student list first', 'error');
    return;
  }

  const entries = parseStudentLines(text, columnOrder);
  if (!entries.length) {
    toast('No valid names found. Check the format.', 'error');
    return;
  }

  const result = addRosterStudentsBulk(classId, entries);
  const parts = [`${result.added} added`];
  if (result.skipped) parts.push(`${result.skipped} already in list`);
  if (result.invalid) parts.push(`${result.invalid} invalid lines`);
  toast(parts.join(' · '), result.added ? 'success' : 'info');

  if (result.added) {
    card.querySelector('.bulk-text').value = '';
    renderClassesTab(document.getElementById('tab-content'));
  }
}

function renderListsTab(container) {
  const expandedChapters = new Set(CHAPTERS.map(c => c.id));
  const expandedLists = new Set();

  container.innerHTML = `
    <p class="lists-tab-intro card-desc">
      Word lists are grouped by sport/chapter. Expand a section below, or use <strong>+ New list in …</strong> to create a list for that sport.
    </p>
    <div id="lists-by-chapter" class="lists-by-chapter"></div>`;
  const root = container.querySelector('#lists-by-chapter');

  function renderListEditor(list, { startOpen = false } = {}) {
    const isNew = !list.id;
    if (startOpen && list.id) expandedLists.add(list.id);

    const div = document.createElement('div');
    div.className = 'list-editor-card';
    div.dataset.listId = list.id || 'new';

    const chapterId = list.chapterId || 'musculation';
    const isOpen = isNew || startOpen || expandedLists.has(list.id);

    div.innerHTML = `
      <button type="button" class="list-editor-toggle ${isOpen ? 'open' : ''}">
        <span class="list-editor-summary">
          <strong class="list-editor-name">${escapeHtml(list.name || 'New list')}</strong>
          <span class="list-editor-meta">${(list.words || []).length} word${(list.words?.length || 0) !== 1 ? 's' : ''}</span>
        </span>
        <span class="list-editor-chevron">${isOpen ? '▲' : '▼'}</span>
      </button>
      <div class="list-editor-body ${isOpen ? '' : 'hidden'}">
        <div class="form-group">
          <label>List name</label>
          <input type="text" class="list-name" value="${escapeHtml(list.name || '')}" placeholder="e.g. Badminton — Basics">
        </div>
        <div class="form-group">
          <label>Chapter / sport</label>
          <select class="list-chapter">
            ${CHAPTERS.map(ch => `
              <option value="${ch.id}" ${chapterId === ch.id ? 'selected' : ''}>${ch.icon} ${escapeHtml(ch.name)}</option>
            `).join('')}
          </select>
        </div>
        <p class="section-title">Words (max 10)</p>
        <div class="words-container"></div>
        <button type="button" class="btn btn-secondary btn-sm add-word" style="margin-bottom:0.75rem">+ Add word</button>
        <div class="btn-group">
          <button type="button" class="btn btn-primary save-list">Save</button>
          ${!isNew ? '<button type="button" class="btn btn-ghost delete-list">Delete list</button>' : ''}
        </div>
      </div>
    `;

    const toggleBtn = div.querySelector('.list-editor-toggle');
    const body = div.querySelector('.list-editor-body');
    const nameInput = div.querySelector('.list-name');
    const metaEl = div.querySelector('.list-editor-name');

    toggleBtn.onclick = () => {
      const isHidden = body.classList.toggle('hidden');
      toggleBtn.classList.toggle('open', !isHidden);
      div.querySelector('.list-editor-chevron').textContent = isHidden ? '▼' : '▲';
      if (list.id) {
        if (isHidden) expandedLists.delete(list.id);
        else expandedLists.add(list.id);
      }
    };

    nameInput.oninput = () => {
      metaEl.textContent = nameInput.value.trim() || 'New list';
    };

    const wordsContainer = div.querySelector('.words-container');

    function addWordRow(word = { english: '', french: '', definition: '' }) {
      if (wordsContainer.children.length >= 10) return toast('Maximum 10 words per list', 'error');
      const row = document.createElement('div');
      row.className = 'word-editor-row';
      row.innerHTML = `
        <input class="w-english" placeholder="English" value="${escapeHtml(word.english)}">
        <input class="w-french" placeholder="French translation" value="${escapeHtml(word.french)}">
        <input class="w-def" placeholder="English definition" value="${escapeHtml(word.definition)}" style="grid-column:1/-1">
        <button type="button" class="btn btn-ghost btn-sm remove-word" style="grid-column:1/-1">Remove</button>
      `;
      row.querySelector('.remove-word').onclick = () => row.remove();
      wordsContainer.appendChild(row);
    }

    (list.words || []).forEach(addWordRow);
    if (!list.words?.length) addWordRow();

    div.querySelector('.add-word').onclick = () => addWordRow();
    div.querySelector('.save-list').onclick = () => {
      const name = nameInput.value.trim();
      if (!name) return toast('List name required', 'error');
      const words = [...div.querySelectorAll('.word-editor-row')].map(row => ({
        english: row.querySelector('.w-english').value.trim(),
        french: row.querySelector('.w-french').value.trim(),
        definition: row.querySelector('.w-def').value.trim(),
        imageUrl: getWordImage(row.querySelector('.w-english').value.trim()),
      })).filter(w => w.english);
      if (!words.length) return toast('Add at least one word', 'error');
      const selectedChapter = div.querySelector('.list-chapter').value;
      saveWordList({
        id: list.id || uid('list'),
        name,
        words,
        chapterId: selectedChapter,
        theme: list.theme || (list.id?.includes('image_match') ? 'image_match' : 'basics'),
      });
      toast('List saved!', 'success');
      renderListsTab(container);
    };

    if (!isNew) {
      div.querySelector('.delete-list').onclick = () => {
        if (confirm('Delete this list?')) {
          deleteWordList(list.id);
          expandedLists.delete(list.id);
          toast('List deleted', 'info');
          renderListsTab(container);
        }
      };
    }
    return div;
  }

  function renderChapterBlock(ch) {
    const lists = getWordLists(ch.id).sort((a, b) => a.name.localeCompare(b.name, 'fr'));
    const isOpen = expandedChapters.has(ch.id);

    const block = document.createElement('div');
    block.className = 'chapter-lists-block';
    block.style.borderLeft = `4px solid ${ch.color || 'var(--purple)'}`;
    block.innerHTML = `
      <button type="button" class="chapter-lists-header ${isOpen ? 'open' : ''}">
        <span class="chapter-lists-title">${ch.icon} ${escapeHtml(ch.name)}</span>
        <span class="chapter-lists-count">${lists.length} list${lists.length !== 1 ? 's' : ''}</span>
        <span class="chapter-lists-chevron">${isOpen ? '▲' : '▼'}</span>
      </button>
      <div class="chapter-lists-body ${isOpen ? '' : 'hidden'}"></div>
    `;

    const header = block.querySelector('.chapter-lists-header');
    const body = block.querySelector('.chapter-lists-body');

    header.onclick = () => {
      const isHidden = body.classList.toggle('hidden');
      header.classList.toggle('open', !isHidden);
      block.querySelector('.chapter-lists-chevron').textContent = isHidden ? '▼' : '▲';
      if (isHidden) expandedChapters.delete(ch.id);
      else expandedChapters.add(ch.id);
    };

    lists.forEach(list => body.appendChild(renderListEditor(list)));

    const addBtn = document.createElement('button');
    addBtn.type = 'button';
    addBtn.className = 'btn btn-secondary btn-sm add-list-chapter';
    addBtn.textContent = `+ New list in ${ch.name}`;
    addBtn.onclick = () => {
      expandedChapters.add(ch.id);
      body.classList.remove('hidden');
      header.classList.add('open');
      block.querySelector('.chapter-lists-chevron').textContent = '▲';
      body.prepend(renderListEditor({ name: '', words: [], chapterId: ch.id }, { startOpen: true }));
    };
    body.appendChild(addBtn);

    return block;
  }

  CHAPTERS.forEach(ch => root.appendChild(renderChapterBlock(ch)));

  const uncategorized = getWordLists().filter(l => !l.chapterId || !CHAPTERS.some(c => c.id === l.chapterId));
  if (uncategorized.length) {
    const block = document.createElement('div');
    block.className = 'chapter-lists-block';
    block.innerHTML = `
      <button type="button" class="chapter-lists-header open">
        <span class="chapter-lists-title">📋 Other lists</span>
        <span class="chapter-lists-count">${uncategorized.length} list${uncategorized.length !== 1 ? 's' : ''}</span>
        <span class="chapter-lists-chevron">▲</span>
      </button>
      <div class="chapter-lists-body"></div>
    `;
    const body = block.querySelector('.chapter-lists-body');
    uncategorized.forEach(list => body.appendChild(renderListEditor(list)));
    root.appendChild(block);
  }
}

function renderAssignTab(container) {
  const allActivities = Object.keys(ACTIVITY_LABELS);
  container.innerHTML = getClasses().map(cls => `
    <div class="card" data-class="${cls.id}">
      <h3 class="section-title">${escapeHtml(cls.name)}</h3>
      ${CHAPTERS.map(ch => {
        const lists = getWordLists(ch.id).filter(l => cls.assignedListIds.includes(l.id));
        const stories = getStories().filter(s => s.chapterId === ch.id && cls.assignedStoryIds.includes(s.id));
        if (!lists.length && !stories.length) return '';
        return `
          <div class="assign-chapter-block">
            <h4 class="assign-chapter-title">${ch.icon} ${escapeHtml(ch.name)}</h4>
            ${lists.length ? `
              <div class="form-group">
                <label>Word lists</label>
                ${lists.map(l => `
                  <label style="display:flex;align-items:center;gap:0.5rem;font-weight:400;margin-bottom:0.35rem">
                    <input type="checkbox" class="assign-list" value="${l.id}" checked disabled>
                    ${escapeHtml(l.name)} (${l.words.length} words)
                  </label>
                `).join('')}
              </div>
            ` : ''}
            ${stories.length ? `
              <div class="form-group">
                <label>Stories</label>
                ${stories.map(s => `
                  <label style="display:flex;align-items:center;gap:0.5rem;font-weight:400;margin-bottom:0.35rem">
                    <input type="checkbox" class="assign-story" value="${s.id}" ${cls.assignedStoryIds.includes(s.id) ? 'checked' : ''}>
                    ${escapeHtml(s.title)}
                  </label>
                `).join('')}
              </div>
            ` : ''}
          </div>
        `;
      }).join('')}
      <div class="form-group">
        <label>Activities (all chapters)</label>
        ${allActivities.map(a => {
          const info = ACTIVITY_LABELS[a];
          const chapterNote = info?.chapters ? ` (${info.chapters.join(', ')} only)` : '';
          return `
          <label style="display:flex;align-items:center;gap:0.5rem;font-weight:400;margin-bottom:0.35rem">
            <input type="checkbox" class="assign-activity" value="${a}" ${cls.assignedActivities.includes(a) ? 'checked' : ''}>
            ${info.icon} ${escapeHtml(info.title)}${chapterNote}
          </label>`;
        }).join('')}
      </div>
      <button class="btn btn-primary btn-sm save-assign">Save assignments</button>
    </div>
  `).join('');

  container.querySelectorAll('.save-assign').forEach(btn => {
    btn.onclick = () => {
      const card = btn.closest('.card');
      updateClass(card.dataset.class, {
        assignedStoryIds: [...card.querySelectorAll('.assign-story:checked')].map(c => c.value),
        assignedActivities: [...card.querySelectorAll('.assign-activity:checked')].map(c => c.value),
      });
      toast('Assignments saved!', 'success');
    };
  });
}

function getStudentTotals(student) {
  migrateStudentToChapters(student);
  let learned = 0;
  let actAttempts = 0;
  let storiesDone = 0;
  for (const ch of Object.values(student.chapterData || {})) {
    learned += Object.values(ch.wordProgress || {}).filter(w => w.correctCount >= 3).length;
    actAttempts += Object.values(ch.activityScores || {}).reduce((sum, a) => sum + (a.attempts || 0), 0);
    storiesDone += Object.keys(ch.storyScores || {}).length;
  }
  return { points: getTotalPoints(student), learned, actAttempts, storiesDone };
}

function renderResultsTab(container) {
  container.innerHTML = getClasses().map(cls => {
    const roster = getRosterByClass(cls.id);
    const progressMap = Object.fromEntries(getStudentsByClass(cls.id).map(s => [s.rosterId, s]));
    return `
      <div class="card">
        <h3 class="section-title">${escapeHtml(cls.name)} — Results (all sports)</h3>
        ${roster.length ? `
          <table class="data-table">
            <thead><tr><th>Student</th><th>Points</th><th>Words mastered</th><th>Activities</th><th>Stories</th></tr></thead>
            <tbody>
              ${roster.map(r => {
                const s = progressMap[r.id];
                if (!s) {
                  return `
                    <tr>
                      <td>${escapeHtml(r.firstName)} ${escapeHtml(r.lastName.charAt(0))}.</td>
                      <td colspan="4" style="color:var(--text-muted)">Not started yet</td>
                    </tr>
                  `;
                }
                const totals = getStudentTotals(s);
                return `
                  <tr>
                    <td>${escapeHtml(r.firstName)} ${escapeHtml(r.lastName.charAt(0))}.</td>
                    <td><strong>${totals.points}</strong></td>
                    <td>${totals.learned}</td>
                    <td>${totals.actAttempts} attempts</td>
                    <td>${totals.storiesDone} completed</td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        ` : '<p class="card-desc">Add students in the Classes tab first.</p>'}
      </div>
    `;
  }).join('');
}

function showLoading(message = 'Loading SportWord…') {
  app.innerHTML = `
    <div class="loading-screen">
      <div class="loading-spinner"></div>
      <p class="loading-text">${escapeHtml(message)}</p>
    </div>
  `;
}

async function bootstrap() {
  showLoading('Loading SportWord…');
  try {
    await initStorage();
  } catch (err) {
    console.error(err);
  }
  const sync = getSyncStatus();
  if (sync.cloudEnabled && sync.syncError) {
    toast('Synchronisation en ligne indisponible — vous pouvez quand même utiliser l\'application', 'info');
  }
  const session = getSession();
  if (session?.studentId) {
    if (session.chapterId) navigate('studentDashboard');
    else navigate('studentChapterSelect');
  }
  else if (session?.isTeacher) navigate('teacherDashboard');
  else navigate('home');
}

bootstrap();

document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') flushStorage();
});
