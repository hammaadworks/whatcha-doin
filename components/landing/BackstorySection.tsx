"use client";

import React from "react";
import Image from "next/image";
import { BlurFade } from "@/components/ui/blur-fade";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import { cn } from "@/lib/utils";

export function BackstorySection() {
  return (
    <section className="relative py-24 px-4 w-full overflow-hidden bg-background">
       <div className="absolute inset-0 z-0 overflow-hidden">
          <AnimatedGridPattern
             numSquares={30}
             maxOpacity={0.1}
             duration={3}
             repeatDelay={1}
             className={cn(
               "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
               "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
             )}
           />
       </div>
       
       <div className="relative z-10 mx-auto max-w-4xl text-center space-y-12">
           <div className="space-y-4">
                <BlurFade delay={0.2} inView>
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        Born from an <span className="text-primary">iconic question.</span>
                    </h2>
                </BlurFade>
                
                <BlurFade delay={0.4} inView>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Every episode, Isabella walks up with that curious smile and asks: <br/>
                        <span className="text-foreground font-semibold italic">"Whatcha doin'?"</span>
                    </p>
                </BlurFade>
           </div>

           <BlurFade delay={0.6} inView>
                <div className="relative mx-auto w-full max-w-[600px] aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-background">
                    <Image 
                        src="/images/phineas-ferb.png" 
                        alt="Phineas and Ferb asking whatcha doin" 
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6 text-left">
                        <p className="text-white text-lg font-medium drop-shadow-md">
                             Phineas always had an answer — not because he was perfect, but because he always had <i>something</i> cooking.
                        </p>
                    </div>
                </div>
           </BlurFade>

           <BlurFade delay={0.8} inView>
               <div className="space-y-6">
                   <p className="text-xl md:text-2xl font-light leading-relaxed text-muted-foreground">
                       whatcha-doin captures that same spark: curious, creative, always building — even if it's tiny.
                   </p>
                   <blockquote className="text-primary font-medium text-lg md:text-xl">
                       "Your life is a series. Your habits are the episodes. Your identity is the arc."
                   </blockquote>
               </div>
           </BlurFade>
       </div>
    </section>
  );
}