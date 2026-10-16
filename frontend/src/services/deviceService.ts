import { apiClient, USE_MOCKS } from "./apiClient";
import { generateMockDeviceStatus } from "./mockData";
import type { DeviceStatus } from "@/types";

export async function getDeviceStatus(): Promise<DeviceStatus> {
  if (USE_MOCKS) {
    await new Promise((r) => setTimeout(r, 250));
    return generateMockDeviceStatus();
  }
  const res = await apiClient.get<DeviceStatus>("/api/device/status");
  return res.data;
}
