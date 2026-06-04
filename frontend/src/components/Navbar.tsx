import { useAuth } from "../context/AuthContext";

import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { logout, user } = useAuth();

  const nav = useNavigate();

  return (
    <div
      className="
h-auto
min-h-20
bg-gray-950/80
backdrop-blur-xl
border-b
border-gray-800
flex
flex-col
sm:flex-row
justify-between
items-start
sm:items-center
gap-5
px-5
sm:px-8
py-4
text-white
sticky
top-0
z-40
"
    >
      {/* LEFT */}

      <div>
        <h2
          className="
text-xl
sm:text-2xl
font-black
"
        >
          Welcome back,{" "}
          <span
            className="
bg-gradient-to-r
from-blue-400
to-purple-500
bg-clip-text
text-transparent
"
          >
            {user?.name || "User"}
          </span>
          👋
        </h2>

        <p
          className="
text-gray-400
text-sm
mt-1
"
        >
          Manage your projects and productivity
        </p>
      </div>

      {/* RIGHT */}

      <div
        className="
flex
items-center
gap-4
w-full
sm:w-auto
"
      >
        {/* STATUS */}

        <div
          className="
hidden
md:flex
items-center
gap-2
bg-green-500/10
border
border-green-500/30
text-green-400
px-4
py-2
rounded-xl
text-sm
"
        >
          <span
            className="
w-2
h-2
bg-green-500
rounded-full
animate-pulse
"
          />
          Online
        </div>

        {/* PROFILE SMALL */}

        <div
          className="
hidden
sm:flex
items-center
gap-3
bg-gray-900
border
border-gray-800
px-4
py-2
rounded-xl
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
            {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
          </div>

          <div>
            <p
              className="
text-sm
font-semibold
"
            >
              {user?.name}
            </p>

            <p
              className="
text-xs
text-gray-500
"
            >
              Workspace
            </p>
          </div>
        </div>

        {/* LOGOUT */}

        <button
          onClick={() => {
            logout();

            nav("/");
          }}
          className="
ml-auto
sm:ml-0
bg-gradient-to-r
from-red-600
to-pink-600
px-5
py-3
rounded-xl
font-semibold
hover:scale-105
duration-300
shadow-lg
shadow-red-600/20
"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
