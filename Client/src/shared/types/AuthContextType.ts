// Copyright (c) 2025 Ghayth Sabeaallil
// All rights reserved.

import type { productResponse } from "../../features/SidebarModal/types/productType";
import type { receiptResponse } from "../../features/SidebarModal/types/receiptType";

export type AuthContextType = {
    isAuthenticated: boolean;
    role: string;
    marketName: string;
    marketAddress: string;
    marketPhone: string;
    loading: boolean;
    verifyAuth: () => Promise<void>;
};

export type ProductsContextType = {
    products: productResponse[];
    setProducts: (value: productResponse[]) => void;
};

export type ReceiptsContextType = {
    receipts: receiptResponse[];
    setReceipts: React.Dispatch<React.SetStateAction<receiptResponse[]>>
};