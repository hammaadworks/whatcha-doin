"use client";

import { BlurFade } from "@/components/ui/blur-fade";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

const beforeItems = [
  "Overthinking → no action",
  "Streak breaks → momentum gone",
  "Big goals → burnout",
  "Productivity apps → too complex",
];

const afterItems = [
  "Tiny habits → daily identity XP",
  "Two-Day Rule → consistency made human",
  "Action chips → calm visual clarity",
  "Journaling → auto-documented growth",
];

export function BeforeAfterSection() {
  return (
    <section className="py-24 px-4 w-full bg-secondary/30">
      <div className="max-w-5xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <BlurFade delay={0.2} inView>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
              Your identity shift <span className="text-primary">starts small.</span>
            </h2>
          </BlurFade>
          <BlurFade delay={0.3} inView>
             <p className="text-xl text-muted-foreground">
               You go from "trying to be disciplined" to <span className="text-foreground font-bold italic">being</span> a disciplined person.
             </p>
          </BlurFade>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Before Card */}
            <BlurFade delay={0.4} inView>
                <div className="h-full p-8 rounded-3xl bg-background border border-destructive/20 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-1 h-full bg-destructive/50 group-hover:bg-destructive transition-colors" />
                    <h3 className="text-2xl font-bold text-destructive mb-8 flex items-center gap-2">
                        <X className="w-6 h-6" /> Before
                    </h3>
                    <ul className="space-y-6">
                        {beforeItems.map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-muted-foreground text-lg">
                                <div className="h-2 w-2 rounded-full bg-destructive/40" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </BlurFade>

            {/* After Card */}
            <BlurFade delay={0.5} inView>
                <div className="h-full p-8 rounded-3xl bg-background border border-primary/20 shadow-xl relative overflow-hidden group">
                     <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute top-0 left-0 w-1 h-full bg-primary group-hover:shadow-[0_0_20px_rgba(var(--primary),0.5)]" />
                    <h3 className="text-2xl font-bold text-primary mb-8 flex items-center gap-2 relative z-10">
                        <Check className="w-6 h-6" /> After
                    </h3>
                    <ul className="space-y-6 relative z-10">
                        {afterItems.map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-foreground font-medium text-lg">
                                <div className="h-2 w-2 rounded-full bg-primary" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </BlurFade>
        </div>
      </div>
    </section>
  );
}