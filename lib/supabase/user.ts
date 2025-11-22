// lib/supabase/user.ts
import { createServerSideClient } from '@/lib/supabase/server'; // Import server-side client
// Stub file for now. Will contain Supabase client functions related to users.
export const updateUserBio = async (userId: string, bio: string) => {
    console.warn("updateUserBio is a stub and not fully implemented.");
    return { data: null, error: null };
};

export interface Habit {
    id: string;
    name: string;
    is_public: boolean;
    current_streak: number;
    last_streak: number;
    goal_value: number | null;
    goal_unit: string | null;
    pile_state: string;
    junked_at: string | null;
    created_at: string;
    updated_at: string;
}

export interface Todo {
    id: string;
    description: string;
    is_public: boolean;
    is_completed: boolean;
    created_at: string;
}

export interface JournalEntry {
    id: string;
    entry_date: string;
    content: string;
    is_public: boolean;
    created_at: string;
}



export interface PublicUserDisplay {
    id: string;
    username?: string;
    bio: string;
}

export interface PublicProfile extends PublicUserDisplay {
    email?: string; // Make optional as it's not always selected for public display
    habits: Habit[];
    todos: Todo[];
    journal_entries: JournalEntry[];
}

export async function isValidUsername(username: string): Promise<boolean> {
    const user = await getUserByUsername(username);
    return user !== null;
}

export async function getUserByUsername(username: string): Promise<PublicUserDisplay | null> {
    const supabase = await createServerSideClient(); // Use server-side client
    const { data, error } = await supabase
        .from('users')
        .select('id, username, bio')
        .eq('username', username)
        .single();

    if (error) {
        console.error('Error fetching user by username:', error);
        return null;
    }
    return data as PublicUserDisplay;
}


