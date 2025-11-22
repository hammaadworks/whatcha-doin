// lib/supabase/user.ts
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


export interface PublicProfile {
    id: string;
    email: string;
    bio: string;
    habits: Habit[];
    todos: Todo[];
    journal_entries: JournalEntry[];
}

