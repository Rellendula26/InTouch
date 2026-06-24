# PRODUCT_SPEC.md

## Product Name

**InTouch**

## Tagline

**A real call beats another scroll.**

## One-Sentence Product Definition

InTouch is a mobile app that helps people maintain meaningful relationships by making it easy to intentionally place real phone calls.

---

## Mission and Product Thesis

### Mission

Help users stay connected to the people who matter most through intentional conversations.

### Product Thesis

If a feature increases scrolling but does not increase real conversations, it is likely the wrong feature.

All product decisions must reinforce:

> **A real call beats another scroll.**

---

## Core Problem

People genuinely care about family, friends, mentors, and old connections, but often fail to reach out regularly.

Primary causes:

- Busy schedules
- Decision fatigue
- Uncertainty about who to call
- Delayed intention ("I will call later")

InTouch solves this by turning vague intention into immediate action.

---

## Target User

### Primary User Profile

- Values close relationships
- Wants to call more often but forgets
- Prefers meaningful connection over social media engagement
- Uses smartphone contacts as relationship source of truth

### Example Relationship Categories

- Family
- Close friends
- Mentors
- Former classmates
- College friends
- Coworkers
- Old friends

---

## Jobs To Be Done

When I think "I should call someone," I want the app to quickly suggest people I care about so I can place a call immediately and stay consistent.

Supporting jobs:

- Organize important relationships into circles
- Get gentle reminders to reconnect
- Keep a lightweight memory trail after calls

---

## Core User Stories (MVP)

- As a user, I can import contacts so I do not need manual entry.
- As a user, I can create circles that match my real life.
- As a user, I can assign one contact to multiple circles.
- As a user, I can pick one or more circles to filter suggestions.
- As a user, I can generate three random people to reduce decision fatigue.
- As a user, I can open the native phone call flow for a selected person.
- As a user, I can log whether I connected, got no answer, or will call later.
- As a user, I can optionally capture a short post-call artifact.
- As a user, I can review my local call history.
- As a user, I can configure daily reminder notifications.

---

## MVP Functional Scope

## 1) Contact Import

- Request contacts permission
- Read contact names and phone numbers via Expo Contacts
- Handle permission denial gracefully

## 2) Circles (First-Class Feature)

- Create custom circles
- Edit circle names
- Delete circles
- Assign contacts to one or more circles
- Filter suggestion pool by selected circles

Examples:

- Mom -> Family + Favorites
- Professor -> Mentors + Penn
- Friend -> Close Friends + Penn

## 3) Pick 3 Suggestions

- User chooses active circles
- App randomly selects 3 eligible contacts
- User chooses one person to call
- If pool is too small, provide clear fallback behavior

## 4) Calling Flow

- Use native OS call flow via `tel:` protocol
- Never place calls silently or automatically
- User explicitly initiates call through phone interface

## 5) Post-Call Logging

Required outcome options:

- Connected
- No Answer
- Call Later

Optional artifact field:

- "What did you talk about?"

## 6) Call History

- Save logs locally
- Show date, contact, circle context (if available), outcome, optional artifact

## 7) Notifications

- Local notifications only
- User can enable/disable reminders
- User can set reminder time
- Reminder copy is warm and supportive

---

## Non-Goals (MVP)

- No social feed
- No likes/comments
- No follower graph
- No account system
- No cloud sync
- No backend infrastructure
- No authentication
- No analytics SDKs
- No AI-generated recommendations

---

## Future Feature Directions

### Streaks (Future)

Purpose: consistency, not compulsion.

Good examples:

- 3 conversations this week
- Stayed connected with family this month
- Reached out to an old friend

Never create pressure loops similar to Snapchat streak mechanics.

### Social Features (Future)

Potential optional activity sharing:

- "Ritvik connected with a mentor today."

Rules:

- Never share call content
- Share only high-level activity
- Must remain opt-in
- Not part of MVP

---

## UX Principles

- Action over browsing
- Warmth over productivity pressure
- Simplicity over settings overload
- Reflection over gamification
- Privacy over data expansion

---

## Success Criteria (MVP)

Primary behavioral metric (local, product-level intent):

- User can go from app open to call initiation in under one minute.

Product acceptance criteria:

- User can create/edit/delete circles without confusion.
- User can assign contacts to multiple circles.
- "Pick 3" always respects selected circles.
- Call initiation always routes through native phone interface.
- Call logs persist locally across app restarts.
- Notifications can be configured and disabled.

---

## Risks and Mitigations

- **Risk:** App drifts into contact management complexity.
  - **Mitigation:** Prioritize call flow actions over data management views.
- **Risk:** Users browse instead of calling.
  - **Mitigation:** Keep suggestion and call CTA highly prominent.
- **Risk:** Notification fatigue.
  - **Mitigation:** One configurable daily reminder with easy opt-out.

---

## Product Voice

InTouch should feel like encouragement from a thoughtful friend:

- Gentle
- Personal
- Clear
- Never guilt-inducing
- Never manipulative

Example reminder tone:

- "Someone would probably love to hear from you."
- "Pick one person to call today."
