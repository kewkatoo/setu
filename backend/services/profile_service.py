"""Business logic for environment profile management."""

from data.constants import PROFILE_PRIORITIES
from data.store import store
from models.enums import ProfileName
from models.profile import ProfileResponse, ProfileDetail


def _all_profile_details() -> list[ProfileDetail]:
    return [
        ProfileDetail(name=name, priority=priority)
        for name, priority in PROFILE_PRIORITIES.items()
    ]


def get_profiles() -> ProfileResponse:
    return ProfileResponse(current=store.active_profile, profiles=_all_profile_details())


def set_active_profile(profile: ProfileName) -> ProfileResponse:
    store.active_profile = profile
    return get_profiles()
