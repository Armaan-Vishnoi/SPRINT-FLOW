import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";

import {
  createProjectController,
  getProjectsController,
} from "../controllers/projectController";

const router = Router();

router.post(
  "/",
  authMiddleware,
  createProjectController
);

router.get(
  "/",
  authMiddleware,
  getProjectsController
);

export default router;