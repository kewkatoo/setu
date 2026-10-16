import { AnimatePresence, motion } from "framer-motion";
import { History } from "lucide-react";
import type { AlertEvent } from "@/types";
import { severityConfig, formatRelative } from "@/utils/severity";

export default function AlertTimeline({ events }: { events: AlertEvent[] }) {
  return (
    <div className="glass rounded-3xl p-7">
      <div className="flex items-center gap-2 text-ink/50 text-sm font-medium mb-4">
        <History size={16} /> Alert Timeline
      </div>
      {events.length === 0 ? (
        <p className="py-8 text-center text-ink/30 text-sm">No events yet today.</p>
      ) : (
        <ul className="space-y-1 max-h-[420px] overflow-y-auto pr-1">
          <AnimatePresence initial={false}>
            {events.map((event) => (
              <motion.li
                key={event.id}
                layout
                initial={{ opacity: 0, x: -16, height: 0 }}
                animate={{ opacity: 1, x: 0, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35 }}
                className="flex items-center gap-3 py-2.5 border-b border-ink/5 last:border-0"
              >
                <span className={`w-2 h-2 rounded-full shrink-0 ${severityConfig[event.severity].dot}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{event.sound}</p>
                </div>
                <span className="text-xs font-mono text-ink/40 shrink-0">{formatRelative(event.timestamp)}</span>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      )}
    </div>
  );
}
