import { Response } from "express";

import {
  getMyNotifications,
  markRead,
  markAllRead,
  deleteNotification,
  clearNotifications,
} from "../services/notificationService";

// GET NOTIFICATIONS

export const getNotificationsController = async (req: any, res: Response) => {
  try {
    const notifications = await getMyNotifications(req.user._id);

    return res.json({
      success: true,

      notifications,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,

      message: error.message,
    });
  }
};

// MARK ONE READ

export const markReadController = async (req: any, res: Response) => {
  try {
    const notification = await markRead(
      req.params.id,

      req.user._id,
    );

    return res.json({
      success: true,

      notification,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,

      message: error.message,
    });
  }
};

// MARK ALL READ

export const markAllReadController = async (req: any, res: Response) => {
  try {
    await markAllRead(req.user._id);

    return res.json({
      success: true,

      message: "All notifications marked read",
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,

      message: error.message,
    });
  }
};

// DELETE ONE

export const deleteNotificationController = async (req: any, res: Response) => {
  try {
    await deleteNotification(
      req.params.id,

      req.user._id,
    );

    return res.json({
      success: true,

      message: "Notification deleted",
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,

      message: error.message,
    });
  }
};

// CLEAR ALL

export const clearNotificationsController = async (req: any, res: Response) => {
  try {
    await clearNotifications(req.user._id);

    return res.json({
      success: true,

      message: "Notifications cleared",
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,

      message: error.message,
    });
  }
};
