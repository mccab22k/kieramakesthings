// Site-wide behavior shared by every page:
//   1. light/dark theme toggle (remembered per browser)
//   2. mobile Menu button for the global page navigation
//   3. redirects for old homepage deep links (/#passport-buddy, etc.)
// Page content is static HTML; this file never injects projects.

// ---- 1. Theme -------------------------------------------------------------
const themeToggle = document.querySelector('.theme-toggle');

// localStorage can throw in private windows; fall back to the OS preference.
function readSavedTheme() {
  try { return localStorage.getItem('kmt-theme'); } catch { return null; }
}

function setTheme(theme) {
  const isDark = theme === 'dark';
  document.body.classList.toggle('dark', isDark);

  if (themeToggle) {
    themeToggle.textContent = isDark ? 'Light' : 'Dark';
    themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    themeToggle.setAttribute('aria-pressed', String(isDark));
  }
}

const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
setTheme(readSavedTheme() || (prefersDark ? 'dark' : 'light'));

themeToggle?.addEventListener('click', () => {
  const nextTheme = document.body.classList.contains('dark') ? 'light' : 'dark';
  try { localStorage.setItem('kmt-theme', nextTheme); } catch { /* not persisted */ }
  setTheme(nextTheme);
});

// ---- 2. Mobile menu -------------------------------------------------------
// CSS only collapses the nav when <html> has the "js" class, so the links
// stay reachable if this script never runs.
const topbar = document.querySelector('.topbar');
const menuToggle = document.querySelector('.menu-toggle');

function setMenu(open) {
  topbar?.classList.toggle('is-open', open);
  menuToggle?.setAttribute('aria-expanded', String(open));
  if (menuToggle) menuToggle.textContent = open ? 'Close' : 'Menu';
}

menuToggle?.addEventListener('click', () => {
  setMenu(!topbar.classList.contains('is-open'));
});

// Escape closes the menu and returns focus to the button.
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && topbar?.classList.contains('is-open')) {
    setMenu(false);
    menuToggle.focus();
  }
});

// On the homepage at menu width, the page links sit below the two doors
// instead of behind the Menu button. The same node is moved (not cloned) so
// the theme toggle keeps its listener; it moves back when the window widens.
const doors = document.querySelector('.doors');
const siteMenu = document.getElementById('site-menu');

if (doors && siteMenu && topbar) {
  const navBelow = document.createElement('nav');
  navBelow.className = 'topbar nav-below';
  navBelow.setAttribute('aria-label', 'Pages');
  const narrow = window.matchMedia('(max-width: 780px)');

  const placeNav = () => {
    if (narrow.matches) {
      setMenu(false);
      navBelow.append(siteMenu);
      doors.after(navBelow);
    } else {
      topbar.append(siteMenu);
      navBelow.remove();
    }
    topbar.classList.toggle('nav-moved', narrow.matches);
  };
  placeNav();
  narrow.addEventListener('change', placeNav);
}

// ---- 3. Old homepage deep links ------------------------------------------
// Projects used to live as cards on the homepage. Their full cards now live
// on a category page, so old links like /#time-since are forwarded there.
const movedHomepageAnchors = {
  'passport-buddy': 'apps.html#passport-buddy',
  'time-here-time-there': 'apps.html#time-here-time-there',
  'time-since': 'apps.html#time-since',
  catflakes: 'apps.html#catflakes',
  'better-nyc-map': 'apps.html#better-nyc-map',
  'rent-stabilized-map': 'apps.html#rent-stabilized-map',
  'pet-sticker-maker': 'apps.html#pet-sticker-maker',
  'nyc-trolley-problem': 'lab.html#nyc-trolley-problem',
  'colony-cat-management': 'lab.html#colony-cat-management',
  'personality-systems-research': 'lab.html#personality-systems-research',
  'wearable-computing': 'lab.html#wearable-computing',
  'research-archive': 'lab.html',
  'raspberry-pi-adguard': 'security-systems.html#raspberry-pi-adguard',
  'access-governance-system': 'security-systems.html#access-governance',
  'workspace-gam-automation': 'security-systems.html#account-lifecycle',
  'employee-onboarding-system': 'security-systems.html#employee-onboarding',
  'account-lifecycle-system': 'security-systems.html#account-lifecycle',
  'deactivation-reconciliation-system': 'security-systems.html#deactivation-reconciliation',
  'proofpoint-directory-sync-system': 'security-systems.html#proofpoint-directory-sync',
  'endpoint-security-system': 'security-systems.html#endpoint-security',
  'vendor-assurance-system': 'security-systems.html#vendor-assurance',
  'security-projects-more': 'security-systems.html',
};

function followMovedAnchor() {
  if (document.body.dataset.page !== 'home') return;
  const hash = decodeURIComponent(window.location.hash.slice(1));
  // Only redirect when the anchor no longer exists on the homepage.
  if (movedHomepageAnchors[hash] && !document.getElementById(hash)) {
    window.location.replace(movedHomepageAnchors[hash]);
  }
}

followMovedAnchor();
window.addEventListener('hashchange', followMovedAnchor);
