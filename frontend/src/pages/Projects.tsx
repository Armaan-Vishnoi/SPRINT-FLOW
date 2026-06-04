import { useEffect, useState } from "react";

import {
  createProject,
  getProjects,
  updateProject,
  deleteProject,
} from "../api/projectApi";

import ProjectCard from "../components/projects/ProjectCard";

import CreateProjectModal from "../components/projects/CreateProjectModal";

import EditProjectModal from "../components/projects/EditProjectModal";

import toast from "react-hot-toast";
import LoadingScreen from "../components/LoadingScreen";
export default function Projects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [createOpen, setCreateOpen] = useState(false);

  const [editProject, setEditProject] = useState<any>(null);

  const loadProjects = async () => {
    try {
      setLoading(true);

      const data = await getProjects();

      setProjects(data.projects);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const addProject = async (data: any) => {
    await createProject(data);

    toast.success("Project created successfully 🚀");

    setCreateOpen(false);

    loadProjects();
  };

  const edit = async (id: string, data: any) => {
    await updateProject(id, data);

    toast.success("Project updated successfully ✨");

    setEditProject(null);

    loadProjects();
  };

  const remove = async (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      await deleteProject(id);

      toast.success("Project removed 🗑");

      loadProjects();
    }
  };
  if (loading) return <LoadingScreen text="Loading projects..." />;
  return (
    <div
      className="
space-y-8
"
    >
      {/* HEADER */}

      <div
        className="
flex
flex-col
sm:flex-row
justify-between
items-start
sm:items-center
gap-5
"
      >
        <div>
          <h1
            className="
text-3xl
sm:text-4xl
font-black
bg-gradient-to-r
from-white
to-gray-400
bg-clip-text
text-transparent
"
          >
            Projects
          </h1>

          <p
            className="
text-gray-400
mt-2
"
          >
            Manage workspaces, teams and development workflow
          </p>

          <div
            className="
mt-4
inline-flex
items-center
gap-2
px-4
py-2
rounded-xl
bg-blue-500/10
border
border-blue-500/30
text-blue-400
text-sm
"
          >
            🚀 {projects.length} Active Projects
          </div>
        </div>

        <button
          onClick={() => setCreateOpen(true)}
          className="
w-full
sm:w-auto
px-6
py-4
rounded-2xl
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
          + Create Project
        </button>
      </div>

      {/* LOADING */}

      {loading && (
        <div
          className="
grid
grid-cols-1
md:grid-cols-2
xl:grid-cols-3
gap-6
animate-pulse
"
        >
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="
h-52
rounded-3xl
bg-gray-800
"
            />
          ))}
        </div>
      )}

      {/* EMPTY */}

      {!loading && projects.length === 0 && (
        <div
          className="
bg-gray-900/70
border
border-gray-800
rounded-3xl
p-12
text-center
"
        >
          <h2
            className="
text-3xl
font-bold
"
          >
            No Projects Yet 🚀
          </h2>

          <p
            className="
text-gray-400
mt-3
"
          >
            Create your first SprintFlow project and start managing your
            workflow.
          </p>

          <button
            onClick={() => setCreateOpen(true)}
            className="
mt-8
px-8
py-3
rounded-xl
bg-blue-600
hover:bg-blue-700
duration-300
"
          >
            Create First Project
          </button>
        </div>
      )}

      {/* PROJECT GRID */}

      {!loading && projects.length > 0 && (
        <div
          className="
grid
grid-cols-1
md:grid-cols-2
xl:grid-cols-3
gap-6
"
        >
          {projects.map((p) => (
            <div
              key={p._id}
              className="
hover:-translate-y-2
duration-300
"
            >
              <ProjectCard
                project={p}
                onEdit={setEditProject}
                onDelete={remove}
              />
            </div>
          ))}
        </div>
      )}

      {/* MODALS */}

      {createOpen && (
        <CreateProjectModal
          onClose={() => setCreateOpen(false)}
          onCreate={addProject}
        />
      )}

      {editProject && (
        <EditProjectModal
          project={editProject}
          onClose={() => setEditProject(null)}
          onUpdate={edit}
        />
      )}
    </div>
  );
}
