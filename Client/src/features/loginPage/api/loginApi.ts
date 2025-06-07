import api from "../../../shared/api/apiClient";

const login = (username: string, password: string) =>
    api.post(`/users/login`, {
        username,
        password
    }, {
        withCredentials: true
    })
        .then(response => {
            console.log('Login successful:', response.data);
            return response.data;
        })
        .catch(error => {
            console.error('Login failed:', error);
            throw error;
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
        return data.authenticated;
    } catch {
        return false;
    }
};

export const logApi = {
    login,
    logout,
    verifyAuth
};
