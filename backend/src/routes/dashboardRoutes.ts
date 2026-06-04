import { Router } from "express";

import { authMiddleware } from "../middleware/authMiddleware";

import { getDashboardController } from "../controllers/dashboardController";

const router = Router();

router.get("/", authMiddleware, getDashboardController);

export default router;
