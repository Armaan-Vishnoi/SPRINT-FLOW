import { useEffect, useState } from "react";

import { getUsers } from "../../api/userApi";

import toast from "react-hot-toast";

export default function AddMemberModal({
  onClose,

  onAdd,
}: any) {
  const [users, setUsers] = useState<any[]>([]);

  const [selected, setSelected] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUsers()
      .then((res) => {
        setUsers(res.users);
      })

      .finally(() => {
        setLoading(false);
      });
  }, []);

  const addMember = () => {
    if (!selected) {
      toast.error("Please select a team member 👤");

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
            <h2
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
              Add Member
            </h2>

            <p
              className="
text-gray-400
text-sm
mt-2
"
            >
              Invite people into your project workspace
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

        {/* USER SELECT */}

        <label
          className="
text-gray-400
text-sm
"
        >
          Team Member
        </label>

        {loading ? (
          <div
            className="
mt-3
h-14
bg-gray-800
rounded-xl
animate-pulse
"
          />
        ) : (
          <select
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            className="
mt-3
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
            <option value="">Select team member</option>

            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name} ({user.email})
              </option>
            ))}
          </select>
        )}

        {/* SMALL INFO CARD */}

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
          👥 Added members can collaborate on tasks, sprints and project
          workflow.
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
            onClick={addMember}
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
            Add Member 🚀
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
