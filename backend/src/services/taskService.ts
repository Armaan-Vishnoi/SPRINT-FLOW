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
    .populate("subtasks");
};

// ================= FIND TASK =================

export const findTaskById = async (id: string) => {
  return Task.findById(id);
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

export const updateTaskStatus = async (
  taskId: string,

  status: TaskStatus,
) => {
  const task = await Task.findById(taskId)

    .populate("subtasks")

    .populate("dependencies");

  if (!task) {
    throw new Error("Task not found");
  }

  // parent completion check

  if (status === "DONE") {
    const incompleteSubtasks = task.subtasks.filter(
      (subtask: any) => subtask.status !== "DONE",
    );

    if (incompleteSubtasks.length > 0) {
      throw new Error(
        "Complete all subtasks before marking parent task as DONE",
      );
    }
  }

  // dependency blocking check

  if (status === "IN_PROGRESS") {
    const incompleteDependencies = task.dependencies.filter(
      (dep: any) => dep.status !== "DONE",
    );

    if (incompleteDependencies.length > 0) {
      throw new Error("Complete blocking tasks before starting this task");
    }
  }

  task.status = status;

  await task.save();

  // NOTIFY BLOCKED TASK OWNERS

  if (status === "DONE") {
    const blockedTasks = await Task.find({
      dependencies: task._id,
    });

    for (const blockedTask of blockedTasks) {
      await createNotification({
        userId: blockedTask.assignee,

        title: "Blocking Task Completed",

        message: `You can now start: ${blockedTask.title}`,

        type: "DEPENDENCY_DONE",

        relatedId: blockedTask._id,
      });
    }
  }

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
