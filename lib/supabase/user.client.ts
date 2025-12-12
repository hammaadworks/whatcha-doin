"use client";

import {createClient} from '@/lib/supabase/client';
import {PublicUserDisplay, QuoteItem, User} from './types';
import {withLogging} from '../logger/withLogging';

export async function updateUserBio(userId: string, bio: string) {
    const supabase = createClient();
    const {data, error} = await supabase
        .from('users')
        .update({bio})
        .eq('id', userId)
        .select()
        .single();

    if (error) {
        console.error('Error updating user bio:', error);
        return {data: null, error};
    }
    return {data, error: null};
}

async function _checkUsernameAvailability(username: string): Promise<boolean> {
    const reservedUsernames = ['auth', 'api', 'dashboard', 'journal', 'grace-period', 'profile', 'settings', 'login', 'logout', 'admin', 'support', 'help', 'public'];

    if (reservedUsernames.includes(username.toLowerCase())) {
        return false;
    }

    const supabase = createClient();
    // Simple check: select count of users with this username
    const {count, error} = await supabase
        .from('users')
        .select('*', {count: 'exact', head: true})
        .eq('username', username);

    if (error) {
        return false; // Assume unavailable on error to be safe
    }

    return count === 0;
}

export const checkUsernameAvailability = withLogging(_checkUsernameAvailability, 'checkUsernameAvailability');


async function _updateUserProfile(userId: string, updates: { username?: string; bio?: string }) {
    const supabase = createClient();
    const {data, error} = await supabase
        .from('users')
        .update(updates)
        .eq('id', userId)
        .select()
        .single();

    if (error) {
        return {data: null, error};
    }
    return {data, error: null};
}

export const updateUserProfile = withLogging(_updateUserProfile, 'updateUserProfile');


// Client-side function to get user by username
export async function getUserByUsernameClient(username: string): Promise<PublicUserDisplay | null> {
    const supabase = createClient();
    const {data, error} = await supabase
        .from('users')
        .select('id, username, bio, timezone, motivations') // Select motivations
        .eq('username', username)
        .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 is 'no rows found'
        console.error('Error fetching user by username (client):', error);
        return null;
    }
    return data as User; // Cast to User to include motivations
}

export async function updateUserTimezone(userId: string, timezone: string) {
    const supabase = createClient();
    const {data, error} = await supabase
        .from('users')
        .update({timezone})
        .eq('id', userId)
        .select();

    if (error) {
        console.error('Error updating user timezone:', error);
        throw error;
    }
    return data;
}

async function _fetchUserMotivations(userId: string): Promise<QuoteItem[] | null> {
    const supabase = createClient();
    const {data, error} = await supabase
        .from('users')
        .select('motivations')
        .eq('id', userId)
        .single();

    if (error) {
        console.error('Error fetching user motivations:', error);
        return null;
    }
    return data?.motivations || null;
}

export const fetchUserMotivations = withLogging(_fetchUserMotivations, 'fetchUserMotivations');

async function _updateUserMotivations(userId: string, motivations: QuoteItem[]): Promise<{
    data: QuoteItem[] | null,
    error: any
}> {
    const supabase = createClient();
    const {data, error} = await supabase
        .from('users')
        .update({motivations})
        .eq('id', userId)
        .select('motivations')
        .single();

    if (error) {
        console.error('Error updating user motivations:', error);
        return {data: null, error};
    }
    return {data: data.motivations, error: null};
}

export const updateUserMotivations = withLogging(_updateUserMotivations, 'updateUserMotivations');

async function _addUserMotivation(userId: string, newQuoteText: string): Promise<{
    data: QuoteItem[] | null,
    error: any
}> {
    const existingMotivations = await fetchUserMotivations(userId);
    const newMotivation: QuoteItem = {id: Date.now().toString(), text: newQuoteText};
    const updatedMotivations = existingMotivations ? [newMotivation, ...existingMotivations] : [newMotivation]; // Add to top

    return _updateUserMotivations(userId, updatedMotivations);
}

export const addUserMotivation = withLogging(_addUserMotivation, 'addUserMotivation');

async function _editUserMotivation(userId: string, quoteId: string, newText: string): Promise<{
    data: QuoteItem[] | null,
    error: any
}> {
    const existingMotivations = await fetchUserMotivations(userId);
    if (!existingMotivations) {
        return {data: null, error: 'No motivations found to edit.'};
    }

    const updatedMotivations = existingMotivations.map(quote => quote.id === quoteId ? {
        ...quote,
        text: newText
    } : quote);

    return _updateUserMotivations(userId, updatedMotivations);
}

export const editUserMotivation = withLogging(_editUserMotivation, 'editUserMotivation');

async function _deleteUserMotivation(userId: string, quoteId: string): Promise<{
    data: QuoteItem[] | null,
    error: any
}> {
    const existingMotivations = await fetchUserMotivations(userId);
    if (!existingMotivations) {
        return {data: null, error: 'No motivations found to delete.'};
    }

    const updatedMotivations = existingMotivations.filter(quote => quote.id !== quoteId);

    return _updateUserMotivations(userId, updatedMotivations);
}

export const deleteUserMotivation = withLogging(_deleteUserMotivation, 'deleteUserMotivation');
