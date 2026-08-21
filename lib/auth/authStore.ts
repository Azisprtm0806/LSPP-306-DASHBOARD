import { User } from "@/types/auth";

export const MOCK_USER: User = {
  id: "usr-01",
  name: "Ahmad Riyadh Smith",
  email: "admin@lspp.id",
  role: "Asesor",
  avatar: "/images/avatar.png",
};

const TOKEN_KEY = "lspp_auth_token";
const USER_KEY = "lspp_auth_user";

export function getStoredToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function getStoredUser(): User | null {
  if (typeof window === "undefined") return null;
  const userStr = localStorage.getItem(USER_KEY);
  if (!userStr) return null;
  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
}

export function setStoredAuth(token: string, user: User): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  // Also store in cookie for server / middleware checks if needed
  document.cookie = `${TOKEN_KEY}=${token}; path=/; max-age=86400; SameSite=Lax`;
}

export function removeStoredAuth(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  document.cookie = `${TOKEN_KEY}=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=Lax`;
}
