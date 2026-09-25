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

  const personalSecurityButton = document.createElement('button');
  personalSecurityButton.className = 'filter-button';
  personalSecurityButton.type = 'button';
  personalSecurityButton.dataset.filter = 'personal-security';
  personalSecurityButton.textContent = 'Securing Yourself';
  filters.insertBefore(personalSecurityButton, wipButton || filters.querySelector('.filter-note'));

  const funButton = document.createElement('button');
  funButton.className = 'filter-button';
  funButton.type = 'button';
  funButton.dataset.filter = 'fun';
  funButton.textContent = 'Fun Projects';
  filters.insertBefore(funButton, wipButton || filters.querySelector('.filter-note'));

  const filterNote = filters.querySelector('.filter-note');
  if (filterNote) {
    filterNote.textContent = 'Security shows sanitized professional case studies. App Store includes launched, pending, and planned releases.';
  }

  featuredGrid.insertAdjacentHTML('afterend', `
    <div class="section-label" id="security-work">Selected security systems · <a href="securing-yourself.html">Consumer security? Go to Securing Yourself →</a></div>
    <div class="projects-grid security-grid">
      <div class="project-card" id="access-governance-system" data-filter-tags="security" data-security-preview="project">
        <div class="status-badge">Production</div>
        <h2 class="project-title">Access Governance Automation</h2>
        <div class="project-meta">Node.js · TypeScript · Slack · Okta · Email security</div>
        <p class="project-hook">I built a Slack-based system for requesting and approving access across dozens of applications.</p>
        <p class="project-description">It handles different approval paths, provisions approved access, and keeps an audit trail without turning every request into a security ticket.</p>
        <div class="project-links">
          <a href="security-systems.html#access-governance" class="project-link">Read Case Study</a>
        </div>
        <details class="why-made" open>
          <summary>What It Demonstrates</summary>
          <p>Workflow design, API integration, identity provisioning, safe write controls, and end-to-end ownership of an internal security product.</p>
        </details>
      </div>

      <div class="project-card" id="workspace-gam-automation" data-filter-tags="security" data-security-preview="project">
        <div class="status-badge">Live Automation</div>
        <h2 class="project-title">Google Workspace / GAM Automation</h2>
        <div class="project-meta">Google Workspace · GAM · Apps Script · TypeScript</div>
        <p class="project-hook">I automate the repetitive parts of Google Workspace administration without hiding what the automation is about to change.</p>
        <p class="project-description">The work spans account lifecycle controls, directory cleanup, group management, and connected email-security systems, with dry runs and human review around destructive actions.</p>
        <div class="project-links">
          <a href="security-systems.html#account-lifecycle" class="project-link">See GAM Work</a>
        </div>
        <details class="why-made" open>
          <summary>What It Demonstrates</summary>
          <p>Practical identity administration, idempotent automation, protected-account handling, and tools designed to be inspected before they write.</p>
        </details>
      </div>

      <div class="project-card security-more-card" id="security-projects-more" data-security-cta="true">
        <div class="status-badge">More Security Work</div>
        <h2 class="project-title">See other security projects</h2>
        <div class="project-meta">The rest of the systems behind the work</div>
        <p class="project-hook">Employee Onboarding Platform · Account Lifecycle Automation · Deactivation Reconciliation · Proofpoint Directory Sync · Endpoint Security Automation · Vendor Assurance System of Record</p>
        <div class="project-links">
          <a href="#security-work" class="project-link" data-filter-jump="security">Show all Security Work</a>
        </div>
      </div>

      <div class="project-card" id="employee-onboarding-system" data-filter-tags="security" data-security-detail="true">
        <div class="status-badge">Internal Platform</div>
        <h2 class="project-title">Employee Onboarding Platform</h2>
        <div class="project-meta">TypeScript · Slack · Google Workspace · Shared engine</div>
        <p class="project-hook">Onboarding touched enough systems that copying the same logic between scripts stopped making sense.</p>
        <p class="project-description">I turned it into a shared engine with dry runs, credential safeguards, device checks, and append-only audit logging.</p>
        <div class="project-links"><a href="security-systems.html#employee-onboarding" class="project-link">Read Case Study</a></div>
      </div>

      <div class="project-card" id="account-lifecycle-system" data-filter-tags="security" data-security-detail="true">
        <div class="status-badge">Live Automation</div>
        <h2 class="project-title">Account Lifecycle Automation</h2>
        <div class="project-meta">Google Apps Script · Admin SDK · Scheduled controls</div>
        <p class="project-hook">A state-based workflow moves accounts through onboarding, first sign-in, and departure.</p>
        <p class="project-description">It reduces manual cleanup while keeping destructive actions visible and controlled.</p>
        <div class="project-links"><a href="security-systems.html#account-lifecycle" class="project-link">Read Case Study</a></div>
      </div>

      <div class="project-card" id="deactivation-reconciliation-system" data-filter-tags="security" data-security-detail="true">
        <div class="status-badge">Detective Control</div>
        <h2 class="project-title">Deactivation Reconciliation</h2>
        <div class="project-meta">Okta · Google Workspace · Slack · Read-only</div>
        <p class="project-hook">Automation can fail quietly, so I compare deactivated accounts across identity, email, and collaboration systems.</p>
        <p class="project-description">The control reports discrepancies without trying to “helpfully” modify anything.</p>
        <div class="project-links"><a href="security-systems.html#deactivation-reconciliation" class="project-link">Read Case Study</a></div>
      </div>

      <div class="project-card" id="proofpoint-directory-sync-system" data-filter-tags="security" data-security-detail="true">
        <div class="status-badge">Live Automation</div>
        <h2 class="project-title">Proofpoint Directory Sync</h2>
        <div class="project-meta">Proofpoint · Google Workspace · Apps Script · TypeScript</div>
        <p class="project-hook">This automation keeps directory information synchronized with Proofpoint.</p>
        <p class="project-description">Safe changes are additive and reversible; onboarding and offboarding actions remain human-reviewed.</p>
        <div class="project-links"><a href="security-systems.html#proofpoint-directory-sync" class="project-link">Read Case Study</a></div>
      </div>

      <div class="project-card" id="endpoint-security-system" data-filter-tags="security" data-security-detail="true">
        <div class="status-badge">Fleet Automation</div>
        <h2 class="project-title">Endpoint Security Automation</h2>
        <div class="project-meta">CrowdStrike · Device management · Reconciliation</div>
        <p class="project-hook">I worked across endpoint and device-management data to find unhealthy installations and mismatched records.</p>
        <p class="project-description">More than 100 records were corrected without misplacing a device.</p>
        <div class="project-links"><a href="security-systems.html#endpoint-security" class="project-link">Read Case Study</a></div>
      </div>

      <div class="project-card" id="vendor-assurance-system" data-filter-tags="security" data-security-detail="true">
        <div class="status-badge">System Design</div>
        <h2 class="project-title">Vendor Assurance System of Record</h2>
        <div class="project-meta">Notion · Vendor inventory · Agreement tracking</div>
        <p class="project-hook">A reconciliation uncovered that vendor and agreement records were living in too many places.</p>
        <p class="project-description">I designed a normalized system that keeps the source record, review status, and compliance views connected.</p>
        <div class="project-links"><a href="security-systems.html#vendor-assurance" class="project-link">Read Case Study</a></div>
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
  card.dataset.filterTags = 'live app-store fun';

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

function injectFunProjects() {
  const personalityCard = document.querySelector('#personality-systems-research');
  if (personalityCard) {
    const tags = new Set((personalityCard.dataset.filterTags || '').split(' ').filter(Boolean));
    tags.add('fun');
    personalityCard.dataset.filterTags = Array.from(tags).join(' ');
  }

  const catflakesCard = document.querySelector('#catflakes');
  if (catflakesCard) {
    const tags = new Set((catflakesCard.dataset.filterTags || '').split(' ').filter(Boolean));
    tags.add('fun');
    catflakesCard.dataset.filterTags = Array.from(tags).join(' ');
  }

  if (document.querySelector('#nyc-trolley-problem')) return;

  const prototypesLabel = Array.from(document.querySelectorAll('.section-label'))
    .find((label) => label.textContent.trim() === 'Prototypes');
  const prototypesGrid = prototypesLabel?.nextElementSibling;
  if (!prototypesGrid?.classList.contains('projects-grid')) return;

  prototypesGrid.insertAdjacentHTML('afterbegin', `
    <div class="project-card" id="nyc-trolley-problem" data-filter-tags="wip fun">
      <div class="status-badge">Concept</div>
      <h2 class="project-title">The NYC Trolley Problem</h2>
      <div class="project-meta">NYC culture · Transit · Swipe game</div>
      <p class="project-hook">New Yorkers already have strong opinions about stations, neighborhoods, transit modes, public art, and pigeons. This turns those arguments into a deliberately impossible series of binary choices.</p>
      <p class="project-description">A Tinder-style swipe game that starts in hyper-niche transit mode — stations, subway lines, ferries, buses, and service patterns — before expanding into increasingly specific NYC cultural dilemmas.</p>
      <div class="project-links">
        <a href="https://mccab22k.github.io/nyc-trolley-problem/" class="project-link">Play Game</a>
        <a href="https://github.com/mccab22k/nyc-trolley-problem" class="project-link">GitHub</a>
      </div>
      <details class="why-made" open>
        <summary>Why I Made This</summary>
        <p>I wanted a New York version of the trolley problem that feels local enough to reward people who actually know the city.</p>
        <p>The first mode is transit-heavy: players choose between stations, lines, buses, ferries, and other pieces of the system. Later rounds move into neighborhood and cultural matchups such as Koreatown versus Chinatown, DUMBO versus Gramercy, Keith Haring versus other New York iconography, and one giant pigeon versus all ordinary pigeons.</p>
        <p>The interaction is intentionally simple: swipe left or right, then see how everyone else voted.</p>
      </details>
    </div>
  `);
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

function injectFeaturedNoMoreDataBrokers() {
  const featuredGrid = document.querySelector('.featured-projects');
  if (!featuredGrid || document.querySelector('#no-more-data-brokers-featured')) return;

  featuredGrid.insertAdjacentHTML('beforeend', `
    <div class="project-card featured featured-privacy" id="no-more-data-brokers-featured" data-filter-tags="live security personal-security">
      <div>
        <div class="status-badge">Live · Personal Security · v1</div>
        <h2 class="project-title">No More Data Brokers</h2>
        <div class="project-meta">Privacy · Open source · Local-only</div>
        <p class="project-hook">Privacy rights should not require paying the same industry that profits from personal data. I objected to paying a subscription to remove information that should not have been collected in the first place, so I made the process free and kept the data in the browser.</p>
        <p class="project-description">A free client-side tool for opting out of 28+ data brokers, with prioritized removal links, CCPA/GDPR request templates, and broker-specific re-check tracking. Profile and removal state stay in the browser. No account or backend.</p>
        <div class="project-links">
          <a href="https://mccab22k.github.io/nomoredatabrokers/" class="project-link">Web App</a>
          <a href="https://github.com/mccab22k/nomoredatabrokers" class="project-link">GitHub</a>
          <a href="securing-yourself.html#no-more-data-brokers" class="project-link">Security Notes</a>
        </div>
        <details class="why-made" open>
          <summary>Why I Made This</summary>
          <p>Data brokers collect and sell personal information, while paid removal services can turn that same exposure into a subscription product. I wanted the opt-out process to be understandable, free, and directly usable by the person whose data is involved.</p>
          <p>The privacy constraint is also the technical thesis: the tool is a single self-contained HTML file with no build step or dependencies, and all profile and broker-removal state stays in localStorage rather than being sent to a server.</p>
          <p>Fresh sessions use a fictional profile by default, while confirmed removals surface broker-specific re-check dates because broker profiles can reappear after being re-scraped.</p>
        </details>
      </div>
    </div>
  `);
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
injectFunProjects();
updateTimeSinceLaunchStatus();
updateTimeHereLaunchStatus();
injectFeaturedNoMoreDataBrokers();
applyProjectOrigins();
clarifyPlatformLinks();

const filterButtons = document.querySelectorAll('.filter-button');
const projectCards = document.querySelectorAll('.project-card');
const projectGrids = document.querySelectorAll('.projects-grid');
let highlightTimer;

function projectMatchesFilter(card, selectedFilter) {
  const tags = (card.dataset.filterTags || '').split(' ');
  const isSecurityCta = card.dataset.securityCta === 'true';
  const isSecurityDetail = card.dataset.securityDetail === 'true';

  if (isSecurityCta) return selectedFilter === 'all';
  if (selectedFilter === 'all') return !isSecurityDetail;
  return tags.includes(selectedFilter);
}

function applyProjectFilter(selectedFilter) {
  projectCards.forEach((card) => {
    card.classList.toggle('is-hidden', !projectMatchesFilter(card, selectedFilter));
  });

  projectGrids.forEach((grid) => {
    const hasVisibleCards = Boolean(grid.querySelector('.project-card:not(.is-hidden)'));
    const label = grid.previousElementSibling;

    grid.classList.toggle('is-hidden', !hasVisibleCards);
    if (label && label.classList.contains('section-label')) {
      label.classList.toggle('is-hidden', !hasVisibleCards);
    }
  });
}

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

    applyProjectFilter(selectedFilter);
  });
});

document.querySelectorAll('[data-filter-jump]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const selectedFilter = link.dataset.filterJump;
    const filterButton = Array.from(filterButtons)
      .find((button) => button.dataset.filter === selectedFilter);

    if (!filterButton) return;

    event.preventDefault();
    filterButton.click();
    document.querySelector(link.getAttribute('href'))?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
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

applyProjectFilter('all');
