import { useState } from "react";

import toast from "react-hot-toast";

export default function CreateProjectModal({
  onClose,

  onCreate,
}: any) {
  const [name, setName] = useState("");

  const [description, setDescription] = useState("");

  function submit() {
    if (!name.trim()) {
      toast.error("Project name is required 📝");

      return;
    }

    onCreate({
      name,

      description,
    });
  }

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
relative
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
from-green-400
to-blue-500
bg-clip-text
text-transparent
"
            >
              Create Project
            </h1>

            <p
              className="
text-gray-400
text-sm
mt-2
"
            >
              Start a new SprintFlow workspace
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
          <div>
            <label
              className="
text-sm
text-gray-400
"
            >
              Project Name
            </label>

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Example: Website Redesign"
              className="
mt-2
w-full
bg-gray-800
border
border-gray-700
rounded-xl
p-4
outline-none
focus:border-green-500
focus:scale-[1.02]
duration-300
text-white
"
            />
          </div>

          <div>
            <label
              className="
text-sm
text-gray-400
"
            >
              Description
            </label>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe project goals and details..."
              className="
mt-2
w-full
h-32
resize-none
bg-gray-800
border
border-gray-700
rounded-xl
p-4
outline-none
focus:border-green-500
focus:scale-[1.02]
duration-300
text-white
"
            />
          </div>
        </div>

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
from-green-600
to-blue-600
hover:scale-105
duration-300
shadow-lg
shadow-green-600/30
"
          >
            Create Project 🚀
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
