import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Landing() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState("");
    const go = (path) => {
        setLoading(path);
        setTimeout(() => {
            navigate(path);
        }, 400);
    };
    return (_jsxs("div", { className: "\r\nmin-h-screen\r\nbg-gradient-to-br\r\nfrom-gray-950\r\nvia-gray-900\r\nto-black\r\ntext-white\r\noverflow-x-hidden\r\nrelative\r\n", children: [_jsx("div", { className: "\r\nabsolute\r\nw-72\r\nsm:w-96\r\nh-72\r\nsm:h-96\r\nbg-blue-600/20\r\nblur-3xl\r\nrounded-full\r\n-top-20\r\n-left-20\r\nanimate-pulse\r\n" }), _jsx("div", { className: "\r\nabsolute\r\nw-72\r\nsm:w-96\r\nh-72\r\nsm:h-96\r\nbg-purple-600/20\r\nblur-3xl\r\nrounded-full\r\nbottom-0\r\nright-0\r\nanimate-pulse\r\n" }), _jsxs("nav", { className: "\r\nrelative\r\nz-10\r\nflex\r\nitems-center\r\njustify-between\r\npx-5\r\nsm:px-10\r\nlg:px-20\r\npy-6\r\n", children: [_jsx("h1", { className: "\r\ntext-2xl\r\nsm:text-3xl\r\nfont-black\r\nbg-gradient-to-r\r\nfrom-blue-400\r\nto-purple-500\r\nbg-clip-text\r\ntext-transparent\r\n", children: "SprintFlow" }), _jsxs("div", { className: "\r\nflex\r\ngap-3\r\nsm:gap-5\r\n", children: [_jsx("button", { onClick: () => go("/login"), className: "\r\npx-4\r\nsm:px-6\r\npy-2\r\nborder\r\nborder-gray-700\r\nrounded-xl\r\nhover:bg-white\r\nhover:text-black\r\nduration-300\r\n", children: loading === "/login" ? "Opening..." : "Login" }), _jsx("button", { onClick: () => go("/register"), className: "\r\npx-4\r\nsm:px-6\r\npy-2\r\nrounded-xl\r\nbg-gradient-to-r\r\nfrom-blue-600\r\nto-purple-600\r\nhover:scale-105\r\nduration-300\r\nshadow-lg\r\nshadow-blue-500/30\r\n", children: loading === "/register" ? "Starting..." : "Start" })] })] }), _jsxs("section", { className: "\r\nrelative\r\nz-10\r\ngrid\r\ngrid-cols-1\r\nlg:grid-cols-2\r\ngap-16\r\nitems-center\r\npx-6\r\nsm:px-12\r\nlg:px-20\r\npt-16\r\n", children: [_jsxs("div", { children: [_jsx("p", { className: "\r\ninline-block\r\nbg-blue-600/20\r\ntext-blue-400\r\npx-5\r\npy-2\r\nrounded-full\r\ntext-sm\r\n", children: "\uD83D\uDE80 Modern Project Management Platform" }), _jsxs("h1", { className: "\r\nmt-8\r\ntext-4xl\r\nsm:text-5xl\r\nlg:text-7xl\r\nfont-black\r\nleading-tight\r\n", children: ["Manage Work.", _jsx("br", {}), "Build Faster.", _jsx("br", {}), "Grow Together."] }), _jsx("p", { className: "\r\nmt-6\r\ntext-gray-400\r\ntext-base\r\nsm:text-lg\r\nmax-w-xl\r\nleading-relaxed\r\n", children: "SprintFlow helps teams organize projects, manage agile sprints, track tasks, handle dependencies, collaborate realtime and deliver products faster." }), _jsx("button", { onClick: () => go("/register"), className: "\r\nmt-10\r\nw-full\r\nsm:w-auto\r\npx-12\r\npy-4\r\nrounded-2xl\r\nfont-bold\r\nbg-gradient-to-r\r\nfrom-blue-600\r\nto-purple-600\r\nhover:scale-105\r\nduration-300\r\nshadow-xl\r\nshadow-blue-600/30\r\n", children: loading === "/register"
                                    ? "Preparing Workspace..."
                                    : "Start Free →" })] }), _jsxs("div", { className: "\r\nhidden\r\nlg:block\r\nrelative\r\n\r\n", children: [_jsxs("div", { className: "\r\nbg-gray-900/70\r\nborder\r\nborder-gray-800\r\nrounded-3xl\r\np-8\r\nshadow-2xl\r\nanimate-pulse\r\nm-10\r\n", children: [_jsx("h2", { className: "\r\ntext-2xl\r\nfont-bold\r\nmb-6\r\n", children: "Live Sprint Board" }), [
                                        ["Frontend UI", "Completed"],
                                        ["Backend API", "Running"],
                                        ["Testing", "Review"],
                                        ["Deploy", "Pending"],
                                    ].map((item) => (_jsxs("div", { className: "\r\nbg-gray-800\r\nmb-4\r\np-5\r\nrounded-xl\r\nflex\r\njustify-between\r\nhover:scale-105\r\nduration-300\r\n", children: [_jsx("span", { children: item[0] }), _jsx("span", { className: "text-blue-400", children: item[1] })] }, item[0])))] }), _jsx("div", { className: "\r\nabsolute\r\n-bottom-8\r\n-left-8\r\nbg-blue-600\r\npx-8\r\npy-4\r\nrounded-2xl\r\n", children: "Team Active \u25CF" })] })] }), _jsx("section", { className: "\r\nrelative\r\nz-10\r\ngrid\r\ngrid-cols-1\r\nsm:grid-cols-2\r\nlg:grid-cols-3\r\ngap-8\r\np-6\r\nsm:p-12\r\nlg:p-20\r\nmt-20\r\n", children: [
                    ["📁 Projects", "Manage multiple workspaces"],
                    ["⚡ Realtime", "Instant team updates"],
                    ["✅ Tasks", "Subtasks and dependencies"],
                    ["⏱ Tracking", "Monitor productivity"],
                    ["🔐 Security", "Protected file storage"],
                    ["📊 Analytics", "Better decisions"],
                ].map((item) => (_jsxs("div", { className: "\r\nbg-gray-900/70\r\nborder\r\nborder-gray-800\r\nrounded-3xl\r\np-8\r\nhover:-translate-y-3\r\nhover:border-blue-500\r\nduration-300\r\n", children: [_jsx("h2", { className: "text-2xl font-bold", children: item[0] }), _jsx("p", { className: "text-gray-400 mt-3", children: item[1] })] }, item[0]))) }), _jsx("footer", { className: "\r\ntext-center\r\np-8\r\ntext-gray-500\r\nborder-t\r\nborder-gray-900\r\n", children: "\u00A9 2026 SprintFlow \u2014 Plan. Build. Deliver." })] }));
}
