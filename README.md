# InTouch

**Tagline:** _A real call beats another scroll._

InTouch is a mobile relationship-maintenance app that helps people stay connected to the people who matter most through intentional phone calls.

Modern social media often creates the feeling of connection without real interaction. InTouch is built around one core behavior: pick someone, call them, and stay in touch.

---

## Core Mission

InTouch exists to encourage real conversations.

- Not content creation
- Not networking
- Not follower counts
- Not passive scrolling
- Yes to meaningful relationships

Every product decision should support one thesis:

> **A real call beats another scroll.**

---

## What Problem We Solve

People care deeply about close relationships, but often fail to reach out consistently.

This usually is not neglect. It is friction:

- Life gets busy
- Decision fatigue sets in
- People do not know who to call
- "I will call later" becomes "I forgot"

InTouch reduces the gap between thinking about someone and actually calling them.

---

## MVP Experience

1. User downloads app.
2. User grants contacts permission.
3. User creates circles (for example: Family, Close Friends, Mentors, Penn Friends).
4. User assigns contacts to one or more circles.
5. User selects one or more circles as call pool filters.
6. User taps **Pick 3 People**.
7. App randomly suggests three contacts from selected circles.
8. User chooses one person.
9. App opens native phone call flow using `tel:`.
10. User returns to app and logs outcome:
    - Connected
    - No Answer
    - Call Later
11. User can optionally write a short artifact note.
12. History is saved locally.

---

## MVP Feature Scope

- Contact import from phone
- Circle creation and management
- Multi-circle contact assignment
- Circle-based call suggestions
- Random "Pick 3" flow
- Native dialer handoff (no silent calling)
- Post-call outcome logging
- Optional call artifacts/notes
- Local call history
- Local daily reminder notifications

---

## Design Philosophy

InTouch should feel:

- Warm
- Intentional
- Minimal
- Premium
- Emotionally positive

Avoid:

- CRM-like interface
- Productivity dashboard feel
- Aggressive gamification
- Social media addiction mechanics

InTouch should feel like a **relationship OS**, not a contacts manager.

---

## Privacy Promise (MVP)

InTouch is privacy-first:

- Local-only storage
- No backend
- No account system
- No contact uploads
- No analytics
- No AI features in MVP

Only the user controls call initiation through the operating system phone interface.

---

## Tech Baseline (MVP)

- Expo
- React Native
- TypeScript
- Expo Contacts
- Expo Notifications
- AsyncStorage
- Expo Linking

---

## Documentation Map

- `PRODUCT_SPEC.md` - full product definition and behavior
- `DESIGN_GUIDE.md` - UX/UI and content tone principles
- `TECHNICAL_CONSTRAINTS.md` - architecture and implementation boundaries
- `FEATURE_ROADMAP.md` - phased delivery plan (V1-V4)
- `AGENTS.md` - implementation instructions for coding agents/contributors

---

## Current Project State

This repository currently contains foundational product documentation only. Application code should begin after documentation alignment and signoff.
