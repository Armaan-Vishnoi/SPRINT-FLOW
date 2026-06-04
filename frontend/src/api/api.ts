import axios from "axios";

import toast from "react-hot-toast";

const api = axios.create({
  baseURL: "http://localhost:5000",
});

// SEND TOKEN

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// GLOBAL ERROR HANDLER

api.interceptors.response.use(
  (response) => response,

  (error) => {
    const message = error.response?.data?.message || "Something went wrong";

    toast.error(message);

    // TOKEN EXPIRED

    if (error.response?.status === 401) {
      localStorage.clear();

      window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);

export default api;
