# Travel Buddy

Status: work in progress.

## Summary

Travel Buddy is a passport-aware travel planning project. The core goal is to help groups with different passports understand where they can travel together, what entry requirements may differ, and which destinations are easiest for everyone.

## Core Use Case

People traveling together often do not have the same passport, visa access, transit rules, or entry requirements. Travel Buddy is meant to make that visible early, before a group commits to flights, lodging, or a destination.

Example travelers:

- one person has a United States passport
- one person has a Chinese passport
- one person has a Canadian passport
- one person has permanent residency or a visa that changes their access

The app should help compare where the group can go together and flag where one traveler may need extra paperwork.

## Possible Features

- traveler passport profiles
- destination comparison by passport
- visa-free, visa-on-arrival, eVisa, and visa-required indicators
- transit visa warnings
- shared destination shortlist
- group compatibility score for each destination
- itinerary outline
- document checklist by traveler
- links for official entry requirements, maps, lodging, food, and activities

## MVP Direction

The first useful version should answer:

```text
Given these travelers and passports, where can we all go with the least friction?
```

## Data Structure Ideas

```text
travelerName
passportCountry
residencyOrVisaStatus
originCity
destinationCountry
entryRequirement
transitRequirement
notes
```

## Next Steps

- define the first passport comparison flow
- sketch the first screen
- choose a minimal destination dataset
- decide whether users manually enter visa notes first or use an API later
- keep official-source links visible for verification
