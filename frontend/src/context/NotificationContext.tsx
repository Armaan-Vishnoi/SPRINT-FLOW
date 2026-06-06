import { createContext, useContext, useEffect, useState } from "react";

import { getNotifications } from "../api/notificationApi";

import { socket } from "../socket/socket";

const NotificationContext = createContext<any>(null);

export const NotificationProvider = ({ children }: any) => {
  const [unread, setUnread] = useState(0);

  const refreshNotifications = async () => {
    const res = await getNotifications();

    const count = res.notifications.filter((n: any) => !n.isRead).length;

    setUnread(count);
  };

  useEffect(() => {
    refreshNotifications();

    socket.on("notification", () => {
      console.log("REFRESH NOTIFICATION COUNT");

      refreshNotifications();
    });

    return () => {
      socket.off("notification");
    };
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        unread,

        refreshNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  return useContext(NotificationContext);
};
