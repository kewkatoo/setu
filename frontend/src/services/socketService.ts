import { USE_MOCKS, WS_URL } from "./apiClient";
import { mockAlert } from "./alertService";
import type { AlertEvent } from "@/types";

export type LiveHandler = (event: AlertEvent) => void;
export type StatusHandler = (state: "connected" | "connecting" | "disconnected") => void;

/**
 * Subscribes to /ws/live. Returns an unsubscribe function.
 * In mock mode, fabricates realistic events on a random interval so the
 * dashboard can be demoed with zero backend dependency.
 */
export function subscribeToLiveAlerts(onEvent: LiveHandler, onStatus?: StatusHandler): () => void {
  if (USE_MOCKS) {
    onStatus?.("connecting");
    const connectTimeout = setTimeout(() => onStatus?.("connected"), 500);
    const interval = setInterval(() => {
      onEvent(mockAlert());
    }, 9000 + Math.random() * 6000);
    return () => {
      clearTimeout(connectTimeout);
      clearInterval(interval);
      onStatus?.("disconnected");
    };
  }

  onStatus?.("connecting");
  const socket = new WebSocket(WS_URL);

  socket.onopen = () => onStatus?.("connected");
  socket.onclose = () => onStatus?.("disconnected");
  socket.onerror = () => onStatus?.("disconnected");
  socket.onmessage = (msg) => {
    try {
      const data = JSON.parse(msg.data) as AlertEvent;
      onEvent(data);
    } catch {
      // ignore malformed frames
    }
  };

  return () => socket.close();
}
