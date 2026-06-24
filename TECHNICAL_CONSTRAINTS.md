# TECHNICAL_CONSTRAINTS.md

## Purpose

This document defines hard implementation boundaries for InTouch MVP.

Constraint priority:

1. Simplicity
2. Privacy
3. Emotional warmth in UX
4. Mobile-first usability
5. Working MVP reliability

---

## Approved Stack (MVP)

- Expo
- React Native
- TypeScript

Approved packages:

- `expo-contacts`
- `expo-notifications`
- `@react-native-async-storage/async-storage`
- `expo-linking`

No additional heavy dependencies should be introduced unless required for core MVP behavior.

---

## Data and Infrastructure Constraints

## Storage Model

- Local-only storage for MVP
- Persist via AsyncStorage
- No remote sync

## Backend Policy

- No backend services
- No Supabase
- No Firebase
- No custom API server

## Identity and Accounts

- No user authentication
- No account creation
- No login state

## Analytics and Tracking

- No analytics SDKs
- No event tracking pipelines
- No third-party user behavior profiling

## AI Policy

- No AI features in MVP
- No AI-generated prompts/recommendations

---

## Privacy Constraints

- Contacts remain on-device
- No contact upload to cloud
- No external sharing of call history
- No transmission of note/artifact content
- Permissions are requested in context with clear user explanation

Data minimization principle:

- Store only what is needed for MVP behavior
- Prefer local identifiers and snapshots over copied sensitive payloads

---

## Calling Constraints (Hard Requirement)

The app must never silently place calls.

Required behavior:

- Use `tel:` protocol with OS-native call flow
- User explicitly confirms/initiates call through phone interface
- InTouch does not auto-dial in background

---

## Notifications Constraints

- Local notifications only
- User controls enable/disable state
- User controls reminder time
- Reminder copy must be supportive, not coercive

No remote notification service is required for MVP.

---

## Functional Architecture Constraints

## Contact Model (MVP)

Each contact reference should include only fields needed for call flow:

- Local contact id
- Display name
- Preferred phone number(s)
- Circle membership ids

## Circle Model

- Circle id
- Circle name (user-defined)
- Timestamps (optional)

## Call Log Model

- Log id
- Contact id or contact snapshot
- Timestamp
- Outcome (`CONNECTED`, `NO_ANSWER`, `CALL_LATER`)
- Optional artifact text
- Optional circle context snapshot

All models persist locally.

---

## UX and Performance Constraints

- Fast startup and low interaction friction on typical mobile devices
- Home action path should remain short (few taps to call)
- No heavy dashboard rendering for MVP
- Keep list virtualization/performance in mind for large contact sets

---

## Error Handling Constraints

Must handle gracefully:

- Contacts permission denied
- Missing phone number on selected contact
- No contacts in selected circles
- Notification permission denied
- Storage read/write failures

Error copy must remain calm and action-oriented.

---

## Security Constraints (MVP Level)

- Do not store secrets in client code
- Avoid logging sensitive personal data in development output
- Keep artifact notes local-only
- Avoid unnecessary dependency expansion

---

## Out-of-Scope for MVP (Technical)

- Cross-device sync
- Multi-user shared data
- Real-time collaboration
- Server-side recommendation engine
- Cloud backup of call artifacts
- Social graph infrastructure

---

## Testing and Quality Constraints

Minimum expectations:

- TypeScript strictness maintained
- Core flows manually verified on iOS and Android:
  - Contacts permission flow
  - Circle CRUD
  - Pick 3 logic
  - `tel:` handoff
  - Post-call logging
  - Local history persistence
  - Notification scheduling

No feature should be merged if it weakens the core thesis by adding passive browsing complexity without increasing likelihood of calls.
