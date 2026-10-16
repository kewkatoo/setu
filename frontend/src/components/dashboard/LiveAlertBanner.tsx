import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import type { AlertEvent } from "@/types";
import { severityConfig } from "@/utils/severity";

export default function LiveAlertBanner({ alert }: { alert: AlertEvent | null }) {
  return (
    <AnimatePresence>
      {alert && (
        <motion.div
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -24 }}
          transition={{ type: "spring", stiffness: 300, damping: 26 }}
          className={`rounded-2xl px-5 py-4 flex items-center gap-3 ring-1 ${severityConfig[alert.severity].bg} ${severityConfig[alert.severity].ring}`}
        >
          <span className={`grid place-items-center w-9 h-9 rounded-xl ${severityConfig[alert.severity].bg}`}>
            <AlertTriangle size={18} className={severityConfig[alert.severity].text} />
          </span>
          <div>
            <p className={`font-semibold ${severityConfig[alert.severity].text}`}>
              {alert.sound} detected
            </p>
            <p className="text-sm text-ink/60">{alert.recommendation}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
