import { AnimatePresence, motion } from "framer-motion";
import { Ear, Siren, Volume2 } from "lucide-react";
import type { AlertEvent } from "@/types";
import { severityConfig, formatTime } from "@/utils/severity";
import Waveform from "./Waveform";

function iconFor(sound: string) {
  if (/siren/i.test(sound)) return Siren;
  if (/calling|voice/i.test(sound)) return Ear;
  return Volume2;
}

export default function CurrentAlertCard({
  alert,
  isListening,
}: {
  alert: AlertEvent | null;
  isListening: boolean;
}) {
  return (
    <div className="glass rounded-3xl p-8 relative overflow-hidden min-h-[280px] flex flex-col justify-center">
      <AnimatePresence mode="wait">
        {alert ? (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="relative z-10 text-center"
          >
            <div className="relative w-20 h-20 mx-auto mb-6">
              <span className={`absolute inset-0 rounded-full ${severityConfig[alert.severity].bg} animate-pulseRing`} />
              <span className={`relative grid place-items-center w-20 h-20 rounded-full ${severityConfig[alert.severity].bg} ring-2 ${severityConfig[alert.severity].ring}`}>
                {(() => {
                  const Icon = iconFor(alert.sound);
                  return <Icon size={30} className={severityConfig[alert.severity].text} />;
                })()}
              </span>
            </div>
            <h2 className="text-2xl font-display font-semibold">{alert.sound}</h2>
            <p className={`mt-1 text-sm font-medium uppercase tracking-wide ${severityConfig[alert.severity].text}`}>
              {severityConfig[alert.severity].label} severity
            </p>
            <div className="mt-5 flex items-center justify-center gap-6 text-sm text-ink/50 font-mono">
              <span>{alert.confidence}% confidence</span>
              <span>{formatTime(alert.timestamp)}</span>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="listening"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10 text-center"
          >
            <p className="text-ink/40 font-mono text-sm uppercase tracking-[0.2em] mb-4">
              {isListening ? "Listening…" : "Idle"}
            </p>
            <Waveform active={isListening} />
            <p className="mt-6 text-ink/50">No active alerts right now.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
