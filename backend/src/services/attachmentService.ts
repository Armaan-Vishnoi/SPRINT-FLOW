import fs from "fs";

import Attachment from "../models/Attachment";

// SAVE FILE DATA

export const saveAttachment = async (data: any) => {
  return Attachment.create(data);
};

// GET TASK FILES

export const getAttachments = async (taskId: string) => {
  return Attachment.find({
    taskId,
  }).populate("uploadedBy", "name email");
};

// DELETE FILE

export const removeAttachment = async (id: string) => {
  const file = await Attachment.findById(id);

  if (!file) {
    throw new Error("File not found");
  }

  if (fs.existsSync(file.path)) {
    fs.unlinkSync(file.path);
  }

  await file.deleteOne();

  return true;
};
