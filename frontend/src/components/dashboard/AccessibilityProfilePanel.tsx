import { motion } from "framer-motion";
import { Home, PersonStanding, TrafficCone } from "lucide-react";
import type { ElementType } from "react";
import type { AccessibilityProfile } from "@/types";

const profiles: { id: AccessibilityProfile; icon: ElementType; blurb: string }[] = [
  { id: "Traffic", icon: TrafficCone, blurb: "Prioritizes sirens and horns" },
  { id: "Home", icon: Home, blurb: "Prioritizes calls and doorbells" },
  { id: "Workplace", icon: PersonStanding, blurb: "Balanced, low-distraction alerts" },
];

export default function AccessibilityProfilePanel({
  profile,
  saving,
  onChange,
}: {
  profile: AccessibilityProfile;
  saving: boolean;
  onChange: (p: AccessibilityProfile) => void;
}) {
  return (
    <div className="glass rounded-3xl p-7">
      <div className="flex items-center justify-between mb-4">
        <span className="text-ink/50 text-sm font-medium">Accessibility Profile</span>
        {saving && <span className="text-xs font-mono text-signal-dark">Saving…</span>}
      </div>
      <div className="grid grid-cols-3 gap-2">
        {profiles.map((p) => {
          const active = p.id === profile;
          return (
            <button
              key={p.id}
              onClick={() => onChange(p.id)}
              className={`relative rounded-2xl p-4 text-left transition-colors border ${
                active ? "border-signal/40 bg-white" : "border-transparent hover:bg-white/60"
              }`}
            >
              {active && (
                <motion.span
                  layoutId="profile-active"
                  className="absolute inset-0 rounded-2xl ring-2 ring-signal/50"
                  transition={{ type: "spring", stiffness: 300, damping: 26 }}
                />
              )}
              <p.icon size={18} className={active ? "text-signal-dark" : "text-ink/50"} />
              <p className={`mt-2 text-sm font-medium ${active ? "text-ink" : "text-ink/70"}`}>{p.id}</p>
              <p className="text-xs text-ink/40 mt-0.5 leading-snug">{p.blurb}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
