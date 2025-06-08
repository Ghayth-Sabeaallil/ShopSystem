import api from "../../../shared/api/apiClient";
import type { productResponse } from "../types/productType";

const addProduct = (
    name: string,
    bar_code: string,
    buying_price: number,
    selling_price: number,
    buying_amount: number,
    selling_amount: number) =>
    api.post<productResponse>(`/products/add`, {
        name,
        bar_code,
        buying_price,
        selling_price,
        buying_amount,
        selling_amount

    }, {
        withCredentials: true
    }).then(response => {
        return response.data;
    }).catch(error => {
        console.error('Added failed:', error);
        throw error;
    });

const getProducts = async () => {
    return await api.get<productResponse[]>('/products/getByOwner', {
        withCredentials: true,
    });
};

const deleteProduct = async (id: string) =>
    await api.delete(`/products/delete`, {
        id
    }, { withCredentials: true, }).then(response => {
        return response.data;
    }).catch(error => {
        console.error('Delete failed:', error);
        throw error;
    });


export const productApi = {
    addProduct,
    getProducts,
    deleteProduct
};
