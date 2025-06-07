// AuthContext.tsx
import { createContext, useContext, useState, useEffect } from "react";
import { loginApi } from "../../../features/loginPage/api/loginApi";

type AuthContextType = {
  isAuthenticated: boolean;
  loading: boolean;
  setAuthenticated: (value: boolean) => void;
  verifyAuth: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const verifyAuth = async () => {
    try {
      const isAuth = await loginApi.verifyAuth();
      setAuthenticated(isAuth);
    } finally {
      setLoading(false); // Always end loading, even if verify fails
    }
  };

  useEffect(() => {
    verifyAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setAuthenticated, verifyAuth, loading }}
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
