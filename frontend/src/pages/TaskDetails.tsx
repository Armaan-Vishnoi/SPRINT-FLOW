import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import toast from "react-hot-toast";

import { useAuth } from "../context/AuthContext";

import {
  createSubTask,
  getTaskById,
  updateTaskStatus,
  addDependency,
} from "../api/taskApi";

import {
  createWorkLog,
  getTaskLogs,
  updateWorkLog,
  deleteWorkLog,
} from "../api/workLogApi";

import CreateSubTaskModal from "../components/subtasks/CreateSubTaskModal";

import DependencyModal from "../components/tasks/DependencyModal";

import Attachments from "../components/attachments/Attachments";
import LoadingScreen from "../components/LoadingScreen";
export default function TaskDetails() {
  const { taskId } = useParams();

  const { user } = useAuth();

  const [task, setTask] = useState<any>(null);

  const [logs, setLogs] = useState<any[]>([]);

  const [totalHours, setTotalHours] = useState(0);

  const [open, setOpen] = useState(false);

  const [dependencyOpen, setDependencyOpen] = useState(false);

  const [showWorkForm, setShowWorkForm] = useState(false);

  const [editing, setEditing] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    date: "",

    duration: "",

    description: "",
  });

  const load = async () => {
    try {
      setLoading(true);

      const res = await getTaskById(taskId!);

      setTask(res.task);

      const logRes = await getTaskLogs(taskId!);

      setLogs(logRes.logs);

      setTotalHours(logRes.totalHours || 0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  // CREATE SUBTASK

  const addSubTask = async (data: any) => {
    await createSubTask(
      taskId!,

      {
        ...data,

        assignee: user?._id || user?.id,
      },
    );

    toast.success("Subtask created 🚀");

    setOpen(false);

    load();
  };

  // CHANGE STATUS

  const changeSubTaskStatus = async (
    id: string,

    status: string,
  ) => {
    await updateTaskStatus(
      id,

      status,
    );

    toast.success("Status updated ⚡");

    load();
  };

  // CREATE WORKLOG

  const saveWorkLog = async () => {
    if (new Date(form.date) > new Date()) {
      toast.error("Future date not allowed");

      return;
    }

    if (Number(form.duration) <= 0) {
      toast.error("Invalid duration");

      return;
    }

    await createWorkLog({
      taskId,

      sprintId: task.sprintId,

      date: form.date,

      duration: Number(form.duration),

      description: form.description,
    });

    toast.success("Work log created ⏱");

    setShowWorkForm(false);

    setForm({
      date: "",

      duration: "",

      description: "",
    });

    load();
  };

  // UPDATE LOG

  const saveEdit = async () => {
    await updateWorkLog(
      editing._id,

      {
        duration: Number(form.duration),

        description: form.description,
      },
    );

    toast.success("Work log updated ✨");

    setEditing(null);

    setForm({
      date: "",

      duration: "",

      description: "",
    });

    load();
  };

  // DELETE LOG

  const removeLog = async (id: string) => {
    if (!confirm("Delete this work log?")) return;

    await deleteWorkLog(id);

    toast.success("Deleted 🗑");

    load();
  };
  if (loading) return <LoadingScreen text="Loading task details..." />;
  return (
    <div
      className="
space-y-8
"
    >
      {/* TASK HEADER */}

      <div
        className="
bg-gradient-to-br
from-gray-900
to-gray-950
border
border-gray-800
rounded-3xl
p-6
shadow-xl
"
      >
        <div
          className="
flex
flex-col
sm:flex-row
justify-between
gap-5
"
        >
          <div>
            <h1
              className="
text-3xl
sm:text-4xl
font-black
"
            >
              {task?.title}
            </h1>

            <p
              className="
text-gray-400
mt-3
"
            >
              {task?.description || "No description added"}
            </p>

            <div
              className="
flex
gap-3
flex-wrap
mt-5
"
            >
              <span
                className="
px-4
py-2
rounded-xl
bg-blue-500/10
border
border-blue-500/30
text-blue-400
"
              >
                ⚡ {task?.status}
              </span>

              <span
                className="
px-4
py-2
rounded-xl
bg-green-500/10
border
border-green-500/30
text-green-400
"
              >
                ⏱ {totalHours} Hours
              </span>
            </div>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="
h-fit
px-6
py-3
rounded-xl
font-bold
bg-gradient-to-r
from-blue-600
to-purple-600
hover:scale-105
duration-300
"
          >
            + Subtask
          </button>
        </div>
      </div>

      {/* SUBTASKS */}

      <div
        className="
bg-gray-900/70
border
border-gray-800
rounded-3xl
p-6
"
      >
        <h2
          className="
text-2xl
font-bold
mb-5
"
        >
          Subtasks
        </h2>

        <div
          className="
space-y-4
"
        >
          {task?.subtasks?.length === 0 && (
            <p className="text-gray-500">No subtasks created</p>
          )}

          {task?.subtasks?.map((sub: any) => (
            <div
              key={sub._id}
              className="
bg-gray-800
rounded-2xl
p-5
border
border-gray-700
"
            >
              <h3
                className="
font-bold
mb-3
"
              >
                {sub.title}
              </h3>

              <select
                value={sub.status}
                onChange={(e) =>
                  changeSubTaskStatus(
                    sub._id,

                    e.target.value,
                  )
                }
                className="
w-full
bg-gray-900
border
border-gray-700
rounded-xl
p-3
outline-none
"
              >
                <option value="TODO">TODO</option>

                <option value="IN_PROGRESS">IN PROGRESS</option>

                <option value="DONE">DONE</option>
              </select>
            </div>
          ))}
        </div>
      </div>

      {/* WORK LOG */}

      <div
        className="
bg-gray-900/70
border
border-gray-800
rounded-3xl
p-6
"
      >
        <div
          className="
flex
justify-between
items-center
gap-5
flex-wrap
"
        >
          <div>
            <h2
              className="
text-2xl
font-bold
"
            >
              Work Logs
            </h2>

            <p
              className="
text-gray-400
mt-1
"
            >
              Total tracked: {totalHours} hours
            </p>
          </div>

          <button
            onClick={() => setShowWorkForm(true)}
            className="
px-6
py-3
rounded-xl
font-bold
bg-gradient-to-r
from-green-600
to-emerald-600
hover:scale-105
duration-300
"
          >
            + Work Log
          </button>
        </div>

        {/* ADD FORM */}

        {showWorkForm && (
          <div
            className="
grid
grid-cols-1
md:grid-cols-3
gap-4
mt-6
"
          >
            <input
              type="date"
              value={form.date}
              onChange={(e) =>
                setForm({
                  ...form,

                  date: e.target.value,
                })
              }
              className="
bg-gray-800
rounded-xl
p-3
"
            />

            <input
              type="number"
              placeholder="Hours"
              value={form.duration}
              onChange={(e) =>
                setForm({
                  ...form,

                  duration: e.target.value,
                })
              }
              className="
bg-gray-800
rounded-xl
p-3
"
            />

            <input
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm({
                  ...form,

                  description: e.target.value,
                })
              }
              className="
bg-gray-800
rounded-xl
p-3
"
            />

            <button
              onClick={saveWorkLog}
              className="
md:col-span-3
bg-blue-600
rounded-xl
p-3
font-bold
"
            >
              Save Work Log
            </button>
          </div>
        )}

        {/* LOG LIST */}

        <div
          className="
space-y-4
mt-6
"
        >
          {logs.map((log: any) => (
            <div
              key={log._id}
              className="
bg-gray-800
border
border-gray-700
rounded-2xl
p-5
"
            >
              <p className="font-bold">⏱ {log.duration} Hours</p>

              <p className="text-gray-400">{log.description}</p>

              <p
                className="
text-sm
text-gray-500
mt-2
"
              >
                {new Date(log.date).toLocaleDateString()}
              </p>

              <div
                className="
flex
gap-3
mt-4
"
              >
                <button
                  onClick={() => {
                    setEditing(log);

                    setForm({
                      date: log.date,

                      duration: log.duration,

                      description: log.description,
                    });
                  }}
                  className="
bg-yellow-600
px-4
py-2
rounded-xl
"
                >
                  Edit
                </button>

                <button
                  onClick={() => removeLog(log._id)}
                  className="
bg-red-600
px-4
py-2
rounded-xl
"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* EDIT LOG */}

      {editing && (
        <div
          className="
bg-gray-900
border
border-gray-800
rounded-3xl
p-6
"
        >
          <h2 className="text-xl font-bold mb-4">Edit Work Log</h2>

          <input
            value={form.duration}
            onChange={(e) =>
              setForm({
                ...form,

                duration: e.target.value,
              })
            }
            className="bg-gray-800 p-3 rounded-xl w-full mb-3"
          />

          <input
            value={form.description}
            onChange={(e) =>
              setForm({
                ...form,

                description: e.target.value,
              })
            }
            className="bg-gray-800 p-3 rounded-xl w-full"
          />

          <button
            onClick={saveEdit}
            className="
bg-blue-600
px-6
py-3
rounded-xl
mt-5
"
          >
            Update
          </button>
        </div>
      )}

      {/* ATTACHMENTS */}

      {taskId && <Attachments taskId={taskId} />}

      {/* MODALS */}

      {open && (
        <CreateSubTaskModal
          onClose={() => setOpen(false)}
          onCreate={addSubTask}
        />
      )}

      {dependencyOpen && (
        <DependencyModal
          tasks={[]}
          onClose={() => setDependencyOpen(false)}
          onAdd={async () => {}}
        />
      )}
    </div>
  );
}
