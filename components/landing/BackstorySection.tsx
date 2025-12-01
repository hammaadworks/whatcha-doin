"use client";

import React from "react";
import Image from "next/image";
import { BlurFade } from "@/components/ui/blur-fade";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import { cn } from "@/lib/utils";

export function BackstorySection() {
  return (
    <section className="relative py-32 px-4 w-full overflow-hidden bg-background">
       {/* Background Pattern */}
       <div className="absolute inset-0 z-0 overflow-hidden">
          <AnimatedGridPattern
             numSquares={40}
             maxOpacity={0.05}
             duration={4}
             repeatDelay={1}
             className={cn(
               "[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]",
               "inset-x-0 inset-y-[-20%] h-[150%] skew-y-6",
             )}
           />
       </div>

       <div className="relative z-10 mx-auto max-w-4xl">
           <BlurFade delay={0.2} inView>
               {/* Craft.do Style "Document" Card */}
               <div className="bg-card/60 backdrop-blur-xl border border-border/40 rounded-[2rem] shadow-2xl overflow-hidden transition-all hover:shadow-[0_0_40px_-10px_rgba(var(--primary),0.1)]">
                   
                   {/* Card Header / "Title Block" */}
                   <div className="p-8 md:p-12 text-center border-b border-border/20">
                        <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground mb-4">
                           Born from an <span className="text-primary">iconic question.</span>
                        </h2>
                        <p className="text-lg text-muted-foreground font-medium">
                            Every episode, Isabella walks up with that curious smile and asks: <br/>
                            <span className="text-foreground text-2xl font-bold italic">&quot;Whatcha doin&apos;?&quot;</span>
                        </p>
                   </div>

                   {/* "Content Block" - Image */}
                   <div className="relative w-full aspect-video bg-muted/50">
                        <Image
                            src="/images/phineas-ferb.png"
                            alt="Phineas and Ferb asking whatcha doin"
                            fill
                            className="object-cover opacity-90 hover:opacity-100 transition-opacity duration-500"
                        />
                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                        
                        {/* Floating Caption */}
                        <div className="absolute bottom-6 left-6 right-6">
                            <div className="bg-background/80 backdrop-blur-md border border-white/10 rounded-xl p-4 md:p-6 shadow-lg max-w-2xl mx-auto">
                                <p className="text-foreground text-base md:text-lg font-medium leading-relaxed">
                                     Phineas always had an answer — not because he was perfect, but because he always had <span className="text-primary font-bold">something cooking</span>.
                                </p>
                            </div>
                        </div>
                   </div>

                   {/* "Footer Block" */}
                   <div className="p-8 md:p-12 bg-secondary/5 text-center">
                       <p className="text-muted-foreground text-lg mb-6 font-light">
                           whatcha-doin captures that same spark: curious, creative, always building — even if it&apos;s tiny.
                       </p>
                       <blockquote className="text-primary font-bold text-xl md:text-2xl tracking-tight">
                           &quot;Your life is a series. Your habits are the episodes. Your identity is the arc.&quot;
                       </blockquote>
                   </div>

               </div>
           </BlurFade>
       </div>
    </section>
  );
}
