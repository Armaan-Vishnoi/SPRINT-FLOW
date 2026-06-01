import { Router } from "express";

import { authMiddleware } from "../middleware/authMiddleware";

import {
  addCommentController,
  getCommentsController,
} from "../controllers/commentController";

const router = Router();

router.post("/:taskId", authMiddleware, addCommentController);

router.get("/:taskId", authMiddleware, getCommentsController);

export default router;
