import api from "./api";
// GET PROJECT SPRINTS
export const getProjectSprints = async (projectId) => {
    const res = await api.get(`/api/sprints/${projectId}`);
    return res.data;
};
// CREATE SPRINT
export const createSprint = async (data) => {
    const res = await api.post("/api/sprints", data);
    return res.data;
};
// UPDATE SPRINT
export const updateSprint = async (id, data) => {
    const res = await api.patch(`/api/sprints/${id}`, data);
    return res.data;
};
// DELETE SPRINT
export const deleteSprint = async (id) => {
    const res = await api.delete(`/api/sprints/${id}`);
    return res.data;
};
