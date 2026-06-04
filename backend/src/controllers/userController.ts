import { Response } from "express";

import User from "../models/User";

export const getAllUsers = async (req: any, res: Response) => {
  try {
    const users = await User.find({
      isDeactivated: false,
    }).select("_id name email role profilePicture");

    return res.json({
      success: true,

      users,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};
