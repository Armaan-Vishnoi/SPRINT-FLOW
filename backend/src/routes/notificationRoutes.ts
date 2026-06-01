import { Router } from "express";

import { authMiddleware } from "../middleware/authMiddleware";

import {
  getNotificationsController,
  markReadController,
  markAllReadController,
  deleteNotificationController,
  clearNotificationsController,
} from "../controllers/notificationController";

const router = Router();

// GET

router.get("/", authMiddleware, getNotificationsController);

// READ ONE

router.patch("/:id/read", authMiddleware, markReadController);

// READ ALL

router.patch("/read-all", authMiddleware, markAllReadController);

// DELETE ONE

router.delete("/:id", authMiddleware, deleteNotificationController);

// CLEAR ALL

router.delete("/", authMiddleware, clearNotificationsController);

export default router;
