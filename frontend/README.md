# SETU — Frontend

Adaptive Environmental Awareness System dashboard. React + Vite + TypeScript + Tailwind + Framer Motion.

## Run

```bash
npm install
npm run dev
```

By default the app runs entirely on **mock services** (`VITE_USE_MOCKS=true`), so it works with zero backend.

## Connect the real FastAPI backend

1. Copy `.env.example` to `.env`.
2. Set `VITE_API_BASE_URL` and `VITE_WS_URL` to your backend.
3. Set `VITE_USE_MOCKS=false`.

No other code changes are required — `src/services/*` is the only layer that talks to the network.

## Structure

- `services/` — axios client + one file per API resource, mock-aware
- `hooks/` — `useLiveAlerts`, `useDeviceStatus`, `useAccessibilityProfile`
- `components/dashboard` — Dashboard building blocks
- `components/landing` — Landing page sections
- `pages/` — routed pages (`/`, `/dashboard`, `/architecture`)
