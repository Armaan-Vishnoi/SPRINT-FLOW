import User from "../models/User";
import bcrypt from "bcrypt";
import crypto from "crypto";

export const updateProfile = async (userId: string, data: any) => {
  const user = await User.findByIdAndUpdate(
    userId,

    {
      name: data.name,
      phone: data.phone,
    },

    {
      new: true,
    },
  ).select("-password");

  return user;
};

// PASSWORD CHANGE

export const changePassword = async (
  userId: string,
  oldPassword: string,
  newPassword: string,
) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  const match = await bcrypt.compare(oldPassword, user.password);

  if (!match) {
    throw new Error("Current password incorrect");
  }

  const strong = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;

  if (!strong.test(newPassword)) {
    throw new Error("Weak password");
  }

  user.password = await bcrypt.hash(newPassword, 10);

  await user.save();

  return true;
};

export const updateProfileImage = async (userId: string, image: string) => {
  return User.findByIdAndUpdate(
    userId,

    {
      profilePicture: image,
    },

    {
      new: true,
    },
  ).select("-password");
};

// ACCOUNT DEACTIVATE

export const deactivateAccount = async (userId: string) => {
  const user = await User.findByIdAndUpdate(
    userId,

    {
      isDeactivated: true,
    },

    {
      new: true,
    },
  ).select("-password");

  return user;
};

// REQUEST EMAIL CHANGE

export const requestEmailChange = async (userId: string, newEmail: string) => {
  const token = crypto.randomBytes(32).toString("hex");

  const user = await User.findByIdAndUpdate(
    userId,

    {
      pendingEmail: newEmail,

      emailChangeToken: token,
    },

    {
      new: true,
    },
  );

  return {
    user,

    link: `http://localhost:5000/api/user/profile/verify-email/${token}`,
  };
};

// VERIFY EMAIL CHANGE

export const verifyEmailChange = async (token: string) => {
  const user = await User.findOne({
    emailChangeToken: token,
  });

  if (!user) {
    throw new Error("Invalid verification token");
  }

  if (!user.pendingEmail) {
    throw new Error("No pending email found");
  }

  user.email = user.pendingEmail;

  user.pendingEmail = null;

  user.emailChangeToken = null;

  user.emailVerified = true;

  await user.save();

  const safeUser = await User.findById(user._id).select("-password");

  return safeUser;
};
