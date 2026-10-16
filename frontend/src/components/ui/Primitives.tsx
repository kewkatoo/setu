import type { HTMLAttributes, ReactNode } from "react";
import { motion } from "framer-motion";

export function GlassCard({
  children,
  className = "",
  hover = true,
  ...rest
}: { children: ReactNode; className?: string; hover?: boolean } & HTMLAttributes<HTMLDivElement>) {
  return (
    <motion.div
      whileHover={hover ? { y: -3 } : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className={`glass rounded-3xl ${className}`}
      {...(rest as any)}
    >
      {children}
    </motion.div>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-signal-dark bg-signal/10 px-3 py-1 rounded-full">
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-2xl mb-12">
      {eyebrow && <div className="mb-4">
        <Eyebrow>{eyebrow}</Eyebrow>
      </div>}
      <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-ink">{title}</h2>
      {description && <p className="mt-4 text-ink/60 text-lg leading-relaxed">{description}</p>}
    </div>
  );
}
