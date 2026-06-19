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

export const IMAGE_BANK = {
  'bench press': 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=200&h=150&fit=crop',
  'hamstring': 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=200&h=150&fit=crop',
  'to bend': 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=200&h=150&fit=crop',
  'training': 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=200&h=150&fit=crop',
  'warm up': 'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?w=200&h=150&fit=crop',
  'dumbbell': 'https://images.unsplash.com/photo-1583454110551-21f2fe2edb61?w=200&h=150&fit=crop',
  'squat': 'https://images.unsplash.com/photo-1434682881344-6e0e2820e992?w=200&h=150&fit=crop',
  'deadlift': 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=200&h=150&fit=crop',
  'pull-up': 'https://images.unsplash.com/photo-1597452485669-879c725a9702?w=200&h=150&fit=crop',
  'reps': 'https://images.unsplash.com/photo-1576678927484-cc907957088c?w=200&h=150&fit=crop',
  default: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=200&h=150&fit=crop',
};

export function getWordImage(word) {
  const key = word.toLowerCase().trim();
  return IMAGE_BANK[key] || IMAGE_BANK.default;
}
