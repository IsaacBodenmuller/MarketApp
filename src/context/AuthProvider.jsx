import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import api, { setToken } from "../services/api";
import { decodeToken } from "../utils/decodeToken";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function initAuth() {
      const storedToken = localStorage.getItem("accessToken");

      if (storedToken) {
        setToken(storedToken);
        setUser(decodeToken(storedToken));
        setLoading(false);
        return;
      }

      try {
        const response = await api.post("/auth/refresh");

        const token = response.data.accessToken;

        setToken(token);
        setUser(decodeToken(token));
      } catch {
        logout();
      } finally {
        setLoading(false);
      }
    }

    initAuth();
  }, []);

  async function login(login, password, remember) {
    const response = await api.post("/auth/login", {
      login,
      password,
      remember,
    });

    const token = response.data.accessToken;

    setToken(token);
    setUser(decodeToken(token));
  }

  function logout() {
    api.post("/auth/logout");

    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
