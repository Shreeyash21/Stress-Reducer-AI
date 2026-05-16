import { Navbar } from "@/components/landing/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { CTASection } from "@/components/landing/CTASection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { WellnessStatsSection } from "@/components/landing/WellnessStatsSection";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-dark-950">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <WellnessStatsSection />
      <TestimonialsSection />
      <CTASection />
      <footer className="border-t border-dark-800/50 py-8 px-4 text-center text-dark-500 text-sm">
        <p>© 2026 CYBER. All rights reserved. Built with ❤️ for mental wellness.</p>
      </footer>
    </main>
  );
}
