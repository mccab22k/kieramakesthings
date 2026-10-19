// Within-page project filter (Apps, Lab, All work).
// Filtering only shows/hides items on the current page; it never navigates.
// The choice is mirrored in ?show=… so a filtered view can be shared.
const filterSelect = document.querySelector('[data-project-filter]');

if (filterSelect) {
  const items = Array.from(document.querySelectorAll('[data-tags]'));
  const groups = Array.from(document.querySelectorAll('[data-filter-group]'));
  const status = document.querySelector('[data-filter-status]');

  function matches(item, filter) {
    if (filter === 'all') return true;
    const tags = item.dataset.tags.split(' ');
    // "Live on App Store" also requires a real App Store link, so an app
    // can't appear there just because it was tagged early.
    if (filter === 'app-store') {
      return tags.includes('app-store') &&
        Boolean(item.querySelector('a[href^="https://apps.apple.com/"]'));
    }
    return tags.includes(filter);
  }

  function applyFilter(filter) {
    let shown = 0;
    items.forEach((item) => {
      const visible = matches(item, filter);
      item.hidden = !visible;
      if (visible) shown += 1;
    });

    // Hide a group heading when nothing under it matches.
    groups.forEach((group) => {
      group.hidden = !group.querySelector('[data-tags]:not([hidden])');
    });

    if (status) {
      const label = filterSelect.selectedOptions[0].textContent.trim();
      status.textContent = filter === 'all'
        ? `Showing all ${items.length}.`
        : `Showing ${shown} of ${items.length}: ${label.toLowerCase()}.`;
    }

    const url = new URL(window.location.href);
    if (filter === 'all') url.searchParams.delete('show');
    else url.searchParams.set('show', filter);
    history.replaceState(null, '', url);
  }

  // Restore a shared filter, ignoring unknown values.
  const requested = new URLSearchParams(window.location.search).get('show');
  if (requested && filterSelect.querySelector(`option[value="${CSS.escape(requested)}"]`)) {
    filterSelect.value = requested;
  }

  filterSelect.addEventListener('change', () => applyFilter(filterSelect.value));
  applyFilter(filterSelect.value);

  // A deep link to a hidden card resets the filter so the card is visible.
  function revealHashTarget() {
    const target = document.getElementById(decodeURIComponent(window.location.hash.slice(1)));
    if (target?.closest('[hidden]')) {
      filterSelect.value = 'all';
      applyFilter('all');
      target.scrollIntoView({ block: 'start' });
    }
  }
  revealHashTarget();
  window.addEventListener('hashchange', revealHashTarget);
}
