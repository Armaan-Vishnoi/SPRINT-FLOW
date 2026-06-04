import { useEffect, useState } from "react";

import {
  getNotifications,
  markRead,
  markUnread,
  markAllRead,
  deleteNotification,
  clearNotifications,
} from "../api/notificationApi";

import api from "../api/api";

import { socket } from "../socket/socket";
import LoadingScreen from "../components/LoadingScreen";
export default function Notifications() {
  const [items, setItems] = useState<any[]>([]);

  const [emailNotification, setEmailNotification] = useState(false);
  const [loading, setLoading] = useState(true);
  const load = async () => {
    try {
      setLoading(true);

      const res = await getNotifications();

      setItems(res.notifications);
    } finally {
      setLoading(false);
    }
  };

  const loadProfile = async () => {
    const res = await api.get("/api/profile/me");

    setEmailNotification(res.data.user.emailNotification || false);
  };

  useEffect(() => {
    load();

    loadProfile();
  }, []);

  const readOne = async (id: string) => {
    await markRead(id);

    load();

    window.dispatchEvent(new Event("notifications-updated"));
  };

  const unreadOne = async (id: string) => {
    await markUnread(id);

    load();

    window.dispatchEvent(new Event("notifications-updated"));
  };

  const readAll = async () => {
    await markAllRead();

    socket.emit("notification-read");

    load();

    window.dispatchEvent(new Event("notifications-updated"));
  };

  const remove = async (id: string) => {
    if (!confirm("Delete notification?")) return;

    await deleteNotification(id);

    load();

    window.dispatchEvent(new Event("notifications-updated"));
  };

  const clearAll = async () => {
    if (!confirm("Clear all notifications?")) return;

    await clearNotifications();

    load();

    window.dispatchEvent(new Event("notifications-updated"));
  };

  const toggleEmail = async () => {
    const value = !emailNotification;

    setEmailNotification(value);

    await api.patch(
      "/api/user/profile",

      {
        emailNotification: value,
      },
    );
  };
  if (loading) return <LoadingScreen text="Fetching notifications..." />;
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
"
      >
        <div
          className="
flex
flex-col
xl:flex-row
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
from-blue-400
to-purple-500
bg-clip-text
text-transparent
"
            >
              Notifications
            </h1>

            <p
              className="
text-gray-400
mt-2
"
            >
              Manage workspace alerts and updates 🔔
            </p>
          </div>

          <div
            className="
flex
flex-wrap
gap-3
"
          >
            

            <button
              onClick={readAll}
              className="
px-5
py-3
rounded-xl
font-bold
bg-blue-600
hover:scale-105
duration-300
"
            >
              Read All
            </button>

            <button
              onClick={clearAll}
              className="
px-5
py-3
rounded-xl
font-bold
bg-red-600
hover:scale-105
duration-300
"
            >
              Clear All
            </button>
          </div>
        </div>
      </div>

      {/* EMPTY */}

      {items.length === 0 && (
        <div
          className="
bg-gray-900
border
border-gray-800
rounded-3xl
p-12
text-center
text-gray-500
"
        >
          🔕 No notifications available
        </div>
      )}

      {/* LIST */}

      <div
        className="
space-y-5
"
      >
        {items.map((n: any) => (
          <div
            key={n._id}
            className={`

group

rounded-3xl

p-6

border

duration-300

hover:-translate-y-1


${
  n.isRead
    ? "bg-gray-900/70 border-gray-800"
    : "bg-blue-950/50 border-blue-500/40 shadow-lg shadow-blue-600/10"
}

`}
          >
            <div
              className="
flex
flex-col
lg:flex-row
justify-between
gap-5
"
            >
              <div>
                <div
                  className="
flex
gap-3
items-center
"
                >
                  <span
                    className="
text-2xl
"
                  >
                    🔔
                  </span>

                  <h2
                    className="
text-xl
font-bold
"
                  >
                    {n.title}
                  </h2>
                </div>

                <p
                  className="
text-gray-300
mt-3
"
                >
                  {n.message}
                </p>

                <div
                  className="
flex
gap-3
flex-wrap
mt-4
"
                >
                  <span
                    className="
text-xs
px-3
py-1
rounded-full
bg-purple-500/10
text-purple-400
"
                  >
                    {n.type}
                  </span>

                  <span
                    className="
text-xs
text-gray-500
"
                  >
                    {new Date(n.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>

              <div
                className="
flex
gap-3
items-start
"
              >
                {n.isRead ? (
                  <button
                    onClick={() => unreadOne(n._id)}
                    className="
bg-yellow-600
px-4
py-2
rounded-xl
hover:scale-105
duration-300
"
                  >
                    Unread
                  </button>
                ) : (
                  <button
                    onClick={() => readOne(n._id)}
                    className="
bg-green-600
px-4
py-2
rounded-xl
hover:scale-105
duration-300
"
                  >
                    Read
                  </button>
                )}

                <button
                  onClick={() => remove(n._id)}
                  className="
bg-red-600
px-4
py-2
rounded-xl
hover:scale-105
duration-300
"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
