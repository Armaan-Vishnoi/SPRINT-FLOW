import api from "./api";

// GET PROJECT SPRINTS

export const getProjectSprints = async (projectId: string) => {
  const res = await api.get(`/api/sprints/${projectId}`);

  return res.data;
};

// CREATE SPRINT

export const createSprint = async (data: any) => {
  const res = await api.post("/api/sprints", data);

  return res.data;
};

// UPDATE SPRINT

export const updateSprint = async (id: string, data: any) => {
  const res = await api.patch(`/api/sprints/${id}`, data);

  return res.data;
};

// DELETE SPRINT

export const deleteSprint = async (id: string) => {
  const res = await api.delete(`/api/sprints/${id}`);

  return res.data;
};
