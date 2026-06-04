import User from "../models/User";

import crypto from "crypto";

import { hashPassword } from "../utils/hashPassword";

// FIND USER

export const findUserByEmail = async (email: string) => {
  return User.findOne({
    email,
  });
};

// CREATE USER

export const createUser = async (userData: any) => {
  return User.create(userData);
};

// CHECK ACCOUNT ACTIVE

export const checkUserActive = (user: any) => {
  if (user.isDeactivated) {
    throw new Error("Account is deactivated");
  }
};

// ================= FORGOT PASSWORD =================

export const createPasswordResetToken = async (email: string) => {
  const user = await User.findOne({
    email,
  });

  if (!user) {
    throw new Error("Email not found");
  }

  const token = crypto.randomBytes(32).toString("hex");

  user.resetPasswordToken = token;

  // IMPORTANT SAME AS YOUR MODEL

  user.resetPasswordExpires = new Date(Date.now() + 15 * 60 * 1000);

  await user.save();

  return token;
};

// ================= RESET PASSWORD =================

export const resetUserPassword = async (
  token: string,

  password: string,
) => {
  const user = await User.findOne({
    resetPasswordToken: token,

    resetPasswordExpires: {
      $gt: new Date(),
    },
  });

  if (!user) {
    throw new Error("Invalid or expired token");
  }

  user.password = await hashPassword(password);

  user.resetPasswordToken = null;

  user.resetPasswordExpires = null;

  await user.save();

  return true;
};
