import { useNavigate } from "react-router-dom";

interface Props {
  project: any;

  onEdit: any;

  onDelete: any;
}

export default function ProjectCard({
  project,

  onEdit,

  onDelete,
}: Props) {
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
      {/* BACKGROUND EFFECT */}

      <div
        className="
absolute
w-32
h-32
bg-blue-600/10
rounded-full
blur-3xl
-top-10
-right-10
group-hover:bg-blue-600/20
duration-300
"
      />

      {/* HEADER */}

      <div
        className="
relative
flex
items-start
justify-between
gap-4
"
      >
        <div
          className="
flex
gap-4
items-center
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
            🚀
          </div>

          <div>
            <h2
              className="
text-xl
font-black
line-clamp-1
"
            >
              {project.name}
            </h2>

            <p
              className="
text-xs
text-green-400
mt-1
"
            >
              ● Active Project
            </p>
          </div>
        </div>
      </div>

      {/* DESCRIPTION */}

      <p
        className="
relative
text-gray-400
mt-6
leading-relaxed
line-clamp-3
min-h-8.5
"
      >
        {project.description || "No description added for this project yet."}
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
            Workspace
          </p>

          <p
            className="
font-semibold
"
          >
            SprintFlow
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

      {/* ACTION BUTTONS */}

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
          onClick={() => navigate(`/projects/${project._id}`)}
          className="
bg-gradient-to-r
from-green-600
to-emerald-600
py-3
rounded-xl
font-semibold
hover:scale-105
duration-300
shadow-lg
shadow-green-600/20
"
        >
          Open
        </button>

        <button
          onClick={() => onEdit(project)}
          className="
bg-gradient-to-r
from-blue-600
to-indigo-600
py-3
rounded-xl
font-semibold
hover:scale-105
duration-300
shadow-lg
shadow-blue-600/20
"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(project._id)}
          className="
bg-gradient-to-r
from-red-600
to-pink-600
py-3
rounded-xl
font-semibold
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
