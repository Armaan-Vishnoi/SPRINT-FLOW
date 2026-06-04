import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { getDashboardStats } from "../../api/dashboardApi";
import StatCard from "../../components/dashboard/StatCard";
export default function Dashboard() {
    const [stats, setStats] = useState(null);
    const load = async () => {
        try {
            const res = await getDashboardStats();
            setStats(res.stats);
        }
        catch (error) {
            console.log("Dashboard error", error);
        }
    };
    useEffect(() => {
        load();
    }, []);
    if (!stats) {
        return (_jsxs("div", { className: "\r\nspace-y-6\r\nanimate-pulse\r\n", children: [_jsx("div", { className: "\r\nh-10\r\nw-60\r\nbg-gray-800\r\nrounded-xl\r\n" }), _jsx("div", { className: "\r\ngrid\r\ngrid-cols-1\r\nsm:grid-cols-2\r\nlg:grid-cols-3\r\ngap-6\r\n", children: [1, 2, 3, 4, 5, 6].map((i) => (_jsx("div", { className: "\r\nh-32\r\nbg-gray-800\r\nrounded-2xl\r\n" }, i))) })] }));
    }
    const progress = stats.tasks === 0 ? 0 : Math.round((stats.completed / stats.tasks) * 100);
    return (_jsxs("div", { className: "\r\nspace-y-8\r\n", children: [_jsxs("div", { className: "\r\nflex\r\nflex-col\r\nsm:flex-row\r\njustify-between\r\nitems-start\r\nsm:items-center\r\ngap-5\r\n", children: [_jsxs("div", { children: [_jsx("h1", { className: "\r\ntext-3xl\r\nsm:text-4xl\r\nfont-black\r\nbg-gradient-to-r\r\nfrom-white\r\nto-gray-400\r\nbg-clip-text\r\ntext-transparent\r\n", children: "Dashboard" }), _jsx("p", { className: "\r\ntext-gray-400\r\nmt-2\r\n", children: "Monitor projects, sprints and team productivity" })] }), _jsx("div", { className: "\r\nbg-green-500/10\r\ntext-green-400\r\npx-5\r\npy-2\r\nrounded-full\r\nborder\r\nborder-green-500/30\r\n", children: "\u25CF Workspace Active" })] }), _jsxs("div", { className: "\r\ngrid\r\ngrid-cols-1\r\nsm:grid-cols-2\r\nxl:grid-cols-1\r\nmd:grid-cols-2\r\nxl:grid-cols-3\r\ngap-6\r\n", children: [_jsx("div", { className: "\r\nhover:-translate-y-2\r\nduration-300\r\n", children: _jsx(StatCard, { title: "\uD83D\uDE80 Projects", value: stats.projects }) }), _jsx("div", { className: "\r\nhover:-translate-y-2\r\nduration-300\r\n", children: _jsx(StatCard, { title: "\uD83D\uDCC5 Sprints", value: stats.sprints }) }), _jsx("div", { className: "\r\nhover:-translate-y-2\r\nduration-300\r\n", children: _jsx(StatCard, { title: "\u2705 Tasks", value: stats.tasks }) }), _jsx("div", { className: "\r\nhover:-translate-y-2\r\nduration-300\r\n", children: _jsx(StatCard, { title: "\uD83C\uDFAF Completed", value: stats.completed }) }), _jsx("div", { className: "\r\nhover:-translate-y-2\r\nduration-300\r\n", children: _jsx(StatCard, { title: "\u23F3 Pending", value: stats.pending }) }), _jsx("div", { className: "\r\nhover:-translate-y-2\r\nduration-300\r\n", children: _jsx(StatCard, { title: "\u23F1 Logged Hours", value: stats.hours }) })] }), _jsxs("div", { className: "\r\ngrid\r\ngrid-cols-1\r\nlg:grid-cols-3\r\ngap-6\r\n", children: [_jsxs("div", { className: "\r\nlg:col-span-2\r\nbg-gray-900/70\r\nborder\r\nborder-gray-800\r\nrounded-3xl\r\np-6\r\nshadow-xl\r\n", children: [_jsxs("div", { className: "\r\nflex\r\njustify-between\r\nitems-center\r\nmb-6\r\n", children: [_jsx("h2", { className: "\r\ntext-xl\r\nfont-bold\r\n", children: "Task Completion" }), _jsxs("span", { className: "\r\ntext-blue-400\r\nfont-bold\r\n", children: [progress, "%"] })] }), _jsx("div", { className: "\r\nbg-gray-800\r\nh-5\r\nrounded-full\r\noverflow-hidden\r\n", children: _jsx("div", { style: {
                                        width: `${progress}%`,
                                    }, className: "\r\nbg-gradient-to-r\r\nfrom-green-500\r\nto-blue-500\r\nh-full\r\nrounded-full\r\nduration-700\r\n" }) }), _jsxs("p", { className: "\r\ntext-gray-400\r\nmt-4\r\n", children: [stats.completed, " of ", stats.tasks, " tasks completed"] })] }), _jsxs("div", { className: "\r\nbg-gradient-to-br\r\nfrom-blue-600/20\r\nto-purple-600/20\r\nborder\r\nborder-gray-800\r\nrounded-3xl\r\np-6\r\nshadow-xl\r\n", children: [_jsx("h2", { className: "\r\ntext-xl\r\nfont-bold\r\nmb-5\r\n", children: "SprintFlow Summary" }), _jsxs("div", { className: "\r\nspace-y-4\r\ntext-gray-300\r\n", children: [_jsxs("p", { children: ["\uD83D\uDE80 Projects running: ", stats.projects] }), _jsxs("p", { children: ["\uD83D\uDCC5 Active sprints: ", stats.sprints] }), _jsxs("p", { children: ["\u26A1 Productivity: ", progress, "%"] })] })] })] })] }));
}
