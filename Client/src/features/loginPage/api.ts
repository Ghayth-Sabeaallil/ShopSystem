import api from "../../shared/api/apiClient";

const login = (username: string, password: string) =>
    api.post(`/users/login`, {
        username,
        password
    }, {
        withCredentials: true
    });

const verifyAuth = async () => {
    try {
        const response = await api.get('/users/verify', {
            withCredentials: true,
        });
        const data = response.data as { authenticated: boolean };
        if (data.authenticated) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
};

export const loginApi = {
    login,
    verifyAuth
};
