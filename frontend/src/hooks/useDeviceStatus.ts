import { useEffect, useState } from "react";
import { getDeviceStatus } from "@/services/deviceService";
import type { DeviceStatus } from "@/types";

export function useDeviceStatus(pollMs = 15000) {
  const [status, setStatus] = useState<DeviceStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function fetchStatus() {
      try {
        const data = await getDeviceStatus();
        if (mounted) setStatus(data);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    fetchStatus();
    const interval = setInterval(fetchStatus, pollMs);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [pollMs]);

  return { status, loading };
}
