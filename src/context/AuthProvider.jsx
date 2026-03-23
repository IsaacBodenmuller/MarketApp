import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import api, { setToken } from "../services/api";
import { decodeToken } from "../utils/decodeToken";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function initAuth() {
      const storedToken = localStorage.getItem("accessToken");

      if (storedToken) {
        setToken(storedToken);
        setAccessToken(storedToken);
        setUser(decodeToken(storedToken));
        setLoading(false);
        return;
      }

      try {
        const response = await api.post("/auth/refresh");
        const token = response.data.access_token;

        localStorage.setItem("accessToken", token);
        setToken(token);
        setAccessToken(token);
        setUser(decodeToken(token));
      } catch {
        logout();
      } finally {
        setLoading(false);
      }
    }

    initAuth();
  }, []);

  async function login(username, password, remember) {
    const response = await api.post("/auth/login", {
      username,
      password,
      remember,
    });

    const token = response.data.access_token;

    localStorage.setItem("accessToken", token);
    setToken(token);
    setAccessToken(token);
    setUser(decodeToken(token));
  }

  function logout() {
    localStorage.removeItem("accessToken");
    setToken(null);
    setAccessToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ accessToken, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
