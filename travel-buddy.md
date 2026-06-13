# Travel Buddy

Status: work in progress.

## Summary

Travel Buddy is a passport-aware travel planning project. The core goal is to help groups with different passports understand where they can travel together, what entry requirements may differ, and which destinations are easiest for everyone.

## Core Use Case

People traveling together often do not have the same passport, visa access, transit rules, airport options, or entry requirements. Travel Buddy is meant to make that visible early, before a group commits to flights, lodging, or a destination.

Example travelers:

- one person has a United States passport
- one person has a Chinese passport
- one person has a Canadian passport
- one person has permanent residency or a visa that changes their access
- friends may depart from different cities or airports

The app should help compare where the group can go together, flag where one traveler may need extra paperwork, and suggest route plans that are realistic for everyone.

## Key Functionality

### Passport-aware destination matching

Compare destination access across every traveler in a group.

The app should show:

- visa-free access
- visa-on-arrival access
- eVisa access
- visa-required destinations
- transit visa risk
- maximum stay differences
- document checklist by traveler

### Schengen and non-Schengen Europe planning

Europe trips often cross different entry-rule zones. Travel Buddy should help plan itineraries that include:

- Schengen-only travel
- non-Schengen stops
- mixed Schengen and non-Schengen routes
- time-in-zone tracking for Schengen-style stay limits
- entry and exit points for the zone
- warnings when an itinerary may create extra border or visa complexity

### Multi-country and multi-continent itineraries

The app should support routes that span more than one country or continent.

Examples:

- United States to Portugal to Morocco
- France to Switzerland to the United Kingdom
- Japan to Thailand to Australia
- Turkey to Greece to Italy

Each stop should be checked against every traveler's passport, residency, and transit situation.

### Different departure airports

Friends may start from different airports. Travel Buddy should compare likely routes from each person's origin.

The app should help answer:

```text
Where is the best place for all of us to meet?
```

Optimization factors:

- total estimated group airfare
- cheapest mutual meeting airport
- direct-flight availability
- number of layovers per traveler
- total travel time
- visa/transit friction for layover airports
- whether one traveler is being unfairly burdened with a much worse route

### Mutual airport optimization

The app should suggest common meeting airports that are practical for the group.

Example output:

```text
Best mutual meeting airport: Lisbon
Why: cheapest combined airfare, low visa friction, good onward flights
Backup: Madrid
Avoid: London, because one traveler may need extra transit documentation
```

## Possible Features

- traveler passport profiles
- traveler departure airport profiles
- destination comparison by passport
- visa-free, visa-on-arrival, eVisa, and visa-required indicators
- transit visa warnings
- Schengen/non-Schengen itinerary checks
- multi-country route builder
- multi-continent route builder
- mutual meeting-airport optimizer
- shared destination shortlist
- group compatibility score for each destination
- route friction score
- estimated group flight-cost score
- itinerary outline
- document checklist by traveler
- links for official entry requirements, maps, lodging, food, and activities

## MVP Direction

The first useful version should answer:

```text
Given these travelers, passports, and departure airports, where can we all go with the least friction and most reasonable cost?
```

## Data Structure Ideas

```text
travelerName
passportCountry
residencyOrVisaStatus
originCity
originAirport
preferredAirportAlternates
destinationCountry
destinationAirport
itineraryStopOrder
entryRequirement
transitRequirement
zoneType
estimatedFlightCost
estimatedTravelTime
layoverCount
routeFrictionScore
notes
```

## Next Steps

- define the first passport comparison flow
- add origin airport as a required traveler field
- sketch the mutual meeting-airport screen
- model Schengen vs non-Schengen itinerary stops
- choose a minimal destination and airport dataset
- decide whether users manually enter visa notes first or use an API later
- define a simple cost/friction scoring model
- keep official-source links visible for verification
