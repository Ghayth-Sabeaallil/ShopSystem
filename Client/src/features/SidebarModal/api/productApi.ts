import api from "../../../shared/api/apiClient";
import type { productRequest, productResponse } from "../types/productType";

const addProduct = (product: productRequest) =>
    api.post<productResponse>(`/products/add`, product, {
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

const editProduct = async (id: string, product: productRequest) =>
    await api.put(`/products/edit`, {
        id,
        ...product
    }, { withCredentials: true }).then(response => {
        return response.data;
    }).catch(error => {
        console.error('Update failed:', error);
        throw error;
    });

const updateSale = async (id: string, sale_price: number) =>
    await api.put(`/products/sale`,
        {
            id: id,
            sale_price: sale_price,

        }, { withCredentials: true }).then(response => {
            return response.data;
        }).catch(error => {
            console.error('Update failed:', error);
            throw error;
        });

export const productApi = {
    addProduct,
    getProducts,
    deleteProduct,
    editProduct,
    updateSale
};
