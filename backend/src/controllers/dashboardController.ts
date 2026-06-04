import { Response } from "express";

import Project from "../models/Project";

import Sprint from "../models/Sprint";

import Task from "../models/Task";

import WorkLog from "../models/WorkLog";

export const getDashboardController = async (req: any, res: Response) => {
  try {
    const projects = await Project.countDocuments({
      members: req.user._id,
    });

    const sprints = await Sprint.countDocuments();

    const tasks = await Task.find({
      assignee: req.user._id,
    });

    const completed = tasks.filter((t) => t.status === "DONE").length;

    const hours = await WorkLog.aggregate([
      {
        $match: {
          userId: req.user._id,
        },
      },

      {
        $group: {
          _id: null,

          total: {
            $sum: "$duration",
          },
        },
      },
    ]);

    return res.json({
      success: true,

      stats: {
        projects,

        sprints,

        tasks: tasks.length,

        completed,

        pending: tasks.length - completed,

        hours: hours[0]?.total || 0,
      },
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};
