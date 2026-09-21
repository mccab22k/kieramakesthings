import re
import unittest
from html.parser import HTMLParser
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
INDEX = (ROOT / "index.html").read_text(encoding="utf-8")
STYLES = (ROOT / "styles.css").read_text(encoding="utf-8")
SCRIPT = (ROOT / "theme.js").read_text(encoding="utf-8")


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
            "If I complain that a tool should exist for long enough, eventually I make it.",
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


if __name__ == "__main__":
    unittest.main()
