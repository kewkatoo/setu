from datetime import datetime

from pydantic import BaseModel, Field, field_validator

from models.enums import SoundLabel, Severity


class SoundInput(BaseModel):
    """Raw classification result coming from the Edge Impulse model on the ESP32."""

    label: SoundLabel
    confidence: float = Field(..., ge=0.0, le=1.0)


class EventIn(BaseModel):
    """Payload sent by the ESP32 device on each detection event."""

    deviceId: str = Field(..., min_length=1)
    timestamp: datetime
    battery: int = Field(..., ge=0, le=100)
    wifi: bool
    mic: bool
    sound: SoundInput

    @field_validator("deviceId")
    @classmethod
    def device_id_not_blank(cls, v: str) -> str:
        if not v.strip():
            raise ValueError("deviceId must not be blank")
        return v


# ---------- Response models ----------


class DeviceInfo(BaseModel):
    id: str
    battery: int
    wifi: bool
    mic: bool


class EventInfo(BaseModel):
    label: SoundLabel
    display_name: str
    confidence: float
    severity: Severity


class LEDInfo(BaseModel):
    color: str
    pattern: str


class DisplayInfo(BaseModel):
    oled: str
    led: LEDInfo


class GuidanceInfo(BaseModel):
    title: str
    message: str


class EnrichedEvent(BaseModel):
    """The fully enriched event stored in history and returned to clients."""

    id: str
    timestamp: datetime
    device: DeviceInfo
    event: EventInfo
    display: DisplayInfo
    guidance: GuidanceInfo
