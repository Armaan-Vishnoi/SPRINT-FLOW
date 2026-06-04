import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import toast from "react-hot-toast";
export default function CreateSprintModal({ onClose, onCreate, }) {
    const [name, setName] = useState("");
    const [goal, setGoal] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const submit = () => {
        if (!name.trim()) {
            toast.error("Sprint name is required 📝");
            return;
        }
        onCreate({
            name,
            goal,
            startDate,
            endDate,
        });
    };
    return (_jsx("div", { className: "\r\nfixed\r\ninset-0\r\nbg-black/70\r\nbackdrop-blur-md\r\nflex\r\nitems-center\r\njustify-center\r\nz-50\r\npx-5\r\n", children: _jsxs("div", { className: "\r\nw-full\r\nmax-w-xl\r\nbg-gray-900\r\nborder\r\nborder-gray-800\r\nrounded-3xl\r\np-6\r\nsm:p-8\r\nshadow-2xl\r\n", children: [_jsxs("div", { className: "\r\nflex\r\njustify-between\r\nitems-start\r\nmb-8\r\n", children: [_jsxs("div", { children: [_jsx("h1", { className: "\r\ntext-2xl\r\nsm:text-3xl\r\nfont-black\r\nbg-gradient-to-r\r\nfrom-blue-400\r\nto-purple-500\r\nbg-clip-text\r\ntext-transparent\r\n", children: "Create Sprint" }), _jsx("p", { className: "\r\ntext-gray-400\r\ntext-sm\r\nmt-2\r\n", children: "Plan your next development cycle \uD83D\uDE80" })] }), _jsx("button", { onClick: onClose, className: "\r\nw-10\r\nh-10\r\nrounded-xl\r\nbg-gray-800\r\nhover:bg-red-600\r\nduration-300\r\n", children: "\u2715" })] }), _jsxs("div", { className: "\r\nspace-y-5\r\n", children: [_jsxs("div", { children: [_jsx("label", { className: "text-sm text-gray-400", children: "Sprint Name" }), _jsx("input", { placeholder: "Example: Authentication Sprint", value: name, onChange: (e) => setName(e.target.value), className: "\r\nmt-2\r\nw-full\r\nbg-gray-800\r\nborder\r\nborder-gray-700\r\np-4\r\nrounded-xl\r\noutline-none\r\nfocus:border-blue-500\r\nfocus:scale-[1.02]\r\nduration-300\r\ntext-white\r\n" })] }), _jsxs("div", { children: [_jsx("label", { className: "text-sm text-gray-400", children: "Sprint Goal" }), _jsx("textarea", { placeholder: "Describe sprint objective...", value: goal, onChange: (e) => setGoal(e.target.value), className: "\r\nmt-2\r\nw-full\r\nh-28\r\nresize-none\r\nbg-gray-800\r\nborder\r\nborder-gray-700\r\np-4\r\nrounded-xl\r\noutline-none\r\nfocus:border-blue-500\r\nfocus:scale-[1.02]\r\nduration-300\r\ntext-white\r\n" })] }), _jsxs("div", { className: "\r\ngrid\r\ngrid-cols-1\r\nsm:grid-cols-2\r\ngap-4\r\n", children: [_jsxs("div", { children: [_jsx("label", { className: "text-sm text-gray-400", children: "Start Date" }), _jsx("input", { type: "date", value: startDate, onChange: (e) => setStartDate(e.target.value), className: "\r\nmt-2\r\nw-full\r\nbg-gray-800\r\nborder\r\nborder-gray-700\r\np-4\r\nrounded-xl\r\noutline-none\r\nfocus:border-blue-500\r\nduration-300\r\ntext-white\r\n" })] }), _jsxs("div", { children: [_jsx("label", { className: "text-sm text-gray-400", children: "End Date" }), _jsx("input", { type: "date", value: endDate, onChange: (e) => setEndDate(e.target.value), className: "\r\nmt-2\r\nw-full\r\nbg-gray-800\r\nborder\r\nborder-gray-700\r\np-4\r\nrounded-xl\r\noutline-none\r\nfocus:border-blue-500\r\nduration-300\r\ntext-white\r\n" })] })] })] }), _jsxs("div", { className: "\r\ngrid\r\ngrid-cols-1\r\nsm:grid-cols-2\r\ngap-4\r\nmt-8\r\n", children: [_jsx("button", { onClick: submit, className: "\r\npy-4\r\nrounded-xl\r\nfont-bold\r\nbg-gradient-to-r\r\nfrom-blue-600\r\nto-purple-600\r\nhover:scale-105\r\nduration-300\r\nshadow-lg\r\nshadow-blue-600/30\r\n", children: "Create Sprint \u26A1" }), _jsx("button", { onClick: onClose, className: "\r\npy-4\r\nrounded-xl\r\nfont-bold\r\nbg-gray-800\r\nhover:bg-gray-700\r\nduration-300\r\n", children: "Cancel" })] })] }) }));
}
