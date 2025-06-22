import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext ";
import type { receiptResponse } from "../../../features/SidebarModal/types/receiptType";
import type { ReceiptsContextType } from "../../types/AuthContextType";
import { cashierApi } from "../../../features/Cashier/api/cashierApi";

const ReceiptsContext = createContext<ReceiptsContextType | null>(null);

export const ReceiptsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [receipts, setReceipts] = useState<receiptResponse[]>([]);
  const { isAuthenticated } = useAuth();

  const getReceipts = async () => {
    try {
      const response = await cashierApi.getReceipts();
      setReceipts(response.data);
    } catch (error) {
      setReceipts([]);
    }
  };

  useEffect(() => {
    if (isAuthenticated) getReceipts();
  }, [isAuthenticated]);

  return (
    <ReceiptsContext.Provider
      value={{
        receipts,
        setReceipts,
      }}
    >
      {children}
    </ReceiptsContext.Provider>
  );
};

export const useReceipt = () => {
  const context = useContext(ReceiptsContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
