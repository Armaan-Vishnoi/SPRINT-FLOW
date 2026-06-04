import { Request, Response } from "express";
import { createSprint, getSprints } from "../services/sprintService";
import Sprint from "../models/Sprint";

// UPDATE

export const updateSprintController = async (req: any, res: any) => {
  try {
    const sprint = await Sprint.findByIdAndUpdate(
      req.params.id,

      req.body,

      {
        new: true,
      },
    );

    if (!sprint) {
      return res.status(404).json({
        success: false,

        message: "Sprint not found",
      });
    }

    res.json({
      success: true,

      sprint,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// DELETE

export const deleteSprintController = async (req: any, res: any) => {
  try {
    const sprint = await Sprint.findByIdAndDelete(req.params.id);

    if (!sprint) {
      return res.status(404).json({
        success: false,

        message: "Sprint not found",
      });
    }

    res.json({
      success: true,

      message: "Sprint deleted",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};
export const createSprintController = async (req: Request, res: Response) => {
  try {
    const { projectId, name, goal, startDate, endDate } = req.body;

    if (new Date(endDate) <= new Date(startDate)) {
      return res.status(400).json({
        success: false,
        message: "End date must be after start date",
      });
    }

    const sprint = await createSprint({
      projectId,
      name,
      goal,
      startDate,
      endDate,
    });

    return res.status(201).json({
      success: true,
      sprint,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getSprintsController = async (req: Request, res: Response) => {
  try {
    const projectId = String(req.params.projectId);

    const sprints = await getSprints(projectId);

    return res.status(200).json({
      success: true,
      sprints,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
