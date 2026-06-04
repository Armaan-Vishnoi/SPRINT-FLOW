import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
export default function DashboardLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (_jsxs("div", { className: "\r\nmin-h-screen\r\nbg-gray-950\r\ntext-white\r\nflex\r\noverflow-hidden\r\n", children: [sidebarOpen && (_jsx("div", { onClick: () => setSidebarOpen(false), className: "\r\nfixed\r\ninset-0\r\nbg-black/70\r\nbackdrop-blur-sm\r\nz-40\r\nlg:hidden\r\n" })), _jsx("div", { className: `

fixed
lg:static
top-0
left-0
z-50

h-screen

transition-transform
duration-300

${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}

`, children: _jsx(Sidebar, {}) }), _jsxs("div", { className: "\r\nflex-1\r\nmin-w-0\r\nflex\r\nflex-col\r\nh-screen\r\noverflow-hidden\r\n", children: [_jsxs("div", { className: "\r\nlg:hidden\r\nflex\r\nitems-center\r\njustify-between\r\np-4\r\nbg-gray-900\r\nborder-b\r\nborder-gray-800\r\n", children: [_jsx("h1", { className: "\r\ntext-xl\r\nfont-black\r\nbg-gradient-to-r\r\nfrom-blue-400\r\nto-purple-500\r\nbg-clip-text\r\ntext-transparent\r\n", children: "SprintFlow" }), _jsx("button", { onClick: () => setSidebarOpen(true), className: "\r\nbg-gray-800\r\nborder\r\nborder-gray-700\r\npx-4\r\npy-2\r\nrounded-xl\r\nactive:scale-95\r\nduration-300\r\n", children: "\u2630" })] }), _jsx(Navbar, {}), _jsx("main", { className: "\r\nflex-1\r\n\r\noverflow-y-auto\r\noverflow-x-hidden\r\n\r\np-4\r\nsm:p-6\r\nlg:p-8\r\n", children: _jsx(Outlet, {}) })] })] }));
}
