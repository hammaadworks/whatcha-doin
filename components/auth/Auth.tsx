"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabase/client";
import { useAuthStore } from "@/lib/store/auth";
import Logins from "./Logins";

export default function Auth() {
  const { session, setSession } = useAuthStore();

  // Temporary: For development, bypass Supabase auth and use a mock user.
  // Set NEXT_PUBLIC_DEV_MODE_ENABLED=true in your .env.local file to enable.
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_DEV_MODE_ENABLED === 'true') {
      const MOCK_USER_ID = "68be1abf-ecbe-47a7-bafb-406be273a02e";
      const MOCK_USER_EMAIL = "hammaadworks@gmail.com";

      const mockSession = {
        access_token: "mock-access-token-for-dev",
        token_type: "Bearer",
        expires_in: 3600,
        expires_at: Math.floor(Date.now() / 1000) + 3600,
        refresh_token: "mock-refresh-token-for-dev",
        user: {
          id: MOCK_USER_ID,
          email: MOCK_USER_EMAIL,
          aud: "authenticated",
          role: "authenticated",
          email_confirmed_at: "2025-11-13T17:00:05.782471+00:00",
          phone: "",
          last_sign_in_at: "2025-11-14T16:37:56.005573+00:00",
          app_metadata: { provider: "email", providers: ["email"] },
          user_metadata: { sub: MOCK_USER_ID, email: MOCK_USER_EMAIL, email_verified: true, phone_verified: false },
          created_at: "2025-11-13T16:59:44.389126+00:00",
          updated_at: "2025-11-16T01:16:02.034342+00:00",
        },
      };
      setSession(mockSession as any);
    } else {
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
      });

      return () => subscription.unsubscribe();
    }
  }, [setSession]);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Error logging out:", error);
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  if (!session) {
    return <Logins />;
  }

  return null;
}
