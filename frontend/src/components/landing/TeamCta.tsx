import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { GlassCard, SectionHeading } from "@/components/ui/Primitives";

const team = [
  { name: "Aditi Rao", role: "Embedded Systems" },
  { name: "Kabir Shah", role: "ML / Edge Impulse" },
  { name: "Naina Verma", role: "Product & Design" },
  { name: "Rohan Iyer", role: "Full-Stack" },
];

export function Team() {
  return (
    <section className="container-page py-20">
      <SectionHeading eyebrow="Team" title="Built in one hackathon, for real people." />
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
        {team.map((member, i) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
          >
            <GlassCard className="p-6 text-center">
              <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-signal to-bridge" />
              <h3 className="mt-4 font-display font-semibold">{member.name}</h3>
              <p className="text-sm text-ink/60">{member.role}</p>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function Cta() {
  return (
    <section className="container-page pb-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="rounded-[2rem] bg-ink text-white px-10 py-16 text-center relative overflow-hidden"
      >
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-signal/20 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-bridge/20 blur-3xl" />
        <h2 className="text-3xl md:text-4xl font-display font-semibold relative z-10">
          See the sound around you.
        </h2>
        <p className="mt-4 text-white/60 max-w-md mx-auto relative z-10">
          Open the live dashboard and watch environmental sound become clear,
          actionable alerts.
        </p>
        <Link
          to="/dashboard"
          className="mt-8 inline-flex items-center gap-2 bg-white text-ink px-6 py-3.5 rounded-full font-medium hover:bg-signal-light transition-colors relative z-10"
        >
          Launch Dashboard <ArrowRight size={16} />
        </Link>
      </motion.div>
    </section>
  );
}
