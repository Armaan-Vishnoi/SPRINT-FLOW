import express from "express";
import cors from "cors";
import path from "path";

import authRoutes from "./routes/authRoutes";
import profileRoutes from "./routes/profileRoutes";
import projectRoutes from "./routes/projectRoutes";
import sprintRoutes from "./routes/sprintRoutes";
import taskRoutes from "./routes/taskRoutes";
import workLogRoutes from "./routes/workLogRoutes";
import profileManageRoutes from "./routes/profileManageRoutes";
import commentRoutes from "./routes/commentRoutes";
import notificationRoutes from "./routes/notificationRoutes";
import attachmentRoutes from "./routes/attachmentRoutes";
import dashboardRoutes from "./routes/dashboardRoutes";
import userRoutes from "./routes/userRoutes";

import { errorHandler } from "./middleware/errorMiddleware";

import { securityHeaders, sanitize } from "./config/security";

const app = express();

// CORS FIRST

app.use(
  cors({
    origin: ["http://localhost:5173", "https://sprintflow-plum.vercel.app"],

    credentials: true,
  }),
);

// SECURITY

app.use(securityHeaders);

// BODY

app.use(express.json());

// STATIC FILES

app.use(
  "/uploads",

  express.static(path.join(process.cwd(), "uploads")),
);

// SANITIZE

app.use(sanitize);

// HEALTH

app.get(
  "/health",

  (req, res) => {
    res.json({
      success: true,

      message: "SprintFlow API running",
    });
  },
);

// ROUTES

app.use("/api/profile", profileRoutes);

app.use("/api/auth", authRoutes);

app.use("/api/projects", projectRoutes);

app.use("/api/sprints", sprintRoutes);

app.use("/api/tasks", taskRoutes);

app.use("/api/worklogs", workLogRoutes);

app.use("/api/user/profile", profileManageRoutes);

app.use("/api/comments", commentRoutes);

app.use("/api/notifications", notificationRoutes);

app.use("/api/attachments", attachmentRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.use("/api/users", userRoutes);

app.get(
  "/",

  (req, res) => {
    res.json({
      success: true,

      message: "SprintFlow API Running",
    });
  },
);

// ERROR HANDLER ALWAYS LAST

app.use(errorHandler);

export default app;
