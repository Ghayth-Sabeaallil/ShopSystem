// Copyright (c) 2025 Ghayth Sabeaallil
// All rights reserved.

import { createContext, useContext, useState, useEffect } from "react";
import { logApi } from "../../../features/loginPage/api/loginApi";
import type { AuthContextType } from "../../types/AuthContextType";

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setAuthenticated] = useState<boolean>(false);
  const [role, setRole] = useState<string>("");
  const [marketName, setMarketName] = useState<string>("");
  const [marketAddress, setMarketAddress] = useState<string>("");
  const [marketPhone, setMarketPhone] = useState<string>("");

  const [loading, setLoading] = useState(true);

  const verifyAuth = async () => {
    try {
      const isAuth = await logApi.verifyAuth();
      setAuthenticated(isAuth.authenticated);
      setRole(isAuth.role);
      setMarketName(isAuth.marketName);
      setMarketAddress(isAuth.marketAddress);
      setMarketPhone(isAuth.marketPhone);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    verifyAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        role,
        marketName,
        marketAddress,
        marketPhone,
        verifyAuth,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
