'use client';

import { PublicUserDisplay, Habit } from '@/lib/supabase/types';
import AppHeader from '@/components/layout/AppHeader';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ActionsList } from '@/components/shared/ActionsList';
import ReactMarkdown from 'react-markdown';
import { BarChart3 } from 'lucide-react';
import { HabitChipPublic } from "@/components/habits/HabitChipPublic";
import { InsightsBentoGrid } from "@/components/shared/InsightsBentoGrid";

type PublicProfileViewProps = {
  user: PublicUserDisplay;
};

export function PublicPage({ user }: Readonly<PublicProfileViewProps>) {
  const mockHabits: Habit[] = [
    { id: '1', name: 'Read a book', current_streak: 12, is_public: true, user_id: '1', last_streak: 10, pile_state: 'active', junked_at: null, created_at: new Date().toISOString(), updated_at: new Date().toISOString(), goal_value: 30, goal_unit: 'pages' },
    { id: '2', name: 'Meditate', current_streak: 5, is_public: true, user_id: '1', last_streak: 5, pile_state: 'active', junked_at: null, created_at: new Date().toISOString(), updated_at: new Date().toISOString(), goal_value: 10, goal_unit: 'minutes' },
    { id: '3', name: 'Learn Spanish', current_streak: 30, is_public: true, user_id: '1', last_streak: 20, pile_state: 'active', junked_at: null, created_at: new Date().toISOString(), updated_at: new Date().toISOString(), goal_value: 1, goal_unit: 'lesson' },
    { id: '4', name: 'Workout', current_streak: 28, is_public: false, user_id: '1', last_streak: 28, pile_state: 'active', junked_at: null, created_at: new Date().toISOString(), updated_at: new Date().toISOString(), goal_value: null, goal_unit: null },
  ];

  return (
    <>
      <AppHeader />
      <div className="profile-container w-full max-w-lg lg:max-w-7xl mx-auto bg-card border border-card-border shadow-lg rounded-3xl p-6 sm:p-10 lg:px-16 lg:py-14 relative mt-8 mb-8">
        <h1 className="text-4xl font-extrabold text-center text-primary mb-2 mt-4">{user.username}</h1>
        <div className="bio text-lg text-muted-foreground text-center mb-8 leading-relaxed">
          <ReactMarkdown>{user.bio || 'This user has not set a bio yet.'}</ReactMarkdown>
        </div>

        <div className="main-profile-grid">
          <div className="main-content-column">
            {(() => {
              const mockActions = [
                { id: "1", description: "Finish the weekly report", completed: false },
                { id: "2", description: "Schedule a dentist appointment", completed: true },
                { id: "3", description: "Go for a 30-minute run", completed: false },
                { id: "4", description: "Read a chapter of 'Atomic Habits'", completed: false },
                { id: "5", description: "Plan meals for the week", completed: true },
                { id: "6", description: "Water the plants", completed: false },
              ];
              return (
                <div className="section mb-10">
                    <h2 className="text-2xl font-extrabold border-b border-card-border pb-4 mb-6 text-foreground">Actions</h2>
                    <ActionsList actions={mockActions} />
                </div>
              );
            })()}

            <div className="section mb-10">
              <h2 className="text-2xl font-extrabold border-b border-card-border pb-4 mb-6 text-foreground">Habits</h2>
              <div className="habit-grid flex flex-wrap gap-4">
                {mockHabits.map((habit) => (
                  <HabitChipPublic key={habit.id} habit={habit} />
                ))}
              </div>
            </div>

            <div className="section mb-10">
              <h2 className="text-2xl font-extrabold border-b border-card-border pb-4 mb-6 text-foreground">Journal</h2>
              <div className="space-y-6">
                <div className="bg-background border border-card-border rounded-xl p-6">
                  <h3 className="text-xl font-bold text-primary mb-1">Reflections on consistency</h3>
                  <div className="text-sm text-muted-foreground mb-4">November 22, 2025</div>
                  <p className="text-base leading-relaxed text-foreground m-0">
                    Today was a good day for consistency. Managed to hit all my habits, even the tough ones. Reading for 30 minutes felt especially rewarding. Its becoming easier to get into the flow.
                  </p>
                </div>
                <div className="bg-background border border-card-border rounded-xl p-6">
                  <h3 className="text-xl font-bold text-primary mb-1">New insights from meditation</h3>
                  <div className="text-sm text-muted-foreground mb-4">November 21, 2025</div>
                  <p className="text-base leading-relaxed text-foreground m-0">
                    My meditation practice is deepening. Noticing subtle shifts in my thought patterns throughout the day. Its a powerful tool for self-awareness. Also, the Spanish lesson was tough today, but I pushed through.
                  </p>
                </div>
              </div>
            </div>

            <div className="section mb-10">
              <div className="flex justify-between items-center border-b border-card-border pb-4 mb-6">
                <h2 className="text-2xl font-extrabold">Motivations</h2>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="dark:border-primary dark:text-primary dark:hover:bg-primary dark:hover:text-primary-foreground">
                      <BarChart3 className="mr-2 h-4 w-4" />
                      View Insights
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="bg-background border-l border-card-border p-6 w-full sm:max-w-lg lg:max-w-2xl overflow-y-auto">
                    <SheetHeader>
                      <SheetTitle className="text-2xl font-extrabold text-foreground">Insights</SheetTitle>
                    </SheetHeader>
                    <div className="py-6">
                      <InsightsBentoGrid />
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
              <div className="motivational-quote-card relative overflow-hidden rounded-3xl p-10 text-center border border-primary animate-pulse-glow text-white dark:text-black" style={{ background: 'var(--gradient-primary)' }}>
                <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%) animate-rotate-light opacity-30"></div>
                <p className="quote-text text-3xl font-extrabold leading-tight mb-4 relative z-10 text-shadow-sm">
                  <q>Work on your dreams as if your life depends on it. Because it does.</q>
                </p>
                <p className="quote-source text-lg font-semibold opacity-80 relative z-10">
                  — Unknown
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
