import { useState } from "react";

import toast from "react-hot-toast";

export default function CreateSubTaskModal({
  onClose,

  onCreate,
}: any) {
  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");

  const submit = () => {
    if (!title.trim()) {
      toast.error("Subtask title required 📝");

      return;
    }

    onCreate({
      title,

      description,
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
              Create Subtask
            </h1>

            <p
              className="
text-gray-400
text-sm
mt-2
"
            >
              Break work into smaller steps ⚡
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
              Subtask Title
            </label>

            <input
              placeholder="Example: Create API route"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
              placeholder="Describe subtask details..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
focus:border-blue-500
focus:scale-[1.02]
duration-300
text-white
"
            />
          </div>
        </div>

        {/* INFO CARD */}

        <div
          className="
mt-6
bg-blue-500/10
border
border-blue-500/30
rounded-2xl
p-4
text-blue-300
text-sm
"
        >
          📌 Parent task can finish only after all subtasks are completed.
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
from-blue-600
to-purple-600
hover:scale-105
duration-300
shadow-lg
shadow-blue-600/30
"
          >
            Create Subtask 🚀
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
