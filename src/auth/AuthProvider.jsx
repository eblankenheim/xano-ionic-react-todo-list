import { useState, useEffect } from "react";
import { setAuthToken, getMe } from "../api/xano";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthToken(token);
      getMe()
        .then((res) => setUser(res.data))
        .catch(() => setUser(null))
        .finally(() => setAuthLoading(false));
    } else {
      setAuthLoading(false);
    }
  }, []);

  const loginUser = async (token) => {
    localStorage.setItem("token", token);
    setAuthToken(token);
    const res = await getMe();
    setUser(res.data);
  };

  const logoutUser = () => {
    localStorage.removeItem("token");
    setAuthToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, loginUser, logoutUser, authLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
