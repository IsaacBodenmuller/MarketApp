import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import api, { setToken } from "../services/api";
import { decodeToken } from "../utils/decodeToken";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function initAuth() {
      const storedToken = localStorage.getItem("accessToken");
      const storedRefreshToken = localStorage.getItem("refreshToken");
      if (storedToken) {
        setToken(storedToken);
        setAccessToken(storedToken);
        setRefreshToken(storedRefreshToken);
        setUser(decodeToken(storedToken));
        setLoading(false);
        return;
      }

      try {
        const response = await api.post("/auth/refresh");
        const token = response.data.accessToken;
        const refreshToken = response.data.refreshToken;

        localStorage.setItem("accessToken", token);
        localStorage.setItem("refreshToken", refreshToken);
        setToken(token);
        setAccessToken(token);
        setRefreshToken(refreshToken);
        setUser(decodeToken(token));
      } catch {
        await api.post("/auth/logout");
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
    const refreshToken = response.data.refreshToken;

    localStorage.setItem("accessToken", token);
    localStorage.setItem("refreshToken", refreshToken);
    setToken(token);
    setAccessToken(token);
    setRefreshToken(refreshToken);
    setUser(decodeToken(token));
  }

  function logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setToken(null);
    setAccessToken(null);
    setRefreshToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ accessToken, refreshToken, user, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}
