import { motion } from "framer-motion";

const bars = Array.from({ length: 20 });

export default function Waveform({ active = true }: { active?: boolean }) {
  return (
    <div className="flex items-center gap-1 h-16 justify-center">
      {bars.map((_, i) => (
        <motion.span
          key={i}
          className="w-1.5 rounded-full bg-signal"
          style={{ height: "100%" }}
          animate={active ? { scaleY: [0.2, 1, 0.4, 0.8, 0.2] } : { scaleY: 0.15 }}
          transition={{
            duration: 1.1 + (i % 4) * 0.15,
            repeat: active ? Infinity : 0,
            ease: "easeInOut",
            delay: i * 0.04,
          }}
        />
      ))}
    </div>
  );
}
