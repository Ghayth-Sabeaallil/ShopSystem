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
  const [products, setProducts] = useState<productResponse[]>([]);
  const { isAuthenticated } = useAuth();

  const getProducts = async () => {
    try {
      const response = await productApi.getProducts();
      setProducts(response.data); // Adjust 'data' if the actual field is different
    } catch (error) {
      setProducts([]);
    }
  };

  useEffect(() => {
    if (isAuthenticated) getProducts();
  }, [isAuthenticated]);

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
