import { motion } from "framer-motion";
import { BatteryFull, Cpu, Mic, MonitorSmartphone, Wifi } from "lucide-react";
import { GlassCard, SectionHeading } from "@/components/ui/Primitives";

const specs = [
  { icon: Cpu, label: "ESP32-S3", detail: "Dual-core, on-device inference" },
  { icon: Mic, label: "MEMS Mic", detail: "Continuous ambient sampling" },
  { icon: MonitorSmartphone, label: "OLED + RGB", detail: "At-a-glance visual alerts" },
  { icon: Wifi, label: "Wi-Fi Radio", detail: "Low-latency event relay" },
  { icon: BatteryFull, label: "All-day battery", detail: "Rechargeable, wearable-safe" },
];

export default function Hardware() {
  return (
    <section className="container-page py-20">
      <SectionHeading
        eyebrow="Hardware"
        title="Small enough to wear, capable enough to trust."
      />
      <div className="grid sm:grid-cols-2 md:grid-cols-5 gap-5">
        {specs.map((spec, i) => (
          <motion.div
            key={spec.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: i * 0.08 }}
          >
            <GlassCard className="p-6 h-full">
              <spec.icon size={20} className="text-bridge" />
              <h3 className="mt-4 font-display font-semibold">{spec.label}</h3>
              <p className="mt-1 text-sm text-ink/60">{spec.detail}</p>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
