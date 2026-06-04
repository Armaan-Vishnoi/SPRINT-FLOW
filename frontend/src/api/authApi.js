import api from "./api";
export const loginUser = (data) => api.post("/api/auth/login", data);
export const registerUser = (data) => api.post("/api/auth/register", data);
// FORGOT PASSWORD
export const forgotPassword = async (email) => {
    const res = await api.post("/api/auth/forgot-password", {
        email,
    });
    return res.data;
};
// RESET PASSWORD
export const resetPassword = async (token, password) => {
    const res = await api.post(`/api/auth/reset-password/${token}`, {
        password,
    });
    return res.data;
};
