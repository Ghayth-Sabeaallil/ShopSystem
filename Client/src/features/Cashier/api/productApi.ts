import api from "../../../shared/api/apiClient";
import type { CashierProduct } from "../types/CashierType";

const updateProduct = async (product: CashierProduct[]) =>
    await api.put(`/products/update`, product, { withCredentials: true })
        .then(response => response.data)
        .catch(error => {
            console.error('Update failed:', error);
            throw error;
        });


export const productApi = {
    updateProduct
};
