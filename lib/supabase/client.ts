"use client";

import { createBrowserClient } from "@supabase/ssr";
import { User, Session } from "@supabase/supabase-js"; 
import { EMAIL } from "@/lib/constants";

export function createClient() {
  // Create a supabase client
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

  // If in development mode (DEV_USER is set), override getSession to return a mock session
  if (process.env.NEXT_PUBLIC_DEV_USER) {
    console.warn("DEV_MODE: Supabase session is mocked for user:", process.env.NEXT_PUBLIC_DEV_USER);

    const mockUser: User = {
      id: "68be1abf-ecbe-47a7-bafb-46be273a2e",
      email: EMAIL,
      aud: "authenticated",
      app_metadata: {},
      user_metadata: {},
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    // We do NOT set a valid access_token here because we can't sign one.
    // The UI will see this session and think we are logged in.
    const mockSession: Session = {
      access_token: null as any, 
      token_type: "bearer",
      expires_in: 3600,
      expires_at: Math.floor(Date.now() / 1000) + 3600,
      user: mockUser,
      refresh_token: "mock-refresh-token",
    };

    // Override the getSession method for UI logic
    supabase.auth.getSession = async (): Promise<{ data: { session: Session }; error: null }> => {
      return { data: { session: mockSession }, error: null };
    };

    // Override the getUser method
    supabase.auth.getUser = async (): Promise<{ data: { user: User }; error: null }> => {
      return { data: { user: mockUser }, error: null };
    };
  }
  return supabase;
}
