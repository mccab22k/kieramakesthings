"""Structural tests for the hybrid portfolio (curated home + category pages).

Run with: python3 -m unittest discover tests
"""
import re
import unittest
from html.parser import HTMLParser
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]


def read(name):
    return (ROOT / name).read_text(encoding="utf-8")


INDEX = read("index.html")
APPS = read("apps.html")
LAB = read("lab.html")
WORK = read("work.html")
SECURITY = read("security-systems.html")
STYLES = read("styles.css")
THEME = read("theme.js")
FILTERS = read("filters.js")

# Pages that carry the shared global navigation.
NAV_PAGES = {
    "index.html": INDEX, "apps.html": APPS, "lab.html": LAB, "work.html": WORK,
    "security-systems.html": SECURITY, "personality.html": read("personality.html"),
    "nyu-appsec.html": read("nyu-appsec.html"),
    "pet-sticker-maker-security.html": read("pet-sticker-maker-security.html"),
    "timeheretimethere.html": read("timeheretimethere.html"),
}


class IdCollector(HTMLParser):
    """Collects element ids and <details class="why-made"> attributes."""

    def __init__(self):
        super().__init__()
        self.ids = set()
        self.why_details = []

    def handle_starttag(self, tag, attrs):
        values = dict(attrs)
        if "id" in values:
            self.ids.add(values["id"])
        if tag == "details" and "why-made" in values.get("class", "").split():
            self.why_details.append(values)


def parse(html):
    parser = IdCollector()
    parser.feed(html)
    return parser


class IdentityTests(unittest.TestCase):
    def test_homepage_keeps_editorial_header(self):
        self.assertIn("<h1>Designing Useful Things</h1>", INDEX)
        self.assertIn('class="working-principle"', INDEX)
        self.assertIn("If I need a tool, I should just make it. Privacy for all.", INDEX)

    def test_visual_system_keeps_green_accent_and_square_rows(self):
        self.assertRegex(STYLES, r"--accent:\s*#0[0-9A-Fa-f]{5}")
        project_card = re.search(r"\.project-card\s*\{(?P<body>.*?)\}", STYLES, re.S)
        self.assertNotIn("border-radius", project_card.group("body"))

    def test_shared_assets_are_versioned(self):
        for name, page in NAV_PAGES.items():
            with self.subTest(page=name):
                self.assertRegex(page, r'href="styles\.css\?v=[a-z0-9-]+"')
                self.assertRegex(page, r'src="theme\.js\?v=[a-z0-9-]+"')


class ContentTests(unittest.TestCase):
    def test_project_content_is_static_html_not_injected(self):
        # Content lives in HTML so it works without JS and for link previews.
        for script in (THEME, FILTERS):
            self.assertNotIn("insertAdjacentHTML", script)
            self.assertNotIn("project-title", script)

    def test_featured_projects_are_orbit_and_no_more_data_brokers(self):
        featured = INDEX.split('id="featured"', 1)[1].split('id="security-work"', 1)[0]
        self.assertIn('id="orbit"', featured)
        self.assertIn('id="no-more-data-brokers-featured"', featured)
        self.assertIn("Fresh sessions use a fictional profile by default", featured)

    def test_every_why_section_is_expanded(self):
        for name, page in [("index", INDEX), ("apps", APPS), ("lab", LAB), ("security", SECURITY)]:
            with self.subTest(page=name):
                details = parse(page).why_details
                self.assertGreater(len(details), 0)
                self.assertTrue(all("open" in attrs for attrs in details))

    def test_orbit_copy_matches_between_home_and_apps(self):
        # Orbit appears in full twice; this guards against the copies drifting.
        def why(page):
            card = page.split('id="orbit"', 1)[1].split("</article>", 1)[0]
            return re.findall(r"<p>(.*?)</p>", card.split('class="why-made"', 1)[1])
        self.assertEqual(why(INDEX), why(APPS))

    def test_colony_cat_card_keeps_presentation_embed(self):
        colony = LAB.split('id="colony-cat-management"', 1)[1].split("</article>", 1)[0]
        self.assertIn('class="presentation-embed"', colony)
        self.assertIn("Cat Recognition for TNR", colony)

    def test_private_github_links_are_kept(self):
        self.assertIn("GitHub (Private)", APPS)
        self.assertIn("GitHub (Private)", LAB)


class StatusTests(unittest.TestCase):
    def test_app_store_filter_has_exactly_four_released_apps(self):
        tagged = re.findall(r'<article class="project-card[^"]*" id="([^"]+)" data-n="\d+" data-tags="([^"]*)"', APPS)
        released = {pid for pid, tags in tagged if "app-store" in tags.split()}
        self.assertEqual(released, {"orbit", "time-here-time-there", "time-since", "catflakes"})
        for pid in released:
            card = APPS.split(f'id="{pid}"', 1)[1].split("</article>", 1)[0]
            self.assertIn('href="https://apps.apple.com/', card)
        self.assertIn('<option value="app-store">Live on App Store</option>', APPS)
        self.assertIn("a[href^=\"https://apps.apple.com/\"]", FILTERS)

    def test_no_greyed_out_planned_store_badges(self):
        for page in (INDEX, APPS, LAB):
            self.assertNotIn('<span class="store-badge', page)

    def test_status_vocabulary_is_fixed(self):
        allowed = {"Production", "Live", "Beta", "Prototype", "Paused", "Concept",
                   "Coursework", "Case study"}
        for page in (INDEX, APPS, LAB):
            for status in re.findall(r'class="status-badge" data-status="[^"]+">([^<]+)<', page):
                self.assertIn(status, allowed)


class NavigationTests(unittest.TestCase):
    def test_every_page_has_global_nav_and_skip_link(self):
        for name, page in NAV_PAGES.items():
            with self.subTest(page=name):
                self.assertIn('class="skip-link" href="#content"', page)
                self.assertIn('id="content"', page)
                self.assertIn('class="menu-toggle"', page)
                for href in ("security-systems.html", "apps.html", "lab.html", "work.html", "./#about"):
                    self.assertIn(f'<li><a href="{href}"', page)

    def test_pages_and_filters_are_separate(self):
        # The homepage navigates; only category pages filter, with one select.
        self.assertNotIn("data-project-filter", INDEX)
        for page in (APPS, LAB, WORK):
            self.assertEqual(page.count("data-project-filter"), 1)
            self.assertIn('src="filters.js?v=', page)
        self.assertNotIn("filter-button", STYLES)

    def test_old_homepage_anchors_still_resolve(self):
        home_ids = parse(INDEX).ids
        for old in ("home", "featured", "security-work", "apps", "experiments", "about",
                    "orbit", "no-more-data-brokers-featured"):
            self.assertIn(old, home_ids)

        moved = dict(re.findall(r"'?([\w-]+)'?: '([\w.-]+\.html(?:#[\w-]+)?)'", THEME))
        for old in ("passport-buddy", "time-since", "time-here-time-there", "catflakes",
                    "better-nyc-map", "rent-stabilized-map", "pet-sticker-maker",
                    "nyc-trolley-problem", "colony-cat-management",
                    "personality-systems-research", "wearable-computing",
                    "raspberry-pi-adguard", "access-governance-system",
                    "workspace-gam-automation", "endpoint-security-system",
                    "vendor-assurance-system"):
            with self.subTest(anchor=old):
                self.assertIn(old, moved)
                page, _, anchor = moved[old].partition("#")
                if anchor:
                    self.assertIn(anchor, parse(read(page)).ids)

    def test_security_page_keeps_anchors_and_groups_by_specialty(self):
        ids = parse(SECURITY).ids
        for anchor in ("professional-systems", "access-governance", "employee-onboarding",
                       "account-lifecycle", "deactivation-reconciliation",
                       "proofpoint-directory-sync", "workspace-directory-manager",
                       "endpoint-security", "vendor-assurance", "hands-on-appsec",
                       "personal-security", "no-more-data-brokers", "raspberry-pi-adguard",
                       "identity-access", "email-endpoint", "third-party-risk"):
            self.assertIn(anchor, ids)
        redirect = read("securing-yourself.html")
        self.assertIn("window.location.hash || '#personal-security'", redirect)

    def test_work_index_links_resolve(self):
        for href in re.findall(r'<li class="work-row"[^>]*>\s*<span class="n">\d+</span>\s*<a href="([^"]+)"', WORK):
            page, _, anchor = href.partition("#")
            with self.subTest(href=href):
                self.assertTrue((ROOT / page).exists())
                if anchor:
                    self.assertIn(anchor, parse(read(page)).ids)


if __name__ == "__main__":
    unittest.main()
