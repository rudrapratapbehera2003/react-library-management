import React, { createContext, useState, useEffect } from "react";
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState(null);
  const [isAuthenticated, setISAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  const login = (token) => {
    localStorage.setItem("token", token);
    setISAuthenticated(true);
    const decodeToken = JSON.parse(atob(token.split(".")[1]));
    setUsername(decodeToken.sub);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setISAuthenticated(false);
    setUsername(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setISAuthenticated(true);
      const decodeToken = JSON.parse(atob(token.split(".")[1]));
      setUsername(decodeToken.sub);
    }

    const checkAuth = () => {
      const token = localStorage.getItem("token");
      if (token) {
        setISAuthenticated(true);
        const decodeToken = JSON.parse(atob(token.split(".")[1]));
        setUsername(decodeToken.sub);
      } else {
        setISAuthenticated(false);
        setUsername(null);
      }
    };
    
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
