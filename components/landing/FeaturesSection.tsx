"use client";

import React, { Suspense } from "react";
import { CheckCircle2, Flame, Sparkles, Keyboard, Calendar, Zap, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { BlurFade } from "@/components/ui/blur-fade";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { DotPattern } from "@/components/ui/dot-pattern";

const NeonGradientCard = React.lazy(() => import("@/components/ui/neon-gradient-card").then(m => ({ default: m.NeonGradientCard })));
const NumberTicker = React.lazy(() => import("@/components/ui/number-ticker").then(m => ({ default: m.NumberTicker })));
const AvatarCircles = React.lazy(() => import("@/components/ui/avatar-circles").then(m => ({ default: m.AvatarCircles })));


export const FeaturesSection = () => {
  return (
    <section id="features" className="relative py-24 px-4 w-full overflow-hidden">
        {/* Background: Subtle Gradient Mesh or similar */}
         <div className="absolute inset-0 -z-10 bg-neutral-50/50 dark:bg-neutral-950/50 w-full h-full" />
         <div className="absolute inset-0 w-full h-full">
            <DotPattern className="opacity-40 text-neutral-400" width={32} height={32} cx={2} cy={2} cr={2} />
         </div>
        
        <BlurFade inView>
          <h2 className="text-center text-3xl md:text-5xl font-bold mb-16 relative z-10">
            Momentum, not Magic. <span className="text-primary">Just Pure Skill.</span>
          </h2>
        </BlurFade>
        
        <BentoGrid className="max-w-6xl mx-auto relative z-10">
          {features.map((feature, i) => (
            <BentoGridItem
              key={i}
              title={feature.title}
              description={feature.description}
              header={feature.header}
              icon={feature.icon}
              className={cn(i === 3 || i === 6 ? "md:col-span-2" : "", "glass-card-hover bg-white/40 dark:bg-black/40")}
            />
          ))}
        </BentoGrid>
    </section>
  );
};

const features = [
  {
    title: "The Two-Day Rule",
    description: "Life's a whole mood, and sometimes you miss a beat. Our flexible streak system lets you chill for a day without wrecking your flow. No cap, your momentum stays on point.",
    header: (
      <Suspense fallback={null}>
        <NeonGradientCard
          className="flex flex-1 w-full h-full min-h-[6rem] items-center justify-center rounded-xl"
          neonColors={{ firstColor: "#ff00aa", secondColor: "#00FFF1" }}
          borderSize={2}
          borderRadius={10}
        >
          <div className="flex gap-2 relative z-10">
            <div className="size-8 rounded-full bg-green-500/20 border border-green-500/50 flex items-center justify-center"><CheckCircle2 className="text-green-500 size-5" /></div>
            <div className="size-8 rounded-full bg-red-500/20 border border-red-500/50 flex items-center justify-center text-xs font-bold text-red-500">X</div>
            <div className="size-8 rounded-full bg-yellow-500/20 border border-yellow-500/50 flex items-center justify-center animate-pulse"><div className="size-3 bg-yellow-500 rounded-full" /></div>
          </div>
        </NeonGradientCard>
      </Suspense>
    ),
    icon: <Flame className="h-4 w-4 text-orange-500" />,
  },
  {
    title: "Variable Intensity",
    description: "It's giving 'consistency over everything.' Log a quick 5 or go full beast mode for an hour. Every single flex fuels your glow-up, for real.",
    header: (
      <Suspense fallback={null}>
        <div className="flex flex-1 w-full h-full min-h-[6rem] items-center justify-center rounded-xl bg-gradient-to-br from-neutral-200 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800">
          <NumberTicker value={75} className="text-5xl font-bold text-primary" />
          <span className="text-5xl font-bold text-primary">%</span>
        </div>
      </Suspense>
    ),
    icon: <Sparkles className="h-4 w-4 text-yellow-500" />,
  },
  {
    title: "Keyboard-First Flow",
    description: "Level up your productivity, no cap. Manage your life at the speed of thought, because time is money, fam.",
    header: <div className="flex flex-1 w-full h-full min-h-[6rem] items-center justify-center rounded-xl bg-gradient-to-br from-neutral-200 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800">
        <div className="flex gap-1">
            <div className="size-8 rounded bg-white dark:bg-black border shadow-sm flex items-center justify-center text-xs font-mono">J</div>
            <div className="size-8 rounded bg-white dark:bg-black border shadow-sm flex items-center justify-center text-xs font-mono">K</div>
        </div>
    </div>,
    icon: <Keyboard className="h-4 w-4 text-blue-500" />,
  },
  {
    title: "Automated Journaling",
    description: "Your life, auto-documented. Watch your actions drop straight into your journal, turning every move into a major retrospective flex.",
    header: <div className="flex flex-1 w-full h-full min-h-[6rem] flex-col p-4 space-y-2 rounded-xl bg-gradient-to-br from-neutral-200 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800 opacity-80">
        <div className="h-2 w-1/2 bg-neutral-300 dark:bg-neutral-600 rounded" />
        <div className="h-2 w-full bg-neutral-300 dark:bg-neutral-600 rounded" />
        <div className="h-2 w-3/4 bg-neutral-300 dark:bg-neutral-600 rounded" />
    </div>,
    icon: <Calendar className="h-4 w-4 text-purple-500" />,
  },
  {
    title: "Positive Urgency UI",
    description: "No more feeling sus about missed tasks. We hit you with gentle visual nudges that keep you hyped, never overwhelmed. Good vibes only.",
    header: <div className="flex flex-1 w-full h-full min-h-[6rem] items-center justify-center rounded-xl bg-gradient-to-br from-neutral-200 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800">
        <div className="relative size-16">
            <div className="absolute inset-0 bg-yellow-400/20 rounded-full animate-ping-slow" />
            <Zap className="absolute inset-0 m-auto h-8 w-8 text-yellow-500" />
        </div>
    </div>,
    icon: <Zap className="h-4 w-4 text-yellow-500" />,
  },
  {
    title: "Teleport-to-Journal",
    description: "Catch this: your completed tasks literally *teleport* into your journal. It's a satisfying visual win that makes your progress feel like pure magic.",
    header: <div className="flex flex-1 w-full h-full min-h-[6rem] items-center justify-center rounded-xl bg-gradient-to-br from-neutral-200 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800">
        <div className="relative size-16">
            <CheckCircle2 className="absolute top-0 left-0 h-6 w-6 text-green-500 animate-fade-out-up" />
            <Calendar className="absolute bottom-0 right-0 h-8 w-8 text-purple-500 animate-fade-in-down" />
        </div>
    </div>,
    icon: <Calendar className="h-4 w-4 text-purple-500" />,
  },
  {
    title: "Build in Public",
    description: "Flex your journey, low-key. Share your glow-up on a unique public profile. Inspire the squad, stay accountable, and let your journey be the main character energy everyone needs.",
    header: (
      <Suspense fallback={null}>
        <div className="flex flex-1 w-full h-full min-h-[6rem] items-center justify-center rounded-xl bg-gradient-to-br from-neutral-200 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800">
          <AvatarCircles
            className="-space-x-2"
            numPeople={20}
            avatarUrls={[
              { imageUrl: "https://images.unsplash.com/photo-1599566150163-29194d6cd083?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80", profileUrl: "#" },
              { imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80", profileUrl: "#" },
              { imageUrl: "https://images.unsplash.com/photo-1605462863863-13d9a4e3ddc7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80", profileUrl: "#" },
              { imageUrl: "https://images.unsplash.com/photo-1540569014015-19a7dc6920d5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80", profileUrl: "#" },
              { imageUrl: "https://images.unsplash.com/photo-1590031905470-a1617f96faba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80", profileUrl: "#" },
            ]}
          />
        </div>
      </Suspense>
    ),
    icon: <ExternalLink className="h-4 w-4 text-blue-500" />,
  },
];


