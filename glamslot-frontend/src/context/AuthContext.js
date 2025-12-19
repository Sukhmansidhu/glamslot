import { createContext, useState, useEffect } from "react";
import api from "../api/axios"; 

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [wallet, setWallet] = useState(0);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const fetchWallet = async () => {
    try {
      const res = await api.get("/users/wallet");
      setWallet(res.data.balance);
    } catch (err) {
      console.error("Failed to load wallet");
    }
  };

  useEffect(() => {
    if (user) {
      fetchWallet();
    }
  }, [user]);

  const login = (data) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    setUser(data.user);

    fetchWallet();
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setWallet(0); 
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        wallet,        
        fetchWallet,  
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};