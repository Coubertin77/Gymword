import { CONFIG } from './config.js';

export function getLevel(points) {
  let level = 1;
  for (const l of CONFIG.LEVELS) {
    if (points >= l.minPoints) level = l.level;
  }
  return level;
}

export function getWordStatus(student, wordKey) {
  const wp = student.wordProgress[wordKey];
  if (!wp) return 'learning';
  if (wp.nextReview && new Date(wp.nextReview) <= new Date() && wp.correctCount < 3) return 'review';
  if (wp.correctCount >= 3) return 'learned';
  if (wp.wrongCount >= CONFIG.SPACED_REPETITION.WRONG_THRESHOLD) return 'review';
  return 'learning';
}

export function countWordsByStatus(student, words) {
  const counts = { learned: 0, learning: 0, review: 0 };
  for (const w of words) {
    const key = w.english.toLowerCase();
    counts[getWordStatus(student, key)]++;
  }
  return counts;
}

export function recordWordAttempt(student, wordKey, correct) {
  if (!student.wordProgress[wordKey]) {
    student.wordProgress[wordKey] = { correctCount: 0, wrongCount: 0, lastSeen: null, nextReview: null };
  }
  const wp = student.wordProgress[wordKey];
  wp.lastSeen = new Date().toISOString();
  if (correct) {
    wp.correctCount++;
    wp.wrongCount = Math.max(0, wp.wrongCount - 1);
  } else {
    wp.wrongCount++;
    scheduleReview(wp);
  }
  if (wp.correctCount >= 3) wp.nextReview = null;
}

function scheduleReview(wp) {
  const intervals = CONFIG.SPACED_REPETITION.INTERVALS_DAYS;
  const idx = Math.min(wp.wrongCount - 1, intervals.length - 1);
  const days = intervals[Math.max(0, idx)];
  const next = new Date();
  next.setDate(next.getDate() + days);
  wp.nextReview = next.toISOString();
}

export function awardPoints(student, points, activityType) {
  student.points += points;
  const today = new Date().toISOString().slice(0, 10);
  const existing = student.scoreHistory.find(h => h.date === today && h.activityType === activityType);
  if (existing) existing.points += points;
  else student.scoreHistory.push({ date: today, points, activityType });
}

export function recordActivityScore(student, activityType, score, total) {
  if (!student.activityScores[activityType]) {
    student.activityScores[activityType] = { best: 0, attempts: 0, totalScore: 0 };
  }
  const s = student.activityScores[activityType];
  s.attempts++;
  s.totalScore += score;
  const pct = total > 0 ? Math.round((score / total) * 100) : 0;
  if (pct > s.best) s.best = pct;
}

export function recordStoryScore(student, storyId, score, total) {
  const pct = total > 0 ? Math.round((score / total) * 100) : 0;
  student.storyScores[storyId] = { best: Math.max(student.storyScores[storyId]?.best || 0, pct), lastScore: pct };
}

export function checkBadges(student, context = {}) {
  const earned = new Set(student.badges);
  const wordsLearned = Object.values(student.wordProgress).filter(w => w.correctCount >= 3).length;

  if (context.activityCompleted && !earned.has('first_workout')) earned.add('first_workout');
  if (wordsLearned >= 5 && !earned.has('word_master')) earned.add('word_master');
  if (context.storyCompleted && !earned.has('story_reader')) earned.add('story_reader');
  if (context.perfectScore && !earned.has('perfect_score')) earned.add('perfect_score');
  if (getLevel(student.points) >= 3 && !earned.has('level_3')) earned.add('level_3');

  const newBadges = [...earned].filter(b => !student.badges.includes(b));
  student.badges = [...earned];
  return newBadges;
}

export function getLeaderboard(classId, students) {
  return students
    .filter(s => s.classId === classId)
    .sort((a, b) => b.points - a.points)
    .map((s, i) => ({
      rank: i + 1,
      firstName: s.firstName,
      points: s.points,
      level: getLevel(s.points),
    }));
}

export function getVocabularyProgress(counts, totalWords) {
  const total = totalWords || 0;
  const learned = counts.learned || 0;
  return {
    learned,
    total,
    percent: total > 0 ? Math.round((learned / total) * 100) : 0,
  };
}

export function getActivityProgress(student, activityTypes, labels) {
  return (activityTypes || []).map(type => {
    const s = student.activityScores[type];
    const info = labels[type] || {};
    return {
      type,
      icon: info.icon || '📋',
      title: info.title || type,
      best: s?.best ?? null,
      attempts: s?.attempts ?? 0,
    };
  });
}

export function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
