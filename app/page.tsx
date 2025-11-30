import React, { Suspense } from "react";
import { HeroSection } from "@/components/landing/HeroSection";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { BackstorySection } from "@/components/landing/BackstorySection"; // Import the new BackstorySection
import { BeforeAfterSection } from "@/components/landing/BeforeAfterSection"; // Import the new BeforeAfterSection
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { PWASection } from "@/components/landing/PWASection";
import { CTASection } from "@/components/landing/CTASection";
import { ScrollVelocityContainer, ScrollVelocityRow } from "@/components/ui/scroll-based-velocity";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background text-foreground selection:bg-primary/20">
      <HeroSection />
      
      <div className="py-12 border-y border-border/50 bg-background/30 backdrop-blur-sm">
        <ScrollVelocityContainer>
          <ScrollVelocityRow baseVelocity={-1} className="font-black text-4xl md:text-7xl tracking-tighter opacity-30 text-foreground select-none">
            FOCUS • CONSISTENCY • GROWTH • IDENTITY • ACTION •&nbsp;
          </ScrollVelocityRow>
        </ScrollVelocityContainer>
      </div>

      <ProblemSection />
      <BackstorySection />
      <BeforeAfterSection />
      <FeaturesSection />
      <Suspense fallback={<div className="py-24 text-center">Loading PWA Options...</div>}>
        <PWASection />
      </Suspense>
      <CTASection />
    </div>
  );
}
