import { useState } from "react";

export default function EditSprintModal({
  sprint,

  onClose,

  onUpdate,
}: any) {
  const [name, setName] = useState(sprint.name);

  const [goal, setGoal] = useState(sprint.goal);

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
              Edit Sprint
            </h1>

            <p
              className="
text-gray-400
text-sm
mt-2
"
            >
              Update sprint planning and goals ⚡
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
              Sprint Name
            </label>

            <input
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
            <label
              className="
text-sm
text-gray-400
"
            >
              Sprint Goal
            </label>

            <textarea
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="
mt-2
w-full
h-32
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
        </div>

        {/* ACTION BUTTONS */}

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
            onClick={() =>
              onUpdate(
                sprint._id,

                {
                  name,

                  goal,
                },
              )
            }
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
            Save Changes ✨
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
