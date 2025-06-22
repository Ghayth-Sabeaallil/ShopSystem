import api from "../../../shared/api/apiClient";
import type { CashierProduct } from "../types/CashierType";

const updateProduct = async (product: CashierProduct[]) =>
    await api.put(`/products/update`, product, { withCredentials: true })
        .then(response => response.data)
        .catch(error => {
            console.error('Update failed:', error);
            throw error;
        });

const addReceipt = async (items: CashierProduct[], bar_code: string) =>
    await api.post(`/receipts/add`, { items, bar_code: bar_code }, { withCredentials: true })
        .then(response => response.data)
        .catch(error => {
            console.error('Add failed:', error);
            throw error;
        });


export const cashierApi = {
    updateProduct, addReceipt
};
