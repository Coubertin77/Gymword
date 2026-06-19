import { CONFIG, ACTIVITY_LABELS } from './config.js';
import { shuffle } from './gamification.js';
import { escapeHtml, formatTime } from './utils.js';
import { wrapStoryWords, createStoryReader, stopStoryAudio } from './story-audio.js';

export function createTimer(onTick) {
  let seconds = 0;
  let interval = null;
  return {
    start() {
      if (interval) return;
      interval = setInterval(() => { seconds++; onTick(seconds); }, 1000);
    },
    stop() {
      if (interval) { clearInterval(interval); interval = null; }
      return seconds;
    },
    get() { return seconds; },
  };
}

export function renderActivity(type, words, container, onComplete) {
  const subset = shuffle(words).slice(0, Math.min(words.length, 5));
  if (subset.length === 0) {
    container.innerHTML = '<div class="empty-state"><div class="icon">📭</div><p>No words assigned yet.</p></div>';
    return;
  }

  const timer = createTimer(s => {
    const el = container.querySelector('.timer');
    if (el) el.textContent = formatTime(s);
  });
  timer.start();

  const finish = (score, total) => {
    const time = timer.stop();
    onComplete({ score, total, timeSeconds: time, perfect: score === total });
  };

  switch (type) {
    case 'image_match': return renderImageMatch(subset, container, finish);
    case 'translation': return renderTranslationMatch(subset, container, finish);
    case 'definition': return renderDefinitionMatch(subset, container, finish);
    case 'qcm': return renderQCM(subset, container, finish);
    case 'spelling': return renderSpelling(subset, container, finish);
    default:
      container.innerHTML = '<p>Unknown activity</p>';
  }
}

function activityProgressBar(current, total) {
  const pct = total > 0 ? Math.round((current / total) * 100) : 0;
  return `
    <div class="activity-progress">
      <div class="activity-progress-bar" style="width:${pct}%"></div>
    </div>
  `;
}

function activityToolbar(matched, total, extra = '') {
  return `
    <div class="activity-toolbar">
      <div class="activity-toolbar-left">
        <span class="timer-pill">⏱ <span class="timer">0:00</span></span>
        <span class="score-pill">✓ <span id="match-count">${matched}</span> / ${total}</span>
      </div>
      ${extra}
    </div>
    ${activityProgressBar(matched, total)}
  `;
}

function renderTapMatchBoard(words, container, finish, config) {
  let matched = 0;
  const poolItems = shuffle(config.getPoolItems(words));

  container.innerHTML = `
    <div class="activity-shell">
      ${activityToolbar(0, words.length)}
      <p class="tap-hint-bar" id="tap-hint">
        <span class="tap-hint-icon">👆</span>
        Tap an item on either side, then tap its match
      </p>
      <div class="match-board">
        <div class="match-col match-col-words">
          <div class="match-col-header">
            <span class="match-col-icon">🇬🇧</span>
            <span>English words</span>
          </div>
          <div class="match-col-body" id="targets-col"></div>
        </div>
        <div class="match-connector" aria-hidden="true">
          <div class="connector-arrow">↔</div>
        </div>
        <div class="match-col match-col-answers">
          <div class="match-col-header">
            <span class="match-col-icon">${config.poolIcon}</span>
            <span>${config.poolLabel}</span>
          </div>
          <div class="match-col-body" id="pool-col"></div>
        </div>
      </div>
    </div>
  `;

  const targetsCol = container.querySelector('#targets-col');
  words.forEach(w => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'match-slot tap-target';
    Object.entries(config.getTargetData(w)).forEach(([k, v]) => { btn.dataset[k] = v; });
    btn.dataset.matched = 'false';
    btn.innerHTML = `
      <span class="match-slot-word">${escapeHtml(w.english)}</span>
      <span class="match-slot-answer match-slot-placeholder">?</span>
    `;
    targetsCol.appendChild(btn);
  });

  const poolCol = container.querySelector('#pool-col');
  poolItems.forEach(item => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'match-card tap-pool-item' + (config.poolCardClass ? ` ${config.poolCardClass}` : '');
    Object.entries(item.datasets).forEach(([k, v]) => { btn.dataset[k] = v; });
    btn.innerHTML = item.html;
    poolCol.appendChild(btn);
  });

  setupTapMatching(container, {
    poolSelector: '.tap-pool-item',
    zoneSelector: '.tap-target',
    hintEl: container.querySelector('#tap-hint'),
    getValue: config.getValue,
    getExpected: config.getExpected,
    onMatch: (poolItem, zone, value) => {
      zone.dataset.matched = 'true';
      zone.classList.add('matched');
      const answerEl = zone.querySelector('.match-slot-answer');
      if (answerEl) {
        answerEl.classList.remove('match-slot-placeholder');
        answerEl.innerHTML = config.renderMatchedAnswer(value, words);
      }
      poolItem.classList.add('used');
      poolItem.disabled = true;
      matched++;
      container.querySelector('#match-count').textContent = matched;
      const bar = container.querySelector('.activity-progress-bar');
      if (bar) bar.style.width = `${Math.round((matched / words.length) * 100)}%`;
      if (matched === words.length) {
        const hint = container.querySelector('#tap-hint');
        if (hint) hint.innerHTML = '<span class="tap-hint-icon">🎉</span> All matched! Great job!';
        setTimeout(() => finish(matched, words.length), 400);
      }
    },
  });
}

function renderImageMatch(words, container, finish) {
  renderTapMatchBoard(words, container, finish, {
    poolIcon: '🖼️',
    poolLabel: 'Images',
    poolCardClass: 'match-card-image',
    getPoolItems: ws => ws.map(w => ({
      datasets: { word: w.english },
      html: `<img src="${w.imageUrl}" alt="${escapeHtml(w.english)}" loading="lazy">`,
    })),
    getTargetData: w => ({ word: w.english }),
    getValue: el => el.dataset.word,
    getExpected: zone => zone.dataset.word,
    renderMatchedAnswer: (value, ws) => {
      const w = ws.find(x => x.english === value);
      return `<img src="${w.imageUrl}" alt="" class="matched-thumb">`;
    },
  });
}

function renderTranslationMatch(words, container, finish) {
  renderTapMatchBoard(words, container, finish, {
    poolIcon: '🇫🇷',
    poolLabel: 'Translations',
    getPoolItems: ws => ws.map(w => ({
      datasets: { french: w.french },
      html: `<span class="match-card-text">${escapeHtml(w.french)}</span>`,
    })),
    getTargetData: w => ({ french: w.french }),
    getValue: el => el.dataset.french,
    getExpected: zone => zone.dataset.french,
    renderMatchedAnswer: value => `<span class="match-card-text">${escapeHtml(value)}</span>`,
  });
}

function renderDefinitionMatch(words, container, finish) {
  renderTapMatchBoard(words, container, finish, {
    poolIcon: '📖',
    poolLabel: 'Definitions',
    poolCardClass: 'match-card-def',
    getPoolItems: ws => ws.map(w => ({
      datasets: { definition: w.definition },
      html: `<span class="match-card-text">${escapeHtml(w.definition)}</span>`,
    })),
    getTargetData: w => ({ definition: w.definition }),
    getValue: el => el.dataset.definition,
    getExpected: zone => zone.dataset.definition,
    renderMatchedAnswer: value => `<span class="match-card-text match-card-text-sm">${escapeHtml(value)}</span>`,
  });
}

function setupTapMatching(container, { poolSelector, zoneSelector, hintEl, getValue, getExpected, onMatch }) {
  let selectedPool = null;
  let selectedZone = null;

  function setHint(html) {
    if (hintEl) hintEl.innerHTML = html;
  }

  function clearSelection() {
    selectedPool?.classList.remove('tap-selected');
    selectedZone?.classList.remove('tap-selected');
    selectedPool = null;
    selectedZone = null;
    container.querySelectorAll('.tap-ready').forEach(el => el.classList.remove('tap-ready'));
    setHint('<span class="tap-hint-icon">👆</span> Tap an item on either side, then tap its match');
  }

  function highlightReady() {
    container.querySelectorAll(`${poolSelector}:not(.used), ${zoneSelector}:not(.matched)`).forEach(el => {
      el.classList.add('tap-ready');
    });
  }

  function tryMatch(poolEl, zoneEl) {
    if (zoneEl.dataset.matched === 'true' || poolEl.classList.contains('used')) return;

    const value = getValue(poolEl);
    const expected = getExpected(zoneEl);

    if (value === expected) {
      onMatch(poolEl, zoneEl, value);
      clearSelection();
      if (container.querySelector(`${zoneSelector}[data-matched="false"]`)) {
        setHint('<span class="tap-hint-icon">✨</span> Nice! Keep going — pick another pair');
      }
    } else {
      zoneEl.classList.add('wrong-flash');
      poolEl.classList.add('wrong-pulse');
      setHint('<span class="tap-hint-icon">❌</span> Not a match — try again!');
      setTimeout(() => {
        zoneEl.classList.remove('wrong-flash');
        poolEl.classList.remove('wrong-pulse');
      }, 600);
      clearSelection();
    }
  }

  container.querySelectorAll(poolSelector).forEach(el => {
    el.addEventListener('click', () => {
      if (el.classList.contains('used') || el.disabled) return;

      if (selectedZone) {
        tryMatch(el, selectedZone);
        return;
      }

      if (selectedPool === el) {
        clearSelection();
        return;
      }

      selectedPool?.classList.remove('tap-selected');
      selectedPool = el;
      el.classList.add('tap-selected');
      highlightReady();
      setHint('<span class="tap-hint-icon">➡️</span> Now tap the matching <strong>word on the left</strong>');
    });
  });

  container.querySelectorAll(zoneSelector).forEach(zone => {
    zone.addEventListener('click', () => {
      if (zone.dataset.matched === 'true') return;

      if (selectedPool) {
        tryMatch(selectedPool, zone);
        return;
      }

      if (selectedZone === zone) {
        clearSelection();
        return;
      }

      selectedZone?.classList.remove('tap-selected');
      selectedZone = zone;
      zone.classList.add('tap-selected');
      highlightReady();
      setHint('<span class="tap-hint-icon">➡️</span> Now tap the matching <strong>answer on the right</strong>');
    });
  });
}

function renderQCM(words, container, finish) {
  let current = 0;
  let score = 0;
  const questions = buildQCMQuestions(words);

  function showQuestion() {
    if (current >= questions.length) {
      finish(score, questions.length);
      return;
    }
    const q = questions[current];
    const wordMatch = q.question.match(/"([^"]+)"/);
    const highlightWord = wordMatch ? wordMatch[1] : '';

    container.innerHTML = `
      <div class="activity-shell">
        ${activityToolbar(current + 1, questions.length)}
        <div class="qcm-layout">
          <div class="qcm-question-col card">
            <span class="qcm-step-label">Question ${current + 1} of ${questions.length}</span>
            ${highlightWord ? `<div class="qcm-word-badge">${escapeHtml(highlightWord)}</div>` : ''}
            <p class="qcm-question-text">What is the French translation?</p>
          </div>
          <div class="qcm-options-col">
            <div class="qcm-options-grid" id="qcm-options"></div>
          </div>
        </div>
      </div>
    `;

    const bar = container.querySelector('.activity-progress-bar');
    if (bar) bar.style.width = `${Math.round((current / questions.length) * 100)}%`;

    const optsEl = container.querySelector('#qcm-options');
    q.options.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'qcm-option';
      btn.innerHTML = `<span class="qcm-option-letter">${['A', 'B', 'C', 'D'][i]}</span><span>${escapeHtml(opt)}</span>`;
      btn.addEventListener('click', () => {
        container.querySelectorAll('.qcm-option').forEach((b, j) => {
          b.disabled = true;
          if (j === q.correctIndex) b.classList.add('correct');
          else if (j === i && i !== q.correctIndex) b.classList.add('wrong');
        });
        if (i === q.correctIndex) score++;
        setTimeout(() => { current++; showQuestion(); }, 1000);
      });
      optsEl.appendChild(btn);
    });
  }
  showQuestion();
}

function buildQCMQuestions(words) {
  return words.map(w => {
    const wrong = shuffle(words.filter(x => x.english !== w.english)).slice(0, 3).map(x => x.french);
    const options = shuffle([w.french, ...wrong]);
    return {
      question: `What is the French translation of "${w.english}"?`,
      options,
      correctIndex: options.indexOf(w.french),
    };
  });
}

function renderSpelling(words, container, finish) {
  let current = 0;
  let score = 0;

  function showWord() {
    if (current >= words.length) {
      finish(score, words.length);
      return;
    }
    const w = words[current];
    container.innerHTML = `
      <div class="activity-shell">
        ${activityToolbar(current + 1, words.length)}
        <div class="spelling-layout card">
          <div class="spelling-prompt-col">
            <span class="qcm-step-label">Word ${current + 1} of ${words.length}</span>
            <p class="spelling-label">In French</p>
            <p class="spelling-hint">${escapeHtml(w.french)}</p>
            <p class="spelling-def">${escapeHtml(w.definition)}</p>
          </div>
          <div class="spelling-input-col">
            <p class="spelling-label">Type in English</p>
            <input type="text" id="spelling-input" class="spelling-input" autocomplete="off" autocapitalize="off" placeholder="Your answer…">
            <button type="button" class="btn btn-primary btn-block" id="spelling-check">Check ✓</button>
            <div id="spelling-feedback"></div>
          </div>
        </div>
      </div>
    `;
    const bar = container.querySelector('.activity-progress-bar');
    if (bar) bar.style.width = `${Math.round((current / words.length) * 100)}%`;
    const input = container.querySelector('#spelling-input');
    input.focus();
    const check = () => {
      const val = input.value.trim().toLowerCase();
      const expected = w.english.toLowerCase();
      const fb = container.querySelector('#spelling-feedback');
      if (val === expected) {
        fb.className = 'spelling-feedback ok';
        fb.textContent = 'Correct! 💪';
        score++;
        setTimeout(() => { current++; showWord(); }, 1000);
      } else {
        fb.className = 'spelling-feedback ko';
        fb.textContent = `Not quite. The answer is "${w.english}"`;
        setTimeout(() => { current++; showWord(); }, 2000);
      }
    };
    container.querySelector('#spelling-check').addEventListener('click', check);
    input.addEventListener('keydown', e => { if (e.key === 'Enter') check(); });
  }
  showWord();
}

export function renderStoryQuiz(story, container, onComplete) {
  let currentQ = 0;
  const answers = story.questions.map(() => null);
  let storyReader = null;
  let audioState = 'idle';

  const timer = createTimer(s => {
    const el = container.querySelector('.timer');
    if (el) el.textContent = formatTime(s);
  });
  timer.start();

  function getScore() {
    return answers.reduce((sum, ans, i) => {
      if (ans === null) return sum;
      return sum + (ans === story.questions[i].correctIndex ? 1 : 0);
    }, 0);
  }

  function countAnswered() {
    return answers.filter(a => a !== null).length;
  }

  function updateAudioButtons(state = audioState) {
    audioState = state;
    const playBtn = container.querySelector('#audio-play');
    const pauseBtn = container.querySelector('#audio-pause');
    if (playBtn) {
      if (state === 'playing') {
        playBtn.textContent = '▶ Continue';
        playBtn.disabled = true;
      } else if (state === 'paused') {
        playBtn.textContent = '▶ Continue';
        playBtn.disabled = false;
      } else {
        playBtn.textContent = '🔊 Read aloud';
        playBtn.disabled = false;
      }
    }
    if (pauseBtn) pauseBtn.disabled = state !== 'playing';
  }

  function goToQuestion(index) {
    if (index < 0 || index >= story.questions.length) return;
    currentQ = index;
    renderView();
  }

  function renderView() {
    stopStoryAudio();
    storyReader = null;
    audioState = 'idle';

    const q = story.questions[currentQ];
    const answered = answers[currentQ];

    container.innerHTML = `
      <div class="activity-shell">
        <div class="activity-toolbar">
          <div class="activity-toolbar-left">
            <span class="timer-pill">⏱ <span class="timer">0:00</span></span>
            <span class="score-pill">${countAnswered()} / ${story.questions.length} answered</span>
          </div>
          <div class="story-audio-controls">
            <button type="button" class="btn btn-secondary btn-sm" id="audio-play">🔊 Read aloud</button>
            <button type="button" class="btn btn-ghost btn-sm" id="audio-pause" disabled>⏸ Pause</button>
          </div>
        </div>
        ${activityProgressBar(countAnswered(), story.questions.length)}
        <nav class="story-q-nav" aria-label="Questions">
          ${story.questions.map((_, i) => {
            const isActive = i === currentQ;
            const isAnswered = answers[i] !== null;
            const isCorrect = isAnswered && answers[i] === story.questions[i].correctIndex;
            return `
              <button type="button"
                class="story-q-pill ${isActive ? 'active' : ''} ${isAnswered ? (isCorrect ? 'correct' : 'wrong') : ''}"
                data-q="${i}"
                aria-label="Question ${i + 1}"
                aria-current="${isActive ? 'step' : 'false'}">
                ${i + 1}
              </button>
            `;
          }).join('')}
        </nav>
        <div class="story-layout">
          <div class="story-col card">
            <h2 class="story-title">${escapeHtml(story.title)}</h2>
            <div class="story-text" id="story-text">${wrapStoryWords(story.text)}</div>
          </div>
          <div class="story-quiz-col card" id="quiz-panel">
            ${renderQuestion(q, currentQ, story.questions.length, answered)}
            <div class="story-nav-buttons">
              <button type="button" class="btn btn-secondary btn-sm" id="q-prev" ${currentQ === 0 ? 'disabled' : ''}>← Previous</button>
              ${currentQ < story.questions.length - 1
                ? `<button type="button" class="btn btn-secondary btn-sm" id="q-next">Next →</button>`
                : ''}
              ${countAnswered() === story.questions.length
                ? `<button type="button" class="btn btn-primary btn-sm" id="q-finish">Finish quiz ✓</button>`
                : ''}
            </div>
          </div>
        </div>
      </div>
    `;

    const textEl = container.querySelector('#story-text');

    container.querySelector('#audio-play')?.addEventListener('click', () => {
      if (!storyReader || storyReader.textEl !== textEl) {
        storyReader = createStoryReader(textEl, story.text, {
          onStateChange: (state) => updateAudioButtons(state),
        });
      }
      storyReader.playOrResume();
      updateAudioButtons(storyReader.state);
    });

    container.querySelector('#audio-pause')?.addEventListener('click', () => {
      storyReader?.pause();
      updateAudioButtons(storyReader?.state || 'idle');
    });

    updateAudioButtons(audioState);

    container.querySelectorAll('.story-q-pill').forEach(pill => {
      pill.addEventListener('click', () => goToQuestion(parseInt(pill.dataset.q, 10)));
    });

    container.querySelector('#q-prev')?.addEventListener('click', () => goToQuestion(currentQ - 1));
    container.querySelector('#q-next')?.addEventListener('click', () => goToQuestion(currentQ + 1));

    container.querySelector('#q-finish')?.addEventListener('click', () => finishQuiz());

    if (currentQ < story.questions.length) {
      container.querySelectorAll('.qcm-option').forEach((btn, i) => {
        if (answered !== null) {
          if (i === q.correctIndex) btn.classList.add('correct');
          if (i === answered && i !== q.correctIndex) btn.classList.add('wrong');
          if (i === answered) btn.classList.add('selected');
        }
        btn.addEventListener('click', () => {
          answers[currentQ] = i;
          container.querySelectorAll('.qcm-option').forEach((b, j) => {
            b.classList.remove('correct', 'wrong', 'selected');
            if (j === q.correctIndex) b.classList.add('correct');
            else if (j === i && i !== q.correctIndex) b.classList.add('wrong');
            if (j === i) b.classList.add('selected');
          });
          setTimeout(() => {
            if (currentQ < story.questions.length - 1) goToQuestion(currentQ + 1);
            else renderView();
          }, 700);
        });
      });
    }
  }

  function renderQuestion(q, idx, total, selectedIndex) {
    return `
      <span class="qcm-step-label">Question ${idx + 1} of ${total}</span>
      <p class="story-question-text">${escapeHtml(q.question)}</p>
      <div class="qcm-options-stack">
        ${q.options.map((opt, i) => `
          <button type="button" class="qcm-option ${selectedIndex === i ? 'selected' : ''}" data-i="${i}">
            <span class="qcm-option-letter">${['A', 'B', 'C', 'D'][i]}</span>
            <span>${escapeHtml(opt)}</span>
          </button>
        `).join('')}
      </div>
    `;
  }

  function finishQuiz() {
    stopStoryAudio();
    const time = timer.stop();
    const score = getScore();
    onComplete({
      score,
      total: story.questions.length,
      timeSeconds: time,
      perfect: score === story.questions.length,
    });
  }

  renderView();

  return () => stopStoryAudio();
}

export { ACTIVITY_LABELS };
