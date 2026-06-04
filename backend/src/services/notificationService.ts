import Notification from "../models/Notification";

import User from "../models/User";

import { getIO } from "../socket/socket";

import { sendEmail } from "./emailService";

// CREATE NOTIFICATION

export const createNotification = async (data: any) => {
  const notification = await Notification.create(data);

  // SOCKET REALTIME

  getIO().to(`user:${data.userId}`).emit(
    "notification",

    notification,
  );

  // EMAIL CHECK

  const user = await User.findById(data.userId);

  if (user && user.emailNotification === true) {
    await sendEmail(
      user.email,

      data.title,

      data.message,
    );
  }

  return notification;
};

// GET

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

// MARK UNREAD

export const markUnread = async (id: string, userId: string) => {
  return Notification.findOneAndUpdate(
    {
      _id: id,

      userId,
    },

    {
      isRead: false,
    },

    {
      new: true,
    },
  );
};

// MARK ALL

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
