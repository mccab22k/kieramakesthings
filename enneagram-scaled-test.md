# Enneagram Scaled Test

Live app: https://mccab22k.github.io/enneagram-scaled-test/

## Summary

The Enneagram Scaled Test is a web app prototype for a more flexible Enneagram questionnaire. It is based on paired statements, but expands beyond a simple either-or selection.

## Core Idea

Each pair has two statements. A test taker can distribute points across the pair:

```text
0 = does not fit
1 = fits somewhat
2 = fits strongly
```

The normal pair total is 2.

Examples:

```text
A = 2, B = 0
A = 1, B = 1
A = 0, B = 2
```

This keeps the paired structure while allowing a person to say that both statements fit, neither statement fits strongly, or one statement fits more than the other.

## Weighted Questions

The prototype supports a limited weighting rule:

- only one question per Enneagram type can be weighted above the normal pair total

This keeps the test mostly balanced while still allowing especially important questions to count more.

## MVP Scope

Current MVP goals:

- turn the spreadsheet-style workflow into a web app
- show one question pair at a time
- allow 0, 1, and 2 point choices
- keep each normal pair capped at 2 total points
- summarize totals by Enneagram type
- support limited weighted questions
- make the test easier to take and revise

## Data Structure

Basic question-pair fields:

```text
id
leftStatement
leftType
rightStatement
rightType
leftScore
rightScore
isWeighted
weightValue
```

Basic result fields:

```text
type
totalScore
weightedScore
questionCount
```

## Future Ideas

- add a question editor
- export results as JSON or CSV
- support multiple versions of the test
- add explanations for top results
- compare binary results against scaled results
- add admin controls for weighted questions

## Status

Active prototype.
