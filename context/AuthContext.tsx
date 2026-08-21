"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User, LoginCredentials } from "@/types/auth";
import {
  MOCK_USER,
  getStoredToken,
  getStoredUser,
  setStoredAuth,
  removeStoredAuth,
} from "@/lib/auth/authStore";

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Initial check on mount
    const storedToken = getStoredToken();
    const storedUser = getStoredUser();

    if (storedToken && storedUser) {
      // Async frame to avoid immediate synchronous setState during hydration
      queueMicrotask(() => {
        setToken(storedToken);
        setUser(storedUser);
        setIsLoading(false);
      });
    } else {
      queueMicrotask(() => {
        setIsLoading(false);
      });
    }
  }, []);

  const login = async (credentials: LoginCredentials): Promise<{ success: boolean; message?: string }> => {
    setIsLoading(true);

    // Simulate mock network latency
    await new Promise((resolve) => setTimeout(resolve, 600));

    // Mock verification: accept any valid-looking login
    if (!credentials.email || credentials.email.trim() === "") {
      setIsLoading(false);
      return { success: false, message: "Email wajib diisi." };
    }

    const mockToken = "mock_jwt_token_" + Date.now();
    const loggedInUser: User = {
      ...MOCK_USER,
      email: credentials.email,
    };

    setStoredAuth(mockToken, loggedInUser);
    setToken(mockToken);
    setUser(loggedInUser);
    setIsLoading(false);

    return { success: true };
  };

  const logout = () => {
    removeStoredAuth();
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    isAuthenticated: !!token && !!user,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
