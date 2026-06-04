import api from "./api";

export const loginUser = (data: any) => api.post("/api/auth/login", data);

export const registerUser = (data: any) => api.post("/api/auth/register", data);

// FORGOT PASSWORD

export const forgotPassword = async (email: string) => {
  const res = await api.post(
    "/api/auth/forgot-password",

    {
      email,
    },
  );

  return res.data;
};

// RESET PASSWORD

export const resetPassword = async (token: string, password: string) => {
  const res = await api.post(
    `/api/auth/reset-password/${token}`,

    {
      password,
    },
  );

  return res.data;
};
