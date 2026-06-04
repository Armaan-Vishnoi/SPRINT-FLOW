import api from "./api";

// GET

export const getNotifications = async () => {
  const res = await api.get("/api/notifications");

  return res.data;
};

// MARK READ

export const markRead = async (id: string) => {
  const res = await api.patch(`/api/notifications/${id}/read`);

  return res.data;
};

// MARK UNREAD

export const markUnread = async (id: string) => {
  const res = await api.patch(`/api/notifications/${id}/unread`);

  return res.data;
};

// MARK ALL READ

export const markAllRead = async () => {
  const res = await api.patch("/api/notifications/read-all");

  return res.data;
};

// DELETE

export const deleteNotification = async (id: string) => {
  const res = await api.delete(`/api/notifications/${id}`);

  return res.data;
};

// CLEAR ALL

export const clearNotifications = async () => {
  const res = await api.delete("/api/notifications");

  return res.data;
};
