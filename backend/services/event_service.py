"""
Business logic for turning a raw ESP32 event into an enriched event,
and for storing / retrieving events.
"""

from data.constants import (
    CONFIDENCE_THRESHOLD,
    DISPLAY_NAMES,
    SEVERITY_MAP,
    OLED_TEXT,
    LED_MAP,
    GUIDANCE_TEXT,
    GUIDANCE_TITLE,
)
from data.store import store
from models.enums import SoundLabel
from models.event import (
    EventIn,
    EnrichedEvent,
    DeviceInfo,
    EventInfo,
    DisplayInfo,
    LEDInfo,
    GuidanceInfo,
)
from utils.ids import generate_event_id


def _resolve_label(label: SoundLabel, confidence: float) -> SoundLabel:
    """Downgrade low-confidence classifications to 'unknown'."""
    if confidence < CONFIDENCE_THRESHOLD:
        return SoundLabel.UNKNOWN
    return label


def enrich_event(payload: EventIn) -> EnrichedEvent:
    """Build a fully enriched event from a raw ESP32 payload."""
    resolved_label = _resolve_label(payload.sound.label, payload.sound.confidence)
    severity = SEVERITY_MAP[resolved_label]
    led = LED_MAP[severity]

    enriched = EnrichedEvent(
        id=generate_event_id(),
        timestamp=payload.timestamp,
        device=DeviceInfo(
            id=payload.deviceId,
            battery=payload.battery,
            wifi=payload.wifi,
            mic=payload.mic,
        ),
        event=EventInfo(
            label=resolved_label,
            display_name=DISPLAY_NAMES[resolved_label],
            confidence=payload.sound.confidence,
            severity=severity,
        ),
        display=DisplayInfo(
            oled=OLED_TEXT[resolved_label],
            led=LEDInfo(color=led["color"], pattern=led["pattern"]),
        ),
        guidance=GuidanceInfo(
            title=GUIDANCE_TITLE,
            message=GUIDANCE_TEXT[resolved_label],
        ),
    )
    return enriched


def process_event(payload: EventIn) -> EnrichedEvent:
    """Enrich an incoming event and persist it to the in-memory store."""
    enriched = enrich_event(payload)
    store.add_event(enriched)
    return enriched


def get_latest_event() -> EnrichedEvent | None:
    return store.latest_event


def get_history() -> list[EnrichedEvent]:
    return store.get_history()
