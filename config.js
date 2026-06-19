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
  [ACTIVITY_TYPES.IMAGE_MATCH]:   { icon: '🖼️', title: 'Match Images', desc: 'Tap an image, then tap the correct word' },
  [ACTIVITY_TYPES.TRANSLATION]: { icon: '🇫🇷', title: 'Translations', desc: 'Tap a translation, then tap the English word' },
  [ACTIVITY_TYPES.DEFINITION]: { icon: '📝', title: 'Definitions', desc: 'Tap a definition, then tap the correct word' },
  [ACTIVITY_TYPES.QCM]: { icon: '❓', title: 'Quick Quiz', desc: 'Multiple choice on vocabulary' },
  [ACTIVITY_TYPES.SPELLING]: { icon: '✍️', title: 'Spelling', desc: 'Type the English word' },
};

const P = (id) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop`;

export const IMAGE_BANK = {
  // Equipment & basics
  'bench press': P(414029),           // développé couché
  'hamstring': P(6550859),            // étirement arrière de cuisse
  'to bend': P(4056727),              // se pencher / plier
  'training': P(1229356),             // entraînement en duo
  'warm up': P(6550900),              // échauffement

  // Exercises
  'dumbbell': P(841130),              // haltères
  'squat': P(3823039),                // squat à la barre
  'deadlift': 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=300&h=200&fit=crop', // soulevé de terre
  'pull-up': P(6388459),              // traction
  'reps': P(3757942),                 // répétitions

  // Body & recovery
  'biceps': P(1552107),               // bras / biceps
  'core': P(6455891),                 // gainage / planche
  'stretch': P(3076516),              // étirement
  'sore muscles': P(4498290),         // foam roller / courbatures
  'recovery': P(7775848),             // repos / récupération

  // Musculation — Mix 1
  'barbell': P(416778),               // barre
  'to lift': P(226148),               // soulever une barre
  'strong': P(5327523),               // personne forte
  'to flex': P(1552252),              // contracter un muscle
  'heavy': P(260352),                 // poids lourds
  'rep': P(4720764),                  // une répétition
  'to breathe': P(1954524),           // respirer
  'muscular': P(863988),              // musclé
  'spotter': 'https://images.unsplash.com/photo-1758875568671-9fa1829fe1e3?w=300&h=200&fit=crop', // pareur

  // Musculation — Mix 2
  'to push': P(416809),               // pousser ( développé )
  'powerful': P(3768913),             // puissant ( course )
  'shoulder': P(703014),              // épaule ( développé épaules )
  'to pull': P(104553),               // tirer ( rowing )
  'tired': P(6455804),                // fatigué
  'to stretch': P(3253501),           // s'étirer
  'flexible': P(317157),              // souple ( yoga )

  // Musculation — Mix 3
  'to strengthen': P(416476),         // renforcer
  'exhausted': P(4771733),            // épuisé ( serviette )
  'to sweat': P(3823488),             // transpirer
  'fit': P(4064437),                  // en forme
  'set': P(791763),                   // série ( haltères au sol )
  'to rest': P(2820342),              // se reposer
  'sore': P(7298426),                 // courbaturé ( massage )
  'endurance': P(15758347),           // endurance ( course longue )

  // Musculation — Mix 4
  'workout': P(7480452),              // séance d'entraînement
  'to warm up': P(3485729),           // s'échauffer
  'lean': P(914759),                  // sec / tonique
  'protein': P(4056530),              // protéine ( shake )
  'to curl': P(1638336),              // curl biceps
  'balanced': P(669841),              // exercice d'équilibre
  'strength': P(1517838),             // force
  'to increase': P(2294361),          // augmenter les charges
  'challenging': P(3483099),          // entraînement difficile
  'progress': P(18949630),            // progrès à la salle

  default: P(7480452),
};

export function getWordImage(word) {
  const key = word.toLowerCase().trim();
  return IMAGE_BANK[key] || IMAGE_BANK.default;
}
