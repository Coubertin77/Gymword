/** Teacher-editable video banks per chapter + activity (YouTube links). */

export function parseYoutubeVideoId(url) {
  if (!url || typeof url !== 'string') return null;
  const trimmed = url.trim();
  try {
    const u = new URL(trimmed);
    if (u.hostname.includes('youtube.com')) return u.searchParams.get('v');
    if (u.hostname === 'youtu.be') return u.pathname.replace(/^\//, '').split('/')[0] || null;
  } catch { /* not a full URL */ }
  const m = trimmed.match(/(?:v=|youtu\.be\/|embed\/)([a-zA-Z0-9_-]{11})/);
  return m ? m[1] : null;
}

export function youtubeEmbedUrl(videoId) {
  if (!videoId) return null;
  return `https://www.youtube-nocookie.com/embed/${videoId}`;
}

export function getSeedChapterVideos() {
  return [
    {
      chapterId: 'badminton',
      activityType: 'image_match',
      videos: [
        {
          id: 'vid_badminton_referee_gestures',
          title: 'Badminton referee signals — service judge',
          url: 'https://www.youtube.com/watch?v=tMBJgyml4jg',
        },
      ],
    },
  ];
}
