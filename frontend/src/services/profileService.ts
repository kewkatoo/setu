import { apiClient, USE_MOCKS } from "./apiClient";
import type { AccessibilityProfile, ProfilePayload } from "@/types";

export async function updateProfile(profile: AccessibilityProfile): Promise<ProfilePayload> {
  if (USE_MOCKS) {
    await new Promise((r) => setTimeout(r, 200));
    return { profile };
  }
  const res = await apiClient.post<ProfilePayload>("/api/profile", { profile });
  return res.data;
}
