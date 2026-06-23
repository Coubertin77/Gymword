export const CONFIG = {
  TEACHER_PASSWORD: 'EPS',
  POINTS: {
    CORRECT: 10,
    STORY_COMPLETE: 25,
  },
  LEVELS: [
    { level: 1, minPoints: 0 },
    { level: 2, minPoints: 50 },
    { level: 3, minPoints: 150 },
    { level: 4, minPoints: 300 },
    { level: 5, minPoints: 500 },
  ],
  BADGES: [
    { id: 'first_workout', name: 'First Workout', icon: '🏋️', desc: 'Complete your first activity' },
    { id: 'word_master', name: 'Word Master', icon: '💪', desc: 'Master 5 words' },
    { id: 'story_reader', name: 'Story Reader', icon: '📖', desc: 'Complete a story quiz' },
    { id: 'perfect_score', name: 'Perfect Score', icon: '🌟', desc: 'Get 100% on an activity' },
    { id: 'level_3', name: 'Rising Star', icon: '⭐', desc: 'Reach level 3' },
  ],
  SPACED_REPETITION: {
    WRONG_THRESHOLD: 2,
    INTERVALS_DAYS: [1, 3, 7, 14],
  },
  STORAGE_KEY: 'gymword_data_v1',
  SESSION_KEY: 'gymword_session_v1',
};

/** Bump when publishing — shown on home screen to confirm the latest version loaded. */
export const APP_VERSION = '2.4.3';

export const CHAPTERS = [
  { id: 'musculation', name: 'Musculation', icon: '🏋️', color: '#6c3ce0' },
  { id: 'badminton', name: 'Badminton', icon: '🏸', color: '#e74c3c' },
  { id: 'basket', name: 'Basketball', icon: '🏀', color: '#f39c12' },
  { id: 'touch_rugby', name: 'Touch Rugby', icon: '🏉', color: '#27ae60' },
  { id: 'flag_football', name: 'Flag Football', icon: '🏈', color: '#2980b9' },
  { id: 'baseball', name: 'Baseball', icon: '⚾', color: '#c0392b' },
  { id: 'laser_run', name: 'Laser Run', icon: '🎯', color: '#8e44ad' },
];

export function getChapterById(id) {
  return CHAPTERS.find(c => c.id === id) || CHAPTERS[0];
}

export const ACTIVITY_TYPES = {
  IMAGE_MATCH: 'image_match',
  TRANSLATION: 'translation',
  DEFINITION: 'definition',
  QCM: 'qcm',
  SPELLING: 'spelling',
  MUSCLE_REGION: 'muscle_region',
};

export const ACTIVITY_LABELS = {
  [ACTIVITY_TYPES.IMAGE_MATCH]:   { icon: '🖼️', title: 'Match Images', desc: 'Match pictures to sport vocabulary', chapterDescs: { badminton: 'Match referee gestures to the correct call in English' } },
  [ACTIVITY_TYPES.TRANSLATION]: { icon: '🇫🇷', title: 'Translations', desc: 'Tap a translation, then tap the English word' },
  [ACTIVITY_TYPES.DEFINITION]: { icon: '📝', title: 'Definitions', desc: 'Tap a definition, then tap the correct word' },
  [ACTIVITY_TYPES.QCM]: { icon: '❓', title: 'Quick Quiz', desc: 'Answer questions about the rules of the sport' },
  [ACTIVITY_TYPES.SPELLING]: { icon: '✍️', title: 'Spelling', desc: 'Type the English word' },
  [ACTIVITY_TYPES.MUSCLE_REGION]: { icon: '🧍', title: 'Locate Muscles', desc: 'Match each muscle to Upper body, Lower body or Abdomen', chapters: ['musculation'] },
};

/** Activities shown for a chapter (some are chapter-specific). */
export function getActivitiesForChapter(assignedActivities, chapterId) {
  const assigned = assignedActivities || Object.keys(ACTIVITY_LABELS);
  return assigned.filter(type => {
    const info = ACTIVITY_LABELS[type];
    if (info?.chapters) return info.chapters.includes(chapterId);
    return true;
  });
}

const P = (id) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop`;

const EX = (file) => `images/exercises/${file}`;

export const IMAGE_BANK = {
  // Muscles (photo = exercice qui les travaille)
  'biceps': P(1638336),              // curl biceps
  'triceps': P(5327523),             // extension / bras
  'hamstring': P(6550859),           // ischios — étirement jambes
  'quadriceps': P(3823039),          // quadriceps — squat
  'glutes': P(914759),               // fessiers — silhouette tonique
  'calves': P(317157),               // mollets — jambe / souplesse
  'chest': P(414029),                // pectoraux — développé couché
  'shoulder': P(703014),             // épaules — développé épaules
  'lats': P(6388459),                // dorsaux — traction
  'core': P(6455891),                // abdos — planche

  // Équipement
  'dumbbell': P(841130),
  'barbell': P(416778),
  'bench': P(414029),                // banc de musculation
  'kettlebell': P(416476),           // kettlebell
  'weight plate': P(260352),         // disque de fonte
  'foam roller': P(4498290),
  'resistance band': P(3076516),     // élastique de résistance

  // Machines
  'treadmill': P(3768913),           // tapis de course
  'exercise bike': P(416809),        // vélo d'appartement
  'rowing machine': P(104553),       // rameur
  'leg press': P(791763),            // presse à cuisses
  'cable machine': P(863988),        // poulie / câbles

  // Match Images — exercices machines (images locales)
  'bench press': EX('bench-press.png'),
  'lat pull down': EX('lat-pull-down.png'),
  'machine fly': EX('machine-fly.png'),
  'machine squat': EX('machine-squat.png'),
  'barbell preacher curl': EX('barbell-preacher-curl.png'),
  'leg extension': EX('leg-extension.png'),
  'leg curl': EX('leg-curl.png'),
  'incline leg press': EX('incline-leg-press.png'),

  // Autres exercices (photos en ligne)
  'squat': P(3823039),
  'deadlift': 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=300&h=200&fit=crop',
  'pull-up': P(6388459),
  'bicep curl': P(1638336),

  // Badminton
  'shuttlecock': P(3660420),
  'badminton racket': P(3660204),
  'badminton net': P(6550872),
  'badminton court': P(1171084),
  'serve': P(3660204),
  'smash': P(3660420),
  'drop shot': P(1171084),

  // Basketball
  'basketball': P(33204406),
  'hoop': P(1752757),
  'dribble': P(33204406),
  'basketball court': P(1752757),
  'rebound': P(33204406),
  'lay-up': P(1752757),

  // Touch rugby
  'rugby ball': P(47730),
  'try line': P(47730),
  'touch': P(3621105),
  'rugby pitch': P(3621105),
  'offload': P(47730),
  'sidestep': P(3621105),

  // Flag football
  'flag belt': P(1618269),
  'quarterback': P(1618269),
  'touchdown': P(1618269),
  'end zone': P(1618269),
  'football field': P(1618269),
  'helmet': P(1618269),

  // Baseball
  'baseball bat': P(6724492),
  'baseball glove': P(6724492),
  'home plate': P(6724492),
  'pitcher': P(6724492),
  'catcher': P(6724492),
  'baseball field': P(6724492),

  // Laser run
  'laser pistol': P(5690931),
  'shooting target': P(5690931),
  'obstacle course': P(3621105),
  'fencing piste': P(5690931),
  'laser run course': P(3621105),
  'transition zone': P(3621105),

  default: P(841130),
};

export function getWordImage(word) {
  const key = word.toLowerCase().trim();
  return IMAGE_BANK[key] || IMAGE_BANK.default;
}

export function filterImageMatchWords(words, chapterId) {
  if (chapterId === 'badminton') {
    return words.filter(w => w.listId === 'badminton_referee_gestures');
  }
  return words.filter(w =>
    w.listTheme === 'image_match'
    || (w.listId && String(w.listId).includes('image_match'))
  );
}
