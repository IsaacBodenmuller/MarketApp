import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import api, { setToken } from "../services/api";
import { decodeToken } from "../utils/decodeToken";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function tryRefresh() {
      try {
        const response = await api.post("/auth/refresh");
        setToken(response.data.access_token);
        setAccessToken(response.data.access_token);
      } catch {
        setAccessToken(null);
      } finally {
        setLoading(false);
      }
    }

    tryRefresh();
  }, []);

  useEffect(() => {
    if (accessToken) {
      setUser(decodeToken(accessToken));
    }
  }, [accessToken]);

  async function login(username, password, remember) {
    const response = await api.post("/auth/login", {
      username,
      password,
      remember,
    });

    setToken(response.data.access_token);
    setAccessToken(response.data.access_token);
  }

  function logout() {
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
