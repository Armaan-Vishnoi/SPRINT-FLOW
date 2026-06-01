import { Router } from "express";

import { authMiddleware } from "../middleware/authMiddleware";

import { upload } from "../config/cloudUpload";

import {
  uploadAttachmentController,
  getAttachmentsController,
  downloadAttachmentController,
  deleteAttachmentController,
} from "../controllers/attachmentController";

const router = Router();

// ================= UPLOAD =================

router.post(
  "/:taskId",

  authMiddleware,

  upload.single("file"),

  uploadAttachmentController,
);

// ================= GET TASK FILES =================

router.get(
  "/task/:taskId",

  authMiddleware,

  getAttachmentsController,
);

// ================= DOWNLOAD =================

router.get(
  "/download",

  authMiddleware,

  downloadAttachmentController,
);

// ================= DELETE =================

router.delete(
  "/:id",

  authMiddleware,

  deleteAttachmentController,
);

export default router;
