"use client";

import { createContext, useContext } from "react";
import type { AuthContextValue } from "@/shared/types/auth";

const AuthContext = createContext<AuthContextValue>({ user: null, loading: true });

export function AuthProvider({ children, value }: Readonly<{ children: React.ReactNode; value: AuthContextValue }>) {
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext(): AuthContextValue {
  return useContext(AuthContext);
}