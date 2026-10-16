"""
In-memory application state.

There is no database in this project. All state lives in process memory
and resets whenever the server restarts. A module-level singleton is used
so every router/service shares the same state.
"""

from collections import deque
from datetime import datetime, timezone

from data.constants import MAX_HISTORY_SIZE, DEVICE_FIRMWARE_VERSION
from models.enums import ProfileName
from models.event import EnrichedEvent


class InMemoryStore:
    def __init__(self) -> None:
        self.latest_event: EnrichedEvent | None = None
        # deque with maxlen automatically evicts the oldest event once full.
        self.history: deque[EnrichedEvent] = deque(maxlen=MAX_HISTORY_SIZE)

        # Last-known device telemetry, populated on the first event received.
        self.device_id: str | None = None
        self.battery: int | None = None
        self.wifi: bool | None = None
        self.mic: bool | None = None
        self.server_start_time: datetime = datetime.now(timezone.utc)

        self.active_profile: ProfileName = ProfileName.TRAFFIC

    def add_event(self, event: EnrichedEvent) -> None:
        self.latest_event = event
        self.history.appendleft(event)  # newest first
        self.device_id = event.device.id
        self.battery = event.device.battery
        self.wifi = event.device.wifi
        self.mic = event.device.mic

    def get_history(self) -> list[EnrichedEvent]:
        return list(self.history)

    def get_uptime_str(self) -> str:
        delta = datetime.now(timezone.utc) - self.server_start_time
        total_seconds = int(delta.total_seconds())
        hours, remainder = divmod(total_seconds, 3600)
        minutes, seconds = divmod(remainder, 60)
        return f"{hours:02d}:{minutes:02d}:{seconds:02d}"

    def get_firmware_version(self) -> str:
        return DEVICE_FIRMWARE_VERSION


# Singleton instance shared across the whole app.
store = InMemoryStore()
