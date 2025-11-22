"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "@supabase/supabase-js"; // Assuming Supabase user type

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthContextProvider({
  children,
  initialUser,
}: {
  children: React.ReactNode;
  initialUser?: User | null;
}) {
  const [user, setUser] = useState<User | null>(initialUser || null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = () => {
      if (process.env.NEXT_PUBLIC_DEV_MODE_ENABLED === "true") {
        console.log("Development mode enabled. Injecting mock user.");
        const mockUser: User = {
          id: "68be1abf-ecbe-47a7-bafb-46be273a2e",
          email: "hammaadworks@gmail.com",
          aud: "authenticated",
          app_metadata: {},
          user_metadata: {},
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        setTimeout(() => {
          setUser(mockUser);
          setIsLoading(false);
        }, 0);
      } else if (initialUser) {
        setTimeout(() => {
          setUser(initialUser);
          setIsLoading(false);
        }, 0);
      } else {
        setTimeout(() => {
          setUser(null);
          setIsLoading(false);
        }, 0);
      }
    };

    initializeAuth();
  }, [initialUser]);

  return (
    <AuthContext.Provider value={{ user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  return context;
};