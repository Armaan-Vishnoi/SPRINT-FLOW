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
import { errorHandler } from "./middleware/errorMiddleware";
import userRoutes from "./routes/userRoutes";
import dashboardRoutes from "./routes/dashboardRoutes";
import { limiter, securityHeaders, sanitize } from "./config/security";
const app = express();
app.get(
  "/health",

  (req, res) => {
    res.json({
      success: true,

      message: "SprintFlow API running",
    });
  },
);

app.use(express.json());
app.use(
  "/uploads",

  express.static(path.join(process.cwd(), "uploads")),
);
// SECURITY

app.use(
  cors({
    origin: ["http://localhost:5173", "https://your-vercel-url.vercel.app"],

    credentials: true,
  }),
);
app.use(errorHandler);
app.use(securityHeaders);

//app.use(limiter);

app.use(sanitize);
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
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "SprintFlow API Running",
  });
});

app.use(
  "/api/users",

  userRoutes,
);
export default app;
