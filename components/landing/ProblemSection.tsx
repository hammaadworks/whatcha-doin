"use client";

import React from "react";
import { BlurFade } from "@/components/ui/blur-fade";
import { DotPattern } from "@/components/ui/dot-pattern";

export const ProblemSection = () => {
  return (
    <section className="relative py-24 px-4 overflow-hidden w-full">
       {/* Background: DotPattern */}
       <div className="absolute inset-0 w-full h-full">
            <DotPattern className="opacity-50 dark:opacity-30 text-primary/30" width={24} height={24} cx={1} cy={1} cr={1} />
       </div>
       <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background pointer-events-none" />

       <div className="relative z-10 mx-auto max-w-3xl text-center space-y-12">
           <BlurFade delay={0.2} inView>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  The Struggle is Real: Ambitious, But Stuck?
              </h2>
           </BlurFade>
           <div className="space-y-6 text-xl md:text-2xl font-light leading-relaxed text-muted-foreground">
               <BlurFade delay={0.4} inView>
                   <p>You&apos;ve got main character energy, fam, with dreams that hit different. But low-key, that to-do list? It&apos;s been on read.</p>
               </BlurFade>
               <BlurFade delay={0.6} inView>
                   <p>Caught in that <span className="text-foreground font-medium">&apos;all-or-nothing&apos;</span> trap, getting ghosted by motivation, and those little slip-ups? They&apos;re living rent-free in your head, keeping you in a cycle of &apos;ugh&apos;.</p>
               </BlurFade>
               <BlurFade delay={0.8} inView>
                   <p>One missed day feels like a whole vibe killer. Suddenly, the momentum&apos;s gone, the motivation&apos;s dead, and your progress? Poof, vanished like a bad TikTok trend.</p>
               </BlurFade>
               <BlurFade delay={1.0} inView>
                   <p>But what if consistency wasn&apos;t about being perfect 24/7, but just showing up? What if every tiny flex, every imperfect step, was actually building the icon you&apos;re meant to be?</p>
               </BlurFade>
               <BlurFade delay={1.2} inView>
                   <p className="text-primary font-semibold pt-4 text-2xl md:text-3xl">Fr, it&apos;s time to switch up the narrative. To redefine &apos;doing&apos; and drop the cap about your potential.</p>
               </BlurFade>
           </div>
       </div>
    </section>
  );
};
