# Portfolio Information Architecture — Staging Redesign

Date: 2026-09-09
Branch: `portfolio-staging`

## Goal

Reorganize Kiera Makes Things into three clear layers without replacing the current live homepage during development:

1. A curated home splash that highlights a small set of strongest personal projects.
2. A dedicated professional work page with a much broader security-work portfolio than appears on the home page.
3. A dedicated personal-project directory that preserves the full project archive and existing explanatory material.

The live root site remains unchanged until the staged version is explicitly approved for promotion.

## Staging model

Build the redesign under `/staging/` on the `portfolio-staging` branch:

- `/staging/index.html` — curated home splash
- `/staging/work.html` — professional/security portfolio
- `/staging/projects.html` — complete personal-project directory
- supporting staging CSS/JS as needed, reusing the existing visual system where practical

GitHub Pages on `main` will continue to serve the existing site. The staging branch protects the current production version from accidental replacement while the redesign is reviewed.

## Global design principles

- Preserve the current Kiera Makes Things visual identity: typography, restrained palette, editorial card layout, and dark-mode support.
- Improve information architecture before introducing visual novelty.
- Keep the home page selective; detailed breadth belongs on Work and Projects.
- Avoid duplicate taxonomy. App Store availability is project metadata, not its own portfolio section.
- Preserve existing long-form “Why I Made This” material for personal projects.
- Professional work must distinguish Kiera’s direct ownership from shared/company work.
- Public professional content must be anonymized to protect company information.

## Public-company anonymization rules

Professional case studies may describe technical scope, architecture patterns, tools, and measurable outcomes where safe, but must not expose company-confidential implementation details.

### Remove or generalize

- Company name where unnecessary to demonstrate the work.
- Employee names, emails, office locations, internal groups, approver names, and coworker PII.
- Internal ticket IDs such as IAC/FLT identifiers.
- Internal URLs, domains, repo names, tenant identifiers, workspace identifiers, OU names, and routing rules.
- Exact secrets, API credentials, keys, OAuth/client details, hardware identifiers, or configuration values.
- Vendor-contract details or findings that could expose the employer’s exact PHI/vendor chain.
- Exact internal counts when they materially reveal company size or architecture and are not needed to establish impact.
- Vulnerabilities or authorization gaps described in a way that would expose an active internal weakness.

### Safe public framing

Prefer descriptions such as:

- “healthcare SaaS company” instead of company name where context matters.
- “dozens of SaaS applications” instead of a precise app inventory if exact count is unnecessary.
- “cross-system identity reconciliation” instead of internal directory names.
- “identified an authorization-control gap during architecture review” without publishing an exploitable condition.
- “reconciled more than 100 device records” if a rounded metric conveys impact safely.

Tools that are already public/general technology names—such as Okta, Google Workspace, Slack, CrowdStrike, Mosyle, Datadog, Tailscale, AWS, Python, Node.js, TypeScript, Splunk, Snowflake, Wireshark, Burp Suite, and similar—may be named where they accurately describe Kiera’s experience.

## Home splash

### Purpose

The home page is a concise introduction and curated showcase, not the full portfolio directory.

### Hero

Position Kiera as a cybersecurity engineer and independent builder creating practical tools across security, privacy, travel, civic technology, and everyday utilities.

Primary navigation:

- Work
- Projects
- About or background anchor
- GitHub

### Featured personal projects

The home splash prominently highlights exactly these projects:

1. **No More Data Brokers**
   - Privacy / technology for good
   - Free, open-source self-service data-broker opt-out tool
   - Live web project

2. **Time Since**
   - Everyday tracking / chore and recurrence utility
   - App Store product

3. **Orbit, A Fancy Planner**
   - Visual circular planner
   - App Store + web

4. **Time Here, Time There**
   - Shared time-zone timeline and travel coordination
   - App Store + web

5. **Passport Buddy**
   - Passport-aware travel planning
   - Visa/entry constraints, Schengen considerations, multi-country travel, and different departure airports

6. **Pet Travel Buddy — planned / in development**
   - Companion travel tool for international pet movement
   - Catalogue country-by-country pet import restrictions, vaccination rules, microchip requirements, health certificates, quarantine rules, airline restrictions, expected costs, and preparation timelines

App Store status appears as a badge or metadata on the relevant card; there is no separate App Store-featured section or App Store-only information hierarchy.

### Professional teaser

The home page shows only a compact professional section with approximately three representative security highlights:

- Access Governance Platform
- Onboarding & Identity Platform
- Endpoint Security Automation

These are summaries only, with a clear link to **View all professional work**.

### Explore-more directory links

A compact lower section links into the complete portfolio rather than rendering every project on the homepage:

- Professional Work
- All Personal Projects
- Civic & Privacy
- Apps
- Experiments / Research
- Hardware / Home Lab

## Work page

### Purpose

`work.html` is the recruiter/hiring-manager view. It should demonstrate the full range of Kiera’s security engineering, not only the small set featured on the homepage.

### Top-level positioning

Frame the body of work around the ability to take security problems end-to-end:

- identify gaps
- design controls/architecture
- build software and automation
- integrate APIs/platforms
- deploy with safe defaults
- create auditability and operational monitoring
- reconcile and operate systems over time

### Work filters

Use filters that expose genuine security breadth:

- All
- Security Systems
- IAM / Access
- Endpoint
- Cloud
- Detection / Automation
- AppSec
- Technical Foundation

A project may carry multiple tags.

### Professional systems / work items

Include a broader catalogue than the homepage:

- Access Governance Platform
- Onboarding & Identity Platform
- Identity Lifecycle Automation
- Deactivation Reconciliation
- Access Review Automation
- Email-security / provisioning automation
- Knowledge-system reconciliation automation
- Google Workspace Administration Platform
- Endpoint Security Automation
- Device/security data reconciliation
- Security monitoring integrations
- Managed-device / remote-access architecture
- SAML / SCIM / OIDC integration and troubleshooting
- PAM/security-tool evaluation and architecture work
- Security data / detection automation from prior enterprise work
- Python / SQL / Snowflake security pipelines
- Splunk SOAR automation
- AWS/cloud-security implementation experience

Where several smaller systems are closely related, group them into one case-study family rather than creating a separate oversized card for every script.

### Case-study format

Each work item should use a consistent structure:

- Problem
- What Kiera personally owned / led
- System / approach
- Safety / reliability / governance design
- Outcome or measurable evidence
- Technology stack

Ownership language must follow the Notion attribution model: do not convert shared company artifacts into personal authorship.

### Professional experience section

Provide concise career context for at least:

- Current healthcare SaaS security-engineering role, anonymized publicly while emphasizing Kiera’s directly owned systems and technical leadership.
- Prior enterprise financial-services security experience, including IAM integration, security data automation, Python/SQL pipelines, AWS/Snowflake work, Splunk SOAR, and security analytics.

### NYU Cyber Fellows technical foundation

Include a compact education/technical-foundation section:

- NYU Tandon M.S. Cybersecurity
- 30 graduate credits
- 4.0 GPA

Evidence-backed domains:

- Penetration testing and vulnerability analysis
- Application security
- Cloud security
- Network security
- Applied cryptography
- Mobile security

User-confirmed hands-on tools/techniques:

- Kali Linux
- Metasploit
- Burp Suite
- Nmap
- XSS / SQL injection lab exploitation
- Pentest reporting
- Hack-The-Box-style lab environments
- Code and VM hardening
- AWS / Lambda / IAM
- Wireshark
- Wi-Fi/network security simulated environments
- Encryption concepts
- Bluetooth/mobile-security work

The page must distinguish academic training from professional experience.

## Projects page

### Purpose

`projects.html` is the complete personal-project directory and archive.

### Filters

Use project-domain filters, not product-distribution filters:

- All
- Apps
- Civic
- Privacy
- Travel
- Creative
- Research
- Hardware

App Store availability remains a badge/status within project cards and is not a separate featured/filter structure.

### Content

Preserve and reorganize the existing portfolio content, including:

- No More Data Brokers
- Time Since
- Orbit
- Time Here, Time There
- Passport Buddy
- Pet Travel Buddy (planned)
- Better NYC Map / rent-stabilized apartment tooling
- Catflakes
- Pet Sticker Maker
- Colony Cat Management
- Personality Systems Research / Enneagram work
- Raspberry Pi + AdGuard Home
- Wearable Computing
- other current experiments/prototypes already represented in the repository

Each card should retain, where available:

- short hook
- project description
- status
- stack
- live/app-store/GitHub/read-more links
- expanded “Why I Made This” content

## Reuse and migration

- Reuse existing `styles.css`, `theme.js`, project copy, screenshots, and detail pages wherever practical.
- Avoid rewriting project histories from memory when the current repository already contains the desired wording.
- The staged pages may initially duplicate selected content from the existing root pages; promotion can later consolidate duplicate assets if useful.
- Do not delete or replace the production root pages during staging implementation.

## Testing and review

Before presenting staging as ready for review:

1. Validate all three staged pages load without broken local links.
2. Validate dark-mode behavior.
3. Validate responsive layout at desktop and mobile widths.
4. Validate project/work filters.
5. Confirm the six requested home projects are the only primary personal-project highlights.
6. Confirm App Store projects are not split into a redundant separate featured/filter taxonomy.
7. Audit all public professional copy against the anonymization rules above.
8. Confirm no internal ticket IDs, employee information, internal URLs/domains, credentials, or confidential company-specific implementation detail appears in staging.
9. Confirm the existing production homepage remains unchanged.

## Promotion

Promotion from staging to production is a separate explicit step. Do not replace the existing root homepage or merge the redesign into `main` until Kiera reviews the staged version and approves promotion.
