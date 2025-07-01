// Copyright (c) 2025 Ghayth Sabeaallil
// All rights reserved.

import api from "../../../shared/api/apiClient";

const login = (username: string, password: string) =>
    api.post(`/users/login`, {
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
        const { data } = await api.get<{ authenticated: boolean }>('/users/verify', {
            withCredentials: true,
        });

        return {
            authenticated: data.authenticated,
        };
    } catch {
        return {
            authenticated: false,
            userId: "",
        };
    }
};


export const logApi = {
    login,
    logout,
    verifyAuth
};

