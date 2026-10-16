# Setu Backend

AI-powered environmental awareness backend for Deaf and Hard-of-Hearing users.
The ESP32 device performs Edge Impulse inference on-device and POSTs sound
detection events here; this backend enriches those events with UI metadata
(OLED text, LED color/pattern, guidance) and serves them to a local dashboard.

No database, no auth, no cloud services — everything lives in memory and
resets on restart.

## Project structure

```
backend/
├── main.py              # FastAPI app, CORS, exception handlers, router wiring
├── routes/               # HTTP route definitions
│   ├── events.py         # POST /api/event, GET /api/current, GET /api/history
│   ├── device.py         # GET /api/device
│   └── profile.py        # GET/POST /api/profile
├── models/                # Pydantic schemas + enums
│   ├── enums.py
│   ├── event.py
│   ├── device.py
│   └── profile.py
├── services/              # Business logic (enrichment, store access)
│   ├── event_service.py
│   ├── device_service.py
│   └── profile_service.py
├── data/                   # Constants + in-memory store
│   ├── constants.py
│   └── store.py
├── utils/
│   └── ids.py
└── requirements.txt
```

## Setup

```bash
python3 -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

## Run

```bash
uvicorn main:app --reload
```

The API will be available at `http://127.0.0.1:8000`.
Interactive docs: `http://127.0.0.1:8000/docs`.

## Endpoints

| Method | Path            | Description                                   |
|--------|-----------------|------------------------------------------------|
| POST   | `/api/event`    | Ingest a raw ESP32 detection event             |
| GET    | `/api/current`  | Get the latest enriched event                  |
| GET    | `/api/history`  | Get up to the last 100 events (newest first)   |
| GET    | `/api/device`   | Get last-known device telemetry + firmware/uptime |
| GET    | `/api/profile`  | Get the active profile + all profile options   |
| POST   | `/api/profile`  | Change the active profile                      |

## Example request

```bash
curl -X POST http://127.0.0.1:8000/api/event \
  -H "Content-Type: application/json" \
  -d '{
        "deviceId": "SETU-01",
        "timestamp": "2026-07-12T14:23:18Z",
        "battery": 87,
        "wifi": true,
        "mic": true,
        "sound": { "label": "siren", "confidence": 0.96 }
      }'
```

If `confidence` is below `0.70`, the label is automatically downgraded to
`unknown` regardless of what the device reported.

## Validation / errors

- Invalid `sound.label` values (anything outside `siren`, `horn`, `name_call`,
  `unknown`) are rejected with `422 Unprocessable Entity`.
- Missing required fields return `422` with details on what's missing.
- `battery` must be an integer between 0 and 100.
- `confidence` must be a float between 0.0 and 1.0.
- `GET /api/current` and `GET /api/device` return `404` until at least one
  event has been received.
