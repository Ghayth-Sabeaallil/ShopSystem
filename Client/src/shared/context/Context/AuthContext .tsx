// AuthContext.tsx
import { createContext, useContext, useState, useEffect } from "react";
import { logApi } from "../../../features/loginPage/api/loginApi";
import type { AuthContextType } from "../../types/AuthContextType";

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  const verifyAuth = async () => {
    try {
      const isAuth = await logApi.verifyAuth();
      setAuthenticated(isAuth.authenticated);
    } finally {
      setLoading(false); // Always end loading, even if verify fails
    }
  };

  useEffect(() => {
    verifyAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setAuthenticated,
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
