# Kiera Makes Things

A GitHub Pages homepage for active projects, prototypes, and build notes.

- Splash page: https://mccab22k.github.io/kieramakesthings/
- Source repo: https://github.com/mccab22k/kieramakesthings

## Deployment / External Services

- Hosting: GitHub Pages.
- Source control: GitHub.
- Database: none for this static splash site.
- Analytics: Cloudflare Web Analytics is installed on `index.html`.
- Notes: linked apps may have their own hosting, databases, analytics, and deployment settings. Supabase is documented only where a specific app uses it.

## Recent Updates

### Project Filters

- The homepage includes filters for All, Live, App Store, and Research / WIP.
- Live means active launchable apps.
- App Store means launched, pending, or planned App Store releases.
- The filter also includes apps pending App Store acceptance or planned for submission: Passport Buddy, Time Since, Catflakes, and Time Here, Time There.
- Research / WIP includes prototypes, paused projects, research, concepts, and home lab notes.
- Android releases are planned.

### Pet Sticker Maker Processing

- The project is paused, with the frontend still hosted on GitHub Pages.
- The processing direction now includes a FastAPI sticker-processing service.
- Current processing is documented as CPU-first OpenCV segmentation with an optional model-backed provider path.
- Frontend and backend hosting should be documented together before making the repo public.

### Time Since App

- The app is live on Vercel.
- The project now has both a detail page and notes page linked from the homepage.
- Current goals focus on fast elapsed-time tracking, flexible routine logging, and local-first portability.

### Time Here, Time There

- The app is live on GitHub Pages.
- The matching GitHub repo exists and is currently marked private on the splash page.
- Current goals focus on timezone comparison, timeline scrubbing, and practical scheduling across cities.

### Rent Stabilized Map

- Added as a work-in-progress NYC housing data and mapping project.
- The homepage links only to project notes, not to a live app.
- Current goals focus on public-data exploration, building-level context, and apartment-search decision support.

## Featured

### Orbit, A Fancy Planner

- App Store: https://apps.apple.com/us/app/orbit-a-fancy-planner/id6776764489
- Web app: https://mccab22k.github.io/orbit-a-fancy-planner/
- Repo: https://github.com/mccab22k/orbit-a-fancy-planner
- Project page: orbit.html
- Notes: orbit.md

#### Deployment / External Services

- Hosting: GitHub Pages web app; Apple App Store for iOS distribution.
- Source control: GitHub.
- Database: local-first storage documented in project notes.
- Analytics: not documented in this repo.
- Notes: Google Calendar import is currently browser read-only; sync and native calendar write-back remain roadmap items.

## Live Apps

### Better NYC Map

- App: https://bettermapnyc.vercel.app/
- Repo: https://github.com/mccab22k/bettermapnyc
- Notes: bettermapnyc.md

#### Deployment / External Services

- Hosting: Vercel.
- Source control: GitHub with deployment integration.
- Database: optional Supabase sharing is implemented in the app repo; local-only use still works without accounts.
- Analytics: not documented in this repo.
- Notes: mapping and routing providers may be added as the project evolves.

### Passport Buddy

- App: https://passport-buddy-wheat.vercel.app/
- Repo: https://github.com/mccab22k/passport-buddy
- Notes: travel-buddy.md

#### Deployment / External Services

- Hosting: Vercel.
- Source control: GitHub.
- Database: optional Supabase sharing is implemented in the app repo; local-only use still works without accounts.
- Analytics: not documented in this repo.
- Notes: travel requirements remain planning guidance and should be verified against official sources. App Store submission is pending/planned.

### Time Since

- App: https://timesincechorereminder.vercel.app/
- Repo: https://github.com/mccab22k/timesincechorereminder
- Project page: time-since.html
- Notes: time-since.md

#### Deployment / External Services

- Hosting: Vercel.
- Source control: GitHub with deployment integration.
- Database: browser/app persistence with import/export support.
- Analytics: not documented in this repo.
- Notes: no backend service is documented here. App Store submission is pending/planned.

## Active / Prototype Projects

### Catflakes

- App: https://mccab22k.github.io/catflakes/
- Repo: https://github.com/mccab22k/catflakes
- Notes: catflakes.md

#### Deployment / External Services

- Hosting: GitHub Pages.
- Source control: GitHub.
- Database: none documented.
- Analytics: not documented in this repo.
- Notes: intended to use Pet Sticker Maker output as reusable cat-head assets. App Store submission is pending/planned.

### Time Here, Time There

- App: https://mccab22k.github.io/timeheretimethere/
- Repo: https://github.com/mccab22k/timeheretimethere

#### Deployment / External Services

- Hosting: GitHub Pages.
- Source control: GitHub.
- Database: none documented.
- Analytics: not documented in this repo.
- Notes: current app is a static prototype for comparing time across cities. App Store submission is pending/planned.

### Pet Sticker Maker

- App: https://mccab22k.github.io/pet-sticker-maker/
- Repo: https://github.com/mccab22k/pet-sticker-maker
- Notes: pet-sticker-maker.md

#### Deployment / External Services

- Hosting: GitHub Pages frontend; backend hosting is not documented in this repo.
- Source control: GitHub.
- Database: none documented.
- Analytics: Cloudflare Web Analytics is installed on the live project.
- Notes: frontend/backend hosting should be documented together before making the repo public.

### Colony Cat Management

- Repo: https://github.com/mccab22k/colony-cat-management
- Project page: cats.html

#### Deployment / External Services

- Hosting: project page is hosted through this GitHub Pages splash site.
- Source control: GitHub.
- Database: not documented in this repo.
- Analytics: Cloudflare Web Analytics applies to the splash site page if loaded through this site.
- Notes: no separate public app deployment is linked from the splash page.

### Personality Systems Research

- App: https://mccab22k.github.io/enneagram-scaled-test/
- Repo: https://github.com/mccab22k/enneagram-scaled-test
- Notes: enneagram-scaled-test.md

#### Deployment / External Services

- Hosting: GitHub Pages.
- Source control: GitHub.
- Database: none documented.
- Analytics: not documented in this repo.
- Notes: current app is a static prototype.

### Rent Stabilized Map

- Notes: rent-stabilized-map.md

#### Deployment / External Services

- Hosting: no public launch link is documented in this repo.
- Source control: not documented in this repo.
- Database: public housing datasets and local/project data workflow are still being defined.
- Analytics: not documented in this repo.
- Notes: public portfolio materials should describe the goals and data approach without linking the live project.

## Infrastructure and Home Labs

### Raspberry Pi + AdGuard Home

- Project page: adguard.html
- Notes: home-improvement/adguard-home-raspberry-pi.md

#### Deployment / External Services

- Hosting: project page is hosted through this GitHub Pages splash site.
- Source control: GitHub.
- Database: none.
- Analytics: Cloudflare Web Analytics applies to the splash site page if loaded through this site.
- Notes: AdGuard Home uses upstream DNS providers such as Cloudflare DNS or Google DNS.

## Research / Concepts

### Wearable Computing

- Notes: wearable-computing.md

#### Deployment / External Services

- Hosting: none currently.
- Source control: not documented.
- Database: none currently.
- Analytics: none currently.
- Notes: not yet an implemented app or hosted service.

## Site Files

- Homepage source: index.html
- Styles: styles.css
- Theme toggle: theme.js
- Privacy policy: privacy.html

This repo is part of my 2026 rapid sprint project: making more projects public, documented, and easier to launch from one place.
