from fastapi import APIRouter

from models.profile import ProfileResponse, ProfileChangeRequest
from services.profile_service import get_profiles, set_active_profile

router = APIRouter(tags=["profile"])


@router.get("/api/profile", response_model=ProfileResponse)
def read_profile() -> ProfileResponse:
    """Return the currently active profile plus all available profiles."""
    return get_profiles()


@router.post("/api/profile", response_model=ProfileResponse)
def update_profile(payload: ProfileChangeRequest) -> ProfileResponse:
    """Change the currently active environment profile."""
    return set_active_profile(payload.profile)
