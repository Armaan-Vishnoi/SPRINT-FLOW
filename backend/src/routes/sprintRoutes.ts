import { Router } from "express";

import { authMiddleware } from "../middleware/authMiddleware";

import {
  createSprintController,
  getSprintsController,
  updateSprintController,
  deleteSprintController,
} from "../controllers/sprintController";

const router = Router();

// CREATE

router.post("/", authMiddleware, createSprintController);

// GET PROJECT SPRINTS

router.get("/:projectId", authMiddleware, getSprintsController);

// UPDATE SPRINT

router.patch("/:id", authMiddleware, updateSprintController);

// DELETE SPRINT

router.delete("/:id", authMiddleware, deleteSprintController);

export default router;
