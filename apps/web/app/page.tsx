import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AuroraBackground } from "@/components/ui/AuroraBackground";

import { Hero } from "@/features/landing/components/Hero";
import { DashboardPreview } from "@/features/landing/components/DashboardPreview";
import { FeatureSection } from "@/features/landing/components/FeatureSection";
import { ModulesSection } from "@/features/landing/components/ModulesSection";
import { HowItWorksSection } from "@/features/landing/components/HowItWorksSection";
import { SecuritySection } from "@/features/landing/components/SecuritySection";
import { FinalCTASection } from "@/features/landing/components/FinalCTASection";

export default function HomePage() {
  return (
    <AuroraBackground>
      <Navbar />

      <main className="relative">
        <Hero />
        <DashboardPreview />
        <FeatureSection />
        <ModulesSection />
        <HowItWorksSection />
        <SecuritySection />
        <FinalCTASection />
      </main>
      
      <Footer />
    </AuroraBackground>
  );
}