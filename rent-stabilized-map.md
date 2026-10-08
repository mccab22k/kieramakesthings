# Rent Stabilized Map

Status: work in progress.

## Purpose

Rent Stabilized Map is a NYC housing data and mapping project focused on making apartment-search context easier to understand.

The goal is to help compare public signals about buildings, neighborhoods, and housing history without treating any single dataset as definitive legal advice.

## Goals

- Make rent-stabilized housing signals easier to scan during apartment research.
- Combine building-level context with neighborhood-level search tradeoffs.
- Help users notice records, patterns, and caveats that are easy to miss in separate public databases.
- Keep the interface useful for practical decisions, not just raw data lookup.
- Document data sources and uncertainty clearly.
- Link the public beta while documenting dataset caveats and preserving the distinction between building leads and verified rent-regulated unit status.

## Possible Data / Product Direction

- Building lookup by address or map interaction.
- Stabilization-related indicators from public NYC datasets.
- Building history, complaint, registration, or permit context where appropriate.
- Notes about data freshness, source limitations, and verification steps.
- Saved shortlists for apartments or buildings under consideration.
- Comparison views for neighborhoods, commute tradeoffs, and building-level risk signals.

## Deployment / External Services

- Hosting: GitHub Pages beta, https://mccab22k.github.io/nyc-stabilized-apartment-hunt/ .
- Source control: private GitHub repository, `mccab22k/nyc-stabilized-apartment-hunt`.
- Database: static public-data JSON served by the web app; saved notes and building statuses default to browser localStorage.
- Analytics: not documented in this repo.
- Notes: public portfolio includes a beta link. Users should verify housing-status claims against official sources.

## Notes

This project should stay framed as a research and decision-support tool. It should not present housing-status conclusions as legal determinations.
