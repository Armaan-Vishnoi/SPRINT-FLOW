import Task from "../models/Task";

// check circular dependency

export const hasCircularDependency = async (
  taskId: string,
  dependencyId: string,
): Promise<boolean> => {
  if (taskId === dependencyId) {
    return true;
  }

  const dependency = await Task.findById(dependencyId);

  if (!dependency) {
    return false;
  }

  for (const dep of dependency.dependencies) {
    const found = await hasCircularDependency(taskId, dep.toString());

    if (found) {
      return true;
    }
  }

  return false;
};

// add dependency

export const addDependency = async (taskId: string, dependencyId: string) => {
  const task = await Task.findById(taskId);

  if (!task) {
    throw new Error("Task not found");
  }

  const dependency = await Task.findById(dependencyId);

  if (!dependency) {
    throw new Error("Dependency task not found");
  }

  const circular = await hasCircularDependency(taskId, dependencyId);

  if (circular) {
    throw new Error("Circular dependency detected");
  }

  task.dependencies.push(dependency._id as any);

  await task.save();

  return task;
};
