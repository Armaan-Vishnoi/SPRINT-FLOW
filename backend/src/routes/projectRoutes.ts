import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";

import {
  createProjectController,
  getProjectsController,
  getProjectByIdController,
  updateProjectController,
  addMemberController,
} from "../controllers/projectController";

const router = Router();

router.post("/", authMiddleware, createProjectController);

router.get("/", authMiddleware, getProjectsController);

router.get("/:id", authMiddleware, getProjectByIdController);

router.patch("/:id", authMiddleware, updateProjectController);

router.post("/:id/member", authMiddleware, addMemberController);

export default router;
