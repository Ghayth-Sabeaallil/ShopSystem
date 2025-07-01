// Copyright (c) 2025 Ghayth Sabeaallil
// All rights reserved.

import api from "../../../shared/api/apiClient";
import type { CashierProduct } from "../../Cashier/types/CashierType";
import type { receiptResponse } from "../types/receiptType";

const updateReceipt = async (items: CashierProduct[], barCode: string) =>
    await api.put<receiptResponse>(`/receipts/update`, { items, barCode }, { withCredentials: true })
        .then(response => response.data)
        .catch(error => {
            console.error('Update failed:', error);
            throw error;
        });

export const receiptApi = {
    updateReceipt
};
