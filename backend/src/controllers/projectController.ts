import { Response } from "express";
import Project from "../models/Project";
import { createProject, getProjects } from "../services/projectService";

// CREATE PROJECT

export const createProjectController = async (req: any, res: Response) => {
  try {
    const project = await createProject({
      ...req.body,

      manager: req.user._id,

      members: [req.user._id],
    });

    return res.status(201).json({
      success: true,

      project,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// GET PROJECTS

export const getProjectsController = async (req: any, res: Response) => {
  try {
    const projects = await getProjects(req.user._id);

    return res.json({
      success: true,

      projects,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// GET SINGLE PROJECT

export const getProjectByIdController = async (req: any, res: any) => {
  const project = await Project.findById(req.params.id).populate(
    "members",
    "name email role profilePicture",
  );

  return res.json({
    success: true,

    project,
  });
};

// UPDATE PROJECT

export const updateProjectController = async (req: any, res: any) => {
  const project = await Project.findByIdAndUpdate(
    req.params.id,

    req.body,

    {
      new: true,
    },
  );

  return res.json({
    success: true,

    project,
  });
};

// ADD MEMBER

export const addMemberController = async (req: any, res: any) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    return res.status(404).json({
      message: "Project not found",
    });
  }

  if (!project.members.includes(req.body.userId)) {
    project.members.push(req.body.userId);
  }

  await project.save();

  return res.json({
    success: true,

    project,
  });
};
