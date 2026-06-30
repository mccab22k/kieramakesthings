# Pet Sticker Maker

## Purpose

Pet Sticker Maker turns pet photos into reusable transparent sticker assets, primarily as an asset-generation component for Catflakes.

## Architecture

- Frontend: web app hosted through GitHub Pages.
- Image workflow: upload photo, isolate the pet head, remove background/body, export sticker image.
- Integration goal: export or redirect finished assets into Catflakes.
- Processing model: client-side first where possible, with future room for segmentation/model-assisted cleanup.

## Subprocessors / External Services

- GitHub Pages: static hosting.
- GitHub: source control.
- Image segmentation/model services may be evaluated if client-side processing is insufficient.

## Notes

The repo is currently private.
