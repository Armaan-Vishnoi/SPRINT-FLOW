import { useState } from "react";

import toast from "react-hot-toast";

export default function CreateTaskModal({
  onClose,

  onCreate,

  members,

  tasks,
}: any) {
  const [form, setForm] = useState({
    title: "",

    description: "",

    assignee: "",

    dependency: "",
  });

  console.log(
    "MODAL TASKS:",

    tasks,
  );

  const [creating, setCreating] = useState(false);
  const submit = async () => {
    if (creating) return;

    if (!form.title) {
      toast.error("Task title is required 📝");
      return;
    }

    if (!form.assignee) {
      toast.error("Please assign a team member 👤");
      return;
    }

    setCreating(true);

    await onCreate({
      title: form.title,
      description: form.description,
      assignee: form.assignee,
      dependencies: form.dependency ? [form.dependency] : [],
    });
  };

  return (
    <div
      className="
fixed
inset-0
bg-black/70
backdrop-blur-md
flex
items-center
justify-center
z-50
px-5
"
    >
      {/* MODAL */}

      <div
        className="
w-full
max-w-xl
bg-gray-900
border
border-gray-800
rounded-3xl
p-6
sm:p-8
shadow-2xl
max-h-[90vh]
overflow-y-auto
"
      >
        {/* HEADER */}

        <div
          className="
flex
justify-between
items-start
mb-8
"
        >
          <div>
            <h1
              className="
text-2xl
sm:text-3xl
font-black
bg-gradient-to-r
from-blue-400
to-purple-500
bg-clip-text
text-transparent
"
            >
              Create Task
            </h1>

            <p
              className="
text-gray-400
text-sm
mt-2
"
            >
              Assign work and manage sprint progress ⚡
            </p>
          </div>

          <button
            onClick={onClose}
            className="
w-10
h-10
rounded-xl
bg-gray-800
hover:bg-red-600
duration-300
"
          >
            ✕
          </button>
        </div>

        {/* FORM */}

        <div
          className="
space-y-5
"
        >
          {/* TITLE */}

          <div>
            <label className="text-gray-400 text-sm">Task Title</label>

            <input
              placeholder="Example: Create Login API"
              value={form.title}
              onChange={(e) =>
                setForm({
                  ...form,

                  title: e.target.value,
                })
              }
              className="
mt-2
w-full
bg-gray-800
border
border-gray-700
rounded-xl
p-4
outline-none
focus:border-blue-500
focus:scale-[1.02]
duration-300
text-white
"
            />
          </div>

          {/* DESCRIPTION */}

          <div>
            <label className="text-gray-400 text-sm">Description</label>

            <textarea
              placeholder="Explain task requirements..."
              value={form.description}
              onChange={(e) =>
                setForm({
                  ...form,

                  description: e.target.value,
                })
              }
              className="
mt-2
w-full
h-28
resize-none
bg-gray-800
border
border-gray-700
rounded-xl
p-4
outline-none
focus:border-blue-500
focus:scale-[1.02]
duration-300
text-white
"
            />
          </div>

          {/* ASSIGNEE */}

          <div>
            <label className="text-gray-400 text-sm">Assign Member</label>

            <select
              value={form.assignee}
              onChange={(e) =>
                setForm({
                  ...form,

                  assignee: e.target.value,
                })
              }
              className="
mt-2
w-full
bg-gray-800
border
border-gray-700
rounded-xl
p-4
outline-none
focus:border-blue-500
duration-300
text-white
"
            >
              <option value="">Select Team Member</option>

              {members?.map((u: any) => (
                <option key={u._id} value={u._id}>
                  {u.name}
                </option>
              ))}
            </select>
          </div>

          {/* DEPENDENCY */}

          <div>
            <label className="text-gray-400 text-sm">Task Dependency</label>

            <select
              value={form.dependency}
              onChange={(e) =>
                setForm({
                  ...form,

                  dependency: e.target.value,
                })
              }
              className="
mt-2
w-full
bg-gray-800
border
border-gray-700
rounded-xl
p-4
outline-none
focus:border-purple-500
duration-300
text-white
"
            >
              <option value="">No Dependency</option>

              {tasks?.map((task: any) => (
                <option key={task._id} value={task._id}>
                  {task.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* INFO */}

        <div
          className="
mt-6
bg-purple-500/10
border
border-purple-500/30
rounded-2xl
p-4
text-purple-300
text-sm
"
        >
          🔗 Dependencies block this task until the selected task is completed.
        </div>

        {/* BUTTON */}

        <div
          className="
grid
grid-cols-1
sm:grid-cols-2
gap-4
mt-8
"
        >
          <button
            disabled={creating}
            onClick={submit}
            className="
py-4
rounded-xl
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
            Create Task 🚀
          </button>

          <button
            onClick={onClose}
            className="
py-4
rounded-xl
font-bold
bg-gray-800
hover:bg-gray-700
duration-300
"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
