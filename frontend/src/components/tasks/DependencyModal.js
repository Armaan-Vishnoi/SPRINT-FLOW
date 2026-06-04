import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import toast from "react-hot-toast";
export default function DependencyModal({ tasks, onAdd, onClose, }) {
    const [selected, setSelected] = useState("");
    const submit = () => {
        if (!selected) {
            toast.error("Select a blocking task first 🔗");
            return;
        }
        onAdd(selected);
    };
    return (_jsx("div", { className: "\r\nfixed\r\ninset-0\r\nbg-black/70\r\nbackdrop-blur-md\r\nflex\r\nitems-center\r\njustify-center\r\nz-50\r\npx-5\r\n", children: _jsxs("div", { className: "\r\nw-full\r\nmax-w-lg\r\nbg-gray-900\r\nborder\r\nborder-gray-800\r\nrounded-3xl\r\np-6\r\nsm:p-8\r\nshadow-2xl\r\n", children: [_jsxs("div", { className: "\r\nflex\r\njustify-between\r\nitems-start\r\nmb-8\r\n", children: [_jsxs("div", { children: [_jsx("h1", { className: "\r\ntext-2xl\r\nsm:text-3xl\r\nfont-black\r\nbg-gradient-to-r\r\nfrom-blue-400\r\nto-purple-500\r\nbg-clip-text\r\ntext-transparent\r\n", children: "Add Dependency" }), _jsx("p", { className: "\r\ntext-gray-400\r\ntext-sm\r\nmt-2\r\n", children: "Control task execution order \uD83D\uDD17" })] }), _jsx("button", { onClick: onClose, className: "\r\nw-10\r\nh-10\r\nrounded-xl\r\nbg-gray-800\r\nhover:bg-red-600\r\nduration-300\r\n", children: "\u2715" })] }), _jsx("div", { className: "\r\nbg-blue-500/10\r\nborder\r\nborder-blue-500/30\r\nrounded-2xl\r\np-4\r\nmb-6\r\ntext-blue-300\r\ntext-sm\r\n", children: "\u26A1 Selected task must be completed before this task can continue." }), _jsx("label", { className: "\r\ntext-sm\r\ntext-gray-400\r\n", children: "Blocking Task" }), _jsxs("select", { value: selected, onChange: (e) => setSelected(e.target.value), className: "\r\nmt-2\r\nw-full\r\nbg-gray-800\r\nborder\r\nborder-gray-700\r\nrounded-xl\r\np-4\r\noutline-none\r\nfocus:border-blue-500\r\nduration-300\r\ntext-white\r\n", children: [_jsx("option", { value: "", children: "Select Blocking Task" }), tasks.map((task) => (_jsx("option", { value: task._id, children: task.title }, task._id)))] }), tasks.length === 0 && (_jsx("p", { className: "\r\ntext-gray-500\r\ntext-sm\r\nmt-3\r\n", children: "No available tasks for dependency." })), _jsxs("div", { className: "\r\ngrid\r\ngrid-cols-1\r\nsm:grid-cols-2\r\ngap-4\r\nmt-8\r\n", children: [_jsx("button", { onClick: submit, className: "\r\npy-4\r\nrounded-xl\r\nfont-bold\r\nbg-gradient-to-r\r\nfrom-blue-600\r\nto-purple-600\r\nhover:scale-105\r\nduration-300\r\nshadow-lg\r\nshadow-blue-600/30\r\n", children: "Add Dependency \uD83D\uDD17" }), _jsx("button", { onClick: onClose, className: "\r\npy-4\r\nrounded-xl\r\nfont-bold\r\nbg-gray-800\r\nhover:bg-gray-700\r\nduration-300\r\n", children: "Cancel" })] })] }) }));
}
