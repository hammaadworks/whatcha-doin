"use client";

import { useAuth } from "@/hooks/useAuth";
import React from "react";

interface AuthProviderProps {
  children: React.ReactNode;
  initialUser?: any;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({
  children,
  initialUser,
}) => {
  useAuth(initialUser);
  return <>{children}</>;
};