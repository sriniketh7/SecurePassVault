import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isLoggedIn: false,
    username: "",
  });

  useEffect(() => {
    const username = sessionStorage.getItem("username");
    const token = sessionStorage.getItem("AuthToken");

    if (username && token) {
      setAuthState({ isLoggedIn: true, username });
    }
  }, []);

  const login = (username, token) => {
    setAuthState({ isLoggedIn: true, username });
    sessionStorage.setItem("username", username);
    sessionStorage.setItem("authToken", token);
  };

  const logout = () => {
    setAuthState({ isLoggedIn: false, username: "" });
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("AuthToken"); // Remove token from localStorage
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
