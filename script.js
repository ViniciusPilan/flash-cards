(function () {
  const categoryEl = document.getElementById('category');
  const questionEl = document.getElementById('question');
  const answerEl = document.getElementById('answer');
  const answerWrapEl = document.getElementById('answer-wrap');
  const revealBtn = document.getElementById('reveal-btn');
  const statusEl = document.getElementById('status');
  const nextBtn = document.getElementById('next-btn');

  let cards = [];
  let lastIndex = -1;

  function flatten(data) {
    const out = [];
    (data.categories || []).forEach((cat) => {
      (cat.questions || []).forEach((q) => {
        out.push({
          category: cat.category,
          question: q.question,
          answer: q.answer,
        });
      });
    });
    return out;
  }

  function pickRandomIndex() {
    if (cards.length <= 1) return 0;
    let idx;
    do {
      idx = Math.floor(Math.random() * cards.length);
    } while (idx === lastIndex);
    return idx;
  }

  function hideAnswer() {
    answerWrapEl.classList.add('is-hidden');
  }

  function revealAnswer() {
    answerWrapEl.classList.remove('is-hidden');
  }

  function render(idx) {
    const card = cards[idx];
    if (!card) return;
    lastIndex = idx;
    categoryEl.textContent = card.category;
    questionEl.textContent = card.question;
    answerEl.textContent = card.answer;
    statusEl.textContent = `card ${idx + 1} of ${cards.length}`;
    hideAnswer();
  }

  function showRandom() {
    render(pickRandomIndex());
  }

  async function init() {
    try {
      const res = await fetch('questions.yaml');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const text = await res.text();
      const data = jsyaml.load(text);
      cards = flatten(data);

      if (!cards.length) {
        questionEl.textContent = 'No questions found in questions.yaml.';
        answerEl.textContent = '—';
        return;
      }

      showRandom();
    } catch (err) {
      categoryEl.textContent = 'error';
      questionEl.textContent = `Could not load questions.yaml (${err.message}). Serve this folder over HTTP rather than opening index.html directly.`;
      answerEl.textContent = '—';
    }
  }

  nextBtn.addEventListener('click', showRandom);
  revealBtn.addEventListener('click', revealAnswer);

  init();
})();