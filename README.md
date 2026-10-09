# InTouch

A local-first relationship-maintenance app that encourages real phone calls. Organize contacts into circles, ask for three people to call, choose one, and record how the call went with an optional reflection.

The repository contains an Expo/React Native application, not only product documentation. It uses TypeScript, React Navigation, Expo Contacts, Expo Notifications, Expo Linking, and AsyncStorage.

## Run

Use a Node.js version supported by Expo SDK 55 and npm:

```bash
npm ci
npm start
```

Follow the Expo development-server instructions for your target device. For the static web preview:

```bash
npm run web
```

For native builds, after installing the platform's development tools:

```bash
npm run ios
npm run android
```

Checks and web export:

```bash
npm run typecheck
npm run build:web
```

The web export is written to `dist`; `vercel.json` configures that output for Vercel.

## Usage

Import contacts with permission, manage their circles, select a call pool, and use the recommendation screen. The app hands call initiation to the operating system through a phone link. Record Connected, No Answer, or Call Later afterward. Daily reminder notifications require permission.

## Layout and privacy

- `src/screens/`: onboarding, circles, recommendations, reflections, timeline, and settings.
- `src/services/`: contacts, recommendations, and reminders.
- `src/storage/`: local state persistence.
- `PRODUCT_SPEC.md`, `DESIGN_GUIDE.md`, `TECHNICAL_CONSTRAINTS.md`, and `FEATURE_ROADMAP.md`: product/design context.

App state is stored locally; this checkout does not include an account backend. Browser previews do not provide the same contact-import, phone, or notification capabilities as native devices. Do not treat a successful web preview as native-device verification. No automated test script is included; build and device behavior were not retested for this documentation update.
