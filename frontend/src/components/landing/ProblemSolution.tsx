import { motion } from "framer-motion";
import { EarOff, Eye, ShieldAlert, Zap } from "lucide-react";
import { GlassCard, SectionHeading } from "@/components/ui/Primitives";

const problems = [
  {
    icon: EarOff,
    title: "Sound carries risk",
    body: "Sirens, horns, and calls signal danger or connection — but they're invisible to those who can't hear them.",
  },
  {
    icon: ShieldAlert,
    title: "Delay costs safety",
    body: "By the time a visual cue like flashing lights appears, the moment to react has often already passed.",
  },
];

const solutions = [
  {
    icon: Eye,
    title: "Instant translation",
    body: "An on-device model classifies environmental sound in real time and turns it into a clear visual signal.",
  },
  {
    icon: Zap,
    title: "Built for the body",
    body: "Lightweight, low-power hardware worn comfortably, with alerts that reach a phone or dashboard in milliseconds.",
  },
];

function Row({ items, tint }: { items: typeof problems; tint: string }) {
  return (
    <div className="grid sm:grid-cols-2 gap-5">
      {items.map((item, i) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
        >
          <GlassCard className="p-7 h-full">
            <div className={`w-10 h-10 rounded-xl grid place-items-center ${tint}`}>
              <item.icon size={18} />
            </div>
            <h3 className="mt-5 font-display font-semibold text-lg">{item.title}</h3>
            <p className="mt-2 text-ink/60 leading-relaxed">{item.body}</p>
          </GlassCard>
        </motion.div>
      ))}
    </div>
  );
}

export default function ProblemSolution() {
  return (
    <section className="container-page py-20 grid md:grid-cols-2 gap-14">
      <div>
        <SectionHeading eyebrow="The gap" title="Sound-based cues leave people out." />
        <Row items={problems} tint="bg-severity-critical/10 text-severity-critical" />
      </div>
      <div>
        <SectionHeading eyebrow="The bridge" title="SETU closes it in real time." />
        <Row items={solutions} tint="bg-signal/10 text-signal-dark" />
      </div>
    </section>
  );
}
