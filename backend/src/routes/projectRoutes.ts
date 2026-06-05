import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";

import {
  createProjectController,
  getProjectsController,
  getProjectByIdController,
  updateProjectController,
  addMemberController,
  deleteProjectController,
} from "../controllers/projectController";

const router = Router();

router.post("/", authMiddleware, createProjectController);

router.get("/", authMiddleware, getProjectsController);

router.get("/:id", authMiddleware, getProjectByIdController);

router.patch("/:id", authMiddleware, updateProjectController);

router.post("/:id/member", authMiddleware, addMemberController);

router.delete("/:id", authMiddleware, deleteProjectController);

export default router;
