import api from "../../../shared/api/apiClient";
import type { productResponse } from "../types/productType";

const add = (owner_id: string,
    name: string,
    bar_code: string,
    buying_price: number,
    selling_price: number,
    buying_amount: number,
    selling_amount: number,) =>
    api.post(`/products/add`, {
        owner_id,
        name,
        bar_code,
        buying_price,
        selling_price,
        buying_amount,
        selling_amount

    }, {
        withCredentials: true
    })
        .then(response => {
            console.log('Added successful:', response.data);
            return response.data;
        })
        .catch(error => {
            console.error('Added failed:', error);
            throw error;
        });

const getProducts = (ownerId: string) => {
    return api.post<productResponse[]>(`/products/getByOwner`, {
        ownerId: ownerId,
    });
};

export const productApi = {
    add,
    getProducts
};
