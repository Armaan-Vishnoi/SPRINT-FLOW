import { useNavigate } from "react-router-dom";

export default function SprintCard({
  sprint,

  projectId,

  onEdit,

  onDelete,
}: any) {
  const navigate = useNavigate();

  return (
    <div
      className="
group
relative
overflow-hidden
bg-gray-900/70
border
border-gray-800
rounded-3xl
p-6
shadow-xl
hover:border-blue-500/50
hover:shadow-blue-600/20
duration-300
"
    >
      {/* BACKGROUND */}

      <div
        className="
absolute
w-32
h-32
bg-purple-600/10
rounded-full
blur-3xl
-top-10
-right-10
group-hover:bg-purple-600/20
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
gap-5
"
      >
        <div
          className="
flex
items-center
gap-4
"
        >
          <div
            className="
w-14
h-14
rounded-2xl
bg-gradient-to-br
from-blue-600
to-purple-600
flex
items-center
justify-center
text-2xl
shadow-lg
"
          >
            ⚡
          </div>

          <div>
            <h2
              className="
text-xl
font-black
line-clamp-1
"
            >
              {sprint.name}
            </h2>

            <p
              className="
text-green-400
text-xs
mt-1
"
            >
              ● Active Sprint
            </p>
          </div>
        </div>
      </div>

      {/* GOAL */}

      <p
        className="
relative
text-gray-400
mt-6
leading-relaxed
line-clamp-3
min-h-4
"
      >
        {sprint.goal || "No sprint goal added yet."}
      </p>

      {/* INFO */}

      <div
        className="
relative
grid
grid-cols-2
gap-3
mt-6
"
      >
        <div
          className="
bg-gray-800/70
rounded-xl
p-3
"
        >
          <p
            className="
text-xs
text-gray-500
"
          >
            Type
          </p>

          <p
            className="
font-semibold
"
          >
            Agile
          </p>
        </div>

        <div
          className="
bg-gray-800/70
rounded-xl
p-3
"
        >
          <p
            className="
text-xs
text-gray-500
"
          >
            Status
          </p>

          <p
            className="
font-semibold
text-blue-400
"
          >
            Running
          </p>
        </div>
      </div>

      {/* ACTIONS */}

      <div
        className="
relative
grid
grid-cols-1
sm:grid-cols-3
gap-3
mt-8
"
      >
        <button
          onClick={() => {
            console.log(
              "OPEN PROJECT",

              projectId,
            );

            navigate(`/projects/${projectId}/sprints/${sprint._id}`);
          }}
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
          onClick={() => onEdit(sprint)}
          className="
py-3
rounded-xl
font-bold
bg-gradient-to-r
from-blue-600
to-indigo-600
hover:scale-105
duration-300
shadow-lg
shadow-blue-600/20
"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(sprint._id)}
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
