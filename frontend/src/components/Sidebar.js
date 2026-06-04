import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getProfile } from "../api/profileApi";
import { useNavigate } from "react-router-dom";
import { getNotifications } from "../api/notificationApi";
import { socket } from "../socket/socket";
export default function Sidebar() {
    const [user, setUser] = useState(null);
    const [unread, setUnread] = useState(0);
    const navigate = useNavigate();
    const loadNotifications = async () => {
        const res = await getNotifications();
        const count = res.notifications.filter((n) => !n.isRead).length;
        setUnread(count);
    };
    useEffect(() => {
        window.addEventListener("notifications-updated", loadNotifications);
        getProfile()
            .then((res) => {
            setUser(res.user);
        })
            .catch(() => { });
    }, []);
    useEffect(() => {
        getProfile().then((res) => {
            setUser(res.user);
        });
        loadNotifications();
        socket.on("notification", () => {
            loadNotifications();
        });
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
    return (_jsxs("div", { className: "\r\nw-72\r\nh-screen\r\nbg-gray-950\r\nborder-r\r\nborder-gray-800\r\np-5\r\ntext-white\r\nflex\r\nflex-col\r\njustify-between\r\noverflow-y-auto\r\noverflow-x-hidden\r\n", children: [_jsxs("div", { children: [_jsxs("div", { className: "\r\nmb-8\r\n", children: [_jsx("h1", { className: "\r\ntext-3xl\r\nfont-black\r\nbg-gradient-to-r\r\nfrom-blue-400\r\nto-purple-500\r\nbg-clip-text\r\ntext-transparent\r\n", children: "SprintFlow" }), _jsx("p", { className: "\r\ntext-gray-500\r\ntext-sm\r\nmt-1\r\n", children: "Project Workspace" })] }), _jsx("div", { onClick: () => navigate("/profile"), className: "\r\nrelative\r\nbg-gradient-to-br\r\nfrom-gray-900\r\nto-gray-800\r\nborder\r\nborder-gray-700\r\nrounded-3xl\r\np-4\r\nlg:p-5\r\ncursor-pointer\r\nmb-6\r\nhover:scale-105\r\nduration-300\r\nshadow-xl\r\n", children: _jsxs("div", { className: "\r\nflex\r\nflex-col\r\nitems-center\r\n", children: [_jsxs("div", { className: "\r\nrelative\r\n", children: [_jsx("img", { src: user?.profilePicture ? user.profilePicture : "/default.png", onError: (e) => {
                                                e.currentTarget.src = "/default.png";
                                            }, className: "\r\nw-20\r\nh-20\r\nlg:w-24\r\nlg:h-24\r\nrounded-full\r\nobject-cover\r\nborder-4\r\nborder-blue-500\r\nshadow-lg\r\n" }), _jsx("span", { className: "\r\nabsolute\r\nbottom-2\r\nright-2\r\nw-5\r\nh-5\r\nbg-green-500\r\nrounded-full\r\nborder-4\r\nborder-gray-900\r\n" })] }), _jsx("h2", { className: "\r\nfont-bold\r\ntext-lg\r\nmt-4\r\ntext-center\r\n", children: user?.name || "Sprint User" }), _jsx("p", { className: "\r\ntext-gray-400\r\ntext-xs\r\ntext-center\r\nbreak-all\r\n", children: user?.email || "workspace@sprintflow.com" }), _jsx("div", { className: "\r\nmt-4\r\npx-4\r\npy-1\r\nrounded-full\r\nbg-blue-500/20\r\ntext-blue-400\r\ntext-xs\r\n", children: "View Profile" })] }) }), _jsx("div", { className: "\r\nspace-y-3\r\n", children: menu.map((item) => (_jsxs(NavLink, { to: item.path, className: ({ isActive }) => `

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


${isActive
                                ? "bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg shadow-blue-600/30 text-white"
                                : "text-gray-400 hover:bg-gray-900 hover:text-white hover:translate-x-2"}

`, children: [_jsxs("div", { className: "\r\nflex\r\nitems-center\r\ngap-3\r\n", children: [_jsx("span", { children: item.icon }), _jsx("span", { children: item.name })] }), item.name === "Notifications" && unread > 0 && (_jsx("span", { className: "\r\nbg-red-600\r\ntext-white\r\ntext-xs\r\npx-2\r\npy-1\r\nrounded-full\r\nanimate-pulse\r\n", children: unread }))] }, item.path))) })] }), _jsxs("div", { className: "\r\nhidden\r\nsm:block\r\nbg-gradient-to-br\r\nfrom-blue-600/20\r\nto-purple-600/20\r\nborder\r\nborder-gray-800\r\nrounded-3xl\r\np-5\r\n", children: [_jsx("h2", { className: "\r\nfont-bold\r\n", children: "\uD83D\uDE80 Productivity" }), _jsx("p", { className: "\r\ntext-gray-400\r\ntext-sm\r\nmt-2\r\n", children: "Build faster with organized projects and sprints." })] })] }));
}
