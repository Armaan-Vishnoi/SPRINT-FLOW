import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import {
  getProjectSprints,
  createSprint,
  updateSprint,
  deleteSprint,
} from "../api/sprintApi";

import { getProjectById, addProjectMember } from "../api/projectApi";

import SprintCard from "../components/sprints/SprintCard";

import CreateSprintModal from "../components/sprints/CreateSprintModal";

import EditSprintModal from "../components/sprints/EditSprintModal";

import AddMemberModal from "../components/projects/AddMemberModal";

import toast from "react-hot-toast";

import LoadingScreen from "../components/LoadingScreen";
export default function ProjectDetails() {
  const { id } = useParams();

  const [project, setProject] = useState<any>(null);

  const [sprints, setSprints] = useState<any[]>([]);

  const [createOpen, setCreateOpen] = useState(false);

  const [editSprint, setEditSprint] = useState<any>(null);

  const [memberOpen, setMemberOpen] = useState(false);

  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      setLoading(true);

      const p = await getProjectById(id!);

      setProject(p.project);

      const s = await getProjectSprints(id!);

      setSprints(s.sprints || s.data || s);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const addMember = async (userId: string) => {
    await addProjectMember(
      id!,

      userId,
    );

    toast.success("Member added successfully 👥");

    setMemberOpen(false);

    load();
  };

  const addSprint = async (data: any) => {
    await createSprint({
      ...data,

      projectId: id,
    });

    toast.success("Sprint created 🚀");

    setCreateOpen(false);

    load();
  };

  const edit = async (
    sid: string,

    data: any,
  ) => {
    await updateSprint(
      sid,

      data,
    );

    toast.success("Sprint updated ✨");

    setEditSprint(null);

    load();
  };

  const remove = async (id: string) => {
    if (confirm("Delete this sprint?")) {
      await deleteSprint(id);

      toast.success("Sprint deleted 🗑");

      load();
    }
  };

  if (loading) {
    return (
      <div
        className="
space-y-6
animate-pulse
"
      >
        <div className="h-20 bg-gray-800 rounded-3xl" />

        <div
          className="
grid
grid-cols-1
md:grid-cols-3
gap-6
"
        >
          <div className="h-48 bg-gray-800 rounded-3xl" />

          <div className="h-48 bg-gray-800 rounded-3xl" />

          <div className="h-48 bg-gray-800 rounded-3xl" />
        </div>
      </div>
    );
  }
  if (loading) return <LoadingScreen text="Opening project workspace..." />;
  return (
    <div
      className="
space-y-8
"
    >
      {/* HEADER */}

      <div
        className="
bg-gradient-to-br
from-gray-900
to-gray-950
border
border-gray-800
rounded-3xl
p-6
shadow-xl
"
      >
        <div
          className="
flex
flex-col
lg:flex-row
justify-between
gap-6
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
              {project?.name || "Project Workspace"}
            </h1>

            <p
              className="
text-gray-400
mt-3
"
            >
              Manage team members, agile sprints and workflow
            </p>

            <div
              className="
mt-5
flex
gap-4
flex-wrap
"
            >
              <div
                className="
px-5
py-2
rounded-xl
bg-blue-500/10
border
border-blue-500/30
text-blue-400
"
              >
                🚀 {sprints.length} Sprints
              </div>

              <div
                className="
px-5
py-2
rounded-xl
bg-green-500/10
border
border-green-500/30
text-green-400
"
              >
                👥 {project?.members?.length || 0} Members
              </div>
            </div>
          </div>

          {/* BUTTONS */}

          <div
            className="
flex
flex-col
sm:flex-row
gap-3
"
          >
            <button
              onClick={() => setMemberOpen(true)}
              className="
              h-15
px-2
py-2
rounded-xl
font-bold
bg-gradient-to-r
from-purple-600
to-pink-600
hover:scale-105
duration-300
"
            >
              + Member
            </button>

            <button
              onClick={() => setCreateOpen(true)}
              className="
              h-15
px-4
py-4
rounded-xl
font-bold
bg-gradient-to-r
from-blue-600
to-purple-600
hover:scale-105
duration-300
"
            >
              + Sprint
            </button>
          </div>
        </div>
      </div>

      {/* MEMBERS */}

      <div
        className="
flex
gap-3
flex-wrap
"
      >
        {project?.members?.map((m: any) => (
          <div
            key={m._id}
            className="
flex
items-center
gap-3
bg-gray-900
border
border-gray-800
px-4
py-3
rounded-2xl
"
          >
            <div
              className="
w-9
h-9
rounded-full
bg-gradient-to-r
from-blue-600
to-purple-600
flex
items-center
justify-center
font-bold
"
            >
              {m.name.charAt(0)}
            </div>

            <span>{m.name}</span>
          </div>
        ))}
      </div>

      {/* SPRINT GRID */}

      {sprints.length === 0 ? (
        <div
          className="
text-center
bg-gray-900
rounded-3xl
p-12
border
border-gray-800
"
        >
          <h2 className="text-2xl font-bold">No Sprints Yet 🚀</h2>

          <p className="text-gray-400 mt-3">
            Create your first sprint and start planning tasks.
          </p>
        </div>
      ) : (
        <div
          className="
grid
grid-cols-1
md:grid-cols-2
xl:grid-cols-3
gap-6
"
        >
          {sprints.map((s) => (
            <div
              key={s._id}
              className="
hover:-translate-y-2
duration-300
"
            >
              <SprintCard
                sprint={s}
                projectId={id}
                onEdit={setEditSprint}
                onDelete={remove}
              />
            </div>
          ))}
        </div>
      )}

      {/* MODALS */}

      {createOpen && (
        <CreateSprintModal
          onCreate={addSprint}
          onClose={() => setCreateOpen(false)}
        />
      )}

      {editSprint && (
        <EditSprintModal
          sprint={editSprint}
          onUpdate={edit}
          onClose={() => setEditSprint(null)}
        />
      )}

      {memberOpen && (
        <AddMemberModal
          onAdd={addMember}
          onClose={() => setMemberOpen(false)}
        />
      )}
    </div>
  );
}
