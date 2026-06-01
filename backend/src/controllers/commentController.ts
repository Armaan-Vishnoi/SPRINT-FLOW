import { Response } from "express";

import { createComment, getComments } from "../services/commentService";

import { createNotification } from "../services/notificationService";

import Task from "../models/Task";

import { getIO } from "../socket/socket";

export const addCommentController = async (req: any, res: Response) => {
  try {
    const comment = await createComment({
      taskId: req.params.taskId,

      userId: req.user._id,

      message: req.body.message,
    });

    const task = await Task.findById(req.params.taskId);

    if (task) {
      // realtime comment

      getIO().to(`project:${task.projectId}`).emit(
        "comment-added",

        comment,
      );

      // notification

      await createNotification({
        userId: task.createdBy,

        title: "New Comment",

        message: "Someone commented on your task",

        type: "COMMENT",

        relatedId: task._id,
      });
    }

    return res.status(201).json({
      success: true,

      comment,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,

      message: error.message,
    });
  }
};

export const getCommentsController = async (req: any, res: Response) => {
  try {
    const comments = await getComments(req.params.taskId);

    return res.json({
      success: true,

      comments,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,

      message: error.message,
    });
  }
};
