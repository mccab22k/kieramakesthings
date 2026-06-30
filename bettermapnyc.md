# Better NYC Map

## Purpose

A mobile-first NYC transit map and route planner focused on how people actually choose routes: walking tolerance, transfer pain, transit mode preferences, and best/worst-case travel time.

## Architecture

- Frontend: web app deployed on Vercel.
- Map interface: browser-based map UI with route and settings controls.
- Routing model: intended to support multiple transit modes and user preference weighting.
- Data model: route candidates, travel-time ranges, transfer count, walk distance, and mode availability.

## Subprocessors / External Services

- Vercel: app hosting and deployment.
- GitHub: source control and deployment integration.
- Mapping and routing providers may be added as the project evolves.

## Notes

The repo is currently private while the app is under active development.
