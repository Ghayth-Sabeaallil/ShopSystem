import type { productResponse } from "../../features/SidebarModal/types/productType";

export type AuthContextType = {
    isAuthenticated: boolean;
    loading: boolean;
    setAuthenticated: (value: boolean) => void;
    verifyAuth: () => Promise<void>;
    userId: string;
    setUserId: (id: string) => void;
};

export type ProductsContextType = {
    products: productResponse[];
    setProducts: (value: productResponse[]) => void;
};