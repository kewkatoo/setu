import type { AlertEvent, DeviceStatus, Severity } from "@/types";

const SOUND_LIBRARY: { sound: string; severity: Severity; recommendation: string }[] = [
  { sound: "Siren", severity: "critical", recommendation: "Stay clear of the road. Emergency vehicle approaching." },
  { sound: "Horn", severity: "medium", recommendation: "Check your surroundings before crossing." },
  { sound: "Someone Calling You", severity: "info", recommendation: "Someone nearby may be trying to get your attention." },
  { sound: "Unknown", severity: "unknown", recommendation: "An unrecognized sound was detected nearby." },
];

let idCounter = 100;

export function generateMockAlert(): AlertEvent {
  const pick = SOUND_LIBRARY[Math.floor(Math.random() * SOUND_LIBRARY.length)];
  idCounter += 1;
  return {
    id: idCounter,
    sound: pick.sound,
    severity: pick.severity,
    confidence: Math.floor(80 + Math.random() * 19),
    recommendation: pick.recommendation,
    timestamp: new Date().toISOString(),
  };
}

export function generateMockHistory(count = 8): AlertEvent[] {
  return Array.from({ length: count }, (_, i) => {
    const pick = SOUND_LIBRARY[Math.floor(Math.random() * SOUND_LIBRARY.length)];
    return {
      id: i + 1,
      sound: pick.sound,
      severity: pick.severity,
      confidence: Math.floor(78 + Math.random() * 20),
      timestamp: new Date(Date.now() - (count - i) * 1000 * 60 * 7).toISOString(),
    };
  });
}

export function generateMockDeviceStatus(): DeviceStatus {
  return {
    battery: 90,
    wifi: true,
    microphone: true,
    oled: true,
    rgb: true,
    inference: "running",
  };
}
