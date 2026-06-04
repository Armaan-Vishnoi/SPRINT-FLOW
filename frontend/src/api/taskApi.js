import api from "./api";
// GET SPRINT TASKS
export const getSprintTasks = async (sprintId) => {
    const res = await api.get(`/api/tasks/${sprintId}`);
    return res.data;
};
// CREATE TASK
export const createTask = async (data) => {
    const res = await api.post("/api/tasks", data);
    return res.data;
};
// UPDATE TASK STATUS
export const updateTaskStatus = async (taskId, status) => {
    try {
        const res = await api.patch(`/api/tasks/${taskId}/status`, {
            status,
        });
        return res.data;
    }
    catch (error) {
        alert(error.response?.data?.message || "Status update failed");
        throw error;
    }
};
// DELETE TASK
export const deleteTask = async (taskId) => {
    const res = await api.delete(`/api/tasks/${taskId}`);
    return res.data;
};
// CREATE SUBTASK
// CREATE SUBTASK
export const createSubTask = async (taskId, data) => {
    try {
        console.log("SUBTASK SEND:", taskId, data);
        const res = await api.post(`/api/tasks/${taskId}/subtasks`, data);
        console.log("SUBTASK CREATED:", res.data);
        return res.data;
    }
    catch (error) {
        console.log("SUBTASK ERROR:", error.response?.data);
        throw error;
    }
};
// ADD DEPENDENCY
// ADD TASK DEPENDENCY
export const addDependency = async (taskId, dependencyId) => {
    const res = await api.post(`/api/tasks/${taskId}/dependencies`, {
        dependencyId,
    });
    return res.data;
};
// GET TASK DETAIL WITH SUBTASKS
export const getTaskById = async (taskId) => {
    const res = await api.get(`/api/tasks/details/${taskId}`);
    console.log("TASK DETAILS:", res.data);
    return res.data;
};
