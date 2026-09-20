import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { apiFetch, setAuthToken, clearAuthToken, getAuthToken } from "@/lib/api";

type AdminUser = {
  id: string;
  email: string;
  name: string;
};

type AuthContextValue = {
  user: AdminUser | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [token, setToken] = useState<string | null>(() => getAuthToken());
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const current = getAuthToken();
    if (!current) {
      setUser(null);
      setToken(null);
      setLoading(false);
      return;
    }
    try {
      const res = await apiFetch<{ success: boolean; user: AdminUser }>("/auth/me");
      setUser(res.user);
      setToken(current);
    } catch {
      clearAuthToken();
      setUser(null);
      setToken(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const login = useCallback(async (email: string, password: string) => {
    const res = await apiFetch<{
      success: boolean;
      token: string;
      user: AdminUser;
    }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    setAuthToken(res.token);
    setToken(res.token);
    setUser(res.user);
  }, []);

  const logout = useCallback(async () => {
    try {
      await apiFetch("/auth/logout", { method: "POST" });
    } catch {
      // ignore
    }
    clearAuthToken();
    setToken(null);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, token, loading, login, logout, refresh }),
    [user, token, loading, login, logout, refresh],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
