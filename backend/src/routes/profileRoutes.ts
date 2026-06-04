import { Router } from "express";

import { authMiddleware } from "../middleware/authMiddleware";

import { uploadProfile } from "../middleware/uploadMiddleware";

import {
  updateProfileController,
  changePasswordController,
  uploadProfileImageController,
  deactivateAccountController,
  requestEmailChangeController,
  verifyEmailChangeController,
} from "../controllers/profileController";

const router = Router();

// GET PROFILE

router.get(
  "/me",

  authMiddleware,

  (req: any, res) => {
    return res.json({
      success: true,

      user: req.user,
    });
  },
);

// UPDATE DETAILS

router.patch(
  "/",

  authMiddleware,

  updateProfileController,
);

// CHANGE PASSWORD

router.patch(
  "/password",

  authMiddleware,

  changePasswordController,
);

// PROFILE IMAGE

router.patch(
  "/image",

  authMiddleware,

  uploadProfile.single("image"),

  uploadProfileImageController,
);

// EMAIL CHANGE REQUEST

router.post(
  "/email/change",

  authMiddleware,

  requestEmailChangeController,
);

// EMAIL VERIFY

router.get(
  "/email/verify/:token",

  verifyEmailChangeController,
);

// DEACTIVATE

router.patch(
  "/deactivate",

  authMiddleware,

  deactivateAccountController,
);

export default router;
