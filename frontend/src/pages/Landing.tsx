import PageTransition from "@/components/ui/PageTransition";
import Hero from "@/components/landing/Hero";
import ProblemSolution from "@/components/landing/ProblemSolution";
import HowItWorks from "@/components/landing/HowItWorks";
import ArchitecturePreview from "@/components/landing/ArchitecturePreview";
import Hardware from "@/components/landing/Hardware";
import MLPipeline from "@/components/landing/MLPipeline";
import { Team, Cta } from "@/components/landing/TeamCta";

export default function Landing() {
  return (
    <PageTransition>
      <Hero />
      <ProblemSolution />
      <HowItWorks />
      <ArchitecturePreview />
      <Hardware />
      <MLPipeline />
      <Team />
      <Cta />
    </PageTransition>
  );
}
