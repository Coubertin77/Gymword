import { escapeHtml } from './utils.js';

let activeReader = null;

export function stopStoryAudio() {
  if (activeReader) {
    activeReader.stop(true);
    activeReader = null;
  } else if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

function buildWordMap(text) {
  const starts = [];
  const regex = /\S+/g;
  let m;
  while ((m = regex.exec(text)) !== null) {
    starts.push(m.index);
  }
  return starts;
}

export function wrapStoryWords(text) {
  let wordIndex = 0;
  return text.replace(/\S+/g, (word) => {
    const wi = wordIndex++;
    return `<span class="story-word" data-wi="${wi}">${escapeHtml(word)}</span>`;
  });
}

function findWordIndex(wordStarts, charIndex) {
  for (let i = wordStarts.length - 1; i >= 0; i--) {
    if (charIndex >= wordStarts[i]) return i;
  }
  return 0;
}

function textFromWordIndex(text, wordStarts, wordIndex) {
  if (wordIndex <= 0) return text;
  if (wordIndex >= wordStarts.length) return '';
  return text.slice(wordStarts[wordIndex]);
}

export function createStoryReader(textEl, text, { onStateChange } = {}) {
  if (activeReader) activeReader.stop(true);

  const wordStarts = buildWordMap(text);
  const spans = () => [...textEl.querySelectorAll('.story-word')];

  function clearHighlight() {
    spans().forEach(s => s.classList.remove('story-word-active'));
  }

  function highlightWord(index) {
    reader.currentWordIndex = index;
    spans().forEach(s => {
      s.classList.toggle('story-word-active', parseInt(s.dataset.wi, 10) === index);
    });
    const active = textEl.querySelector(`.story-word[data-wi="${index}"]`);
    active?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
  }

  function clearFallbackTimer() {
    if (reader._fallbackTimer) {
      clearInterval(reader._fallbackTimer);
      reader._fallbackTimer = null;
    }
  }

  const reader = {
    textEl,
    text,
    state: 'idle',
    currentWordIndex: 0,
    supported: 'speechSynthesis' in window,
    _useNativePause: false,

    playOrResume() {
      if (!reader.supported) return;

      if (reader.state === 'playing') return;

      if (reader.state === 'paused') {
        reader.resume();
        return;
      }

      reader.startFrom(reader.currentWordIndex);
    },

    startFrom(wordIndex = 0) {
      if (!reader.supported) return;

      window.speechSynthesis.cancel();
      clearFallbackTimer();

      const offset = wordStarts[wordIndex] || 0;
      const speakText = textFromWordIndex(text, wordStarts, wordIndex);

      if (!speakText.trim()) {
        reader.state = 'idle';
        reader.currentWordIndex = 0;
        clearHighlight();
        onStateChange?.('idle');
        return;
      }

      if (wordIndex > 0) highlightWord(wordIndex);
      else clearHighlight();

      const utter = new SpeechSynthesisUtterance(speakText);
      utter.lang = 'en-GB';
      utter.rate = 0.88;

      utter.onboundary = (e) => {
        if (e.name === 'word' && e.charIndex != null) {
          const globalIdx = findWordIndex(wordStarts, e.charIndex + offset);
          highlightWord(globalIdx);
        }
      };

      utter.onend = () => {
        clearFallbackTimer();
        reader.state = 'idle';
        reader.currentWordIndex = 0;
        clearHighlight();
        onStateChange?.('idle');
      };

      utter.onerror = () => {
        clearFallbackTimer();
        if (reader.state === 'playing') {
          reader.state = 'idle';
          onStateChange?.('idle');
        }
      };

      reader.state = 'playing';
      reader._useNativePause = typeof window.speechSynthesis.pause === 'function';
      onStateChange?.('playing');
      window.speechSynthesis.speak(utter);
      reader._utterance = utter;

      setTimeout(() => {
        if (reader.state === 'playing' && !spans().some(s => s.classList.contains('story-word-active'))) {
          reader._startFallbackHighlight(wordIndex);
        }
      }, 450);
    },

    _startFallbackHighlight(fromIndex = 0) {
      clearFallbackTimer();
      const total = wordStarts.length;
      if (!total) return;

      let idx = fromIndex;
      highlightWord(idx);
      const msPerWord = Math.max(280, (text.length / total) * 55);

      reader._fallbackTimer = setInterval(() => {
        if (reader.state !== 'playing') return;
        idx++;
        if (idx >= total) {
          clearFallbackTimer();
          reader.state = 'idle';
          reader.currentWordIndex = 0;
          clearHighlight();
          onStateChange?.('idle');
          return;
        }
        highlightWord(idx);
      }, msPerWord);
    },

    pause() {
      if (reader.state !== 'playing') return;

      clearFallbackTimer();

      if (reader._useNativePause && !window.speechSynthesis.paused) {
        try {
          window.speechSynthesis.pause();
          reader.state = 'paused';
          onStateChange?.('paused');
          return;
        } catch {
          /* fall through to manual pause */
        }
      }

      window.speechSynthesis.cancel();
      reader.state = 'paused';
      onStateChange?.('paused');
    },

    resume() {
      if (reader.state !== 'paused') return;

      if (reader._useNativePause && window.speechSynthesis.paused) {
        try {
          window.speechSynthesis.resume();
          reader.state = 'playing';
          onStateChange?.('playing');
          if (reader._fallbackTimer === null && !spans().some(s => s.classList.contains('story-word-active'))) {
            reader._startFallbackHighlight(reader.currentWordIndex);
          }
          return;
        } catch {
          /* fall through */
        }
      }

      reader.startFrom(reader.currentWordIndex);
    },

    stop(silent = false) {
      clearFallbackTimer();
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      reader.state = 'idle';
      reader.currentWordIndex = 0;
      clearHighlight();
      if (!silent) onStateChange?.('idle');
    },
  };

  activeReader = reader;
  return reader;
}
