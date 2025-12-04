import {createClient} from './client';
import {Habit} from './types';
import {CompletionData} from '@/components/habits/HabitCompletionModal';

// Placeholder for createHabit if it was lost, or real implementation
export const createHabit = async (habit: Partial<Habit>): Promise<{ data: Habit | null; error: any }> => {
    const supabase = createClient();
    const {data, error} = await supabase
        .from('habits')
        .insert([habit])
        .select()
        .single();
    return {data, error};
};

export async function completeHabit(habitId: string, data: CompletionData): Promise<void> {
    const supabase = createClient();

    // 1. Fetch current habit state
    const {data: habit, error: fetchError} = await supabase
        .from('habits')
        .select('*')
        .eq('id', habitId)
        .single();

    if (fetchError || !habit) {
        console.error("Error fetching habit for completion:", fetchError);
        throw fetchError;
    }

    // 2. Calculate new streak
    let newStreak = habit.current_streak + 1;
    if (habit.pile_state === 'junked') {
        newStreak = 1; // Reset if junked
    }

    // 3. Insert completion record
    const {error: insertError} = await supabase
        .from('habit_completions')
        .insert({
            habit_id: habitId,
            user_id: habit.user_id,
            mood_score: data.mood_score,
            work_value: data.work_value,
            duration_value: data.duration_value,
            duration_unit: data.duration_unit,
            notes: data.notes,
            completed_at: new Date().toISOString(), // Explicitly set completion time
            goal_at_completion: habit.goal_value // Record what the goal was at this time
        });

    if (insertError) {
        console.error("Error inserting completion:", insertError);
        throw insertError;
    }

    // 4. Update habit state
    const {error: updateError} = await supabase
        .from('habits')
        .update({
            current_streak: newStreak, pile_state: 'today',
        })
        .eq('id', habitId);

    if (updateError) {
        console.error("Error updating habit streak:", updateError);
        throw updateError;
    }
}

export async function fetchOwnerHabits(userId: string): Promise<Habit[]> {
    const supabase = createClient();
    const {data, error} = await supabase
        .from('habits')
        .select('*') // Select all columns for owner's habits (public and private)
        .eq('user_id', userId);

    if (error) {
        console.error("Error fetching owner's habits:", error);
        throw error;
    }
    return data || [];
}

export async function updateHabit(habitId: string, updates: Partial<Habit>): Promise<Habit> {
    const supabase = createClient();
    const {data, error} = await supabase
        .from('habits')
        .update(updates)
        .eq('id', habitId)
        .select()
        .single();

    if (error) {
        console.error("Error updating habit:", error);
        throw error;
    }
    return data;
}

export async function deleteHabit(habitId: string): Promise<void> {
    const supabase = createClient();
    const {error} = await supabase
        .from('habits')
        .delete()
        .eq('id', habitId);

    if (error) {
        console.error("Error deleting habit:", error);
        throw error;
    }
}
