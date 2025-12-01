import React from "react";
import { HeroSection } from "@/components/landing/HeroSection";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { BackstorySection } from "@/components/landing/BackstorySection";
import { BeforeAfterSection } from "@/components/landing/BeforeAfterSection";
import { PsychologySection } from "@/components/landing/PsychologySection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { CTASection } from "@/components/landing/CTASection";
import { DotPattern } from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "whatcha-doin",
  description: "The app that helps you become the person you keep imagining --- by stacking Identity × Discipline × Consistency, one tiny action at a time.",
};

export default function LandingPage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background text-foreground font-mono selection:bg-primary selection:text-primary-foreground">
      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(1200px_circle_at_center,white,transparent)]",
          "opacity-50"
        )}
      />
      <HeroSection />
      <ProblemSection />
      <BackstorySection />
      <BeforeAfterSection />
      <PsychologySection />
      <FeaturesSection />
      <CTASection />
    </div>
  );
}