# Time Since

## Purpose

Time Since tracks routines and events by elapsed time instead of forcing every task into a fixed calendar recurrence.

## Architecture

- Frontend: web app deployed on Vercel.
- Core model: trackers, occurrences, sessions, counters, reminders, and elapsed-time views.
- Storage: browser/app persistence with import/export support.
- UX: card-based tracking with quick actions for logging events and sessions.

## Goals

- Make recurring-life tracking faster than opening a calendar or spreadsheet.
- Track tasks that reset from the last completion date instead of a fixed weekly or monthly schedule.
- Support chores, maintenance, routines, personal logs, sessions, and counters in one lightweight app.
- Keep data portable through browser/app persistence and import/export support.
- Make elapsed-time patterns visible at a glance: current interval, average interval, longest gap, shortest gap, and recent history.

## Deployment / External Services

- Hosting: Vercel.
- Source control: GitHub with deployment integration.
- Database: browser/app persistence with import/export support.
- Analytics: not documented in this repo.
- Notes: no backend service is documented here.

## Notes

The repo is currently private.
