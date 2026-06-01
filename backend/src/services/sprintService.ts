import Sprint from "../models/Sprint";

export const createSprint = async (data: any) => {
  return Sprint.create(data);
};

export const getSprints = async (projectId: string) => {
  return Sprint.find({
    projectId,
  });
};
