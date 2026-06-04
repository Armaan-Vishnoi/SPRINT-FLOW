import { Routes, Route, Navigate } from "react-router-dom";
import Landing from "../pages/Landing";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Dashboard from "../pages/dashboard/Dashboard";
import Projects from "../pages/Projects";
import ProjectDetails from "../pages/ProjectDetails";
import SprintDetails from "../pages/SprintDetails";
import TaskDetails from "../pages/TaskDetails";
import Profile from "../pages/Profile";
import Notifications from "../pages/Notifications";
import DashboardLayout from "../layouts/DashboardLayout";
import ProtectedRoute from "./ProtectedRoute";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import AuditLogs from "../pages/AuditLogs";
export default function AppRoutes() {
  return (
    <Routes>
      {/* PUBLIC */}

      <Route path="/" element={<Landing />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      {/* PRIVATE */}

      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/projects" element={<Projects />} />

        <Route path="/projects/:id" element={<ProjectDetails />} />

        <Route
          path="/projects/:projectId/sprints/:sprintId"
          element={<SprintDetails />}
        />

        <Route path="/tasks/:taskId" element={<TaskDetails />} />

        <Route path="/profile" element={<Profile />} />

        <Route path="/notifications" element={<Notifications />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/audit" element={<AuditLogs />} />
    </Routes>
  );
}
