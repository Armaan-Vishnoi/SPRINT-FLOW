import Task from "../models/Task";
import fs from "fs";

import Attachment from "../models/Attachment";

import Comment from "../models/Comment";

import WorkLog from "../models/WorkLog";
import { createNotification } from "./notificationService";

type TaskStatus = "TODO" | "IN_PROGRESS" | "REVIEW" | "DONE";

// ================= CREATE TASK =================

export const createTask = async (data: any) => {
  return Task.create(data);
};

// ================= GET TASKS =================

export const getTasks = async (sprintId: string) => {
  return Task.find({
    sprintId,

    parentTask: null,
  })

    .populate("assignee", "name email")

    .populate("createdBy", "name email")

    .populate("dependencies", "title status")

    .populate("subtasks");
};

// ================= FIND TASK =================

export const findTaskById = async (id: string) => {
  const task = await Task.findById(id)

    .populate("assignee", "name email")

    .populate("createdBy", "name email")

    .populate("subtasks")

    .populate("dependencies");

  if (!task) {
    throw new Error("Task not found");
  }

  return task;
};

// ================= CREATE SUBTASK =================

export const createSubTask = async (parentId: string, data: any) => {
  const parent = await Task.findById(parentId);

  if (!parent) {
    throw new Error("Parent task not found");
  }

  const subtask = await Task.create({
    title: data.title,

    description: data.description,

    assignee: data.assignee,

    priority: data.priority,

    projectId: parent.projectId,

    sprintId: parent.sprintId,

    parentTask: parent._id,

    createdBy: data.createdBy,
  });

  parent.subtasks.push(subtask._id as any);

  await parent.save();

  return subtask;
};

// ================= UPDATE STATUS =================

export const updateTaskStatus = async (taskId: string, status: TaskStatus) => {
  const task = await Task.findById(taskId)

    .populate({
      path: "subtasks",
      model: "Task",
    })

    .populate({
      path: "dependencies",
      model: "Task",
    });

  if (!task) {
    throw new Error("Task not found");
  }

  // DEPENDENCY CHECK

  if (status === "IN_PROGRESS" || status === "DONE") {
    const pendingDependencies = task.dependencies.filter(
      (dep: any) => dep.status !== "DONE",
    );

    if (pendingDependencies.length > 0) {
      throw new Error("Complete dependency tasks first");
    }
  }

  // SUBTASK CHECK

  if (status === "DONE") {
    const pendingSubtasks = task.subtasks.filter(
      (sub: any) => sub.status !== "DONE",
    );

    if (pendingSubtasks.length > 0) {
      throw new Error("Complete subtasks first");
    }
  }

  task.status = status;

  await task.save();

  return task;
};

// ================= DELETE TASK =================

export const deleteTask = async (taskId: string) => {
  const task = await Task.findById(taskId);

  if (!task) {
    throw new Error("Task not found");
  }

  // DELETE FILES FROM STORAGE

  const attachments = await Attachment.find({
    taskId,
  });

  for (const file of attachments) {
    if (fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }
  }

  // DELETE ATTACHMENTS DB

  await Attachment.deleteMany({
    taskId,
  });

  // DELETE COMMENTS

  await Comment.deleteMany({
    taskId,
  });

  // DELETE WORK LOGS

  await WorkLog.deleteMany({
    taskId,
  });

  // DELETE SUBTASKS

  await Task.deleteMany({
    parentTask: taskId,
  });

  // DELETE TASK

  await task.deleteOne();

  return true;
};
