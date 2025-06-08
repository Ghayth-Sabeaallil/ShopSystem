// AuthContext.tsx
import { createContext, useContext, useState, useEffect } from "react";
import type { ProductsContextType } from "../../types/AuthContextType";
import type { productResponse } from "../../../features/SidebarModal/types/productType";
import { productApi } from "../../../features/SidebarModal/api/productApi";
import { useAuth } from "./AuthContext ";

const ProductContext = createContext<ProductsContextType | null>(null);

export const ProductsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { userId } = useAuth();
  const [products, setProducts] = useState<productResponse[]>([]);

  const getProducts = async () => {
    try {
      const response = await productApi.getProducts(userId);
      setProducts(response.data);
    } catch (error) {
      setProducts([]);
    }
  };

  useEffect(() => {
    if (userId) {
      getProducts();
    }
  }, [userId]);

  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
