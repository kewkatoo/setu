import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Eyebrow } from "@/components/ui/Primitives";

const bars = Array.from({ length: 28 });

export default function Hero() {
  return (
    <section className="container-page pt-16 md:pt-24 pb-20 grid md:grid-cols-2 gap-12 items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Eyebrow>
          <Sparkles size={12} /> Wearable · ESP32 · Edge Impulse
        </Eyebrow>
        <h1 className="mt-6 text-5xl md:text-6xl font-semibold tracking-tight leading-[1.05]">
          Sound, made
          <br />
          <span className="text-signal-dark">visible.</span>
        </h1>
        <p className="mt-6 text-lg text-ink/60 leading-relaxed max-w-md">
          SETU listens to the world around you and turns sirens, horns, and calls
          into instant, understandable alerts — a bridge between hearing and
          knowing.
        </p>
        <div className="mt-9 flex flex-wrap gap-4">
          <Link
            to="/dashboard"
            className="group inline-flex items-center gap-2 bg-ink text-white px-6 py-3.5 rounded-full font-medium hover:bg-signal-dark transition-colors"
          >
            Open Dashboard
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            to="/architecture"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-medium border border-ink/10 hover:bg-white transition-colors"
          >
            See how it works
          </Link>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="relative"
      >
        <div className="glass rounded-[2rem] p-10 shadow-glow relative overflow-hidden">
          <div className="flex items-end gap-1 h-40 justify-center">
            {bars.map((_, i) => {
              const mid = bars.length / 2;
              const distance = Math.abs(i - mid);
              const height = 100 - distance * 5 + Math.random() * 10;
              const isBridgeCenter = distance < 2;
              return (
                <motion.span
                  key={i}
                  className={`w-1.5 rounded-full ${isBridgeCenter ? "bg-bridge" : "bg-signal"}`}
                  style={{ height: `${Math.max(14, height)}%` }}
                  animate={{ scaleY: [0.5, 1, 0.6, 0.9, 0.5] }}
                  transition={{
                    duration: 1.6 + (i % 5) * 0.15,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.03,
                  }}
                />
              );
            })}
          </div>
          <p className="text-center mt-6 text-sm font-mono text-ink/40 tracking-wide">
            waveform → understanding
          </p>
        </div>
        <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-signal/20 blur-2xl" />
      </motion.div>
    </section>
  );
}
