export const CONFIG = {
  TEACHER_PASSWORD: 'EPS',
  POINTS: {
    CORRECT: 10,
    BONUS_FAST: 5,
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
    { id: 'speed_demon', name: 'Speed Demon', icon: '⚡', desc: 'Finish an activity under 60 seconds' },
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

export const ACTIVITY_TYPES = {
  IMAGE_MATCH: 'image_match',
  TRANSLATION: 'translation',
  DEFINITION: 'definition',
  QCM: 'qcm',
  SPELLING: 'spelling',
};

export const ACTIVITY_LABELS = {
  [ACTIVITY_TYPES.IMAGE_MATCH]:   { icon: '🖼️', title: 'Match Images', desc: 'Match pictures to muscles, equipment and machines' },
  [ACTIVITY_TYPES.TRANSLATION]: { icon: '🇫🇷', title: 'Translations', desc: 'Tap a translation, then tap the English word' },
  [ACTIVITY_TYPES.DEFINITION]: { icon: '📝', title: 'Definitions', desc: 'Tap a definition, then tap the correct word' },
  [ACTIVITY_TYPES.QCM]: { icon: '❓', title: 'Quick Quiz', desc: 'Multiple choice on vocabulary' },
  [ACTIVITY_TYPES.SPELLING]: { icon: '✍️', title: 'Spelling', desc: 'Type the English word' },
};

const P = (id) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop`;

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

  // Exercices (concrets, visuels)
  'bench press': P(414029),
  'squat': P(3823039),
  'deadlift': 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=300&h=200&fit=crop',
  'pull-up': P(6388459),
  'bicep curl': P(1638336),

  default: P(841130),
};

export function getWordImage(word) {
  const key = word.toLowerCase().trim();
  return IMAGE_BANK[key] || IMAGE_BANK.default;
}

/** Match Images — muscles, équipements, machines et exercices concrets uniquement. */
export const IMAGE_MATCH_WORDS = new Set([
  'biceps', 'triceps', 'hamstring', 'quadriceps', 'glutes', 'calves', 'chest', 'shoulder', 'lats', 'core',
  'dumbbell', 'barbell', 'bench', 'kettlebell', 'weight plate', 'foam roller', 'resistance band',
  'treadmill', 'exercise bike', 'rowing machine', 'leg press', 'cable machine',
  'bench press', 'squat', 'deadlift', 'pull-up', 'bicep curl',
]);

export function filterImageMatchWords(words) {
  return words.filter(w => IMAGE_MATCH_WORDS.has(w.english.toLowerCase().trim()));
}
