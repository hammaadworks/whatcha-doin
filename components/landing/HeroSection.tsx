"use client";

import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { RetroGrid } from "@/components/ui/retro-grid";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { BlurFade } from "@/components/ui/blur-fade";

export function HeroSection() {
  return (
    <section className="relative flex min-h-[90vh] w-full flex-col items-center justify-center overflow-hidden bg-background">
      <div className="z-10 flex max-w-5xl flex-col items-center justify-center gap-6 px-4 text-center">
        <BlurFade delay={0.2} inView>
          <div className="flex items-center justify-center">
            <div className="rounded-full border border-border bg-background/50 backdrop-blur-sm px-4 py-1.5 text-sm font-medium text-muted-foreground shadow-sm">
              <span className="flex items-center gap-1">
                Thinking about it? <ChevronRight className="h-3 w-3" />
              </span>
            </div>
          </div>
        </BlurFade>

        <BlurFade delay={0.4} inView>
          <h1 className="text-5xl font-black tracking-tighter text-foreground sm:text-7xl md:text-8xl lg:text-9xl">
            So... <br className="md:hidden" />
            <span className="text-primary">whatcha doin&apos;?</span>
          </h1>
        </BlurFade>

        <BlurFade delay={0.6} inView>
          <p className="max-w-2xl text-lg text-muted-foreground md:text-xl font-medium leading-relaxed">
            The app that helps you become the person you keep imagining — by
            stacking <span className="text-foreground font-bold">Identity × Discipline × Consistency</span>,
            one tiny action at a time.
          </p>
        </BlurFade>

        <BlurFade delay={0.8} inView>
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <Link href="/logins">
              <ShimmerButton className="shadow-2xl">
                <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                  Start Your Identity Run
                </span>
              </ShimmerButton>
            </Link>
          </div>
        </BlurFade>
        
        <BlurFade delay={1.0} inView>
            <p className="mt-8 text-sm text-muted-foreground italic">
                "Small actions, done consistently, turn ambition into identity."
            </p>
        </BlurFade>
      </div>

      <RetroGrid className="opacity-30" />
    </section>
  );
}