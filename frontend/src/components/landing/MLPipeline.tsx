import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/Primitives";

const stages = [
  { title: "Data Collection", body: "Real-world siren, horn, and voice samples captured across environments." },
  { title: "Feature Extraction", body: "Audio converted to spectrogram features tuned for embedded inference." },
  { title: "Model Training", body: "A compact classifier trained in Edge Impulse and optimized for ESP32." },
  { title: "On-Device Inference", body: "The model runs locally — no cloud round-trip needed to detect a sound." },
];

export default function MLPipeline() {
  return (
    <section className="container-page py-20">
      <SectionHeading
        eyebrow="Machine Learning"
        title="A classifier small enough to live on the wrist."
        description="Trained with Edge Impulse and compiled down to run entirely on-device."
      />
      <div className="grid md:grid-cols-4 gap-5">
        {stages.map((stage, i) => (
          <motion.div
            key={stage.title}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="glass rounded-2xl p-6 relative"
          >
            <span className="font-mono text-xs text-signal-dark">{`0${i + 1}`}</span>
            <h3 className="mt-3 font-display font-semibold">{stage.title}</h3>
            <p className="mt-2 text-sm text-ink/60 leading-relaxed">{stage.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
