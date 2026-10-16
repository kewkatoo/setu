from fastapi import APIRouter

from models.device import DeviceStatus
from services.device_service import get_device_status

router = APIRouter(tags=["device"])


@router.get("/api/device", response_model=DeviceStatus)
def read_device_status() -> DeviceStatus:
    """Return the last-known device telemetry plus firmware/uptime info."""
    return get_device_status()
