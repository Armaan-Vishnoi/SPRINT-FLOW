import { Request, Response } from "express";

import { registerSchema } from "../validators/authValidator";

import { hashPassword } from "../utils/hashPassword";

import { comparePassword } from "../utils/comparePassword";

import { generateToken } from "../utils/generateToken";

import {
  findUserByEmail,
  createUser,
  checkUserActive,
  createPasswordResetToken,
  resetUserPassword,
} from "../services/authService";

// REGISTER

export const register = async (req: Request, res: Response) => {
  try {
    const validatedData = registerSchema.parse(req.body);

    const existingUser = await findUserByEmail(validatedData.email);

    if (existingUser) {
      return res.status(400).json({
        success: false,

        message: "Email already exists",
      });
    }

    const hashedPassword = await hashPassword(validatedData.password);

    const user = await createUser({
      ...validatedData,

      password: hashedPassword,
    });

    return res.status(201).json({
      success: true,

      message: "User registered",

      user: {
        id: user._id,

        name: user.name,

        email: user.email,
      },
    });
  } catch (error: any) {
    console.log("LOGIN DEPLOY ERROR:", error);

    return res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// LOGIN

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(400).json({
        success: false,

        message: "Invalid credentials",
      });
    }

    checkUserActive(user);

    const match = await comparePassword(
      password,

      user.password,
    );

    if (!match) {
      return res.status(400).json({
        success: false,

        message: "Invalid credentials",
      });
    }

    const token = generateToken(user._id.toString());

    return res.json({
      success: true,

      token,

      user: {
        id: user._id,

        name: user.name,

        email: user.email,

        role: user.role,
      },
    });
  } catch (error: any) {
    console.log("LOGIN DEPLOY ERROR:", error);

    return res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// FORGOT PASSWORD

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const token = await createPasswordResetToken(req.body.email);

    return res.json({
      success: true,

      message: "Reset link generated",

      link: `http://localhost:5173/reset-password/${token}`,
    });
  } catch (error: any) {
    console.log("LOGIN DEPLOY ERROR:", error);

    return res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// RESET PASSWORD

export const resetPassword = async (req: Request, res: Response) => {
  try {
    await resetUserPassword(
      String(req.params.token),

      req.body.password,
    );

    return res.json({
      success: true,

      message: "Password changed successfully",
    });
  } catch (error: any) {
    console.log("LOGIN DEPLOY ERROR:", error);

    return res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};
