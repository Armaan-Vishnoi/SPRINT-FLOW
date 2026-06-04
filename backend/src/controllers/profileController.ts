import { Response } from "express";

import {
  updateProfile,
  changePassword,
  updateProfileImage,
  deactivateAccount,
  requestEmailChange,
  verifyEmailChange,
} from "../services/profileService";

export const updateProfileController = async (req: any, res: Response) => {
  try {
    const user = await updateProfile(
      req.user._id,

      req.body,
    );

    return res.json({
      success: true,

      user,
    });
  } catch (error: any) {
    console.log("LOGIN ERROR:", error);

    return res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// password

export const changePasswordController = async (req: any, res: Response) => {
  try {
    await changePassword(
      req.user._id,

      req.body.oldPassword,

      req.body.newPassword,
    );

    return res.json({
      success: true,

      message: "Password updated",
    });
  } catch (error: any) {
    console.log("LOGIN ERROR:", error);

    return res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

export const uploadProfileImageController = async (req: any, res: Response) => {
  try {
    const user = await updateProfileImage(
      req.user._id,

      req.file.path,
    );

    return res.json({
      success: true,

      user,
    });
  } catch (error: any) {
    console.log("LOGIN ERROR:", error);

    return res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

export const deactivateAccountController = async (req: any, res: Response) => {
  try {
    const user = await deactivateAccount(req.user._id);

    return res.json({
      success: true,

      message: "Account deactivated",

      user,
    });
  } catch (error: any) {
    console.log("LOGIN ERROR:", error);

    return res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

export const requestEmailChangeController = async (req: any, res: Response) => {
  try {
    const result = await requestEmailChange(
      req.user._id,

      req.body.email,
    );

    return res.json({
      success: true,

      message: "Verification link generated",

      link: result.link,
    });
  } catch (error: any) {
    console.log("LOGIN ERROR:", error);

    return res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

export const verifyEmailChangeController = async (req: any, res: Response) => {
  try {
    const user = await verifyEmailChange(req.params.token);

    return res.json({
      success: true,

      message: "Email updated",

      user,
    });
  } catch (error: any) {
    console.log("LOGIN ERROR:", error);

    return res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};
