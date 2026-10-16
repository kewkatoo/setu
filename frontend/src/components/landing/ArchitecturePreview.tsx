import { motion } from "framer-motion";
import { Cpu, Mic, Radio, LayoutDashboard, BrainCircuit } from "lucide-react";
import { Link } from "react-router-dom";
import { SectionHeading } from "@/components/ui/Primitives";

const nodes = [
  { icon: Mic, label: "Mic" },
  { icon: Cpu, label: "ESP32" },
  { icon: BrainCircuit, label: "Edge Impulse" },
  { icon: Radio, label: "FastAPI" },
  { icon: LayoutDashboard, label: "Dashboard" },
];

export default function ArchitecturePreview() {
  return (
    <section className="container-page py-20">
      <SectionHeading eyebrow="System" title="One continuous signal path." />
      <div className="glass rounded-3xl p-10 overflow-x-auto">
        <div className="flex items-center justify-between min-w-[640px] gap-2">
          {nodes.map((node, i) => (
            <div key={node.label} className="flex items-center flex-1">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="flex flex-col items-center gap-3 text-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-white shadow-glass grid place-items-center text-bridge">
                  <node.icon size={22} />
                </div>
                <span className="text-sm font-medium text-ink/70">{node.label}</span>
              </motion.div>
              {i < nodes.length - 1 && (
                <div className="flex-1 h-px bg-gradient-to-r from-signal/20 via-signal to-signal/20 relative mx-2">
                  <motion.div
                    className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-signal"
                    animate={{ left: ["0%", "100%"] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "linear", delay: i * 0.3 }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6">
        <Link to="/architecture" className="text-signal-dark font-medium text-sm hover:underline">
          Explore the full architecture →
        </Link>
      </div>
    </section>
  );
}
