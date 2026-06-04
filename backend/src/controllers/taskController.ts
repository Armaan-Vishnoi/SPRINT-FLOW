import { Request, Response } from "express";

import { getIO } from "../socket/socket";

import { createNotification } from "../services/notificationService";

import {
  createTask,
  getTasks,
  createSubTask,
  updateTaskStatus,
  deleteTask,
  findTaskById,
} from "../services/taskService";

import { emitOnce } from "../utils/socketEvent";

import { addDependency } from "../services/dependencyService";
// ================= CREATE TASK =================

export const createTaskController = async (req: any, res: Response) => {
  try {
    const {
      title,
      description,
      projectId,
      sprintId,
      assignee,
      priority,
      dueDate,
      dependencies,
    } = req.body;

    if (dueDate && new Date(dueDate) < new Date()) {
      return res.status(400).json({
        success: false,
        message: "Due date cannot be in the past",
      });
    }

    const task = await createTask({
      title,

      description,

      projectId,

      sprintId,

      assignee,

      priority,

      dueDate,

      dependencies: dependencies || [],

      createdBy: req.user._id,
    });

    await createNotification({
      userId: assignee,

      title: "New Task Assigned",

      message: `You have been assigned task ${title}`,

      type: "TASK_ASSIGNED",

      relatedId: task._id,
    });
    emitOnce(
      `create-${task._id}`,

      () => {
        console.log("TASK CREATED SOCKET:", task.projectId.toString());

        getIO().to(`project:${task.projectId.toString()}`).emit(
          "task-created",

          task,
        );
      },
    );
    return res.status(201).json({
      success: true,
      task,
    });

    // REAL TIME TASK CREATE
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= GET TASKS =================

export const getTasksController = async (req: Request, res: Response) => {
  try {
    const sprintId = String(req.params.sprintId);

    const tasks = await getTasks(sprintId);

    return res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// ================= CREATE SUBTASK =================

export const createSubTaskController = async (req: any, res: Response) => {
  try {
    const taskId = String(req.params.taskId);

    const subtask = await createSubTask(
      taskId,

      {
        ...req.body,

        createdBy: req.user._id,
      },
    );

    return res.status(201).json({
      success: true,

      subtask,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,

      message: error.message,
    });
  }
};
export const updateTaskStatusController = async (req: any, res: Response) => {
  try {
    const taskId = String(req.params.taskId);

    const status = req.body.status as
      | "TODO"
      | "IN_PROGRESS"
      | "REVIEW"
      | "DONE";

    const task = await updateTaskStatus(taskId, status);

    // TASK COMPLETED NOTIFICATION

    if (status === "DONE") {
      await createNotification({
        userId: task.createdBy,

        title: "Task Completed",

        message: `Task completed: ${task.title}`,

        type: "TASK_UPDATED",

        relatedId: task._id,
      });
    }

    // REAL TIME STATUS CHANGE

    emitOnce(
      `update-${task._id}`,

      () => {
        console.log("TASK UPDATED SOCKET:", task.projectId.toString());

        getIO().to(`project:${task.projectId.toString()}`).emit(
          "task-updated",

          task,
        );
      },
    );

    return res.json({
      success: true,

      task,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,

      message: error.message,
    });
  }
};

export const addDependencyController = async (req: any, res: Response) => {
  try {
    const taskId = String(req.params.taskId);

    const { dependencyId } = req.body;

    const task = await addDependency(taskId, dependencyId);

    return res.json({
      success: true,

      task,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,

      message: error.message,
    });
  }
};
// ================ GET TASK DETAIL ================

export const getTaskDetailController = async (req: any, res: Response) => {
  try {
    const task = await findTaskById(req.params.taskId);

    return res.json({
      success: true,

      task,
    });
  } catch (error: any) {
    return res.status(404).json({
      success: false,

      message: error.message,
    });
  }
};
// ================= DELETE TASK =================

export const deleteTaskController = async (req: any, res: Response) => {
  try {
    await deleteTask(req.params.taskId);

    return res.json({
      success: true,

      message: "Task deleted successfully",
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,

      message: error.message,
    });
  }
};
