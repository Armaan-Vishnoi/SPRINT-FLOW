import { Router } from "express";

import { authMiddleware } from "../middleware/authMiddleware";

import {
  createSprintController,
  getSprintsController,
} from "../controllers/sprintController";

const router = Router();

router.post("/", authMiddleware, createSprintController);

router.get("/:projectId", authMiddleware, getSprintsController);

export default router;
