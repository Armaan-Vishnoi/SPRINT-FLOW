import Comment from "../models/Comment";

export const createComment = async (data: any) => {
  return Comment.create(data);
};

export const getComments = async (taskId: string) => {
  return Comment.find({
    taskId,
  }).populate("userId", "name email profilePicture");
};
