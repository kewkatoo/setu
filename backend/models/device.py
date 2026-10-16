from pydantic import BaseModel


class DeviceStatus(BaseModel):
    """Snapshot of the last-known device telemetry, plus static firmware info."""

    deviceId: str
    battery: int
    wifi: bool
    mic: bool
    firmware: str
    uptime: str
