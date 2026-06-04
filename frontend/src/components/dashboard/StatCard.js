import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function StatCard({ title, value, }) {
    const icons = {
        Projects: "🚀",
        Sprints: "⚡",
        Tasks: "📋",
        Completed: "✅",
        Pending: "⏳",
        "Logged Hours": "⏱",
    };
    return (_jsxs("div", { className: "\r\ngroup\r\nrelative\r\noverflow-hidden\r\n\r\nbg-gray-900/80\r\nborder\r\nborder-gray-800\r\n\r\nrounded-3xl\r\n\r\np-5\r\nsm:p-6\r\n\r\nshadow-xl\r\n\r\nhover:border-blue-500/50\r\nhover:shadow-blue-600/20\r\n\r\nhover:-translate-y-1\r\n\r\nduration-300\r\n", children: [_jsx("div", { className: "\r\nabsolute\r\nw-28\r\nh-28\r\n\r\nbg-blue-600/10\r\n\r\nrounded-full\r\n\r\nblur-3xl\r\n\r\n-top-10\r\n-right-10\r\n\r\ngroup-hover:bg-purple-600/20\r\n\r\nduration-300\r\n" }), _jsxs("div", { className: "\r\nrelative\r\nflex\r\njustify-between\r\nitems-start\r\n", children: [_jsxs("div", { children: [_jsx("p", { className: "\r\ntext-gray-400\r\ntext-sm\r\nfont-medium\r\n", children: title }), _jsx("h1", { className: "\r\ntext-3xl\r\nsm:text-4xl\r\nfont-black\r\nmt-3\r\n", children: value })] }), _jsx("div", { className: "\r\nw-12\r\nh-12\r\n\r\nrounded-2xl\r\n\r\nbg-gradient-to-br\r\nfrom-blue-600\r\nto-purple-600\r\n\r\nflex\r\nitems-center\r\njustify-center\r\n\r\ntext-xl\r\n\r\nshadow-lg\r\n", children: icons[title] || "📊" })] }), _jsx("div", { className: "\r\nrelative\r\n\r\nmt-6\r\n\r\nh-2\r\n\r\nrounded-full\r\n\r\nbg-gray-800\r\n\r\noverflow-hidden\r\n", children: _jsx("div", { className: "\r\nh-full\r\n\r\nw-2/3\r\n\r\nbg-gradient-to-r\r\nfrom-blue-500\r\nto-purple-500\r\n\r\nrounded-full\r\n" }) })] }));
}
