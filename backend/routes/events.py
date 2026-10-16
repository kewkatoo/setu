from fastapi import APIRouter, HTTPException, status

from models.event import EventIn, EnrichedEvent
from services.event_service import process_event, get_latest_event, get_history

router = APIRouter(tags=["events"])


@router.post("/api/event", response_model=EnrichedEvent, status_code=status.HTTP_201_CREATED)
def create_event(payload: EventIn) -> EnrichedEvent:
    """Receive a raw detection event from the ESP32, enrich it, and store it."""
    return process_event(payload)


@router.get("/api/current", response_model=EnrichedEvent)
def read_current_event() -> EnrichedEvent:
    """Return the most recently received enriched event."""
    latest = get_latest_event()
    if latest is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No events have been received yet.",
        )
    return latest


@router.get("/api/history", response_model=list[EnrichedEvent])
def read_history() -> list[EnrichedEvent]:
    """Return up to the last 100 events, newest first."""
    return get_history()
