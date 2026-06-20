/** Muscles → body region (musculation — Locate Muscles activity). */

export const BODY_REGIONS = [
  { id: 'upper body', label: 'Upper body', icon: '💪' },
  { id: 'lower body', label: 'Lower body', icon: '🦵' },
  { id: 'abdomen', label: 'Abdomen', icon: '🎯' },
];

export const MUSCLE_REGION_BANK = [
  { english: 'biceps', region: 'upper body' },
  { english: 'triceps', region: 'upper body' },
  { english: 'chest', region: 'upper body' },
  { english: 'shoulder', region: 'upper body' },
  { english: 'lats', region: 'upper body' },
  { english: 'hamstring', region: 'lower body' },
  { english: 'quadriceps', region: 'lower body' },
  { english: 'glutes', region: 'lower body' },
  { english: 'calves', region: 'lower body' },
  { english: 'core', region: 'abdomen' },
];

export function getRegionLabel(regionId) {
  return BODY_REGIONS.find(r => r.id === regionId)?.label || regionId;
}

export function getMuscleRegionItems(count = 5) {
  const shuffled = [...MUSCLE_REGION_BANK];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, Math.min(count, shuffled.length)).map(m => ({
    english: m.english,
    region: m.region,
    french: '',
    definition: `Locate this muscle on the body`,
  }));
}
