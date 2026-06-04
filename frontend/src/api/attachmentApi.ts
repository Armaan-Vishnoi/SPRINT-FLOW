import api from "./api";

// UPLOAD ATTACHMENT

export const uploadAttachment = async (
  taskId: string,

  file: any,
) => {
  const formData = new FormData();

  formData.append(
    "file",

    file,
  );

  const res = await api.post(
    `/api/attachments/${taskId}`,

    formData,

    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return res.data;
};

// GET TASK ATTACHMENTS

export const getAttachments = async (taskId: string) => {
  const res = await api.get(`/api/attachments/task/${taskId}`);

  return res.data;
};

// DELETE ATTACHMENT

export const deleteAttachment = async (id: string) => {
  const res = await api.delete(`/api/attachments/${id}`);

  return res.data;
};
