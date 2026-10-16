import { motion } from "framer-motion";
import type { ConnectionState } from "@/types";

const config: Record<ConnectionState, { label: string; dot: string }> = {
  connected: { label: "Live", dot: "bg-signal" },
  connecting: { label: "Connecting…", dot: "bg-severity-medium" },
  disconnected: { label: "Offline", dot: "bg-severity-critical" },
};

export default function ConnectionStatus({ state }: { state: ConnectionState }) {
  const c = config[state];
  return (
    <div className="inline-flex items-center gap-2 glass rounded-full px-3.5 py-1.5">
      <span className="relative flex h-2 w-2">
        {state === "connected" && (
          <motion.span
            className={`absolute inline-flex h-full w-full rounded-full ${c.dot} opacity-75`}
            animate={{ scale: [1, 2], opacity: [0.6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          />
        )}
        <span className={`relative inline-flex rounded-full h-2 w-2 ${c.dot}`} />
      </span>
      <span className="text-xs font-mono text-ink/60">{c.label}</span>
    </div>
  );
}
