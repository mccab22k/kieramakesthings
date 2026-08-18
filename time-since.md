# Time Since

[iOS App Store](https://apps.apple.com/us/app/time-since-chore-reminder/id6795689073) · [Web App](https://timesincechorereminder.vercel.app/)

## Purpose

Time Since tracks routines and events by elapsed time instead of forcing every task into a fixed calendar recurrence.

It supports three kinds of tracking:

- **Occurrences** for chores, maintenance, habits, and other things you log each time they happen.
- **Sessions** for activities with a start, pause/resume, and end time.
- **Counters** for elapsed time since a date or time remaining until a future date.

## User guide

### Occurrence trackers

Use these for things such as changing sheets, cleaning a litterbox, replacing filters, or exercising.

- **Quick Add** records the current time immediately.
- **Add detailed** lets you choose a date/time and add a note.
- History is used to calculate current interval, average interval, longest gap, shortest gap, and recent patterns.
- Native reminders can be configured based on time since the last occurrence.

### Session trackers

Use these for fasting, focused work, workouts, or other timed activities.

Start, pause/resume, and end the session from the tracker. Intentional pause time is stored separately so it does not inflate active-duration statistics.

### Counters

Counters can measure either direction:

- Time since a past date.
- Time remaining until a future target date.

### Swipe actions

Left and right swipes can each be configured in Settings as **Quick Add**, **Add detailed**, or **No swipe**.

## Import and export

CSV is the portable history format. There is no account or automatic cloud sync.

### Export

- **Web App:** Export CSV downloads `time-since-export.csv`.
- **iOS app:** Settings → Data → Export CSV opens a read-only CSV text view that can be copied and saved/shared manually.

### Import

Open **Settings → Data → Import CSV History**, paste the CSV, choose an import mode, then restore it.

| Mode | Behavior |
|---|---|
| **New only** | Preserves existing data, adds new trackers, and adds nonduplicate imported history to matching trackers. |
| **Overwrite** | Replaces tracker fields and history for matching trackers while leaving unrelated local trackers alone. |
| **Replace all** | Replaces the local tracker/history dataset. CSV does not carry app-wide settings, so those return to defaults. |

Matching trackers use the exact combination of **name + category + type**. Duplicate occurrence timestamps and duplicate session start/end pairs are skipped.

### Simple CSV format

A simple one-row-per-event import can use:

```csv
Category,Event,Occurrence,Note
Household,Litterbox,2026-08-18T09:15:00,Cleaned both boxes
Household,Change bed,2026-08-12 21:30:00,
Maintenance,Air filter,2026-08-01T12:00:00,Hallway unit
```

This format is best for occurrence history. It does not explicitly carry sessions, counters, reminder intervals, or counter targets.

### Full Time Since CSV

Exports use:

```csv
kind,category,name,type,date,note,reminder_days,duration_format,counter_start,counter_target
```

This preserves tracker definitions, occurrence history, session start/end history, reminder interval days, and counter dates. App-wide settings and individual session pause segments are not included.

**Recommended:** export your current data before using Overwrite or Replace all.

## Architecture

- Web app: static build deployed on Vercel.
- Mobile app: React Native / Expo, distributed through the Apple App Store.
- Core model: trackers, occurrences, sessions, counters, reminders, and elapsed-time views.
- Storage: local browser/app persistence with manual CSV portability.
- UX: card-based tracking with quick actions, configurable swipes, history, and insights.

## Privacy

- No account required.
- No automatic cloud sync.
- No backend is required for tracker data.
- CSV stays local unless the user chooses to download, copy, or share it.

## Goals

- Make recurring-life tracking faster than opening a calendar or spreadsheet.
- Track tasks that reset from the last completion date instead of a fixed weekly or monthly schedule.
- Support chores, maintenance, routines, personal logs, sessions, and counters in one lightweight app.
- Keep data portable without requiring an account.
- Make elapsed-time patterns visible at a glance.

## Deployment / External Services

- iOS distribution: Apple App Store.
- Web hosting: Vercel.
- Source control: GitHub with deployment integration.
- Database: local browser/app persistence.
- Analytics: not documented.
- Backend: none required for tracker data.

## Notes

The source repo is currently private. Its README contains the more detailed implementation and CSV reference guide.
