"use client";

import { BlurFade } from "@/components/ui/blur-fade";
import { MagicCard } from "@/components/ui/magic-card";
import { CalendarDays, LayoutGrid, Sliders, BookText, User, Quote } from "lucide-react";

const features = [
  {
    title: "Two-Day Rule",
    description: "Miss one day? Cool. Miss two? Streak resets — sustainably.",
    icon: CalendarDays,
  },
  {
    title: "Action Chips",
    description: "Drag. Drop. Done. Brain-friendly productivity.",
    icon: LayoutGrid,
  },
  {
    title: "Intensity Slider",
    description: "100% and 20% both count. Effort matters.",
    icon: Sliders,
  },
  {
    title: "Auto-Journal Feed",
    description: "Your growth, captured seamlessly.",
    icon: BookText,
  },
  {
    title: "Public Profile",
    description: "Your 'Life Resume' — streaks, habits, reflections.",
    icon: User,
  },
  {
    title: "Motivational Widget",
    description: "Quotes that actually hit.",
    icon: Quote,
  },
];

export function FeaturesSection() {
  return (
    <section className="py-24 px-4 w-full bg-background border-t border-border/40">
      <div className="max-w-6xl mx-auto space-y-12">
        <BlurFade delay={0.2} inView>
            <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
                    Your identity-building <span className="text-primary">toolkit.</span>
                </h2>
            </div>
        </BlurFade>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
             <BlurFade key={idx} delay={0.3 + idx * 0.1} inView>
                <MagicCard 
                    className="p-8 min-h-[200px] flex flex-col justify-center items-start space-y-4 hover:scale-[1.02] transition-transform duration-300 cursor-default"
                    gradientColor="rgba(var(--primary), 0.2)"
                >
                    <div className="p-3 rounded-lg bg-primary/10 text-primary inline-block">
                         <feature.icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">
                        {feature.title}
                    </h3>
                    <p className="text-muted-foreground">
                        {feature.description}
                    </p>
                </MagicCard>
             </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}