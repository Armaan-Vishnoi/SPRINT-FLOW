import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import toast from "react-hot-toast";
export default function WorkLogModal({ onClose, onSave, }) {
    const [duration, setDuration] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const submit = () => {
        const today = new Date()
            .toISOString()
            .split("T")[0];
        if (date > today) {
            toast.error("Future dates are not allowed 📅");
            return;
        }
        if (Number(duration) <= 0) {
            toast.error("Duration must be greater than 0 ⏱");
            return;
        }
        onSave({
            date,
            duration: Number(duration),
            description,
        });
    };
    return (_jsx("div", { className: "\r\nfixed\r\ninset-0\r\nbg-black/70\r\nbackdrop-blur-md\r\nflex\r\nitems-center\r\njustify-center\r\nz-50\r\npx-5\r\n", children: _jsxs("div", { className: "\r\nw-full\r\nmax-w-lg\r\nbg-gray-900\r\nborder\r\nborder-gray-800\r\nrounded-3xl\r\np-6\r\nsm:p-8\r\nshadow-2xl\r\n", children: [_jsxs("div", { className: "\r\nflex\r\njustify-between\r\nitems-start\r\nmb-8\r\n", children: [_jsxs("div", { children: [_jsx("h1", { className: "\r\ntext-2xl\r\nsm:text-3xl\r\nfont-black\r\nbg-gradient-to-r\r\nfrom-green-400\r\nto-blue-500\r\nbg-clip-text\r\ntext-transparent\r\n", children: "Log Work" }), _jsx("p", { className: "\r\ntext-gray-400\r\ntext-sm\r\nmt-2\r\n", children: "Track your development progress \u23F1" })] }), _jsx("button", { onClick: onClose, className: "\r\nw-10\r\nh-10\r\nrounded-xl\r\nbg-gray-800\r\nhover:bg-red-600\r\nduration-300\r\n", children: "\u2715" })] }), _jsxs("div", { className: "\r\nspace-y-5\r\n", children: [_jsxs("div", { children: [_jsx("label", { className: "text-sm text-gray-400", children: "Work Date" }), _jsx("input", { type: "date", value: date, onChange: (e) => setDate(e.target.value), className: "\r\nmt-2\r\nw-full\r\nbg-gray-800\r\nborder\r\nborder-gray-700\r\nrounded-xl\r\np-4\r\noutline-none\r\nfocus:border-green-500\r\nduration-300\r\ntext-white\r\n" })] }), _jsxs("div", { children: [_jsx("label", { className: "text-sm text-gray-400", children: "Hours Worked" }), _jsx("input", { type: "number", placeholder: "Example: 3", value: duration, onChange: (e) => setDuration(e.target.value), className: "\r\nmt-2\r\nw-full\r\nbg-gray-800\r\nborder\r\nborder-gray-700\r\nrounded-xl\r\np-4\r\noutline-none\r\nfocus:border-green-500\r\nduration-300\r\ntext-white\r\n" })] }), _jsxs("div", { children: [_jsx("label", { className: "text-sm text-gray-400", children: "Description" }), _jsx("textarea", { placeholder: "What did you complete?", value: description, onChange: (e) => setDescription(e.target.value), className: "\r\nmt-2\r\nw-full\r\nh-32\r\nresize-none\r\nbg-gray-800\r\nborder\r\nborder-gray-700\r\nrounded-xl\r\np-4\r\noutline-none\r\nfocus:border-green-500\r\nduration-300\r\ntext-white\r\n" })] })] }), _jsx("div", { className: "\r\nmt-6\r\nbg-green-500/10\r\nborder\r\nborder-green-500/30\r\nrounded-2xl\r\np-4\r\ntext-green-300\r\ntext-sm\r\n", children: "\u23F1 Logged hours automatically update task and sprint progress." }), _jsxs("div", { className: "\r\ngrid\r\ngrid-cols-1\r\nsm:grid-cols-2\r\ngap-4\r\nmt-8\r\n", children: [_jsx("button", { onClick: submit, className: "\r\npy-4\r\nrounded-xl\r\nfont-bold\r\nbg-gradient-to-r\r\nfrom-green-600\r\nto-blue-600\r\nhover:scale-105\r\nduration-300\r\nshadow-lg\r\nshadow-green-600/30\r\n", children: "Save Log \uD83D\uDE80" }), _jsx("button", { onClick: onClose, className: "\r\npy-4\r\nrounded-xl\r\nfont-bold\r\nbg-gray-800\r\nhover:bg-gray-700\r\nduration-300\r\n", children: "Cancel" })] })] }) }));
}
