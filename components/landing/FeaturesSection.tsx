"use client";

import { BlurFade } from "@/components/ui/blur-fade";
import { MagicCard } from "@/components/ui/magic-card";
import { CalendarDays, LayoutGrid, Sliders, BookText, User, Quote } from "lucide-react";

const features = [
  {
    title: "Two-Day Rule",
    description: "Miss one day? Cool. Miss two? Streak resets — sustainably.",
    icon: CalendarDays,
    colSpan: "lg:col-span-2",
  },
  {
    title: "Action Chips",
    description: "Drag. Drop. Done. Brain-friendly productivity.",
    icon: LayoutGrid,
    colSpan: "lg:col-span-1",
  },
  {
    title: "Intensity Slider",
    description: "100% and 20% both count. Effort matters.",
    icon: Sliders,
    colSpan: "lg:col-span-1",
  },
  {
    title: "Auto-Journal Feed",
    description: "Your growth, captured seamlessly.",
    icon: BookText,
    colSpan: "lg:col-span-2",
  },
  {
    title: "Public Profile",
    description: "Your 'Life Resume' — streaks, habits, reflections.",
    icon: User,
    colSpan: "lg:col-span-1",
  },
  {
    title: "Motivational Widget",
    description: "Quotes that actually hit.",
    icon: Quote,
    colSpan: "lg:col-span-2", // Made this wider to break the grid pattern
  },
];

export function FeaturesSection() {
  return (
    <section className="py-24 px-4 w-full bg-background border-t border-border/40">
      <div className="max-w-5xl mx-auto space-y-16">
        <BlurFade delay={0.2} inView>
            <div className="text-center max-w-2xl mx-auto">
                <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">
                    Your identity-building <span className="text-primary">toolkit.</span>
                </h2>
                <p className="text-lg text-muted-foreground">
                    Everything you need to build consistency, designed to look and feel like a modern OS for your life.
                </p>
            </div>
        </BlurFade>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
             <BlurFade key={idx} delay={0.3 + idx * 0.1} inView className={feature.colSpan}>
                <MagicCard 
                    className="h-full p-8 flex flex-col justify-between space-y-6 hover:scale-[1.01] transition-transform duration-300 cursor-default bg-card/50 border-border/50"
                    gradientColor="rgba(var(--primary), 0.1)"
                >
                    <div className="space-y-4">
                        <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                             <feature.icon className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-foreground tracking-tight">
                            {feature.title}
                        </h3>
                    </div>
                    <p className="text-muted-foreground font-medium leading-relaxed">
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
