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

    def test_homepage_security_preview_has_curated_projects_then_cta(self):
        security_markup = SCRIPT.split('class="projects-grid security-grid"', 1)[1]
        security_markup = security_markup.split("`);", 1)[0]
        titles = re.findall(r'class="project-title">([^<]+)', security_markup)
        self.assertEqual(
            titles[:3],
            [
                "Access Governance Automation",
                "Google Workspace / GAM Automation",
                "See other security projects",
            ],
        )
        self.assertEqual(security_markup.count('data-security-preview="project"'), 2)
        self.assertIn('data-security-cta="true"', security_markup)
        self.assertIn('data-filter-jump="security"', security_markup)

    def test_no_more_data_brokers_is_one_full_featured_card(self):
        self.assertEqual(SCRIPT.count('>No More Data Brokers</h2>'), 1)
        self.assertNotIn('id="security-no-more-data-brokers"', SCRIPT)
        self.assertNotIn('id="no-more-data-brokers"', SCRIPT)
        self.assertNotIn('function injectNoMoreDataBrokers()', SCRIPT)

        featured_start = SCRIPT.index('function injectFeaturedNoMoreDataBrokers()')
        featured = SCRIPT[featured_start:]
        featured = featured.split("`);", 1)[0]
        self.assertIn('class="project-card featured featured-privacy"', featured)
        self.assertIn('data-filter-tags="live security personal-security"', featured)
        self.assertIn('Live · Personal Security · v1', featured)
        self.assertIn('CCPA/GDPR request templates', featured)
        self.assertIn('Profile and removal state stay in the browser.', featured)
        self.assertIn('all profile and broker-removal state stays in localStorage', featured)
        self.assertIn('Fresh sessions use a fictional profile by default', featured)

    def test_security_cta_names_the_projects_hidden_from_the_default_view(self):
        security_markup = SCRIPT.split('class="projects-grid security-grid"', 1)[1]
        security_markup = security_markup.split("`);", 1)[0]
        cta = security_markup.split('id="security-projects-more"', 1)[1]
        cta = cta.split('</div>\n\n      <div class="project-card"', 1)[0]
        remaining_titles = [
            "Employee Onboarding Platform",
            "Account Lifecycle Automation",
            "Deactivation Reconciliation",
            "Proofpoint Directory Sync",
            "Endpoint Security Automation",
            "Vendor Assurance System of Record",
        ]
        for title in remaining_titles:
            self.assertIn(title, cta)

    def test_security_filter_expands_all_professional_projects(self):
        security_markup = SCRIPT.split('class="projects-grid security-grid"', 1)[1]
        security_markup = security_markup.split("`);", 1)[0]
        self.assertEqual(security_markup.count('data-security-detail="true"'), 6)
        self.assertIn("if (isSecurityCta) return selectedFilter === 'all';", SCRIPT)
        self.assertIn("if (selectedFilter === 'all') return !isSecurityDetail;", SCRIPT)
        self.assertIn("filterButton.click();", SCRIPT)

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

    def test_hidden_filter_state_overrides_featured_card_layout(self):
        self.assertRegex(
            STYLES,
            r"\.projects-grid\s+\.project-card\.is-hidden\s*\{\s*display:\s*none",
        )

    def test_full_security_page_retains_all_professional_case_studies(self):
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
            self.assertIn(f'id="{anchor}"', security_page)


if __name__ == "__main__":
    unittest.main()
