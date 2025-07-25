// Copyright (c) 2025 Ghayth Sabeaallil
// All rights reserved.

import api from "../../../shared/api/apiClient";

const login = (marketId: string, username: string, password: string) =>
    api.post(`/users/login`, {
        marketId,
        username,
        password
    }, {
        withCredentials: true
    });

const logout = () => {
    return api.post(`/users/logout`, {}, {
        withCredentials: true
    })
        .then(() => {
            window.location.reload();
        })
        .catch((error) => {
            console.error("Logout failed:", error);
            alert("Logout failed. Please try again.");
        });
};

const verifyAuth = async () => {
    try {
        const { data } = await api.get<{ authenticated: boolean, role: string, marketName: string, marketAddress: string, marketPhone: string }>('/users/verify', {
            withCredentials: true,
        });

        return {
            authenticated: data.authenticated,
            role: data.role,
            marketName: data.marketName,
            marketAddress: data.marketAddress,
            marketPhone: data.marketPhone
        };
    } catch {
        return {
            authenticated: false,
            role: "",
            marketName: "",
            marketAddress: "",
            marketPhone: ""
        };
    }
};


export const logApi = {
    login,
    logout,
    verifyAuth
};

