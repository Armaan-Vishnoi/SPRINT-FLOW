import api from "./api";

export const getAuditLogs = async () => {
  const res = await api.get("/api/audit");

  return res.data;
};
