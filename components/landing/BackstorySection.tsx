import { BlurFade } from "@/components/ui/blur-fade";
import { Quote } from "lucide-react";

export function BackstorySection() {
  return (
    <section className="py-32 px-4 md:px-8 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-4xl mx-auto text-center space-y-12">
        
        <BlurFade delay={0.2} inView>
          <div className="flex items-center justify-center mb-6">
            <div className="p-3 bg-primary/10 rounded-full">
              <Quote className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-sans tracking-tight">
            Born from an iconic question.
          </h2>
        </BlurFade>

        <BlurFade delay={0.4} inView>
          <div className="bg-card border border-border p-8 md:p-12 rounded-3xl shadow-xl relative overflow-hidden">
            {/* Decorative Quote Marks */}
            <span className="absolute top-4 left-6 text-8xl font-serif text-primary/10 leading-none">“</span>
            
            <div className="relative z-10 space-y-8">
              <p className="text-2xl md:text-3xl font-serif italic text-foreground leading-relaxed">
                Every episode, Isabella walks up with that curious smile and asks: <br />
                <span className="text-primary font-bold">"Whatcha doin'?"</span>
              </p>
              
              <div className="w-16 h-1 bg-primary/20 mx-auto rounded-full" />

              <div className="space-y-4 text-lg md:text-xl font-mono text-muted-foreground leading-relaxed">
                <p>
                  Phineas always had an answer. Not because he was perfect, but because he always had <span className="text-foreground font-semibold underline decoration-wavy decoration-primary/30">something</span> cooking.
                </p>
                <p>
                  <span className="font-bold text-foreground">whatcha-doin</span> captures that same spark: curious, creative, always building, even if it's tiny.
                </p>
              </div>
            </div>
          </div>
        </BlurFade>

        <BlurFade delay={0.6} inView>
          <blockquote className="text-xl md:text-2xl font-sans font-medium text-foreground/80">
            "Your life is a series. Your habits are the episodes. <br className="hidden md:block" /> 
            <span className="text-primary">Your identity is the arc.</span>"
          </blockquote>
        </BlurFade>
      </div>
    </section>
  );
}