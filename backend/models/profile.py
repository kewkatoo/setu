from pydantic import BaseModel

from models.enums import ProfileName, SoundLabel


class ProfileDetail(BaseModel):
    name: ProfileName
    priority: list[SoundLabel]


class ProfileResponse(BaseModel):
    current: ProfileName
    profiles: list[ProfileDetail]


class ProfileChangeRequest(BaseModel):
    profile: ProfileName
