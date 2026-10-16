from enum import Enum


class SoundLabel(str, Enum):
    SIREN = "siren"
    HORN = "horn"
    NAME_CALL = "name_call"
    UNKNOWN = "unknown"


class Severity(str, Enum):
    CRITICAL = "critical"
    WARNING = "warning"
    INFO = "info"


class LEDColor(str, Enum):
    RED = "red"
    AMBER = "amber"
    BLUE = "blue"


class LEDPattern(str, Enum):
    FAST_BLINK = "fast_blink"
    DOUBLE_BLINK = "double_blink"
    SLOW_PULSE = "slow_pulse"


class ProfileName(str, Enum):
    TRAFFIC = "Traffic"
    HOME = "Home"
    WORKPLACE = "Workplace"
