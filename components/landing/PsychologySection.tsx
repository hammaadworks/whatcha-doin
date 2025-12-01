"use client";

import { BlurFade } from "@/components/ui/blur-fade";
import { MagicCard } from "@/components/ui/magic-card";
import { Anchor, Zap, Timer, Activity, BookOpen } from "lucide-react";

const items = [
  {
    title: "Identity Anchoring",
    description: "You align each habit with the identity you want.",
    icon: Anchor,
  },
  {
    title: "Micro-Commitments",
    description: "Tiny actions create compounding momentum.",
    icon: Zap,
  },
  {
    title: "Positive Urgency",
    description: "Yesterday fades at midnight --- alive, rhythmic, motivating.",
    icon: Timer,
  },
  {
    title: "Intensity Logging",
    description: "Track effort, not perfection.",
    icon: Activity,
  },
  {
    title: "Automatic Journaling",
    description: "Your story writes itself.",
    icon: BookOpen,
  },
];

export function PsychologySection() {
  return (
    <section className="py-24 px-4 w-full bg-background relative">
      <div className="max-w-5xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="text-center space-y-4">
          <BlurFade delay={0.2} inView>
             <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
               The science behind why <br/>
               <span className="text-primary">whatcha-doin works.</span>
             </h2>
          </BlurFade>
        </div>

        {/* Magic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item, idx) => (
                <BlurFade key={idx} delay={0.3 + idx * 0.1} inView className={idx === 4 ? "md:col-span-2 lg:col-span-1" : ""}>
                    <MagicCard 
                        className="flex flex-col items-center justify-center text-center p-8 min-h-[220px] shadow-sm hover:shadow-md transition-all"
                        gradientColor="rgba(var(--primary), 0.15)"
                    >
                        <div className="p-3 rounded-full bg-primary/10 text-primary mb-4">
                            <item.icon className="w-8 h-8" />
                        </div>
                        <h3 className="text-lg font-bold text-foreground mb-2">
                            {item.title}
                        </h3>
                        <p className="text-muted-foreground">
                            {item.description}
                        </p>
                    </MagicCard>
                </BlurFade>
            ))}
        </div>

        {/* Quote */}
         <BlurFade delay={0.8} inView>
             <div className="text-center mt-12 relative">
                <p className="text-lg md:text-xl text-muted-foreground italic max-w-2xl mx-auto border-l-2 border-primary pl-4">
                    &quot;You are what you repeatedly do. We help you make that your superpower.&quot;
                </p>
             </div>
         </BlurFade>
      </div>
    </section>
  );
}