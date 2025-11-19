"use client";

import {useEffect} from "react";
import {supabase} from "@/lib/supabase/client";
import {create} from "zustand";

interface AuthState {
    user: any | null;
    session: any | null;
    loading: boolean;
    setSession: (session: any | null) => void;
    setUser: (user: any | null) => void;
    setLoading: (loading: boolean) => void;
}

const useAuthStore = create<AuthState>((set) => ({
    user: null,
    session: null,
    loading: true,
    setSession: (session) => set({session, user: session?.user || null}),
    setUser: (user) => set({user}),
    setLoading: (loading) => set({loading}),
}));

export const useAuth = (initialUser?: any) => {
    const {user, session, loading, setSession, setUser, setLoading} = useAuthStore();

    useEffect(() => {
        if (initialUser) {
            setUser(initialUser);
            setLoading(false);
            return;
        }

        const getSession = async () => {
            const {
                data: {session},
            } = await supabase.auth.getSession();
            setSession(session);
            setLoading(false);
        };

        getSession().then(_ => {});

        const {data: authListener} = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setSession(session);
                setLoading(false);
            }
        );

        return () => {
            authListener?.subscription.unsubscribe();
        };
    }, [setSession, setLoading, initialUser]);

    return {user, session, loading};
};
