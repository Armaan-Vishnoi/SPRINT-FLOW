import Notification from "../models/Notification";

import { getIO } from "../socket/socket";

// CREATE + SOCKET SEND

export const createNotification = async (data: any) => {
  const notification = await Notification.create(data);

  // realtime send

  getIO().to(`user:${data.userId}`).emit(
    "notification",

    notification,
  );

  return notification;
};

// GET MY NOTIFICATIONS

export const getMyNotifications = async (userId: string) => {
  return Notification.find({
    userId,
  }).sort({
    createdAt: -1,
  });
};

// MARK READ

export const markRead = async (id: string, userId: string) => {
  return Notification.findOneAndUpdate(
    {
      _id: id,
      userId,
    },

    {
      isRead: true,
    },

    {
      new: true,
    },
  );
};

// MARK ALL READ

export const markAllRead = async (userId: string) => {
  return Notification.updateMany(
    {
      userId,
    },

    {
      isRead: true,
    },
  );
};

// DELETE ONE

export const deleteNotification = async (id: string, userId: string) => {
  return Notification.deleteOne({
    _id: id,

    userId,
  });
};

// DELETE ALL

export const clearNotifications = async (userId: string) => {
  return Notification.deleteMany({
    userId,
  });
};
