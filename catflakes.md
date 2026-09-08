# Catflakes

## Status

Catflakes is live on the Apple App Store and remains available as a web app.

- App Store: https://apps.apple.com/us/app/catflakes/id6795675453
- Web app: https://mccab22k.github.io/catflakes/
- Source: https://github.com/mccab22k/catflakes

## Project history

**Started:** 2018
**Original implementation:** Java
**Current implementation:** iOS and web rewrite

Catflakes began as a Java project in 2018. The current app is a later rewrite and continuation of that original visual-toy idea.

## Purpose

Catflakes is a small visual toy that turns cat assets into falling radial snowflake-style animations.

## Architecture

- iOS: SwiftUI app using `WKWebView` to load bundled static assets.
- Web: static app hosted through GitHub Pages.
- Rendering: HTML, CSS, JavaScript, and Canvas.
- Controls: cat selection, wind, density, speed, and animation behavior.
- Asset flow: designed to consume Pet Sticker Maker output as reusable cat-head and leg assets.

## Deployment / External Services

- iOS distribution: Apple App Store.
- Web hosting: GitHub Pages.
- Source control: GitHub.
- Database: none documented.
- Analytics: not documented in this repo.
- App Store listing: https://apps.apple.com/us/app/catflakes/id6795675453

## Notes

The repo is currently private. The iOS release and web version share the same core animation assets and behavior.
