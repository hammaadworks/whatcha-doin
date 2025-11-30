"use client";

import React, { Suspense } from "react";
import { CheckCircle2, XCircle, ArrowRight } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";
import { cn } from "@/lib/utils";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern"; // Dynamic import for background

export const BeforeAfterSection = () => {
  return (
    <section className="relative py-24 px-4 w-full overflow-hidden bg-background">
       <div className="absolute inset-0 z-0">
          <Suspense fallback={null}>
            <AnimatedGridPattern className="opacity-40" />
          </Suspense>
       </div>
      <div className="relative z-10 mx-auto max-w-6xl text-center space-y-12">
        <BlurFade delay={0.2} inView>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            POV: Life Before vs. After <span className="text-primary">whatcha-doin</span>.
          </h2>
        </BlurFade>

        <BlurFade delay={0.4} inView>
          <p className="text-xl md:text-2xl font-light leading-relaxed text-muted-foreground max-w-4xl mx-auto">
            Fr, choose your fighter. Are you gonna stay stuck in that cycle of &apos;almost,&apos; or are you about to flex that consistent, thriving life you were meant to live? The glow-up is real, but you gotta tap in.
          </p>
        </BlurFade>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mt-16 text-left">
          {/* Before Column */}
          <div className="flex flex-col items-start p-8 rounded-xl border border-red-400/30 bg-red-500/10 shadow-lg space-y-6">
            <XCircle className="h-10 w-10 text-red-500" />
            <h3 className="text-2xl font-bold text-red-400">Before: Stuck in the Loop</h3>
            <ul className="space-y-4 text-lg text-muted-foreground">
              <li className="flex items-center gap-3">
                <XCircle className="h-5 w-5 text-red-500 shrink-0" />
                <span>Someone asks &apos;whatcha-doin&apos;?&apos; and you&apos;re like, &apos;IDK, just chilling,&apos; feeling low-key guilty about your non-existent progress.</span>
              </li>
              <li className="flex items-center gap-3">
                <XCircle className="h-5 w-5 text-red-500 shrink-0" />
                <span>That &apos;all-or-nothing&apos; mindset is straight-up gatekeeping your potential. One slip-up? Vibe killer, streak gone, motivation deleted.</span>
              </li>
              <li className="flex items-center gap-3">
                <XCircle className="h-5 w-5 text-red-500 shrink-0" />
                <span>Your big dreams? Still just concepts. Procrastination and distractions are hitting different, keeping you from the main event.</span>
              </li>
              <li className="flex items-center gap-3">
                <XCircle className="h-5 w-5 text-red-500 shrink-0" />
                <span>You&apos;re low-key overwhelmed, scrolling through endless to-dos, but never actually *doing* the things that matter.</span>
              </li>
              <li className="flex items-center gap-3">
                <XCircle className="h-5 w-5 text-red-500 shrink-0" />
                <span>Still rocking that &apos;ambitious underachiever&apos; title, even though you know you&apos;re built different. It&apos;s a whole mood, but not the good kind.</span>
              </li>
            </ul>
          </div>

          {/* After Column */}
          <div className="flex flex-col items-start p-8 rounded-xl border border-green-400/30 bg-green-500/10 shadow-lg space-y-6">
            <CheckCircle2 className="h-10 w-10 text-green-500" />
            <h3 className="text-2xl font-bold text-green-400">After: Your Main Character Era</h3>
            <ul className="space-y-4 text-lg text-muted-foreground">
              <li className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                <span>Someone asks &apos;whatcha-doin&apos;?&apos; You just drop your public profile link and let your consistent wins do the talking. Period.</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                <span>The Two-Day Rule is your cheat code. Miss a day? It&apos;s a reset, not a rekt. Your momentum? Unstoppable.</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                <span>Transforming intent into pure impact. Your journey is your flex, building a consistent, meaningful life, one action at a time.</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                <span>Clarity and confidence are your new default settings. Building habits feels effortless, and you&apos;re actually *doing* it.</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                <span>You&apos;re not just living; you&apos;re *thriving*. That &apos;consistent, capable icon&apos; identity? That&apos;s you. Congrats, king/queen.</span>
              </li>
            </ul>
          </div>
        </div>

        <BlurFade delay={0.6} inView>
            <div className="mt-16 flex justify-center">
                <ArrowRight className="h-8 w-8 text-foreground animate-bounce-horizontal" />
            </div>
        </BlurFade>

        <BlurFade delay={0.8} inView>
            <h3 className="text-3xl font-bold text-foreground">
                <AnimatedGradientText className="inline text-4xl md:text-5xl">
                    So, what&apos;s stopping your glow-up? Tap in.
                </AnimatedGradientText>
            </h3>
        </BlurFade>
      </div>
    </section>
  );
};
