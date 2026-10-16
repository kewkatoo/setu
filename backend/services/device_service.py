"""Business logic for device status."""

from fastapi import HTTPException, status

from data.store import store
from models.device import DeviceStatus


def get_device_status() -> DeviceStatus:
    if store.device_id is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No device data available yet. No events have been received.",
        )

    return DeviceStatus(
        deviceId=store.device_id,
        battery=store.battery,
        wifi=store.wifi,
        mic=store.mic,
        firmware=store.get_firmware_version(),
        uptime=store.get_uptime_str(),
    )
