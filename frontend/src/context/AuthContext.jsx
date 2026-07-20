import { createContext, useState } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  return (
    <AuthContext.Provider value={{ token }}>{children}</AuthContext.Provider>
  );
}
