# DESIGN_GUIDE.md

## Design Intent

InTouch should feel like a warm invitation to connect, not a task manager.

Desired emotional signature:

- Warm
- Intentional
- Minimal
- Premium
- Emotionally positive

The product should feel like a **relationship OS**, not a CRM.

---

## Core Design Principle

> **A real call beats another scroll.**

Design implication:

- Prioritize fast action to call
- Minimize feed-like exploration
- Keep user focused on one meaningful next step

---

## Aesthetic Direction

Inspirations:

- Apple Contacts (clarity and familiarity)
- Apple Journal (reflective warmth)
- BeReal (simple and direct flows)
- Calm (gentle emotional tone)

Avoid visual patterns that resemble:

- Enterprise dashboards
- Performance trackers
- Infinite content feeds

---

## UX North Star

The user journey should move quickly through:

1. Choose circle context
2. Get lightweight suggestions
3. Place a call
4. Capture a brief memory

Every extra tap must justify itself.

---

## Information Architecture (MVP)

Recommended top-level navigation:

- **Home** - pick circles, generate people, start call
- **Circles** - manage circles and assignments
- **History** - view past calls and artifacts
- **Settings** - notifications and permissions support

If needed, keep this as 3 tabs by merging Settings into profile/preferences.

---

## Key Screens and Behavior

## 1) Onboarding + Permissions

Goals:

- Communicate mission quickly
- Explain why contacts permission is needed
- Avoid dark patterns

Guidelines:

- One clear message: "InTouch helps you call people you care about."
- Request contacts permission in context
- If denied, provide respectful retry path and manual help text

## 2) Home / Call Launcher

Must be the most action-oriented screen in the app.

Contains:

- Active circle filters
- Primary CTA: **Pick 3 People**
- Three suggested contacts
- Call action per contact

Behavior:

- User can regenerate suggestions without friction
- Selected circles always control candidate pool
- Empty-state copy should encourage circle setup

## 3) Circles Management

Circles are first-class and should be easy to maintain.

Capabilities:

- Create circle
- Rename circle
- Delete circle
- Add/remove contacts
- Show multi-circle memberships clearly

Visual guidance:

- Keep list readable and calm
- Favor chips/tags for circle assignment cues

## 4) Post-Call Log

Immediately after return from call interface:

- Required outcome selection:
  - Connected
  - No Answer
  - Call Later
- Optional artifact:
  - "What did you talk about?"

Interaction notes:

- Fast single-screen completion
- Artifact remains optional and lightweight

## 5) History

Purpose:

- Reflection and continuity
- Memory trail, not performance pressure

Include:

- Contact name
- Date
- Outcome
- Optional artifact preview

Do not include competitive or gamified framing.

## 6) Notifications Settings

Controls:

- Enable/disable daily reminder
- Reminder time selection

Reminder style:

- Gentle and encouraging
- Never shaming

---

## Copywriting System

Tone attributes:

- Warm
- Human
- Brief
- Non-judgmental

Prefer:

- "Pick one person to call today."
- "Someone would love to hear from you."

Avoid:

- "You are behind."
- "Do not break your streak."
- "Complete your daily task."

---

## Interaction Design Guidelines

- Keep primary CTA visible without scrolling on key screens
- Use clear hierarchy: one main action at a time
- Provide immediate feedback after save/log actions
- Preserve state when user returns from native dialer
- Minimize modal overload

---

## Visual Design Guidelines

## Color

- Warm neutrals + gentle accent palette
- Avoid high-contrast "alarm" color usage except for destructive confirmations

## Typography

- Readable, calm, system-native where possible
- Strong hierarchy with minimal styles

## Spacing and Layout

- Generous whitespace
- Comfortable touch targets
- Keep screens uncluttered

## Iconography

- Familiar phone/contact metaphors
- Restrained icon use; never noisy

---

## Accessibility Baseline

- Touch targets meet mobile accessibility size standards
- Sufficient text contrast
- Dynamic type support where feasible
- Clear focus and state indicators
- Concise labels for assistive technologies

---

## Anti-Patterns To Avoid

- Infinite feed surfaces
- Excessive badges and urgency markers
- Reward loops disconnected from meaningful calls
- Dense analytics dashboards in MVP
- Complex multi-step flows for simple actions

---

## Future Design Notes

### Streaks (Future)

- Frame as consistency snapshots, not pressure loops
- Use language like "stayed connected this week"
- No punitive messaging for missed days

### Social Activity (Future)

- Strictly opt-in
- Share only high-level activity
- Never expose call notes/content

---

## Definition of Design Success

Design is successful when:

- The app feels emotionally supportive.
- Users can initiate a call within moments.
- The interface encourages action over browsing.
- The experience remains simple even as circles and history grow.
