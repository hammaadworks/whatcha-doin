"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { ArrowRight, Brain, Code, Dumbbell, Zap, Calendar, Target } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const Ripple = React.lazy(() => import("@/components/ui/ripple").then(m => ({ default: m.Ripple })));
const OrbitingCircles = React.lazy(() => import("@/components/ui/orbiting-circles").then(m => ({ default: m.OrbitingCircles })));
const ShimmerButton = React.lazy(() => import("@/components/ui/shimmer-button").then(m => ({ default: m.ShimmerButton })));
const BlurFade = React.lazy(() => import("@/components/ui/blur-fade").then(m => ({ default: m.BlurFade })));
const AnimatedShinyText = React.lazy(() => import("@/components/ui/animated-shiny-text").then(m => ({ default: m.AnimatedShinyText })));
const CoolMode = React.lazy(() => import("@/components/ui/cool-mode").then(m => ({ default: m.CoolMode })));
const Meteors = React.lazy(() => import("@/components/ui/meteors").then(m => ({ default: m.Meteors })));


export const HeroSection = () => {
  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden py-24 md:py-32">
      
      {/* Background Effect: Ripple + Meteors */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={null}>
          <Ripple mainCircleSize={210} numCircles={8} className="opacity-60 dark:opacity-40" />
        </Suspense>
        <Suspense fallback={null}>
            <Meteors number={30} className="opacity-70 dark:opacity-50" />
        </Suspense>
        <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/20 to-background" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-8 px-4">
        {/* Left Column: Text Content */}
        <div className="flex flex-col items-center md:items-start gap-8 text-center md:text-left md:w-3/5 lg:w-2/3">
          
          {/* Social Proof / Beta Badge */}
          <div className="flex items-center justify-center md:justify-start">
            <Link href="/me">
                <div className={cn(
                "group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800",
                )}>
                <Suspense fallback={null}>
                  <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
                      <span>✨ v1.0 Public Beta Now Live</span>
                      <ArrowRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
                  </AnimatedShinyText>
                </Suspense>
                </div>
            </Link>
          </div>

          {/* Main Headline */}
          <Suspense fallback={null}>
            <BlurFade delay={0.2} inView>
              <h1 className="max-w-4xl text-5xl font-bold tracking-tighter sm:text-7xl md:text-8xl bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/40">
                Stop Dreaming. <span className="text-primary">Unleash Your Potential.</span>
                <br />
                Start Doing.
              </h1>
            </BlurFade>
          </Suspense>

          {/* Subheadline */}
          <Suspense fallback={null}>
            <BlurFade delay={0.4} inView>
              <p className="max-w-xl text-lg text-muted-foreground md:text-xl">
                Bruh, this ain&apos;t just an app, it&apos;s your glow-up kit. Go from just existing to absolutely *owning* your journey.
                Every small win, every single action? That&apos;s you leveling up, for real. No cap, the future is now.
              </p>
            </BlurFade>
          </Suspense>

          <Suspense fallback={null}>
            <BlurFade delay={0.5} inView>
              <p className="max-w-xl text-md text-muted-foreground md:text-lg italic">
                Inspired by a timeless question: "Whatcha-doin'?" Now you'll always have a great answer!
              </p>
            </BlurFade>
          </Suspense>

          {/* CTAs */}
          <Suspense fallback={null}>
            <BlurFade delay={0.6} inView>
              <div className="flex flex-col items-center gap-4 sm:flex-row">
                <Suspense fallback={null}>
                  <CoolMode>
                    <Link href="/me">
                      <Suspense fallback={null}>
                        <ShimmerButton className="shadow-2xl h-12 px-8 text-base font-medium">
                          <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                            Start Building Your Identity
                          </span>
                        </ShimmerButton>
                      </Suspense>
                    </Link>
                  </CoolMode>
                </Suspense>
                <Link href="#features">
                  <Button variant="ghost" size="lg" className="h-12 rounded-full px-8 text-base">
                    See how it works
                  </Button>
                </Link>
              </div>
            </BlurFade>
          </Suspense>
        </div> {/* End Left Column */}

        {/* Right Column: Orbiting Circles Animation */}
        <div className="w-full md:w-2/5 lg:w-1/3 flex items-center justify-center min-h-[300px] md:min-h-0 relative">
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            {/* Inner Circle (Radius 120) */}
            <Suspense fallback={null}>
              <OrbitingCircles
                  className="border-none bg-transparent"
                  iconSize={40}
                  duration={25}
                  delay={0}
                  radius={120}
              >
                  <Brain className="h-8 w-8 text-blue-500" />
                  <Zap className="h-8 w-8 text-yellow-500" />
                  <Code className="h-8 w-8 text-purple-500" />
              </OrbitingCircles>
            </Suspense>

            {/* Outer Circle (Radius 220) */}
            <Suspense fallback={null}>
              <OrbitingCircles
                  className="border-none bg-transparent"
                  iconSize={60}
                  radius={220}
                  duration={40}
                  reverse
              >
                  <Dumbbell className="h-10 w-10 text-green-500" />
                  <Calendar className="h-10 w-10 text-red-500" />
                  <Target className="h-10 w-10 text-orange-500" />
              </OrbitingCircles>
            </Suspense>
          </div>
        </div> {/* End Right Column */}
      </div>
    </section>
  );
};
