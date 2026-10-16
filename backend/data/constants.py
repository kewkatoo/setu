"""
Static, in-memory lookup tables for Setu.

These map a SoundLabel to all the derived metadata the frontend/OLED/LED
needs. Keeping this centralized avoids duplicating logic across services.
"""

from models.enums import SoundLabel, Severity, LEDColor, LEDPattern, ProfileName

# Minimum confidence required to trust the ESP32's classification.
# Anything below this is downgraded to "unknown".
CONFIDENCE_THRESHOLD = 0.70

# Human-friendly display names shown in the UI.
DISPLAY_NAMES: dict[SoundLabel, str] = {
    SoundLabel.SIREN: "Ambulance Siren",
    SoundLabel.HORN: "Vehicle Horn",
    SoundLabel.NAME_CALL: "Someone is Calling You",
    SoundLabel.UNKNOWN: "Unknown Sound",
}

# Severity per sound class.
SEVERITY_MAP: dict[SoundLabel, Severity] = {
    SoundLabel.SIREN: Severity.CRITICAL,
    SoundLabel.HORN: Severity.WARNING,
    SoundLabel.NAME_CALL: Severity.INFO,
    SoundLabel.UNKNOWN: Severity.INFO,
}

# Text rendered on the wearable's OLED screen.
OLED_TEXT: dict[SoundLabel, str] = {
    SoundLabel.SIREN: "Emergency — Ambulance Nearby",
    SoundLabel.HORN: "Vehicle Horn",
    SoundLabel.NAME_CALL: "Someone is Calling You",
    SoundLabel.UNKNOWN: "Sound detected, analyzing...",
}

# LED color + blink pattern per severity level.
LED_MAP: dict[Severity, dict[str, str]] = {
    Severity.CRITICAL: {"color": LEDColor.RED, "pattern": LEDPattern.FAST_BLINK},
    Severity.WARNING: {"color": LEDColor.AMBER, "pattern": LEDPattern.DOUBLE_BLINK},
    Severity.INFO: {"color": LEDColor.BLUE, "pattern": LEDPattern.SLOW_PULSE},
}

# Guidance message shown alongside "What should I do?".
GUIDANCE_TEXT: dict[SoundLabel, str] = {
    SoundLabel.SIREN: "Stay clear of the road. Watch for flashing lights.",
    SoundLabel.HORN: "Check your surroundings. Pause before crossing.",
    SoundLabel.NAME_CALL: "Someone nearby may need your attention.",
    SoundLabel.UNKNOWN: "Unable to confidently identify the sound.",
}

GUIDANCE_TITLE = "What should I do?"

# Priority ordering of sound classes per environment profile.
# Lower index = higher priority for that profile.
PROFILE_PRIORITIES: dict[ProfileName, list[SoundLabel]] = {
    ProfileName.TRAFFIC: [
        SoundLabel.SIREN,
        SoundLabel.HORN,
        SoundLabel.NAME_CALL,
        SoundLabel.UNKNOWN,
    ],
    ProfileName.HOME: [
        SoundLabel.NAME_CALL,
        SoundLabel.SIREN,
        SoundLabel.HORN,
        SoundLabel.UNKNOWN,
    ],
    ProfileName.WORKPLACE: [
        SoundLabel.NAME_CALL,
        SoundLabel.HORN,
        SoundLabel.SIREN,
        SoundLabel.UNKNOWN,
    ],
}

MAX_HISTORY_SIZE = 100

# Static device info that doesn't change per-event (simulated firmware info).
DEVICE_FIRMWARE_VERSION = "1.0.0"
