import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { getNotifications, markRead, markUnread, markAllRead, deleteNotification, clearNotifications, } from "../api/notificationApi";
import api from "../api/api";
import { socket } from "../socket/socket";
import LoadingScreen from "../components/LoadingScreen";
export default function Notifications() {
    const [items, setItems] = useState([]);
    const [emailNotification, setEmailNotification] = useState(false);
    const [loading, setLoading] = useState(true);
    const load = async () => {
        try {
            setLoading(true);
            const res = await getNotifications();
            setItems(res.notifications);
        }
        finally {
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
    useEffect(() => {
        const update = () => {
            load();
        };
        socket.on("notification", update);
        return () => {
            socket.off("notification", update);
        };
    }, []);
    const readOne = async (id) => {
        await markRead(id);
        load();
        window.dispatchEvent(new Event("notifications-updated"));
    };
    const unreadOne = async (id) => {
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
    const remove = async (id) => {
        if (!confirm("Delete notification?"))
            return;
        await deleteNotification(id);
        load();
        window.dispatchEvent(new Event("notifications-updated"));
    };
    const clearAll = async () => {
        if (!confirm("Clear all notifications?"))
            return;
        await clearNotifications();
        load();
        window.dispatchEvent(new Event("notifications-updated"));
    };
    const toggleEmail = async () => {
        const value = !emailNotification;
        setEmailNotification(value);
        await api.patch("/api/user/profile", {
            emailNotification: value,
        });
    };
    if (loading)
        return _jsx(LoadingScreen, { text: "Fetching notifications..." });
    return (_jsxs("div", { className: "\r\nspace-y-8\r\n", children: [_jsx("div", { className: "\r\nbg-gradient-to-br\r\nfrom-gray-900\r\nto-gray-950\r\nborder\r\nborder-gray-800\r\nrounded-3xl\r\np-6\r\n", children: _jsxs("div", { className: "\r\nflex\r\nflex-col\r\nxl:flex-row\r\njustify-between\r\ngap-6\r\n", children: [_jsxs("div", { children: [_jsx("h1", { className: "\r\ntext-3xl\r\nsm:text-4xl\r\nfont-black\r\nbg-gradient-to-r\r\nfrom-blue-400\r\nto-purple-500\r\nbg-clip-text\r\ntext-transparent\r\n", children: "Notifications" }), _jsx("p", { className: "\r\ntext-gray-400\r\nmt-2\r\n", children: "Manage workspace alerts and updates \uD83D\uDD14" })] }), _jsxs("div", { className: "\r\nflex\r\nflex-wrap\r\ngap-3\r\n", children: [_jsx("button", { onClick: readAll, className: "\r\npx-5\r\npy-3\r\nrounded-xl\r\nfont-bold\r\nbg-blue-600\r\nhover:scale-105\r\nduration-300\r\n", children: "Read All" }), _jsx("button", { onClick: clearAll, className: "\r\npx-5\r\npy-3\r\nrounded-xl\r\nfont-bold\r\nbg-red-600\r\nhover:scale-105\r\nduration-300\r\n", children: "Clear All" })] })] }) }), items.length === 0 && (_jsx("div", { className: "\r\nbg-gray-900\r\nborder\r\nborder-gray-800\r\nrounded-3xl\r\np-12\r\ntext-center\r\ntext-gray-500\r\n", children: "\uD83D\uDD15 No notifications available" })), _jsx("div", { className: "\r\nspace-y-5\r\n", children: items.map((n) => (_jsx("div", { className: `

group

rounded-3xl

p-6

border

duration-300

hover:-translate-y-1


${n.isRead
                        ? "bg-gray-900/70 border-gray-800"
                        : "bg-blue-950/50 border-blue-500/40 shadow-lg shadow-blue-600/10"}

`, children: _jsxs("div", { className: "\r\nflex\r\nflex-col\r\nlg:flex-row\r\njustify-between\r\ngap-5\r\n", children: [_jsxs("div", { children: [_jsxs("div", { className: "\r\nflex\r\ngap-3\r\nitems-center\r\n", children: [_jsx("span", { className: "\r\ntext-2xl\r\n", children: "\uD83D\uDD14" }), _jsx("h2", { className: "\r\ntext-xl\r\nfont-bold\r\n", children: n.title })] }), _jsx("p", { className: "\r\ntext-gray-300\r\nmt-3\r\n", children: n.message }), _jsxs("div", { className: "\r\nflex\r\ngap-3\r\nflex-wrap\r\nmt-4\r\n", children: [_jsx("span", { className: "\r\ntext-xs\r\npx-3\r\npy-1\r\nrounded-full\r\nbg-purple-500/10\r\ntext-purple-400\r\n", children: n.type }), _jsx("span", { className: "\r\ntext-xs\r\ntext-gray-500\r\n", children: new Date(n.createdAt).toLocaleString() })] })] }), _jsxs("div", { className: "\r\nflex\r\ngap-3\r\nitems-start\r\n", children: [n.isRead ? (_jsx("button", { onClick: () => unreadOne(n._id), className: "\r\nbg-yellow-600\r\npx-4\r\npy-2\r\nrounded-xl\r\nhover:scale-105\r\nduration-300\r\n", children: "Unread" })) : (_jsx("button", { onClick: () => readOne(n._id), className: "\r\nbg-green-600\r\npx-4\r\npy-2\r\nrounded-xl\r\nhover:scale-105\r\nduration-300\r\n", children: "Read" })), _jsx("button", { onClick: () => remove(n._id), className: "\r\nbg-red-600\r\npx-4\r\npy-2\r\nrounded-xl\r\nhover:scale-105\r\nduration-300\r\n", children: "Delete" })] })] }) }, n._id))) })] }));
}
