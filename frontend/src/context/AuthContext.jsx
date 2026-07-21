import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const storeTokenInLS = (serverToken) => {
    return localStorage.setItem("token", serverToken);
  };

  const [token, setToken] = useState(localStorage.getItem("token"));
  const isLoggedIn = !!token;

  const LogoutUser = () => {
    setToken("");
    localStorage.removeItem("token");
  };

  const [user, setUser] = useState();
  const getLoggedInUserData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/auth/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("LoggedIn userData", response.data.loggedInUser);
      if (response.status === 200) {
        setUser(response.data.loggedInUser);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
      getLoggedInUserData();
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={{ storeTokenInLS, isLoggedIn, LogoutUser, user }}
    >
      {children}
    </AuthContext.Provider>
  );
}
