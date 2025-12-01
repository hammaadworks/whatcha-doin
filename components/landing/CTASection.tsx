"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WarpBackground } from "@/components/ui/warp-background";
import { CoolMode } from "@/components/ui/cool-mode";

export const CTASection = () => {
  return (
    <section className="relative w-full overflow-hidden">
        <WarpBackground className="py-32 w-full border-none" perspective={100} beamsPerSide={5} beamSize={4} gridColor="hsl(var(--primary))">
            <div className="mx-auto max-w-2xl text-center space-y-8 relative z-10 bg-background/80 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-border/50 shadow-2xl">
                <h2 className="text-4xl font-bold tracking-tight sm:text-6xl bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
                    Your Glow-Up? <span className="text-primary">It Starts Now.</span> Period.
                </h2>
                <p className="text-xl text-muted-foreground">
                    No cap, the wait is over. Ditch the &apos;almosts&apos; and step into your main character era. This ain&apos;t just an app; it&apos;s your launchpad to the consistent, thriving life you&apos;ve been dreaming of. Don&apos;t let your potential stay on read.
                </p>
                <div className="pt-4">
                    <CoolMode>
                        <Link href="/me">
                        <Button size="lg" className="h-14 px-8 rounded-full text-lg shadow-[0_0_40px_-10px_rgba(var(--primary-rgb),0.5)] hover:shadow-[0_0_60px_-10px_rgba(var(--primary-rgb),0.6)] transition-all duration-500">
                            Tap In & Unleash My Power &rarr;
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                        </Link>
                    </CoolMode>
                </div>
            </div>
        </WarpBackground>
    </section>
  );
};