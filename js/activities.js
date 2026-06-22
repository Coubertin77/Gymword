import { CONFIG, ACTIVITY_LABELS, filterImageMatchWords } from './config.js';
import { shuffle } from './gamification.js';
import { escapeHtml } from './utils.js';
import { wrapStoryWords, createStoryReader, stopStoryAudio } from './story-audio.js';

import { getRulesQuestionsForChapter } from './storage.js';
import { getMuscleRegionItems, getRegionLabel } from './muscle-regions.js';

export function renderActivity(type, words, container, onComplete, chapterId = 'musculation') {
  if (type === 'qcm') {
    const questions = getRulesQuestionsForChapter(chapterId, 5);
    if (!questions.length) {
      container.innerHTML = '<div class="empty-state"><div class="icon">📭</div><p>No rules quiz available for this sport yet.</p></div>';
      return;
    }
    const finish = (score, total) => onComplete({ score, total, perfect: score === total });
    return renderQCM(questions, container, finish);
  }

  if (type === 'muscle_region') {
    const muscles = getMuscleRegionItems(5);
    if (!muscles.length) {
      container.innerHTML = '<div class="empty-state"><div class="icon">📭</div><p>No muscles available.</p></div>';
      return;
    }
    const finish = (score, total) => onComplete({ score, total, perfect: score === total });
    return renderMuscleRegionMatch(muscles, container, finish);
  }

  const pool = type === 'image_match' ? filterImageMatchWords(words) : words;
  const subset = type === 'image_match'
    ? pickUniqueImageWords(pool, 5)
    : shuffle(pool).slice(0, Math.min(pool.length, 5));

  if (subset.length === 0) {
    container.innerHTML = type === 'image_match'
      ? '<div class="empty-state"><div class="icon">📭</div><p>No picture words assigned yet (nouns only).</p></div>'
      : '<div class="empty-state"><div class="icon">📭</div><p>No words assigned yet.</p></div>';
    return;
  }

  const finish = (score, total) => {
    onComplete({ score, total, perfect: score === total });
  };

  switch (type) {
    case 'image_match': return renderImageMatch(subset, container, finish);
    case 'translation': return renderTranslationMatch(subset, container, finish);
    case 'definition': return renderDefinitionMatch(subset, container, finish);
    case 'spelling': return renderSpelling(subset, container, finish);
    default:
      container.innerHTML = '<p>Unknown activity</p>';
  }
}

/** Avoid two labels sharing the same picture in one image-match round. */
function pickUniqueImageWords(words, count) {
  const picked = [];
  const usedUrls = new Set();
  for (const word of shuffle(words)) {
    const url = word.imageUrl || '';
    if (usedUrls.has(url)) continue;
    picked.push(word);
    usedUrls.add(url);
    if (picked.length >= count) break;
  }
  return picked;
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
        ${config.hintHtml || 'Tap an item on either side, then tap its match'}
      </p>
      <div class="match-board">
        <div class="match-col match-col-words">
          <div class="match-col-header">
            <span class="match-col-icon">${config.targetColIcon || '🇬🇧'}</span>
            <span>${config.targetColLabel || 'English words'}</span>
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
    const targetLabel = config.renderTargetWord ? config.renderTargetWord(w) : w.english;
    btn.innerHTML = `
      <span class="match-slot-word">${escapeHtml(targetLabel)}</span>
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

function renderMuscleRegionMatch(muscles, container, finish) {
  renderTapMatchBoard(muscles, container, finish, {
    poolIcon: '📍',
    poolLabel: 'Body regions',
    targetColIcon: '💪',
    targetColLabel: 'Muscles',
    poolCardClass: 'match-card-region',
    hintHtml: 'Tap a <strong>muscle</strong>, then tap its <strong>body region</strong> (Upper body, Lower body or Abdomen)',
    getPoolItems: ws => ws.map(w => ({
      datasets: { region: w.region },
      html: `<span class="match-card-text match-card-region-label">${escapeHtml(getRegionLabel(w.region))}</span>`,
    })),
    getTargetData: w => ({ expectedRegion: w.region }),
    getValue: el => el.dataset.region,
    getExpected: zone => zone.dataset.expectedRegion,
    renderTargetWord: w => w.english,
    renderMatchedAnswer: value => `<span class="match-card-text">${escapeHtml(getRegionLabel(value))}</span>`,
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

function shuffleQuestionOptions(q) {
  const indexed = q.options.map((text, i) => ({ text, originalIndex: i }));
  const shuffled = shuffle(indexed);
  return {
    question: q.question,
    options: shuffled.map(item => item.text),
    correctIndex: shuffled.findIndex(item => item.originalIndex === q.correctIndex),
  };
}

function renderQCM(questions, container, finish) {
  let current = 0;
  let score = 0;

  function showQuestion() {
    if (current >= questions.length) {
      finish(score, questions.length);
      return;
    }
    const q = shuffleQuestionOptions(questions[current]);

    container.innerHTML = `
      <div class="activity-shell">
        ${activityToolbar(current + 1, questions.length)}
        <div class="qcm-layout">
          <div class="qcm-question-col card">
            <span class="qcm-step-label">Question ${current + 1} of ${questions.length}</span>
            <p class="qcm-question-text">${escapeHtml(q.question)}</p>
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
  const quizQuestions = story.questions.map(shuffleQuestionOptions);
  let currentQ = 0;
  const answers = quizQuestions.map(() => null);
  let storyReader = null;
  let audioState = 'idle';

  function getScore() {
    return answers.reduce((sum, ans, i) => {
      if (ans === null) return sum;
      return sum + (ans === quizQuestions[i].correctIndex ? 1 : 0);
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
    if (index < 0 || index >= quizQuestions.length) return;
    currentQ = index;
    renderView();
  }

  function renderView() {
    stopStoryAudio();
    storyReader = null;
    audioState = 'idle';

    const q = quizQuestions[currentQ];
    const answered = answers[currentQ];

    container.innerHTML = `
      <div class="activity-shell">
        <div class="activity-toolbar">
          <div class="activity-toolbar-left">
            <span class="score-pill">${countAnswered()} / ${quizQuestions.length} answered</span>
          </div>
          <div class="story-audio-controls">
            <button type="button" class="btn btn-secondary btn-sm" id="audio-play">🔊 Read aloud</button>
            <button type="button" class="btn btn-ghost btn-sm" id="audio-pause" disabled>⏸ Pause</button>
          </div>
        </div>
        ${activityProgressBar(countAnswered(), quizQuestions.length)}
        <nav class="story-q-nav" aria-label="Questions">
          ${quizQuestions.map((_, i) => {
            const isActive = i === currentQ;
            const isAnswered = answers[i] !== null;
            const isCorrect = isAnswered && answers[i] === quizQuestions[i].correctIndex;
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
            <h2 class="story-title">${escapeHtml(story.title)}${story.englishLevel ? ` <span class="story-level">${escapeHtml(story.englishLevel)}</span>` : ''}</h2>
            <div class="story-text" id="story-text">${wrapStoryWords(story.text)}</div>
          </div>
          <div class="story-quiz-col card" id="quiz-panel">
            ${renderQuestion(q, currentQ, quizQuestions.length, answered)}
            <div class="story-nav-buttons">
              <button type="button" class="btn btn-secondary btn-sm" id="q-prev" ${currentQ === 0 ? 'disabled' : ''}>← Previous</button>
              ${currentQ < quizQuestions.length - 1
                ? `<button type="button" class="btn btn-secondary btn-sm" id="q-next">Next →</button>`
                : ''}
              ${countAnswered() === quizQuestions.length
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

    if (currentQ < quizQuestions.length) {
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
            if (currentQ < quizQuestions.length - 1) goToQuestion(currentQ + 1);
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
    const score = getScore();
    onComplete({
      score,
      total: quizQuestions.length,
      perfect: score === quizQuestions.length,
    });
  }

  renderView();

  return () => stopStoryAudio();
}

export { ACTIVITY_LABELS };
