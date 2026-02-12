import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import api, { setToken } from "../services/api";

export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(null);
  useEffect(() => {
    async function tryRefresh() {
      try {
        const response = await api.post("/auth/refresh");
        setToken(response.data.access_token);
        setAccessToken(response.data.access_token);
      } catch {
        setAccessToken(null);
      }
    }

    tryRefresh();
  }, []);

  async function login(username, password, remember) {
    const response = await api.post("/auth/login", {
      username,
      password,
      remember,
    });

    setToken(response.data.access_token);
    setAccessToken(response.data.access_token);
  }

  async function refresh() {
    const response = await api.post("/auth/refresh");
    setToken(response.data.access_token);
    setAccessToken(response.data.access_token);
  }

  function logout() {
    setToken(null);
    setAccessToken(null);
  }

  return (
    <AuthContext.Provider value={{ accessToken, login, logout, refresh }}>
      {children}
    </AuthContext.Provider>
  );
}
