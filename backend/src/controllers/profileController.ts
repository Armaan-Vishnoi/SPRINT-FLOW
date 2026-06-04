import { Response } from "express";
import { v2 as cloudinary } from "cloudinary";

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

export const uploadProfileImageController = async (req: any, res: any) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No image",
      });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "profiles",
    });

    req.user.profilePicture = result.secure_url;

    await req.user.save();

    return res.json({
      success: true,

      image: result.secure_url,
    });
  } catch (error: any) {
    console.log("IMAGE UPLOAD ERROR:", error);

    res.status(500).json({
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
