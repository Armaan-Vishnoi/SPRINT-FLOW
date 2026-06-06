import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useEffect, useState } from "react";
import { getNotifications } from "../api/notificationApi";
import { socket } from "../socket/socket";
const NotificationContext = createContext(null);
export const NotificationProvider = ({ children }) => {
    const [unread, setUnread] = useState(0);
    const refreshNotifications = async () => {
        const res = await getNotifications();
        const count = res.notifications.filter((n) => !n.isRead).length;
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
    return (_jsx(NotificationContext.Provider, { value: {
            unread,
            refreshNotifications,
        }, children: children }));
};
export const useNotifications = () => {
    return useContext(NotificationContext);
};
