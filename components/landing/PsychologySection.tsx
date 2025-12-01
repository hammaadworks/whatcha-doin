"use client";

import { cn } from "@/lib/utils";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { BlurFade } from "@/components/ui/blur-fade";
import { Anchor, Zap, Timer, Activity, BookOpen } from "lucide-react";

const items = [
  {
    title: "Identity Anchoring",
    description: "You align each habit with the identity you want.",
    header: <Anchor className="h-full w-full text-primary opacity-50" />,
    icon: <Anchor className="h-4 w-4 text-neutral-500" />,
    className: "md:col-span-2",
  },
  {
    title: "Micro-Commitments",
    description: "Tiny actions create compounding momentum.",
    header: <Zap className="h-full w-full text-primary opacity-50" />,
    icon: <Zap className="h-4 w-4 text-neutral-500" />,
    className: "md:col-span-1",
  },
  {
    title: "Positive Urgency",
    description: "Yesterday fades at midnight --- alive, rhythmic, motivating.",
    header: <Timer className="h-full w-full text-primary opacity-50" />,
    icon: <Timer className="h-4 w-4 text-neutral-500" />,
    className: "md:col-span-1",
  },
  {
    title: "Intensity Logging",
    description: "Track effort, not perfection. 100% and 20% both count.",
    header: <Activity className="h-full w-full text-primary opacity-50" />,
    icon: <Activity className="h-4 w-4 text-neutral-500" />,
    className: "md:col-span-2",
  },
  {
    title: "Automatic Journaling",
    description: "Your story writes itself. Your growth, captured seamlessly.",
    header: <BookOpen className="h-full w-full text-primary opacity-50" />,
    icon: <BookOpen className="h-4 w-4 text-neutral-500" />,
    className: "md:col-span-3",
  },
];

export function PsychologySection() {
  return (
    <section className="py-24 px-4 w-full bg-background">
      <div className="max-w-5xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <BlurFade delay={0.2} inView>
             <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
               The science behind why <br/>
               <span className="text-primary">whatcha-doin works.</span>
             </h2>
          </BlurFade>
        </div>

        <BlurFade delay={0.4} inView>
            <BentoGrid className="max-w-4xl mx-auto">
            {items.map((item, i) => (
                <BentoGridItem
                key={i}
                title={item.title}
                description={item.description}
                header={item.header}
                icon={item.icon}
                className={item.className}
                />
            ))}
            </BentoGrid>
        </BlurFade>

         <BlurFade delay={0.6} inView>
             <div className="text-center mt-12">
                <p className="text-lg md:text-xl text-muted-foreground italic">
                    "You are what you repeatedly do. We help you make that your superpower."
                </p>
             </div>
         </BlurFade>
      </div>
    </section>
  );
}
