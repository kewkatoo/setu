import { useCallback, useEffect, useRef, useState } from "react";
import { getCurrentAlert, getHistory } from "@/services/alertService";
import { subscribeToLiveAlerts } from "@/services/socketService";
import type { AlertEvent, ConnectionState } from "@/types";

const RETURN_TO_LISTENING_MS = 6000;

export function useLiveAlerts() {
  const [currentAlert, setCurrentAlert] = useState<AlertEvent | null>(null);
  const [history, setHistory] = useState<AlertEvent[]>([]);
  const [connection, setConnection] = useState<ConnectionState>("connecting");
  const [isListening, setIsListening] = useState(true);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleIncoming = useCallback((event: AlertEvent) => {
    setCurrentAlert(event);
    setIsListening(false);
    setHistory((prev) => [event, ...prev].slice(0, 25));

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsListening(true);
      setCurrentAlert(null);
    }, RETURN_TO_LISTENING_MS);
  }, []);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const [initial, past] = await Promise.all([getCurrentAlert(), getHistory()]);
      if (!mounted) return;
      if (initial) handleIncoming(initial);
      setHistory(past);
    })();
    return () => {
      mounted = false;
    };
  }, [handleIncoming]);

  useEffect(() => {
    const unsubscribe = subscribeToLiveAlerts(handleIncoming, setConnection);
    return () => {
      unsubscribe();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [handleIncoming]);

  return { currentAlert, history, connection, isListening };
}
