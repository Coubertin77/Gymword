/** Per-chapter student progress (points, badges, word scores…). */
export function emptyChapterProgress() {
  return {
    points: 0,
    badges: [],
    wordProgress: {},
    activityScores: {},
    storyScores: {},
    scoreHistory: [],
  };
}

export function getChapterProgress(student, chapterId) {
  if (!student.chapterData) student.chapterData = {};
  if (!student.chapterData[chapterId]) {
    student.chapterData[chapterId] = emptyChapterProgress();
  }
  return student.chapterData[chapterId];
}

/** Move legacy flat progress into musculation chapter (one-time migration). */
export function migrateStudentToChapters(student) {
  if (student.chapterData && Object.keys(student.chapterData).length > 0) return student;

  const hasLegacy = (student.points || 0) > 0
    || (student.badges?.length || 0) > 0
    || Object.keys(student.wordProgress || {}).length > 0
    || Object.keys(student.activityScores || {}).length > 0
    || Object.keys(student.storyScores || {}).length > 0;

  student.chapterData = {
    musculation: hasLegacy ? {
      points: student.points || 0,
      badges: [...(student.badges || [])],
      wordProgress: { ...(student.wordProgress || {}) },
      activityScores: { ...(student.activityScores || {}) },
      storyScores: { ...(student.storyScores || {}) },
      scoreHistory: [...(student.scoreHistory || [])],
    } : emptyChapterProgress(),
  };
  return student;
}

export function getTotalPoints(student) {
  if (!student.chapterData) return student.points || 0;
  return Object.values(student.chapterData).reduce((sum, ch) => sum + (ch.points || 0), 0);
}
