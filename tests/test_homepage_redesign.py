import re
import unittest
from html.parser import HTMLParser
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
INDEX = (ROOT / "index.html").read_text(encoding="utf-8")
STYLES = (ROOT / "styles.css").read_text(encoding="utf-8")
SCRIPT = (ROOT / "theme.js").read_text(encoding="utf-8")
SUPPORTING_PAGES = [
    (ROOT / "timeheretimethere.html").read_text(encoding="utf-8"),
    (ROOT / "security-systems.html").read_text(encoding="utf-8"),
]


class DetailsParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.why_details = []

    def handle_starttag(self, tag, attrs):
        if tag != "details":
            return
        values = dict(attrs)
        if "why-made" in values.get("class", "").split():
            self.why_details.append(values)


class HomepageRedesignTests(unittest.TestCase):
    def test_homepage_uses_approved_editorial_notebook_header(self):
        self.assertIn('class="hero-shell"', INDEX)
        self.assertIn('class="working-principle"', INDEX)
        self.assertIn(
            "If I need a tool, I should just make it. Privacy for all.",
            INDEX,
        )
        self.assertNotRegex(INDEX, r"<h1>[^<]*<br")

    def test_every_static_why_section_is_expanded_by_default(self):
        parser = DetailsParser()
        parser.feed(INDEX)
        self.assertGreater(len(parser.why_details), 0)
        self.assertTrue(all("open" in attrs for attrs in parser.why_details))

    def test_dynamically_injected_why_sections_are_open(self):
        dynamic_details = re.findall(r"<details class=\"why-made\"([^>]*)>", SCRIPT)
        self.assertGreater(len(dynamic_details), 0)
        self.assertTrue(all("open" in attrs for attrs in dynamic_details))

    def test_orbit_remains_the_featured_project(self):
        self.assertNotIn("arrangeFeaturedProjects();", SCRIPT)
        self.assertIn('id="orbit"', INDEX)
        self.assertIn('class="project-card featured featured-orbit"', INDEX)

    def test_colony_cat_card_has_presentation_embed_slot(self):
        colony_start = INDEX.index('id="colony-cat-management"')
        colony_end = INDEX.index('id="personality-systems-research"')
        colony = INDEX[colony_start:colony_end]
        self.assertIn('class="presentation-embed"', colony)
        self.assertIn("Cat Recognition for TNR", colony)

    def test_visual_system_uses_green_cli_accent_and_square_editorial_rows(self):
        self.assertRegex(STYLES, r"--accent:\s*#0[0-9A-Fa-f]{5}")
        self.assertIn("grid-template-columns: 1fr", STYLES)
        project_card = re.search(r"\.project-card\s*\{(?P<body>.*?)\}", STYLES, re.S)
        self.assertIsNotNone(project_card)
        self.assertNotIn("border-radius", project_card.group("body"))

    def test_shared_assets_are_versioned_to_prevent_stale_deployments(self):
        for page in [INDEX, *SUPPORTING_PAGES]:
            self.assertRegex(page, r'href="styles\.css\?v=[a-z0-9-]+"')
            self.assertRegex(page, r'src="theme\.js\?v=[a-z0-9-]+"')

    def test_security_filter_has_eight_distinct_system_cards(self):
        titles = [
            "Access Governance Automation",
            "Employee Onboarding Platform",
            "Account Lifecycle Automation",
            "Deactivation Reconciliation",
            "Proofpoint Directory Sync",
            "Google Workspace Directory Manager",
            "Endpoint Security Automation",
            "Vendor Assurance System of Record",
        ]
        security_markup = SCRIPT.split('class="projects-grid security-grid"', 1)[1]
        security_markup = security_markup.split("`);", 1)[0]
        self.assertEqual(security_markup.count('data-filter-tags="security"'), 8)
        for title in titles:
            self.assertIn(title, security_markup)

    def test_security_grid_is_two_columns_and_collapses_on_mobile(self):
        self.assertRegex(
            STYLES,
            r"\.projects-grid\.security-grid\s*\{[^}]*grid-template-columns:\s*repeat\(2,\s*minmax\(0,\s*1fr\)\)",
        )
        mobile = STYLES.split("@media (max-width: 780px)", 1)[1]
        self.assertRegex(
            mobile,
            r"\.projects-grid\.security-grid\s*\{[^}]*grid-template-columns:\s*1fr",
        )

    def test_each_security_card_links_to_a_matching_case_study(self):
        security_page = SUPPORTING_PAGES[1]
        anchors = [
            "access-governance",
            "employee-onboarding",
            "account-lifecycle",
            "deactivation-reconciliation",
            "proofpoint-directory-sync",
            "workspace-directory-manager",
            "endpoint-security",
            "vendor-assurance",
        ]
        for anchor in anchors:
            self.assertIn(f'security-systems.html#{anchor}', SCRIPT)
            self.assertIn(f'id="{anchor}"', security_page)


if __name__ == "__main__":
    unittest.main()
