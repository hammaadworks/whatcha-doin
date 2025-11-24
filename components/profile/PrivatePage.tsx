// components/profile/PrivatePage.tsx
"use client";

import {notFound} from 'next/navigation';
import {Habit, PublicUserDisplay} from '@/lib/supabase/types'; // Import Habit type
import {useAuth} from "@/hooks/useAuth";
import AppHeader from "@/components/layout/AppHeader";
import {Button} from '@/components/ui/button'; // Import Button
import {PublicPage} from '@/components/profile/PublicPage.tsx';
import {ActionsList} from '@/components/shared/ActionsList'; // Import the new ActionsList component
import React, {useEffect, useState} from 'react';
import {User} from '@supabase/supabase-js';
import {HabitChipPrivate} from '@/components/habits/HabitChipPrivate';
import ReactMarkdown from 'react-markdown'; // Import ReactMarkdown
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger,} from "@/components/ui/accordion";
import {InsightsBentoGrid} from '@/components/shared/InsightsBentoGrid';
import {Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger,} from '@/components/ui/sheet';
import {BarChart3} from 'lucide-react';


type ProfilePageClientProps = {
    username: string; initialProfileUser: PublicUserDisplay | null;
};

export default function PrivatePage({username, initialProfileUser}: ProfilePageClientProps) {
    const {user: authenticatedUser, loading: authLoading} = useAuth();
      const [mockActions, setMockActions] = useState([
        { id: "1", description: "Complete project proposal", completed: false },
        { id: "2", description: "Buy groceries", completed: true },
        { id: "3", description: "Plan weekend trip", completed: false },
        { id: "4", description: "Call mom", completed: false },
        { id: "5", description: "Read for 30 minutes", completed: true },
        { id: "6", description: "Go for a run", completed: false }
      ].sort((a, b) => {
        if (a.completed && !b.completed) return 1;
        if (!a.completed && b.completed) return -1;
        return 0;
      }));
      const [justCompletedId, setJustCompletedId] = useState<string | null>(null);
    
      const handleActionToggled = (id: string) => {
        const action = mockActions.find(a => a.id === id);
        if (action && !action.completed) {
          setJustCompletedId(id);
          setMockActions(currentActions =>
            currentActions.map(a =>
              a.id === id ? { ...a, completed: true } : a
            )
          );
          
          setTimeout(() => {
            setMockActions(prevActions => [...prevActions].sort((a, b) => {
              if (a.completed && !b.completed) return 1;
              if (!a.completed && b.completed) return -1;
              return 0;
            }));
            setJustCompletedId(null);
          }, 500);
        } else {
          setMockActions(currentActions =>
            currentActions.map(a =>
              a.id === id ? { ...a, completed: false } : a
            ).sort((a, b) => {
              if (a.completed && !b.completed) return 1;
              if (!a.completed && b.completed) return -1;
              return 0;
            })
          );
        }
      };

    // Mock data for demonstration purposes
    const mockHabits: Habit[] = [{
        id: '1',
        name: 'Read a book',
        current_streak: 12,
        pile_state: 'today',
        is_public: true,
        user_id: '1',
        last_streak: 10,
        junked_at: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        goal_value: 30,
        goal_unit: 'pages'
    }, {
        id: '2',
        name: 'Meditate',
        current_streak: 5,
        pile_state: 'today',
        is_public: true,
        user_id: '1',
        last_streak: 5,
        junked_at: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        goal_value: 10,
        goal_unit: 'minutes'
    }, {
        id: '3',
        name: 'Workout',
        current_streak: 28,
        pile_state: 'yesterday',
        is_public: false,
        user_id: '1',
        last_streak: 28,
        junked_at: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        goal_value: null,
        goal_unit: null
    }, {
        id: '4',
        name: 'Learn Spanish',
        current_streak: 0,
        pile_state: 'lively',
        is_public: true,
        user_id: '1',
        last_streak: 30,
        junked_at: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        goal_value: 1,
        goal_unit: 'lesson'
    }, {
        id: '5',
        name: 'Write Journal',
        current_streak: 0,
        pile_state: 'junked',
        is_public: true,
        user_id: '1',
        last_streak: 15,
        junked_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        goal_value: null,
        goal_unit: null
    },];

    const todayHabits = mockHabits.filter(h => h.pile_state === 'today');
    const yesterdayHabits = mockHabits.filter(h => h.pile_state === 'yesterday');
    const pileHabits = mockHabits.filter(h => h.pile_state === 'lively' || h.pile_state === 'junked' || h.pile_state === 'pile');


    const [clientFetchedProfileUser, setClientFetchedProfileUser] = useState<PublicUserDisplay | null>(null);
    const [showMobileInsights, setShowMobileInsights] = useState(false);

    const isOwner = authenticatedUser && authenticatedUser.username === username;

    let profileToDisplay: PublicUserDisplay | (User & { username?: string; bio?: string }) | null = null;
    let overallLoading = true;

    if (authLoading) {
        overallLoading = true;
    } else if (isOwner) {
        profileToDisplay = authenticatedUser;
        overallLoading = false;
    } else {
        profileToDisplay = clientFetchedProfileUser || initialProfileUser;
        overallLoading = (!clientFetchedProfileUser && !initialProfileUser);
    }


    useEffect(() => {
        if (!isOwner && !authLoading && !clientFetchedProfileUser && !initialProfileUser) {
            const fetchPublicProfile = async () => {
                const res = await fetch(`/api/user/${username}`);
                const data = await res.json();
                const user: PublicUserDisplay | null = data.error ? null : data;

                if (!user) {
                    notFound();
                }
                setClientFetchedProfileUser(user);
            };
            fetchPublicProfile();
        }
    }, [username, authenticatedUser, authLoading, isOwner, clientFetchedProfileUser, initialProfileUser]);


    if (overallLoading) {
        return <div>Loading...</div>;
    }

    if (!profileToDisplay) {
        return null;
    }

    if (isOwner) {
        return (<>
            <AppHeader/>
            <div
                className="profile-container w-full max-w-lg lg:max-w-7xl mx-auto bg-card border border-card-border shadow-lg rounded-3xl p-6 sm:p-10 lg:px-16 lg:py-14 relative mt-8 mb-8">
                <h1 className="text-4xl font-extrabold text-center text-primary mb-2 mt-4">Welcome, {username}!</h1>
                <div className="bio text-lg text-muted-foreground text-center mb-8 leading-relaxed">
                    <ReactMarkdown>{profileToDisplay.bio || 'This is your private dashboard. Your bio will appear here, and you can edit it in settings.'}</ReactMarkdown>
                </div>

                <div className="main-profile-grid">
                    <div className="main-content-column">
                        {/* Actions Section */}
                        <div className="section mb-10">
                            <h2 className="text-2xl font-extrabold border-b border-card-border pb-4 mb-6 text-foreground">Actions</h2>
                            {/* Mock actions data */}
                            {/* Placeholder for fetching real actions */}
                            <ActionsList actions={mockActions} onActionToggled={handleActionToggled} justCompletedId={justCompletedId}/>
                        </div>

                        {/* Habits Section */}
                        <div className="section mb-10">
                            <h2 className="text-2xl font-extrabold border-b border-card-border pb-4 mb-6 text-foreground">Habits</h2>

                            {/* Responsive Container: Accordion on mobile, Grid on desktop */}
                            <div className="md:hidden"> {/* Accordion for mobile */}
                                <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
                                    <AccordionItem value="item-1">
                                        <AccordionTrigger>Today</AccordionTrigger>
                                        <AccordionContent className="flex flex-wrap gap-2">
                                            {todayHabits.length > 0 ? todayHabits.map(h => (
                                                    <HabitChipPrivate key={h.id} habit={h} onHabitUpdated={() => {
                                                    }} onHabitDeleted={() => {
                                                    }} columnId="today"/>)) :
                                                <p className="text-muted-foreground text-sm">No habits for
                                                    today.</p>}
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="item-2">
                                        <AccordionTrigger>Yesterday</AccordionTrigger>
                                        <AccordionContent className="flex flex-wrap gap-2">
                                            {yesterdayHabits.length > 0 ? yesterdayHabits.map(h => (
                                                    <HabitChipPrivate key={h.id} habit={h} onHabitUpdated={() => {
                                                    }} onHabitDeleted={() => {
                                                    }} columnId="yesterday"/>)) :
                                                <p className="text-muted-foreground text-sm">No habits from
                                                    yesterday.</p>}
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="item-3">
                                        <AccordionTrigger>The Pile</AccordionTrigger>
                                        <AccordionContent className="flex flex-wrap gap-2">
                                            {pileHabits.length > 0 ? pileHabits.map(h => (
                                                    <HabitChipPrivate key={h.id} habit={h} onHabitUpdated={() => {
                                                    }} onHabitDeleted={() => {
                                                    }} columnId="pile"/>)) :
                                                <p className="text-muted-foreground text-sm">The Pile is empty.</p>}
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </div>

                            <div
                                className="hidden md:grid md:grid-cols-2 lg:grid-cols-2 gap-4"> {/* Grid for desktop */}
                                {/* Today Column */}
                                <div className="p-4 bg-background border border-card-border rounded-xl shadow">
                                    <h3 className="text-xl font-semibold mb-4 text-foreground">Today</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {todayHabits.length > 0 ? todayHabits.map(h => (
                                                <HabitChipPrivate key={h.id} habit={h} onHabitUpdated={() => {
                                                }} onHabitDeleted={() => {
                                                }} columnId="today"/>)) :
                                            <p className="text-muted-foreground text-sm">No habits for today.</p>}
                                    </div>
                                </div>

                                {/* Yesterday Column */}
                                <div
                                    className="p-4 bg-background border border-card-border rounded-xl shadow relative overflow-hidden">
                                    <h3 className="text-xl font-semibold mb-4 text-foreground">Yesterday</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {yesterdayHabits.length > 0 ? yesterdayHabits.map(h => (
                                                <HabitChipPrivate key={h.id} habit={h} onHabitUpdated={() => {
                                                }} onHabitDeleted={() => {
                                                }} columnId="yesterday"/>)) :
                                            <p className="text-muted-foreground text-sm">No habits from
                                                yesterday.</p>}
                                    </div>
                                </div>

                                {/* The Pile Column */}
                                <div
                                    className="p-4 bg-background border border-card-border rounded-xl shadow md:col-span-full lg:col-span-2">
                                    <h3 className="text-xl font-semibold mb-4 text-foreground">The Pile</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {pileHabits.length > 0 ? pileHabits.map(h => (
                                                <HabitChipPrivate key={h.id} habit={h} onHabitUpdated={() => {
                                                }} onHabitDeleted={() => {
                                                }} columnId="pile"/>)) :
                                            <p className="text-muted-foreground text-sm">The Pile is empty.</p>}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Journal Section - Placeholder for consistency */}
                        <div className="section mb-10">
                            <h2 className="text-2xl font-extrabold border-b border-card-border pb-4 mb-6 text-foreground">Journal</h2>
                            <div
                                className="journal-entry bg-background border border-card-border rounded-xl p-6 mb-6">
                                <h3 className="text-xl font-bold text-primary mb-1">Private Reflections</h3>
                                <div className="date text-sm text-muted-foreground mb-4">November 23, 2025</div>
                                <p className="text-base leading-relaxed text-foreground m-0">
                                    Your private journal entries will appear here.
                                </p>
                            </div>
                        </div>

                        {/* Motivations Section */}
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
                                            <SheetTitle className="text-2xl font-extrabold text-foreground">{username}'s Insights</SheetTitle>
                                        </SheetHeader>
                                        <div className="py-6">
                                            <InsightsBentoGrid />
                                        </div>
                                    </SheetContent>
                                </Sheet>
                            </div>
                            <div
                                className="motivational-quote-card relative overflow-hidden rounded-3xl p-10 text-center border border-primary animate-pulse-glow text-white dark:text-black"
                                style={{background: 'var(--gradient-primary)'}}>
                                <p className="quote-text text-3xl font-extrabold leading-tight mb-4 relative z-10 text-shadow-sm">
                                    <q>Believe you can and you are halfway there.</q>
                                </p>
                                <p className="quote-source text-lg font-semibold opacity-80 relative z-10">
                                    — Theodore Roosevelt
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>);
    } else {
        return (<>
            <PublicPage user={profileToDisplay}/>
        </>);
    }
}