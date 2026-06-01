export const API_ROUTES = {
  AUTH: {
    REGISTER: "/api/auth/register",
    LOGIN: "/api/auth/login",
  },

  PROFILE: {
    GET: "/api/user/profile",
    UPDATE: "/api/user/profile",
  },

  PROJECT: {
    CREATE: "/api/projects",
    GET: "/api/projects",
  },

  SPRINT: {
    CREATE: "/api/sprints",
    GET: "/api/sprints/project/:id",
  },

  TASK: {
    CREATE: "/api/tasks",
    STATUS: "/api/tasks/:id/status",
    DELETE: "/api/tasks/:id",
  },

  ATTACHMENT: {
    UPLOAD: "/api/attachments/:taskId",
    GET: "/api/attachments/task/:taskId",
  },

  NOTIFICATION: {
    GET: "/api/notifications",
  },
};
