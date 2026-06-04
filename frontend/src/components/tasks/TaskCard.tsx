import { useNavigate } from "react-router-dom";

export default function TaskCard({
  task,

  onDelete,

  onStatus,
}: any) {
  const navigate = useNavigate();

  return (
    <div
      className="
group
relative
overflow-hidden
bg-gray-800/70
border
border-gray-700
rounded-3xl
p-5
shadow-lg
hover:border-blue-500/50
hover:shadow-blue-600/20
duration-300
"
    >
      {/* BACK EFFECT */}

      <div
        className="
absolute
w-24
h-24
bg-blue-600/10
rounded-full
blur-3xl
-top-5
-right-5
group-hover:bg-blue-600/20
duration-300
"
      />

      {/* HEADER */}

      <div
        className="
relative
flex
justify-between
items-start
gap-3
"
      >
        <div>
          <h3
            className="
text-lg
font-black
line-clamp-2
"
          >
            {task.title}
          </h3>

          <p
            className="
text-xs
text-blue-400
mt-2
"
          >
            ● Sprint Task
          </p>
        </div>

        <div
          className="
px-3
py-1
rounded-full
bg-purple-500/10
text-purple-400
text-xs
border
border-purple-500/30
"
        >
          TASK
        </div>
      </div>

      {/* DESCRIPTION */}

      <p
        className="
relative
text-gray-400
mt-2
leading-relaxed
text-sm
line-clamp-3
min-h-1
"
      >
        {task.description || "No description added."}
      </p>

      {/* STATUS */}

      <div
        className="
relative
mt-5
"
      >
        <label
          className="
text-xs
text-gray-500
"
        >
          Current Status
        </label>

        <select
          value={task.status}
          onChange={(e) =>
            onStatus(
              task._id,

              e.target.value,
            )
          }
          className="
mt-2
w-full
bg-gray-900
border
border-gray-700
rounded-xl
p-3
outline-none
focus:border-blue-500
duration-300
text-white
"
        >
          <option value="TODO">📝 TODO</option>

          <option value="IN_PROGRESS">⚡ IN PROGRESS</option>

          <option value="DONE">✅ DONE</option>
        </select>
      </div>

      {/* ACTIONS */}

      <div
        className="
relative
grid
grid-cols-1
sm:grid-cols-2
gap-3
mt-6
"
      >
        <button
          onClick={() => navigate(`/tasks/${task._id}`)}
          className="
py-3
rounded-xl
font-bold
bg-gradient-to-r
from-green-600
to-emerald-600
hover:scale-105
duration-300
shadow-lg
shadow-green-600/20
"
        >
          Open
        </button>

        <button
          onClick={() => onDelete(task._id)}
          className="
py-3
rounded-xl
font-bold
bg-gradient-to-r
from-red-600
to-pink-600
hover:scale-105
duration-300
shadow-lg
shadow-red-600/20
"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
