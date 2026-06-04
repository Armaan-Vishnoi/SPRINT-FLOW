import api from "./api";

// GET ALL USERS

export const getUsers = async () => {
  const res = await api.get("/api/users");

  return res.data;
};
