// components/profile/PrivatePage.tsx
"use client";

import {notFound} from 'next/navigation';
import {PublicUserDisplay} from '@/lib/supabase/types';
import {useAuth} from "@/hooks/useAuth";
import React, {useEffect, useState} from 'react';
import ProfileLayout from '@/components/profile/ProfileLayout';
import ActionsSection from '@/components/profile/sections/ActionsSection';
import HabitsSection from '@/components/profile/sections/HabitsSection';
import JournalSection from '@/components/profile/sections/JournalSection';
import MotivationsSection from '@/components/profile/sections/MotivationsSection';
import {PublicPage} from '@/components/profile/PublicPage';
import {useActions} from '@/hooks/useActions'; // Import the new hook

import {updateUserTimezone} from '@/lib/supabase/user.client';

type ProfilePageClientProps = {
    username: string; initialProfileUser: PublicUserDisplay | null;
};

export default function PrivatePage({username, initialProfileUser}: Readonly<ProfilePageClientProps>) {
    const {user: authenticatedUser, loading: authLoading} = useAuth();
    // 1. Local state first (Hooks must be top level)
    const [clientFetchedProfileUser, setClientFetchedProfileUser] = useState<PublicUserDisplay | null>(null);
    const [optimisticTimezone, setOptimisticTimezone] = useState<string | null>(null);

    // 2. Derived state
    const isOwner = authenticatedUser?.username === username;

    let profileToDisplay: PublicUserDisplay | (typeof authenticatedUser & {
        username?: string;
        bio?: string;
        timezone?: string;
    }) | null = null;
    let overallLoading: boolean;

    if (authLoading) {
        overallLoading = true;
    } else if (isOwner) {
        profileToDisplay = authenticatedUser;
        overallLoading = false;
    } else {
        profileToDisplay = clientFetchedProfileUser || initialProfileUser;
        overallLoading = (!clientFetchedProfileUser && !initialProfileUser);
    }

    // 3. Now we can safely use the hook with the derived values
    const {actions, toggleAction, addAction} = useActions(isOwner, optimisticTimezone || profileToDisplay?.timezone || 'UTC');

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

    const handleTimezoneChange = async (newTimezone: string) => {
        if (isOwner && authenticatedUser) {
            setOptimisticTimezone(newTimezone);
            try {
                await updateUserTimezone(authenticatedUser.id, newTimezone);
                // Ideally, refresh auth context here if it holds timezone, or rely on optimistic state
            } catch (error) {
                console.error("Failed to update timezone", error);
                setOptimisticTimezone(null); // Revert
            }
        }
    };

    if (overallLoading) {
        return <div>Loading...</div>;
    }

    if (!profileToDisplay) {
        return null;
    }

    if (isOwner) {
        return (<ProfileLayout
                username={username}
                bio={profileToDisplay.bio ?? null}
                isOwner={isOwner}
                timezone={optimisticTimezone || profileToDisplay.timezone}
                onTimezoneChange={handleTimezoneChange}
            >
                <ActionsSection
                    isOwner={isOwner}
                    actions={actions}
                    onActionToggled={toggleAction}
                    onActionAdded={addAction}
                />
                <HabitsSection isOwner={isOwner}/>
                <JournalSection isOwner={isOwner}/>
                <MotivationsSection username={username}/>
            </ProfileLayout>);
    } else {
        // If not the owner, render the public version of the profile
        return <PublicPage user={profileToDisplay as PublicUserDisplay}/>;
    }
}