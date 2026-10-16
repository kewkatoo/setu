import { useState } from "react";
import { motion } from "framer-motion";
import { BrainCircuit, Cpu, LayoutDashboard, Mic, Radio } from "lucide-react";
import PageTransition from "@/components/ui/PageTransition";
import { SectionHeading } from "@/components/ui/Primitives";

const stages = [
  {
    icon: Mic,
    title: "Mic",
    summary: "Continuous ambient audio capture",
    detail:
      "A MEMS microphone on the wearable samples ambient sound continuously at low power, feeding a rolling audio buffer.",
  },
  {
    icon: Cpu,
    title: "ESP32",
    summary: "On-device orchestration",
    detail:
      "The ESP32-S3 manages sampling, buffers audio windows, and runs the compiled inference model directly on-chip.",
  },
  {
    icon: BrainCircuit,
    title: "Edge Impulse",
    summary: "Sound classification",
    detail:
      "A model trained in Edge Impulse classifies each audio window into Emergency Siren, Vehicle Horn, Someone Calling You, or Unknown.",
  },
  {
    icon: Radio,
    title: "FastAPI",
    summary: "Event relay & history",
    detail:
      "Classified events are sent to the FastAPI backend, which stores history, serves device status, and streams live events over WebSocket.",
  },
  {
    icon: LayoutDashboard,
    title: "Dashboard",
    summary: "Human-readable alerts",
    detail:
      "The React dashboard renders alerts in real time — color-coded by severity, with a recommended action and full timeline.",
  },
];

export default function Architecture() {
  const [active, setActive] = useState(0);

  return (
    <PageTransition>
      <div className="container-page py-16">
        <SectionHeading
          eyebrow="System Architecture"
          title="Five stages, one continuous signal."
          description="Select a stage to see how sound travels from the physical world into a clear visual alert."
        />

        <div className="grid md:grid-cols-[1fr_1.1fr] gap-10 items-start">
          <div className="glass rounded-3xl p-8">
            <div className="flex flex-col gap-3">
              {stages.map((stage, i) => (
                <button
                  key={stage.title}
                  onClick={() => setActive(i)}
                  className={`flex items-center gap-4 p-4 rounded-2xl text-left transition-colors ${
                    active === i ? "bg-white shadow-glass" : "hover:bg-white/50"
                  }`}
                >
                  <span
                    className={`grid place-items-center w-11 h-11 rounded-xl shrink-0 ${
                      active === i ? "bg-signal/10 text-signal-dark" : "bg-ink/5 text-ink/40"
                    }`}
                  >
                    <stage.icon size={20} />
                  </span>
                  <div className="min-w-0">
                    <p className={`font-medium ${active === i ? "text-ink" : "text-ink/60"}`}>{stage.title}</p>
                    <p className="text-xs text-ink/40 truncate">{stage.summary}</p>
                  </div>
                  {i < stages.length - 1 && (
                    <span className="ml-auto text-ink/20 font-mono text-xs hidden sm:inline">↓</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="glass rounded-3xl p-10 min-h-[320px] flex flex-col justify-center"
          >
            <span className="grid place-items-center w-16 h-16 rounded-2xl bg-signal/10 text-signal-dark mb-6">
              {(() => {
                const Icon = stages[active].icon;
                return <Icon size={28} />;
              })()}
            </span>
            <h3 className="text-2xl font-display font-semibold">{stages[active].title}</h3>
            <p className="mt-4 text-ink/60 leading-relaxed text-lg">{stages[active].detail}</p>
            <div className="mt-8 flex items-center gap-1.5">
              {stages.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 rounded-full transition-all ${
                    i === active ? "w-8 bg-signal" : "w-1.5 bg-ink/10"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
