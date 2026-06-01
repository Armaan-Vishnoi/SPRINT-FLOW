import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.get("/me", authMiddleware, async (req: any, res) => {
  res.json({
    success: true,
    user: req.user,
  });
});

export default router;
