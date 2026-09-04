(function () {
  const categoryEl = document.getElementById('category');
  const questionEl = document.getElementById('question');
  const answerEl = document.getElementById('answer');
  const answerWrapEl = document.getElementById('answer-wrap');
  const revealBtn = document.getElementById('reveal-btn');
  const statusEl = document.getElementById('status');
  const nextBtn = document.getElementById('next-btn');
  const filtersBar = document.getElementById('filters-bar');

  let cards = [];
  // categoryEnabled maps category name -> true/false (whether it's in the random pool).
  let categoryEnabled = {};
  let lastCard = null;

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

  function getFilteredCards() {
    return cards.filter((c) => categoryEnabled[c.category]);
  }

  function pickRandomCard(pool) {
    if (!pool.length) return null;
    if (pool.length === 1) return pool[0];
    let card;
    do {
      card = pool[Math.floor(Math.random() * pool.length)];
    } while (card === lastCard);
    return card;
  }

  function hideAnswer() {
    answerWrapEl.classList.add('is-hidden');
  }

  function revealAnswer() {
    answerWrapEl.classList.remove('is-hidden');
  }

  function render(card, poolSize) {
    lastCard = card;
    categoryEl.textContent = card.category;
    questionEl.textContent = card.question;
    answerEl.textContent = card.answer;
    statusEl.textContent = `${poolSize} question${poolSize === 1 ? '' : 's'} in pool`;
    hideAnswer();
  }

  function showRandom() {
    const pool = getFilteredCards();

    if (!pool.length) {
      lastCard = null;
      categoryEl.textContent = 'no categories selected';
      questionEl.textContent = 'Enable at least one category above to draw a question.';
      answerEl.textContent = '—';
      statusEl.textContent = '0 questions in pool';
      hideAnswer();
      return;
    }

    render(pickRandomCard(pool), pool.length);
  }

  // Builds one checkbox per category so the user can include/exclude it from the random pool.
  function buildFilters(categoryNames) {
    filtersBar.innerHTML = '';

    categoryNames.forEach((name) => {
      const group = document.createElement('label');
      group.className = 'filter-group';
      group.htmlFor = `filter-${name}`;

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.className = 'category-filter';
      checkbox.id = `filter-${name}`;
      checkbox.checked = true;

      const text = document.createElement('span');
      text.className = 'filter-label';
      text.textContent = name;

      checkbox.addEventListener('change', () => {
        categoryEnabled[name] = checkbox.checked;
        showRandom();
      });

      group.appendChild(checkbox);
      group.appendChild(text);
      filtersBar.appendChild(group);
    });
  }

  async function init() {
    try {
      const res = await fetch('https://raw.githubusercontent.com/ViniciusPilan/flash-cards/refs/heads/main/questions.yaml');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const text = await res.text();
      const data = jsyaml.load(text);
      cards = flatten(data);

      if (!cards.length) {
        questionEl.textContent = 'No questions found in questions.yaml.';
        answerEl.textContent = '—';
        return;
      }

      const categoryNames = [...new Set(cards.map((c) => c.category))];
      categoryNames.forEach((name) => { categoryEnabled[name] = true; });
      buildFilters(categoryNames);

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