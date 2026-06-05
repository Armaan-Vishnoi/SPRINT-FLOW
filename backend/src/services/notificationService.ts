import Notification from "../models/Notification";

import User from "../models/User";

import { getIO } from "../socket/socket";

import { sendEmail } from "./emailService";

// ================= CREATE NOTIFICATION =================

export const createNotification = async (data: any) => {
  const notification = await Notification.create(data);

  // GET REAL UNREAD COUNT

  const unreadCount = await Notification.countDocuments({
    userId: data.userId,

    isRead: false,
  });

  getIO().to(`user:${data.userId}`).emit(
    "notification",

    {
      notification,

      unreadCount,
    },
  );
  console.log(
    "SENDING NOTIFICATION SOCKET TO:",
    `user:${data.userId}`,
    unreadCount,
  );
  // EMAIL BACKGROUND

  setImmediate(async () => {
    try {
      const user = await User.findById(data.userId);

      console.log(
        "EMAIL CHECK:",

        user?.email,

        user?.emailNotification,
      );

      if (user && user.emailNotification) {
        await sendEmail(
          user.email,

          data.title,

          data.message,
        );

        console.log(
          "EMAIL SENT:",

          user.email,
        );
      }
    } catch (error: any) {
      console.log(
        "EMAIL ERROR:",

        error.message,
      );
    }
  });

  return notification;
};

// ================= GET =================

export const getMyNotifications = async (userId: string) => {
  return Notification.find({
    userId,
  }).sort({
    createdAt: -1,
  });
};

// ================= MARK READ =================

export const markRead = async (
  id: string,

  userId: string,
) => {
  return Notification.findOneAndUpdate(
    {
      _id: id,

      userId,
    },

    {
      isRead: true,
    },

    {
      returnDocument: "after",
    },
  );
};

// ================= MARK UNREAD =================

export const markUnread = async (
  id: string,

  userId: string,
) => {
  return Notification.findOneAndUpdate(
    {
      _id: id,

      userId,
    },

    {
      isRead: false,
    },

    {
      returnDocument: "after",
    },
  );
};

// ================= MARK ALL READ =================

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

// ================= DELETE ONE =================

export const deleteNotification = async (
  id: string,

  userId: string,
) => {
  return Notification.deleteOne({
    _id: id,

    userId,
  });
};

// ================= CLEAR ALL =================

export const clearNotifications = async (userId: string) => {
  return Notification.deleteMany({
    userId,
  });
};
