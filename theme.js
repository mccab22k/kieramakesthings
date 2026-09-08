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
    <div class="projects-grid security-grid">
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

function injectAppleDeveloperLink() {
  const topbarActions = document.querySelector('.topbar-actions');
  if (!topbarActions || topbarActions.querySelector('[data-apple-developer-link]')) return;

  const developerLink = document.createElement('a');
  developerLink.href = 'https://apps.apple.com/us/developer/kiera-mccabe/id6776764761';
  developerLink.textContent = 'iOS Apps';
  developerLink.dataset.appleDeveloperLink = 'true';
  developerLink.setAttribute('aria-label', 'Kiera McCabe on the App Store');

  const githubLink = Array.from(topbarActions.querySelectorAll('a'))
    .find((link) => link.textContent.trim() === 'GitHub');
  topbarActions.insertBefore(developerLink, githubLink || null);
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
    appStoreLink.textContent = 'iOS App Store';
    links.prepend(appStoreLink);
  }

  const functionalAppsLabel = Array.from(document.querySelectorAll('.section-label'))
    .find((label) => label.textContent.trim() === 'Functional Apps');
  const functionalAppsGrid = functionalAppsLabel?.nextElementSibling;

  if (functionalAppsGrid?.classList.contains('projects-grid')) {
    functionalAppsGrid.append(card);
  }
}

function updateTimeSinceLaunchStatus() {
  const card = document.querySelector('#time-since');
  if (!card) return;

  const appStoreUrl = 'https://apps.apple.com/us/app/time-since-chore-reminder/id6795689073';
  card.dataset.filterTags = 'live app-store';

  const status = card.querySelector('.status-badge');
  if (status) status.textContent = 'Live';

  const meta = card.querySelector('.project-meta');
  if (meta) meta.textContent = 'Productivity · App Store · iOS + web';

  const pendingBadge = card.querySelector('.app-store-badge');
  if (pendingBadge && pendingBadge.tagName !== 'A') {
    const liveBadge = document.createElement('a');
    liveBadge.className = pendingBadge.className;
    liveBadge.href = appStoreUrl;
    liveBadge.setAttribute('aria-label', 'Time Since Chore Reminder on the App Store');
    liveBadge.title = 'Download on the App Store';
    liveBadge.innerHTML = pendingBadge.innerHTML;
    pendingBadge.replaceWith(liveBadge);
  }

  const links = card.querySelector('.project-links');
  if (links && !links.querySelector(`[href="${appStoreUrl}"]`)) {
    const appStoreLink = document.createElement('a');
    appStoreLink.href = appStoreUrl;
    appStoreLink.className = 'project-link';
    appStoreLink.textContent = 'iOS App Store';
    links.prepend(appStoreLink);
  }
}

function updateTimeHereLaunchStatus() {
  const card = document.querySelector('#time-here-time-there');
  if (!card) return;

  const appStoreUrl = 'https://apps.apple.com/us/app/time-here-time-there/id6796821781';
  card.dataset.filterTags = 'live app-store';

  const status = card.querySelector('.status-badge');
  if (status) status.textContent = 'Live';

  const meta = card.querySelector('.project-meta');
  if (meta) meta.textContent = 'Time zones · App Store · iOS + web';

  const pendingBadge = card.querySelector('.app-store-badge');
  if (pendingBadge && pendingBadge.tagName !== 'A') {
    const liveBadge = document.createElement('a');
    liveBadge.className = pendingBadge.className;
    liveBadge.href = appStoreUrl;
    liveBadge.setAttribute('aria-label', 'Time Here, Time There on the App Store');
    liveBadge.title = 'Download on the App Store';
    liveBadge.innerHTML = pendingBadge.innerHTML;
    pendingBadge.replaceWith(liveBadge);
  }

  const links = card.querySelector('.project-links');
  if (links && !links.querySelector(`[href="${appStoreUrl}"]`)) {
    const appStoreLink = document.createElement('a');
    appStoreLink.href = appStoreUrl;
    appStoreLink.className = 'project-link';
    appStoreLink.textContent = 'iOS App Store';
    links.prepend(appStoreLink);
  }
}

function injectNoMoreDataBrokers() {
  if (document.querySelector('#no-more-data-brokers')) return;

  const functionalAppsLabel = Array.from(document.querySelectorAll('.section-label'))
    .find((label) => label.textContent.trim() === 'Functional Apps');
  const functionalAppsGrid = functionalAppsLabel?.nextElementSibling;

  if (!functionalAppsGrid?.classList.contains('projects-grid')) return;

  functionalAppsGrid.insertAdjacentHTML('afterbegin', `
    <div class="project-card" id="no-more-data-brokers" data-filter-tags="live">
      <div class="status-badge">Live · v1</div>
      <h2 class="project-title">No More Data Brokers</h2>
      <div class="project-meta">Privacy · Open source · Local-only</div>
      <p class="project-hook">Built because privacy rights should not require paying the same industry that profits from personal data.</p>
      <p class="project-description">A free client-side tool for opting out of 28+ data brokers, with prioritized removal links, CCPA/GDPR request templates, and broker-specific re-check tracking. No account or backend.</p>
      <div class="project-links">
        <a href="https://mccab22k.github.io/nomoredatabrokers/" class="project-link">Web App</a>
        <a href="https://github.com/mccab22k/nomoredatabrokers" class="project-link">GitHub</a>
      </div>
      <details class="why-made">
        <summary>Why I Made This</summary>
        <p>Data brokers collect and sell personal information, while paid removal services can turn that same exposure into a subscription product. I wanted the opt-out process to be understandable, free, and directly usable by the person whose data is involved.</p>
        <p>The privacy constraint is also the technical thesis: the tool is a single self-contained HTML file with no build step or dependencies, and all profile and broker-removal state stays in localStorage rather than being sent to a server.</p>
        <p>Fresh sessions use a fictional profile by default, while confirmed removals surface broker-specific re-check dates because broker profiles can reappear after being re-scraped.</p>
      </details>
    </div>
  `);
}

function arrangeFeaturedProjects() {
  const featuredGrid = document.querySelector('.featured-projects');
  const functionalAppsLabel = Array.from(document.querySelectorAll('.section-label'))
    .find((label) => label.textContent.trim() === 'Functional Apps');
  const functionalAppsGrid = functionalAppsLabel?.nextElementSibling;
  const timeSince = document.querySelector('#time-since');
  const noMoreDataBrokers = document.querySelector('#no-more-data-brokers');
  const orbit = document.querySelector('#orbit');

  if (!featuredGrid || !functionalAppsGrid || !timeSince || !noMoreDataBrokers) return;

  const featuredLabel = featuredGrid.previousElementSibling;
  if (featuredLabel?.classList.contains('section-label')) {
    featuredLabel.textContent = 'Featured projects';
  }

  if (orbit) {
    orbit.classList.remove('featured', 'featured-orbit');
    orbit.querySelector('.preview-orbit')?.remove();
    functionalAppsGrid.append(orbit);
  }

  timeSince.classList.add('portfolio-highlight');
  noMoreDataBrokers.classList.add('portfolio-highlight');
  featuredGrid.append(timeSince, noMoreDataBrokers);

  const style = document.createElement('style');
  style.textContent = `
    .featured-projects {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      align-items: stretch;
    }
    .featured-projects .portfolio-highlight {
      min-height: 360px;
      border-color: var(--copper);
      box-shadow: 0 12px 30px rgba(35, 38, 43, .08);
    }
    body.dark .featured-projects .portfolio-highlight {
      box-shadow: 0 12px 30px rgba(0, 0, 0, .22);
    }
    @media (max-width: 900px) {
      .featured-projects { grid-template-columns: 1fr; }
    }
  `;
  document.head.append(style);
}

function clarifyPlatformLinks() {
  document.querySelectorAll('.project-link').forEach((link) => {
    const label = link.textContent.trim();
    if (label === 'Launch App') link.textContent = 'Web App';
    if (label === 'App Store') link.textContent = 'iOS App Store';
  });

  const developerLink = document.querySelector('[data-apple-developer-link]');
  if (developerLink) developerLink.textContent = 'iOS Apps';
}

function applyProjectOrigins() {
  const origins = {
    '#orbit': 'Started 2025 - November origin - iOS + web',
    '#passport-buddy': 'Started January 2020 - Ongoing travel planning',
    '#time-here-time-there': 'Started 2021 - Ongoing timezone coordination',
    '#time-since': 'Started December 2024 - iOS + web',
    '#catflakes': 'Started 2018 - Java to iOS',
    '#colony-cat-management': 'Graduate-school era - Computer vision - TNR',
  };

  Object.entries(origins).forEach(([selector, text]) => {
    const card = document.querySelector(selector);
    const meta = card?.querySelector('.project-meta');
    if (meta) meta.textContent = text;
  });
}

injectSecuritySystems();
injectAppleDeveloperLink();
updateCatflakesLaunchStatus();
updateTimeSinceLaunchStatus();
updateTimeHereLaunchStatus();
injectNoMoreDataBrokers();
arrangeFeaturedProjects();
applyProjectOrigins();
clarifyPlatformLinks();

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
