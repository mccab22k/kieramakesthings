# Pet Sticker Maker

## Purpose

Pet Sticker Maker turns pet photos into reusable transparent sticker assets, primarily as an asset-generation component for Catflakes.

## Architecture

- Frontend: web app hosted through GitHub Pages.
- Backend: FastAPI sticker-processing service.
- Image workflow: upload photo, isolate the pet head, remove background/body, export sticker image.
- Integration goal: export or redirect finished assets into Catflakes.
- Processing model: CPU-first OpenCV segmentation with an optional model-backed provider path.

## Deployment / External Services

- Hosting: GitHub Pages frontend; backend hosting is not documented in this repo.
- Source control: GitHub.
- Database: none documented.
- Analytics: Cloudflare Web Analytics is installed on the live project.
- Notes: frontend/backend hosting should be documented together before making the repo public.

## Notes

The repo is currently private.
