export type Severity = "critical" | "medium" | "info" | "unknown";

export interface AlertEvent {
  id: number;
  sound: string;
  severity: Severity;
  confidence: number;
  recommendation?: string;
  timestamp: string;
}

export interface DeviceStatus {
  battery: number;
  wifi: boolean;
  microphone: boolean;
  oled: boolean;
  rgb: boolean;
  inference: "running" | "idle" | "error";
}

export type AccessibilityProfile = "Traffic" | "Home" | "Workplace";

export interface ProfilePayload {
  profile: AccessibilityProfile;
}

export type ConnectionState = "connected" | "connecting" | "disconnected";
