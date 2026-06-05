import Project from "../models/Project";

// CREATE PROJECT

export const createProject = async (data: any) => {
  return Project.create(data);
};

// GET USER PROJECTS ONLY

export const getProjects = async (userId: string) => {
  return Project.find({
    members: userId,
  })

    .populate("manager", "name email")

    .populate("members", "name email");
};

// CHECK PROJECT MEMBER

export const isProjectMember = async (
  projectId: string,

  userId: string,
) => {
  const project = await Project.findOne({
    _id: projectId,

    members: userId,
  });

  return !!project;
};

export const deleteProject = async (projectId: string, userId: string) => {
  const project = await Project.findOne({
    _id: projectId,
    manager: userId,
  });

  if (!project) {
    throw new Error("Project not found or permission denied");
  }

  await project.deleteOne();

  return true;
};
