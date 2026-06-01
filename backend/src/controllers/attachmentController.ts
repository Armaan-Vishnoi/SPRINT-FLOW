import { Response } from "express";

import {
  saveAttachment,
  getAttachments,
  removeAttachment,
} from "../services/attachmentService";

import Task from "../models/Task";

import Project from "../models/Project";

// ================= UPLOAD =================

export const uploadAttachmentController = async (req: any, res: Response) => {
  try {
    const task = await Task.findById(req.params.taskId);

    if (!task) {
      return res.status(404).json({
        success: false,

        message: "Task not found",
      });
    }

    // permission check

    const project = await Project.findOne({
      _id: task.projectId,

      members: req.user._id,
    });

    if (!project) {
      return res.status(403).json({
        success: false,

        message: "Access denied",
      });
    }

    const file = req.file;

    if (!file) {
      return res.status(400).json({
        success: false,

        message: "No file uploaded",
      });
    }

    const attachment = await saveAttachment({
      taskId: task._id,

      uploadedBy: req.user._id,

      originalName: file.originalname,

      fileName: file.filename,

      path: file.path,

      size: file.size,

      mimeType: file.mimetype,
    });

    return res.status(201).json({
      success: true,

      attachment,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,

      message: error.message,
    });
  }
};

// ================= GET FILES =================

export const getAttachmentsController = async (req: any, res: Response) => {
  try {
    const files = await getAttachments(req.params.taskId);

    return res.json({
      success: true,

      files,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,

      message: error.message,
    });
  }
};

// ================= DOWNLOAD =================

export const downloadAttachmentController = async (req: any, res: Response) => {
  try {
    const file = req.query.path;

    return res.download(file);
  } catch (error: any) {
    return res.status(400).json({
      success: false,

      message: error.message,
    });
  }
};

// ================= DELETE =================

export const deleteAttachmentController = async (req: any, res: Response) => {
  try {
    await removeAttachment(req.params.id);

    return res.json({
      success: true,

      message: "Attachment deleted",
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,

      message: error.message,
    });
  }
};
