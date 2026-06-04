import { useState } from "react";

import toast from "react-hot-toast";

export default function DependencyModal({
  tasks,

  onAdd,

  onClose,
}: any) {
  const [selected, setSelected] = useState("");

  const submit = () => {
    if (!selected) {
      toast.error("Select a blocking task first 🔗");

      return;
    }

    onAdd(selected);
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
max-w-lg
bg-gray-900
border
border-gray-800
rounded-3xl
p-6
sm:p-8
shadow-2xl
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
              Add Dependency
            </h1>

            <p
              className="
text-gray-400
text-sm
mt-2
"
            >
              Control task execution order 🔗
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

        {/* INFO */}

        <div
          className="
bg-blue-500/10
border
border-blue-500/30
rounded-2xl
p-4
mb-6
text-blue-300
text-sm
"
        >
          ⚡ Selected task must be completed before this task can continue.
        </div>

        {/* SELECT */}

        <label
          className="
text-sm
text-gray-400
"
        >
          Blocking Task
        </label>

        <select
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
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
          <option value="">Select Blocking Task</option>

          {tasks.map((task: any) => (
            <option key={task._id} value={task._id}>
              {task.title}
            </option>
          ))}
        </select>

        {tasks.length === 0 && (
          <p
            className="
text-gray-500
text-sm
mt-3
"
          >
            No available tasks for dependency.
          </p>
        )}

        {/* BUTTONS */}

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
            Add Dependency 🔗
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
