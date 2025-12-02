import { BlurFade } from "@/components/ui/blur-fade";

export function ProblemSection() {
  return (
    <section className="py-32 px-4 md:px-8 bg-muted/30">
      <div className="max-w-4xl mx-auto text-center space-y-16">
        <BlurFade delay={0.2} inView>
          <h2 className="text-4xl md:text-6xl font-bold font-sans tracking-tight">
            For the <span className="text-primary">Lazy Ambitious Underachiever</span>
          </h2>
        </BlurFade>

        <BlurFade delay={0.4} inView>
          <p className="text-xl md:text-2xl font-mono text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Because ambitions isn't your problem — your system routine is. <br />
            You're not unmotivated nor lazy. You just lack discipline and a clear path. You're just stuck in the loop:
          </p>
        </BlurFade>

        <BlurFade delay={0.6} inView>
          <ul className="text-left max-w-lg mx-auto space-y-6 font-mono text-lg md:text-xl">
            <li className="flex items-center gap-4 p-4 rounded-xl bg-background/50 border hover:border-primary/50 transition-colors">
              <span className="text-primary font-bold text-2xl">→</span> Big goals → overwhelming
            </li>
            <li className="flex items-center gap-4 p-4 rounded-xl bg-background/50 border hover:border-primary/50 transition-colors">
              <span className="text-primary font-bold text-2xl">→</span> One broken streak → vibe gone
            </li>
            <li className="flex items-center gap-4 p-4 rounded-xl bg-background/50 border hover:border-primary/50 transition-colors">
              <span className="text-primary font-bold text-2xl">→</span> Too many distractions → no emotional connection
            </li>
            <li className="flex items-center gap-4 p-4 rounded-xl bg-background/50 border hover:border-primary/50 transition-colors">
              <span className="text-primary font-bold text-2xl">→</span> Waiting for the sweet perfect moment → it never starts.
            </li>
          </ul>
        </BlurFade>

        <BlurFade delay={0.8} inView>
          <div className="mt-16 p-8 md:p-12 border-2 border-dashed border-primary/20 rounded-3xl bg-background/80 backdrop-blur-sm">
            <p className="text-2xl md:text-3xl font-sans font-bold">
              whatcha-doin resets the whole game by helping you build <span className="text-primary">identity</span> with <em>discipline</em> and <em>consistency</em>.
            </p>
            <blockquote className="mt-8 text-lg italic text-muted-foreground font-mono">
              "Identity drives habits. Habits drive identity. We make the loop work for you."
            </blockquote>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
