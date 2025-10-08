import React, { createContext, useState, useEffect, useContext } from "react";
import { getSession, logout as oryLogout } from "../api/ory";

type AuthContextType = {
  user: any | null;
  loading: boolean;
  refreshSession: () => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  refreshSession: async () => {},
  logout: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    refreshSession();
  }, []);

  const refreshSession = async () => {
    setLoading(true);
    const session = await getSession();
    if (session?.active) {
      setUser(session.identity);
    } else {
      setUser(null);
    }
    setLoading(false);
  };

  const logout = async () => {
    await oryLogout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, refreshSession, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
