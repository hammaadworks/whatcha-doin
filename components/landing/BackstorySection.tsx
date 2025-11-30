"use client";

import React, { Suspense } from "react";
import Image from "next/image"; // Import Image from next/image for optimization
import { BlurFade } from "@/components/ui/blur-fade";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";

export const BackstorySection = () => {
  return (
    <section className="relative py-24 px-4 w-full overflow-hidden bg-background">
       <div className="absolute inset-0 z-0">
          <Suspense fallback={null}>
            <AnimatedGridPattern className="opacity-40" />
          </Suspense>
       </div>
       <div className="relative z-10 mx-auto max-w-4xl text-center space-y-8">
           <BlurFade delay={0.2} inView>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  That Iconic Question: <span className="text-primary">&apos;Whatcha Doin&apos;?&apos;</span> — Redefined.
              </h2>
           </BlurFade>
           <BlurFade delay={0.4} inView>
               <p className="text-xl md:text-2xl font-light leading-relaxed text-muted-foreground">
                   Remember Isabella? Her legendary &apos;Whatcha Doin&apos;?&apos; wasn&apos;t just small talk; it was low-key a vibe check on your entire existence. What are you building? What are you about? We felt that.
               </p>
           </BlurFade>
           <BlurFade delay={0.6} inView>
               <p className="text-xl md:text-2xl font-light leading-relaxed text-muted-foreground">
                   So we dropped whatcha-doin. This app is your mic-drop moment. No more cap, just raw proof. Your personalized public profile (<code>yourdomain.com/[username]</code>) becomes your living highlight reel, flexing every habit, every milestone, every glow-up moment.
               </p>
           </BlurFade>
           <BlurFade delay={0.8} inView>
               <p className="text-primary font-semibold pt-4 text-2xl md:text-3xl">
                   Next time they ask, you won&apos;t just tell them. You&apos;ll literally *show* them. With your whole journey. Bet.
               </p>
           </BlurFade>
            <BlurFade delay={1.0} inView>
                <div className="mt-8 flex justify-center">
                    <Image 
                        src="/images/phineas-ferb.png" 
                        alt="Phineas and Ferb asking whatcha doin" 
                        width={600} 
                        height={400} 
                        className="rounded-xl shadow-lg border border-border/50"
                    />
                </div>
           </BlurFade>
       </div>
    </section>
  );
};

