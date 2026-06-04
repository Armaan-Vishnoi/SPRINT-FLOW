import { Router } from "express";

import { authMiddleware } from "../middleware/authMiddleware";

import {
  createTaskController,
  getTasksController,
  createSubTaskController,
  updateTaskStatusController,
  addDependencyController,
  deleteTaskController,
  getTaskDetailController,
} from "../controllers/taskController";

const router = Router();

// create task

router.post("/", authMiddleware, createTaskController);

router.delete(
  "/:taskId",

  authMiddleware,

  deleteTaskController,
);
router.post(
  "/:taskId/dependencies",

  authMiddleware,

  addDependencyController,
);
router.get(
  "/details/:taskId",

  authMiddleware,

  getTaskDetailController,
);
// get sprint tasks

router.get("/:sprintId", authMiddleware, getTasksController);

// create subtask

router.post("/:taskId/subtasks", authMiddleware, createSubTaskController);

// update status

router.patch("/:taskId/status", authMiddleware, updateTaskStatusController);

export default router;
