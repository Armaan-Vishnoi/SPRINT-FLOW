import { useEffect, useState } from "react";

import { NavLink } from "react-router-dom";

import { getProfile } from "../api/profileApi";

import { useNavigate } from "react-router-dom";

import { getNotifications } from "../api/notificationApi";

import { socket } from "../socket/socket";

export default function Sidebar() {
  const [user, setUser] = useState<any>(null);

  const [unread, setUnread] = useState(0);

  const navigate = useNavigate();

  const loadNotifications = async () => {
    const res = await getNotifications();

    const count = res.notifications.filter((n: any) => !n.isRead).length;

    setUnread(count);
  };

  useEffect(() => {
    window.addEventListener(
      "notifications-updated",

      loadNotifications,
    );

    getProfile()
      .then((res) => {
        setUser(res.user);
      })

      .catch(() => {});
  }, []);

  useEffect(() => {
    getProfile().then((res) => {
      setUser(res.user);
    });

    loadNotifications();

    socket.on(
      "notification",

      () => {
        loadNotifications();
      },
    );

    return () => {
      socket.off("notification");
    };
  }, []);

  const menu = [
    {
      name: "Dashboard",

      icon: "📊",

      path: "/dashboard",
    },

    {
      name: "Projects",

      icon: "🚀",

      path: "/projects",
    },

    {
      name: "Notifications",

      icon: "🔔",

      path: "/notifications",
    },
  ];

  return (
    <div
      className="
w-72
h-screen
bg-gray-950
border-r
border-gray-800
p-5
text-white
flex
flex-col
justify-between
overflow-y-auto
overflow-x-hidden
"
    >
      <div>
        {/* LOGO */}

        <div
          className="
mb-8
"
        >
          <h1
            className="
text-3xl
font-black
bg-gradient-to-r
from-blue-400
to-purple-500
bg-clip-text
text-transparent
"
          >
            SprintFlow
          </h1>

          <p
            className="
text-gray-500
text-sm
mt-1
"
          >
            Project Workspace
          </p>
        </div>

        {/* PROFILE CARD */}

        <div
          onClick={() => navigate("/profile")}
          className="
relative
bg-gradient-to-br
from-gray-900
to-gray-800
border
border-gray-700
rounded-3xl
p-4
lg:p-5
cursor-pointer
mb-6
hover:scale-105
duration-300
shadow-xl
"
        >
          <div
            className="
flex
flex-col
items-center
"
          >
            <div
              className="
relative
"
            >
              <img
                src={
                  user?.profilePicture
                    ? `http://localhost:5000/${String(
                        user.profilePicture,
                      ).replaceAll("\\", "/")}`
                    : "/default.png"
                }
                className="
w-20
h-20
lg:w-24
lg:h-24
rounded-full
object-cover
border-4
border-blue-500
shadow-lg
"
              />

              <span
                className="
absolute
bottom-2
right-2
w-5
h-5
bg-green-500
rounded-full
border-4
border-gray-900
"
              />
            </div>

            <h2
              className="
font-bold
text-lg
mt-4
text-center
"
            >
              {user?.name || "Sprint User"}
            </h2>

            <p
              className="
text-gray-400
text-xs
text-center
break-all
"
            >
              {user?.email || "workspace@sprintflow.com"}
            </p>

            <div
              className="
mt-4
px-4
py-1
rounded-full
bg-blue-500/20
text-blue-400
text-xs
"
            >
              View Profile
            </div>
          </div>
        </div>

        {/* MENU */}

        <div
          className="
space-y-3
"
        >
          {menu.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `

flex
items-center
justify-between
px-4
py-3
lg:px-5
lg:py-4
rounded-2xl
font-semibold
duration-300


${
  isActive
    ? "bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg shadow-blue-600/30 text-white"
    : "text-gray-400 hover:bg-gray-900 hover:text-white hover:translate-x-2"
}

`}
            >
              <div
                className="
flex
items-center
gap-3
"
              >
                <span>{item.icon}</span>

                <span>{item.name}</span>
              </div>

              {item.name === "Notifications" && unread > 0 && (
                <span
                  className="
bg-red-600
text-white
text-xs
px-2
py-1
rounded-full
animate-pulse
"
                >
                  {unread}
                </span>
              )}
            </NavLink>
          ))}
        </div>
      </div>

      {/* BOTTOM CARD */}

      <div
        className="
hidden
sm:block
bg-gradient-to-br
from-blue-600/20
to-purple-600/20
border
border-gray-800
rounded-3xl
p-5
"
      >
        <h2
          className="
font-bold
"
        >
          🚀 Productivity
        </h2>

        <p
          className="
text-gray-400
text-sm
mt-2
"
        >
          Build faster with organized projects and sprints.
        </p>
      </div>
    </div>
  );
}
