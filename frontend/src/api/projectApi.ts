import api from "./api";

// GET PROJECTS

export const getProjects = async () => {
  const res = await api.get("/api/projects");

  return res.data;
};

// GET SINGLE PROJECT

export const getProjectById = async (id: string) => {
  const res = await api.get(`/api/projects/${id}`);

  return res.data;
};

// CREATE PROJECT

export const createProject = async (data: any) => {
  const res = await api.post("/api/projects", data);

  return res.data;
};

// UPDATE PROJECT

export const updateProject = async (id: string, data: any) => {
  const res = await api.patch(`/api/projects/${id}`, data);

  return res.data;
};

// DELETE PROJECT

export const deleteProject = async (id: string) => {
  const res = await api.delete(`/api/projects/${id}`);

  return res.data;
};

// ADD MEMBER

export const addProjectMember = async (projectId: string, userId: string) => {
  const res = await api.post(
    `/api/projects/${projectId}/member`,

    {
      userId,
    },
  );

  return res.data;
};
