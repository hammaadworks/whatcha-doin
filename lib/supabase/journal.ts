// lib/supabase/journal.ts
import { createClient } from './client';
import { JournalEntry, ActivityLogEntry } from './types'; // Import ActivityLogEntry

export async function fetchJournalEntries(userId: string): Promise<JournalEntry[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('journal_entries')
    .select('*')
    .eq('user_id', userId)
    .order('entry_date', { ascending: false }); // Order by date, newest first

  if (error) {
    console.error("Error fetching journal entries:", error);
    throw error;
  }
  return data || [];
}

export async function fetchJournalEntryByDate(userId: string, date: string, isPublic: boolean): Promise<JournalEntry | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('journal_entries')
    .select('*')
    .eq('user_id', userId)
    .eq('entry_date', date)
    .eq('is_public', isPublic)
    .maybeSingle();

  if (error) {
    console.error("Error fetching journal entry by date:", error);
    throw error;
  }
  return data;
}

export async function upsertJournalEntry(entry: Partial<JournalEntry> & { user_id: string; entry_date: string; is_public: boolean }): Promise<JournalEntry> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('journal_entries')
    .upsert(entry, { onConflict: 'user_id, entry_date, is_public' })
    .select()
    .single();

  if (error) {
    console.error("Error upserting journal entry:", error);
    throw error;
  }
  return data;
}

/**
 * Updates a specific ActivityLogEntry within a JournalEntry's activity_log array.
 * Fetches the journal entry, modifies the activity log, and then upserts the journal entry.
 * @param userId The ID of the user.
 * @param entryDate The date of the journal entry (e.g., 'YYYY-MM-DD').
 * @param journalIsPublic The public/private status of the parent journal entry.
 * @param activityLogId The unique ID of the activity log entry to update.
 * @param changes An object containing the properties to update in the activity log entry.
 * @returns The updated JournalEntry.
 */
export async function updateActivityLogEntry(
  userId: string,
  entryDate: string,
  journalIsPublic: boolean,
  activityLogId: string,
  changes: Partial<ActivityLogEntry>
): Promise<JournalEntry> {
  const supabase = createClient();

  // 1. Fetch the existing journal entry
  const existingEntry = await fetchJournalEntryByDate(userId, entryDate, journalIsPublic);

  if (!existingEntry) {
    throw new Error('Journal entry not found.');
  }

  // 2. Find and update the specific activity log entry
  const updatedActivityLog = existingEntry.activity_log.map((activity) =>
    activity.id === activityLogId ? { ...activity, ...changes } : activity
  );

  // 3. Upsert the journal entry with the updated activity log
  const { data, error } = await supabase
    .from('journal_entries')
    .upsert({
      ...existingEntry,
      activity_log: updatedActivityLog,
      updated_at: new Date().toISOString(), // Update the updated_at timestamp
    } as JournalEntry) // Cast to JournalEntry to satisfy types
    .select()
    .single();

  if (error) {
    console.error(`Error updating activity log entry ${activityLogId}:`, error);
    throw error;
  }

  return data;
}

/**
 * Deletes a specific ActivityLogEntry from a JournalEntry's activity_log array.
 * Fetches the journal entry, removes the activity log entry, and then upserts the journal entry.
 * @param userId The ID of the user.
 *   @param entryDate The date of the journal entry (e.g., 'YYYY-MM-DD').
 * @param journalIsPublic The public/private status of the parent journal entry.
 * @param activityLogId The unique ID of the activity log entry to delete.
 * @returns The updated JournalEntry.
 */
export async function deleteActivityLogEntry(
  userId: string,
  entryDate: string,
  journalIsPublic: boolean,
  activityLogId: string
): Promise<JournalEntry> {
  const supabase = createClient();

  // 1. Fetch the existing journal entry
  const existingEntry = await fetchJournalEntryByDate(userId, entryDate, journalIsPublic);

  if (!existingEntry) {
    throw new Error('Journal entry not found.');
  }

  // 2. Filter out the specific activity log entry
  const updatedActivityLog = existingEntry.activity_log.filter(
    (activity) => activity.id !== activityLogId
  );

  // 3. Upsert the journal entry with the updated activity log
  const { data, error } = await supabase
    .from('journal_entries')
    .upsert({
      ...existingEntry,
      activity_log: updatedActivityLog,
      updated_at: new Date().toISOString(), // Update the updated_at timestamp
    } as JournalEntry) // Cast to JournalEntry to satisfy types
    .select()
    .single();

  if (error) {
    console.error(`Error deleting activity log entry ${activityLogId}:`, error);
    throw error;
  }

  return data;
}
