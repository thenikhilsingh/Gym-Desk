import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function Logout() {
  const { LogoutUser } = useContext(AuthContext);
  useEffect(() => {
    LogoutUser();
  }, [LogoutUser]);
  return <Navigate to="/" />;
}
