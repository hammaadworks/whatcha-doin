'use client';

import {ActionNode, Habit, Identity, JournalEntry, PublicUserDisplay} from '@/lib/supabase/types'; // Import ActionNode, Habit, JournalEntry, Identity
import ProfileLayout from '@/components/profile/ProfileLayout';
import ActionsSection from '@/components/profile/sections/ActionsSection';
import HabitsSection from '@/components/profile/sections/HabitsSection';
import JournalSection from '@/components/profile/sections/JournalSection';
import MotivationsSection from '@/components/profile/sections/MotivationsSection';
import IdentitySection from '@/components/profile/sections/IdentitySection'; // Import
import TargetsSection from '@/components/profile/sections/TargetsSection'; // Import

type PublicProfileViewProps = {
    user: PublicUserDisplay; publicActions: ActionNode[]; publicHabits: Habit[]; publicJournalEntries: JournalEntry[]; // Add publicJournalEntries
    publicIdentities: (Identity & { backingCount: number })[]; // Add
    publicTargets: ActionNode[]; // Add
    privateCount?: number; // Add privateCount
};

export function PublicPage({
                               user,
                               publicActions,
                               publicHabits,
                               publicJournalEntries,
                               publicIdentities,
                               publicTargets,
                               privateCount = 0
                           }: Readonly<PublicProfileViewProps>) {
    return (<ProfileLayout
            username={user.username || ''}
            bio={user.bio ?? null}
            isOwner={false}
            timezone={user.timezone} // Pass timezone
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <IdentitySection
                    isOwner={false}
                    isReadOnly={true}
                    identities={publicIdentities} // Need to update IdentitySection to accept this
                    ownerHabits={[]} // Not used in read-only
                />
                <TargetsSection
                    isOwner={false}
                    isReadOnly={true}
                    timezone={user.timezone || 'UTC'}
                    targets={publicTargets} // Need to update TargetsSection to accept this
                />
            </div>

            <ActionsSection
                isOwner={false}
                actions={publicActions}
                loading={false} // Always false for public page sections
                privateCount={privateCount} // Pass privateCount
            />
            <HabitsSection
                isOwner={false}
                habits={publicHabits}
                loading={false} // Always false for public page sections
            />
            <JournalSection
                isOwner={false}
                journalEntries={publicJournalEntries} // Pass public journal entries
                loading={false} // Always false for public page sections
            />
            <MotivationsSection
                username={user.username || ''}
                isOwner={false} // Always false for public page sections
                loading={false} // Always false for public page sections
            />
        </ProfileLayout>);
}
