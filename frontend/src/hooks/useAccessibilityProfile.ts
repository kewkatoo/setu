import { useState } from "react";
import { updateProfile } from "@/services/profileService";
import type { AccessibilityProfile } from "@/types";

export function useAccessibilityProfile(initial: AccessibilityProfile = "Home") {
  const [profile, setProfile] = useState<AccessibilityProfile>(initial);
  const [saving, setSaving] = useState(false);

  async function changeProfile(next: AccessibilityProfile) {
    setProfile(next);
    setSaving(true);
    try {
      await updateProfile(next);
    } finally {
      setSaving(false);
    }
  }

  return { profile, saving, changeProfile };
}
