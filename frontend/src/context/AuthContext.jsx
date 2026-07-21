import { createContext, useState } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const storeTokenInLS = (serverToken) => {
    return localStorage.setItem("token", serverToken);
  };

  const [token, setToken] = useState(localStorage.getItem("token"));
  const isLoggedIn = !!token;

  const LogoutUser = () => {
    setToken("");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ storeTokenInLS, isLoggedIn, LogoutUser }}>
      {children}
    </AuthContext.Provider>
  );
}
