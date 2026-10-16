import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/Primitives";

const steps = [
  { label: "Capture", body: "A miniature mic on the wearable continuously samples ambient sound." },
  { label: "Classify", body: "Edge Impulse runs an on-device model to identify the sound category in milliseconds." },
  { label: "Relay", body: "ESP32 pushes the classified event to the SETU backend over Wi-Fi." },
  { label: "Understand", body: "The dashboard and wearable display translate sound into a clear, color-coded alert." },
];

export default function HowItWorks() {
  return (
    <section className="container-page py-20">
      <SectionHeading
        eyebrow="Flow"
        title="From vibration to understanding, in under a second."
        description="Every stage is designed to be fast enough to matter and simple enough to trust."
      />
      <div className="relative grid md:grid-cols-4 gap-8">
        <div className="hidden md:block absolute top-6 left-[12%] right-[12%] h-px bg-ink/10" />
        {steps.map((step, i) => (
          <motion.div
            key={step.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            className="relative"
          >
            <div className="w-12 h-12 rounded-2xl bg-white shadow-glass grid place-items-center font-mono text-signal-dark font-semibold relative z-10 border border-ink/5">
              {String(i + 1).padStart(2, "0")}
            </div>
            <h3 className="mt-5 font-display font-semibold text-lg">{step.label}</h3>
            <p className="mt-2 text-ink/60 leading-relaxed text-sm">{step.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
