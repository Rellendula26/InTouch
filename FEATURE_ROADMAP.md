# FEATURE_ROADMAP.md

## Roadmap Philosophy

InTouch roadmap sequencing prioritizes user behavior change over feature breadth.

Guiding rule:

> If it does not help someone place a meaningful call, it is not urgent.

---

## Version Plan Overview

- **V1** - Core calling habit loop (local-first MVP)
- **V2** - Better guidance and reflection
- **V3** - Accounts and social architecture foundations
- **V4** - AI and ecosystem integrations

---

## V1: MVP (Local-First)

### Goal

Enable users to consistently make intentional calls with minimal friction.

### Included Features

- Contacts import
- Circle creation/edit/delete
- Multi-circle contact assignment
- Circle-based filtering
- "Pick 3 People" random suggestions
- Native call handoff via `tel:`
- Post-call logging (Connected / No Answer / Call Later)
- Optional call artifacts
- Local call history
- Daily local reminders + reminder time setting

### Acceptance Outcomes

- User can go from app open to call initiation quickly.
- User can maintain circle organization without confusion.
- User can build a memory trail through lightweight artifacts.

### Explicitly Excluded

- Accounts and auth
- Backend and sync
- Social activity sharing
- Smart/AI recommendations
- Analytics and growth loops

---

## V2: Guidance and Relationship Health

### Goal

Help users make better outreach choices without adding complexity or guilt.

### Candidate Features

- Smarter recommendations (rule-based, privacy-preserving)
- Relationship health snapshots
- Weekly recap summaries
- Favorites shortcut layer

### Product Guardrails

- Recommendations remain explainable and lightweight
- Reflection features should not become performance dashboards
- Continue to avoid addictive mechanics

---

## V3: Accounts + Social Layer Foundations

### Goal

Enable optional cross-device continuity and controlled social context.

### Candidate Features

- Accounts and authentication
- Secure cloud sync
- Optional social visibility of high-level activity
- Backend infrastructure for user state and settings

### Social Safety Rules

- Opt-in only
- Share only high-level activity
- Never share call contents or artifacts

---

## V4: Intelligence + Integrations

### Goal

Add contextual assistance while preserving the app's emotional tone and privacy standards.

### Candidate Features

- AI call prompt ideas
- Relationship insights
- Calendar integrations

### Guardrails

- AI should support action, not replace human intent
- Insights must remain emotionally supportive and non-judgmental
- Privacy controls must be explicit and understandable

---

## Suggested Milestone Breakdown (V1)

## Milestone 1: Foundation

- Project scaffolding
- Core data models
- Local persistence setup
- Contacts permission + import baseline

## Milestone 2: Circles Core

- Circle CRUD
- Contact assignment UI
- Multi-circle support and filtering

## Milestone 3: Call Flow

- Pick 3 randomization
- Suggestion UI
- Native dialer handoff

## Milestone 4: Logging + History

- Outcome logging
- Artifact input
- History list and details

## Milestone 5: Notifications + Polish

- Daily reminder scheduling
- Notification settings
- UX copy and design refinements
- Manual QA pass for core loops

---

## Release Readiness Checklist (V1)

- Core call flow works on iOS and Android
- Circle filtering is stable with realistic contact sizes
- Post-call logs persist after restart
- No prohibited infrastructure introduced
- Permission denial states are graceful
- App tone remains warm and minimal across primary screens

---

## Scope Discipline Rules

When evaluating new requests:

1. Does this increase likelihood of a real call?
2. Does this preserve privacy-first MVP constraints?
3. Does this keep UX simple and emotionally warm?

If the answer is no to any of the above, defer to a later version.
