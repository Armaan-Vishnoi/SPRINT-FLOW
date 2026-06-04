import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
export default function Home() {
    return (_jsxs("div", { className: "\r\nmin-h-screen\r\nbg-gray-950\r\ntext-white\r\n", children: [_jsxs("nav", { className: "\r\nflex\r\njustify-between\r\nitems-center\r\npx-10\r\npy-6\r\n", children: [_jsx("h1", { className: "\r\ntext-3xl\r\nfont-bold\r\n", children: "SprintFlow" }), _jsxs("div", { className: "\r\nspace-x-4\r\n", children: [_jsx(Link, { to: "/login", className: "\r\npx-5\r\npy-2\r\nborder\r\nrounded-lg\r\n", children: "Login" }), _jsx(Link, { to: "/register", className: "\r\npx-5\r\npy-2\r\nbg-blue-600\r\nrounded-lg\r\n", children: "Sign Up" })] })] }), _jsxs("section", { className: "\r\nflex\r\nflex-col\r\nitems-center\r\njustify-center\r\ntext-center\r\nh-[80vh]\r\npx-6\r\n", children: [_jsx("h2", { className: "\r\ntext-6xl\r\nfont-bold\r\nmb-6\r\n", children: "Manage Projects Faster" }), _jsx("p", { className: "\r\nmax-w-2xl\r\ntext-gray-400\r\ntext-xl\r\n", children: "SprintFlow helps teams manage projects, sprints, tasks, work logs, files and realtime collaboration." }), _jsxs("div", { className: "\r\nmt-10\r\nflex\r\ngap-5\r\n", children: [_jsx(Link, { to: "/register", className: "\r\nbg-blue-600\r\npx-8\r\npy-3\r\nrounded-lg\r\ntext-lg\r\n", children: "Get Started" }), _jsx(Link, { to: "/login", className: "\r\nborder\r\npx-8\r\npy-3\r\nrounded-lg\r\ntext-lg\r\n", children: "Login" })] })] }), _jsx("section", { className: "\r\ngrid\r\ngrid-cols-3\r\ngap-6\r\np-10\r\n", children: [
                    "Project Management",
                    "Sprint Planning",
                    "Task Tracking",
                    "Realtime Updates",
                    "File Sharing",
                    "Notifications",
                ].map((item) => (_jsx("div", { className: "\r\nbg-gray-900\r\np-6\r\nrounded-xl\r\n", children: _jsx("h3", { className: "\r\ntext-xl\r\nfont-semibold\r\n", children: item }) }, item))) })] }));
}
