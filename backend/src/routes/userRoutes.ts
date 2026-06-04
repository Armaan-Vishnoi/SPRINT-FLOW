import { Router } from "express";

import { authMiddleware } from "../middleware/authMiddleware";

import { getAllUsers } from "../controllers/userController";

const router = Router();

router.get(
  "/",

  authMiddleware,

  getAllUsers,
);

export default router;
