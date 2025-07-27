// Copyright (c) 2025 Ghayth Sabeaallil
// All rights reserved.

import api from "../../../shared/api/apiClient";
import type { receiptResponse } from "../../SidebarModal/types/receiptType";
import type { CashierProduct } from "../types/CashierType";

const updateProduct = async (product: CashierProduct[], action: string) =>
    await api.put(`/products/update`, { product, action }, { withCredentials: true })
        .then(response => response.data)
        .catch(error => {
            console.error('Update failed:', error);
            throw error;
        });

const addReceipt = async (items: CashierProduct[], bar_code: string, expire_at: Date) =>
    await api.post<receiptResponse>(`/receipts/add`, { items, bar_code, expire_at }, { withCredentials: true })
        .then(response => {
            return response.data;
        }).catch(error => {
            console.error('Added failed:', error);
            throw error;
        });

const getReceipts = async () => {
    return await api.get<receiptResponse[]>('/receipts/getByOwner', {
        withCredentials: true,
    });
};

export const cashierApi = {
    updateProduct, addReceipt, getReceipts
};
