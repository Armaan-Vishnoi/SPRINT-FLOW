import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import {
  getSprintTasks,
  createTask,
  updateTaskStatus,
  deleteTask,
} from "../api/taskApi";

import { getProjectById } from "../api/projectApi";

import TaskCard from "../components/tasks/TaskCard";

import CreateTaskModal from "../components/tasks/CreateTaskModal";

import { socket } from "../socket/socket";

import toast from "react-hot-toast";

import LoadingScreen from "../components/LoadingScreen";
export default function SprintDetails() {
  const { projectId, sprintId } = useParams();

  const { user } = useAuth();

  const [tasks, setTasks] = useState<any[]>([]);

  const [project, setProject] = useState<any>(null);

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const load = async () => {
    try {
      setLoading(true);

      const res = await getSprintTasks(sprintId!);

      const list = res.tasks || res.data || res.task || [];

      setTasks(list);
    } finally {
      setLoading(false);
    }
  };

  const loadProject = async () => {
    const res = await getProjectById(projectId!);

    setProject(res.project);
  };

  useEffect(() => {
    load();

    loadProject();
  }, []);

  useEffect(() => {
    if (!projectId || !user) return;

    socket.emit(
      "join-project",

      {
        projectId,

        userId: user._id || user.id,
      },
    );

    const handleCreate = (task: any) => {
      setTasks((prev) => [task, ...prev]);
    };

    const handleUpdate = (task: any) => {
      setTasks((prev) => prev.map((t) => (t._id === task._id ? task : t)));
    };

    socket.on(
      "task-created",

      handleCreate,
    );

    socket.on(
      "task-updated",

      handleUpdate,
    );

    return () => {
      socket.off(
        "task-created",

        handleCreate,
      );

      socket.off(
        "task-updated",

        handleUpdate,
      );
    };
  }, [projectId, user]);

  const add = async (data: any) => {
    const taskData = {
      ...data,

      projectId,

      sprintId,

      status: "TODO",
    };

    await createTask(taskData);

    toast.success("Task created successfully 🚀");

    setOpen(false);

    load();
  };

  const changeStatus = async (
    id: string,

    status: string,
  ) => {
    try {
      await updateTaskStatus(
        id,

        status,
      );

      toast.success("Task status updated ⚡");
    } finally {
      load();
    }
  };

  const remove = async (id: string) => {
    await deleteTask(id);

    toast.success("Task deleted 🗑");

    load();
  };

  const columns = [
    {
      name: "TODO",

      title: "To Do",

      icon: "📝",

      color: "border-yellow-500/40",
    },

    {
      name: "IN_PROGRESS",

      title: "In Progress",

      icon: "⚡",

      color: "border-blue-500/40",
    },

    {
      name: "DONE",

      title: "Completed",

      icon: "✅",

      color: "border-green-500/40",
    },
  ];
  if (loading) return <LoadingScreen text="Loading sprint board..." />;
  return (
    <div
      className="
space-y-8
"
    >
      {/* HEADER */}

      <div
        className="
flex
flex-col
sm:flex-row
justify-between
items-start
sm:items-center
gap-5
"
      >
        <div>
          <h1
            className="
text-3xl
sm:text-4xl
font-black
bg-gradient-to-r
from-white
to-gray-400
bg-clip-text
text-transparent
"
          >
            Task Board
          </h1>

          <p
            className="
text-gray-400
mt-2
"
          >
            Manage sprint workflow and realtime collaboration
          </p>

          <div
            className="
inline-flex
mt-4
px-4
py-2
rounded-xl
bg-green-500/10
border
border-green-500/30
text-green-400
text-sm
"
          >
            ● Live Collaboration
          </div>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="
w-full
sm:w-auto
px-7
py-4
rounded-2xl
font-bold
bg-gradient-to-r
from-blue-600
to-purple-600
hover:scale-105
duration-300
shadow-lg
shadow-blue-600/30
"
        >
          + Create Task
        </button>
      </div>

      {/* BOARD */}

      <div
        className="
grid
grid-cols-1
lg:grid-cols-3
gap-6
"
      >
        {columns.map((column) => {
          const filtered = tasks.filter((t) => t.status === column.name);

          return (
            <div
              key={column.name}
              className={`
bg-gray-900/70
border
${column.color}
rounded-3xl
p-5
min-h-[500px]
shadow-xl
`}
            >
              {/* COLUMN HEADER */}

              <div
                className="
flex
justify-between
items-center
mb-6
"
              >
                <h2
                  className="
text-xl
font-black
"
                >
                  {column.icon} {column.title}
                </h2>

                <span
                  className="
bg-gray-800
px-3
py-1
rounded-full
text-sm
"
                >
                  {filtered.length}
                </span>
              </div>

              {/* TASKS */}

              <div
                className="
space-y-5
"
              >
                {filtered.length === 0 && (
                  <div
                    className="
text-center
text-gray-500
mt-20
"
                  >
                    No tasks here
                  </div>
                )}

                {filtered.map((t) => (
                  <div
                    key={t._id}
                    className="
hover:-translate-y-2
duration-300
"
                  >
                    <TaskCard
                      task={t}
                      onDelete={remove}
                      onStatus={changeStatus}
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {open && (
        <CreateTaskModal
          members={project?.members || []}
          tasks={tasks}
          onCreate={add}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
}
