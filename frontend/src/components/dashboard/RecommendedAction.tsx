import { motion } from "framer-motion";
import { Compass } from "lucide-react";
import type { AlertEvent } from "@/types";
import { severityConfig } from "@/utils/severity";

export default function RecommendedAction({ alert }: { alert: AlertEvent | null }) {
  return (
    <div className="glass rounded-3xl p-7 h-full flex flex-col">
      <div className="flex items-center gap-2 text-ink/50 text-sm font-medium">
        <Compass size={16} /> Recommended Action
      </div>
      <motion.p
        key={alert?.id ?? "default"}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`mt-4 text-lg font-medium leading-snug flex-1 ${alert ? severityConfig[alert.severity].text : "text-ink/70"}`}
      >
        {alert?.recommendation ?? "Stay as you are — no action needed right now."}
      </motion.p>
    </div>
  );
}
