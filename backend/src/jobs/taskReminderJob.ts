import cron from "node-cron";

import Task from "../models/Task";

import { createNotification } from "../services/notificationService";

export const startTaskReminderJob = () => {
  cron.schedule(
    "0 * * * *",

    async () => {
      console.log("Checking task reminders...");

      const now = new Date();

      const next24 = new Date();

      next24.setHours(now.getHours() + 24);

      const tasks = await Task.find({
        dueDate: {
          $gte: now,

          $lte: next24,
        },

        status: {
          $ne: "DONE",
        },
      });

      for (const task of tasks) {
        await createNotification({
          userId: task.assignee,

          title: "Task Deadline Reminder",

          message: `Task "${task.title}" deadline is within 24 hours`,

          type: "TASK_UPDATED",

          relatedId: task._id,
        });
      }
    },
  );
};
