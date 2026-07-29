const themeToggle = document.querySelector('.theme-toggle');
const savedTheme = localStorage.getItem('kmt-theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

function setTheme(theme) {
  const isDark = theme === 'dark';
  document.body.classList.toggle('dark', isDark);
  themeToggle.textContent = isDark ? 'Light' : 'Dark';
  themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
  themeToggle.setAttribute('aria-pressed', String(isDark));
}

setTheme(savedTheme || (prefersDark ? 'dark' : 'light'));

themeToggle.addEventListener('click', () => {
  const nextTheme = document.body.classList.contains('dark') ? 'light' : 'dark';
  localStorage.setItem('kmt-theme', nextTheme);
  setTheme(nextTheme);
});

const filterButtons = document.querySelectorAll('.filter-button');
const projectCards = document.querySelectorAll('.project-card');
const projectGrids = document.querySelectorAll('.projects-grid');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const selectedFilter = button.dataset.filter;

    filterButtons.forEach((currentButton) => {
      currentButton.classList.toggle('active', currentButton === button);
    });

    projectCards.forEach((card) => {
      const tags = (card.dataset.filterTags || '').split(' ');
      const shouldShow = selectedFilter === 'all' || tags.includes(selectedFilter);
      card.classList.toggle('is-hidden', !shouldShow);
    });

    projectGrids.forEach((grid) => {
      const hasVisibleCards = Boolean(grid.querySelector('.project-card:not(.is-hidden)'));
      const label = grid.previousElementSibling;

      grid.classList.toggle('is-hidden', !hasVisibleCards);
      if (label && label.classList.contains('section-label')) {
        label.classList.toggle('is-hidden', !hasVisibleCards);
      }
    });
  });
});
