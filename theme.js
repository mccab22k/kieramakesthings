const themeToggle = document.querySelector('.theme-toggle');
const savedTheme = localStorage.getItem('kmt-theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

function setTheme(theme) {
  const isDark = theme === 'dark';
  document.body.classList.toggle('dark', isDark);

  if (themeToggle) {
    themeToggle.textContent = isDark ? 'Light' : 'Dark';
    themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    themeToggle.setAttribute('aria-pressed', String(isDark));
  }
}

setTheme(savedTheme || (prefersDark ? 'dark' : 'light'));

themeToggle?.addEventListener('click', () => {
  const nextTheme = document.body.classList.contains('dark') ? 'light' : 'dark';
  localStorage.setItem('kmt-theme', nextTheme);
  setTheme(nextTheme);
});

function injectSecuritySystems() {
  const filters = document.querySelector('.project-filters');
  const featuredGrid = document.querySelector('.featured-projects');

  if (!filters || !featuredGrid || document.querySelector('#security-work')) return;

  const securityButton = document.createElement('button');
  securityButton.className = 'filter-button';
  securityButton.type = 'button';
  securityButton.dataset.filter = 'security';
  securityButton.textContent = 'Security Work';

  const wipButton = filters.querySelector('[data-filter="wip"]');
  filters.insertBefore(securityButton, wipButton || filters.querySelector('.filter-note'));

  const filterNote = filters.querySelector('.filter-note');
  if (filterNote) {
    filterNote.textContent = 'Security shows sanitized professional case studies. App Store includes launched, pending, and planned releases.';
  }

  featuredGrid.insertAdjacentHTML('afterend', `
    <div class="section-label" id="security-work">Selected security systems</div>
    <div class="projects-grid">
      <div class="project-card" id="access-governance-system" data-filter-tags="security">
        <div class="status-badge">Production</div>
        <h2 class="project-title">Access Governance Automation</h2>
        <div class="project-meta">Node.js · TypeScript · Slack · Okta · Email security</div>
        <p class="project-hook">Built to make application access easier to request without weakening approval controls.</p>
        <p class="project-description">A self-service platform for configurable approval chains, group-based provisioning, email-security actions, and scheduled access reviews across dozens of applications.</p>
        <div class="project-links">
          <a href="security-systems.html#access-governance" class="project-link">Read Case Study</a>
        </div>
        <details class="why-made">
          <summary>What It Demonstrates</summary>
          <p>End-to-end ownership of an internal security product: workflow design, API integrations, identity provisioning, safe write controls, configuration architecture, and operational support.</p>
        </details>
      </div>

      <div class="project-card" id="identity-lifecycle-system" data-filter-tags="security">
        <div class="status-badge">Live Automation</div>
        <h2 class="project-title">Identity Lifecycle Controls</h2>
        <div class="project-meta">Google Apps Script · Admin SDK · Okta · Slack</div>
        <p class="project-hook">Built so onboarding and offboarding do not depend on someone remembering every account transition.</p>
        <p class="project-description">An idempotent account-lifecycle state machine with protected-account exclusions, group cleanup, audit logs, and independent read-only reconciliation across systems.</p>
        <div class="project-links">
          <a href="security-systems.html#identity-lifecycle" class="project-link">Read Case Study</a>
        </div>
        <details class="why-made">
          <summary>What It Demonstrates</summary>
          <p>Identity architecture, lifecycle automation, least-privilege service design, cross-system consistency checks, exception handling, and observable scheduled operations.</p>
        </details>
      </div>

      <div class="project-card" id="workspace-admin-system" data-filter-tags="security">
        <div class="status-badge">Internal App</div>
        <h2 class="project-title">Google Workspace Admin Platform</h2>
        <div class="project-meta">Python · Flask · Gmail and Directory APIs · PyInstaller</div>
        <p class="project-hook">Built to make bulk administration safer, reviewable, and usable by authorized operators.</p>
        <p class="project-description">A packaged administration application with preview-before-apply workflows, directory data-quality checks, device-restricted access, and centralized audit logging.</p>
        <div class="project-links">
          <a href="security-systems.html#workspace-admin" class="project-link">Read Case Study</a>
        </div>
        <details class="why-made">
          <summary>What It Demonstrates</summary>
          <p>Secure internal application development, domain-wide delegated API access, bulk-operation safeguards, local packaging, configuration separation, and auditability.</p>
        </details>
      </div>
    </div>
  `);
}

function updateCatflakesLaunchStatus() {
  const card = document.querySelector('#catflakes');
  if (!card) return;

  const appStoreUrl = 'https://apps.apple.com/us/app/catflakes/id6795675453';
  card.dataset.filterTags = 'live app-store';

  const status = card.querySelector('.status-badge');
  if (status) status.textContent = 'Live';

  const meta = card.querySelector('.project-meta');
  if (meta) meta.textContent = 'Canvas animation · App Store · iOS + web';

  const description = card.querySelector('.project-description');
  if (description) {
    description.textContent = 'A playful iOS and web app for falling radial cat snowflakes with wind, density, speed, and built-in cat controls.';
  }

  const pendingBadge = card.querySelector('.app-store-badge');
  if (pendingBadge && pendingBadge.tagName !== 'A') {
    const liveBadge = document.createElement('a');
    liveBadge.className = pendingBadge.className;
    liveBadge.href = appStoreUrl;
    liveBadge.setAttribute('aria-label', 'Catflakes on the App Store');
    liveBadge.title = 'Download on the App Store';
    liveBadge.innerHTML = pendingBadge.innerHTML;
    pendingBadge.replaceWith(liveBadge);
  }

  const links = card.querySelector('.project-links');
  if (links && !links.querySelector(`[href="${appStoreUrl}"]`)) {
    const appStoreLink = document.createElement('a');
    appStoreLink.href = appStoreUrl;
    appStoreLink.className = 'project-link';
    appStoreLink.textContent = 'App Store';
    links.prepend(appStoreLink);
  }

  const functionalAppsLabel = Array.from(document.querySelectorAll('.section-label'))
    .find((label) => label.textContent.trim() === 'Functional Apps');
  const functionalAppsGrid = functionalAppsLabel?.nextElementSibling;

  if (functionalAppsGrid?.classList.contains('projects-grid')) {
    functionalAppsGrid.append(card);
  }
}

injectSecuritySystems();
updateCatflakesLaunchStatus();

const filterButtons = document.querySelectorAll('.filter-button');
const projectCards = document.querySelectorAll('.project-card');
const projectGrids = document.querySelectorAll('.projects-grid');
let highlightTimer;

function highlightProjectCard(card) {
  if (!card) return;

  clearTimeout(highlightTimer);
  projectCards.forEach((currentCard) => currentCard.classList.remove('is-highlighted'));

  card.classList.remove('is-hidden');
  card.closest('.projects-grid')?.classList.remove('is-hidden');
  card.closest('.projects-grid')?.previousElementSibling?.classList.remove('is-hidden');
  card.scrollIntoView({ behavior: 'smooth', block: 'center' });
  card.classList.add('is-highlighted');

  highlightTimer = setTimeout(() => {
    card.classList.remove('is-highlighted');
  }, 3600);
}

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

document.querySelectorAll('.project-jump-link').forEach((link) => {
  link.addEventListener('click', (event) => {
    const targetId = link.getAttribute('href');
    const targetCard = document.querySelector(targetId);

    if (!targetCard) return;

    event.preventDefault();
    history.pushState(null, '', targetId);
    highlightProjectCard(targetCard);
  });
});

if (window.location.hash) {
  window.addEventListener('load', () => {
    highlightProjectCard(document.querySelector(window.location.hash));
  });
}
