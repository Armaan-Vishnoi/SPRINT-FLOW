import api from "./api";

// GET TASK WORK LOGS

export const getTaskLogs = async (taskId: string) => {
  const res = await api.get(`/api/worklogs/task/${taskId}`);

  console.log("WORKLOG LIST:", res.data);

  return res.data;
};

// CREATE

export const createWorkLog = async (data: any) => {
  const res = await api.post("/api/worklogs", data);

  return res.data;
};

// UPDATE WORKLOG

export const updateWorkLog = async (id: string, data: any) => {
  const res = await api.patch(
    `/api/worklogs/${id}`,

    data,
  );

  return res.data;
};

// DELETE WORKLOG

export const deleteWorkLog = async (id: string) => {
  const res = await api.delete(`/api/worklogs/${id}`);

  return res.data;
};
