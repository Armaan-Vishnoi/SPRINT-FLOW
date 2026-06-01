import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    projectId: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },

    sprintId: {
      type: Schema.Types.ObjectId,
      ref: "Sprint",
      required: true,
    },

    assignee: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    parentTask: {
      type: Schema.Types.ObjectId,
      ref: "Task",
      default: null,
    },

    subtasks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Task",
      },
    ],

    dependencies: [
      {
        type: Schema.Types.ObjectId,
        ref: "Task",
      },
    ],

    priority: {
      type: String,
      enum: ["LOW", "MEDIUM", "HIGH", "CRITICAL"],
      default: "MEDIUM",
    },

    status: {
      type: String,
      enum: ["TODO", "IN_PROGRESS", "REVIEW", "DONE"],
      default: "TODO",
    },

    dueDate: Date,

    totalHours: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Task", taskSchema);
