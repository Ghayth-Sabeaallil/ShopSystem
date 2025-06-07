import api from "../../../shared/api/apiClient";

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

export const logoutApi = {
    logout,
};
