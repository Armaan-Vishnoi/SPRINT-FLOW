import { useState } from "react";

import toast from "react-hot-toast";

export default function CreateSprintModal({
  onClose,

  onCreate,
}: any) {
  const [name, setName] = useState("");

  const [goal, setGoal] = useState("");

  const [startDate, setStartDate] = useState("");

  const [endDate, setEndDate] = useState("");

  const submit = () => {
    if (!name.trim()) {
      toast.error("Sprint name is required 📝");

      return;
    }

    onCreate({
      name,

      goal,

      startDate,

      endDate,
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
              Create Sprint
            </h1>

            <p
              className="
text-gray-400
text-sm
mt-2
"
            >
              Plan your next development cycle 🚀
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
            <label className="text-sm text-gray-400">Sprint Name</label>

            <input
              placeholder="Example: Authentication Sprint"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="
mt-2
w-full
bg-gray-800
border
border-gray-700
p-4
rounded-xl
outline-none
focus:border-blue-500
focus:scale-[1.02]
duration-300
text-white
"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400">Sprint Goal</label>

            <textarea
              placeholder="Describe sprint objective..."
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="
mt-2
w-full
h-28
resize-none
bg-gray-800
border
border-gray-700
p-4
rounded-xl
outline-none
focus:border-blue-500
focus:scale-[1.02]
duration-300
text-white
"
            />
          </div>

          {/* DATES */}

          <div
            className="
grid
grid-cols-1
sm:grid-cols-2
gap-4
"
          >
            <div>
              <label className="text-sm text-gray-400">Start Date</label>

              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="
mt-2
w-full
bg-gray-800
border
border-gray-700
p-4
rounded-xl
outline-none
focus:border-blue-500
duration-300
text-white
"
              />
            </div>

            <div>
              <label className="text-sm text-gray-400">End Date</label>

              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="
mt-2
w-full
bg-gray-800
border
border-gray-700
p-4
rounded-xl
outline-none
focus:border-blue-500
duration-300
text-white
"
              />
            </div>
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
from-blue-600
to-purple-600
hover:scale-105
duration-300
shadow-lg
shadow-blue-600/30
"
          >
            Create Sprint ⚡
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
