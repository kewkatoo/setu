import { apiClient, USE_MOCKS } from "./apiClient";
import { generateMockAlert, generateMockHistory } from "./mockData";
import type { AlertEvent } from "@/types";

export async function getCurrentAlert(): Promise<AlertEvent | null> {
  if (USE_MOCKS) {
    await delay(300);
    return null; // no active alert by default; live ones arrive via WebSocket
  }
  const res = await apiClient.get<AlertEvent>("/api/current-alert");
  return res.data;
}

export async function getHistory(): Promise<AlertEvent[]> {
  if (USE_MOCKS) {
    await delay(300);
    return generateMockHistory();
  }
  const res = await apiClient.get<AlertEvent[]>("/api/history");
  return res.data;
}

// Used only by the mock WebSocket layer to fabricate a realistic event.
export function mockAlert(): AlertEvent {
  return generateMockAlert();
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
