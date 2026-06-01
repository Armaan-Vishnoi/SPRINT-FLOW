import Attachment from "../models/Attachment";

import cloudinary from "../config/cloudinary";

// ================= SAVE =================

export const saveAttachment = async (data: any) => {
  return Attachment.create(data);
};

// ================= GET =================

export const getAttachments = async (taskId: string) => {
  return Attachment.find({
    taskId,
  }).populate("uploadedBy", "name email");
};

// ================= DELETE =================

export const removeAttachment = async (id: string) => {
  const file = await Attachment.findById(id);

  if (!file) {
    throw new Error("Attachment not found");
  }

  // delete from cloudinary

  await cloudinary.uploader.destroy(
    file.fileName,

    {
      resource_type: "image",
    },
  );

  // delete mongodb

  await file.deleteOne();

  return true;
};
