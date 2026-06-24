# AGENTS.md

## Purpose

This file defines implementation instructions for agents and contributors working on InTouch.

Treat these instructions as product-critical constraints, not optional preferences.

---

## Product Thesis (Non-Negotiable)

> **A real call beats another scroll.**

When building features, optimize for real conversations.

If a feature increases browsing but does not increase calls, do not ship it in MVP.

---

## Priority Order for Implementation Decisions

1. Simplicity
2. Privacy
3. Emotional warmth
4. Mobile UX quality
5. Working MVP reliability

Use this order to break ties in design/technical choices.

---

## MVP Scope Guardrails

Implement only:

- Contacts import
- Circles (create/edit/delete + multi-membership)
- Circle-based suggestion filtering
- Pick 3 random suggestions
- Native phone call handoff (`tel:`)
- Post-call outcome logging
- Optional call artifacts
- Local history
- Local reminders and reminder time controls

Do not add speculative features unless explicitly requested.

---

## Hard Technical Constraints

- Stack: Expo + React Native + TypeScript
- Storage: local only (AsyncStorage)
- Packages: Expo Contacts, Expo Notifications, AsyncStorage, Expo Linking

Strictly avoid in MVP:

- Backend services
- Supabase/Firebase
- Authentication/accounts
- Analytics SDKs
- AI integrations
- Contact uploads

---

## Calling Safety Constraint

The app must not silently place calls.

Required implementation:

- Use OS-native call flow via `tel:`
- User explicitly initiates call

Never implement background dialing or auto-call behavior.

---

## UX and Content Rules

- Keep action path short and clear
- Avoid infinite feeds, dashboards, and noisy metrics
- Use warm, non-judgmental language
- Avoid guilt-based reminders or addictive pressure loops

Preferred voice:

- "Pick one person to call today."

Avoid voice:

- "You are behind."
- "Do not break your streak."

---

## Circles Are First-Class

Treat circles as core architecture, not a decorative filter.

Must support:

- Custom circle creation
- Circle edit/delete
- One contact in multiple circles
- Filtering suggestions by one or multiple circles

---

## Data Handling Guidance

- Minimize stored data to necessary fields
- Keep call artifacts local
- Avoid storing unnecessary sensitive contact metadata
- Ensure logs persist across app restarts

If uncertain, choose the most privacy-preserving option.

---

## Suggested Engineering Standards

- Keep modules small and composable
- Prefer readable code over abstract frameworks
- Add lightweight validation for edge cases
- Handle permission denial and empty states gracefully
- Keep TypeScript types explicit for core entities

---

## Definition of Done for Features

A feature is done when:

- It solves a clear user need in the call habit loop
- It respects all MVP and privacy constraints
- It behaves correctly on iOS and Android
- Empty/error/denied states are handled cleanly
- UX copy and interactions remain warm and minimal

---

## Anti-Patterns to Reject

- Over-engineering before user validation
- Adding complex architecture "for future scale"
- KPI dashboards in MVP
- Social mechanics that pressure behavior
- Feature additions that dilute call-first flow

---

## Execution Reminder for Agents

When uncertain, default to the smallest implementation that helps a user call someone they care about today.

Build the habit loop first. Expand only after that loop is consistently strong.
