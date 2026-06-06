import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import toast from "react-hot-toast";
export default function CreateTaskModal({ onClose, onCreate, members, tasks, }) {
    const [form, setForm] = useState({
        title: "",
        description: "",
        assignee: "",
        dependency: "",
    });
    console.log("MODAL TASKS:", tasks);
    const [creating, setCreating] = useState(false);
    const submit = async () => {
        if (creating)
            return;
        if (!form.title) {
            toast.error("Task title is required 📝");
            return;
        }
        if (!form.assignee) {
            toast.error("Please assign a team member 👤");
            return;
        }
        setCreating(true);
        await onCreate({
            title: form.title,
            description: form.description,
            assignee: form.assignee,
            dependencies: form.dependency ? [form.dependency] : [],
        });
    };
    return (_jsx("div", { className: "\r\nfixed\r\ninset-0\r\nbg-black/70\r\nbackdrop-blur-md\r\nflex\r\nitems-center\r\njustify-center\r\nz-50\r\npx-5\r\n", children: _jsxs("div", { className: "\r\nw-full\r\nmax-w-xl\r\nbg-gray-900\r\nborder\r\nborder-gray-800\r\nrounded-3xl\r\np-6\r\nsm:p-8\r\nshadow-2xl\r\nmax-h-[90vh]\r\noverflow-y-auto\r\n", children: [_jsxs("div", { className: "\r\nflex\r\njustify-between\r\nitems-start\r\nmb-8\r\n", children: [_jsxs("div", { children: [_jsx("h1", { className: "\r\ntext-2xl\r\nsm:text-3xl\r\nfont-black\r\nbg-gradient-to-r\r\nfrom-blue-400\r\nto-purple-500\r\nbg-clip-text\r\ntext-transparent\r\n", children: "Create Task" }), _jsx("p", { className: "\r\ntext-gray-400\r\ntext-sm\r\nmt-2\r\n", children: "Assign work and manage sprint progress \u26A1" })] }), _jsx("button", { onClick: onClose, className: "\r\nw-10\r\nh-10\r\nrounded-xl\r\nbg-gray-800\r\nhover:bg-red-600\r\nduration-300\r\n", children: "\u2715" })] }), _jsxs("div", { className: "\r\nspace-y-5\r\n", children: [_jsxs("div", { children: [_jsx("label", { className: "text-gray-400 text-sm", children: "Task Title" }), _jsx("input", { placeholder: "Example: Create Login API", value: form.title, onChange: (e) => setForm({
                                        ...form,
                                        title: e.target.value,
                                    }), className: "\r\nmt-2\r\nw-full\r\nbg-gray-800\r\nborder\r\nborder-gray-700\r\nrounded-xl\r\np-4\r\noutline-none\r\nfocus:border-blue-500\r\nfocus:scale-[1.02]\r\nduration-300\r\ntext-white\r\n" })] }), _jsxs("div", { children: [_jsx("label", { className: "text-gray-400 text-sm", children: "Description" }), _jsx("textarea", { placeholder: "Explain task requirements...", value: form.description, onChange: (e) => setForm({
                                        ...form,
                                        description: e.target.value,
                                    }), className: "\r\nmt-2\r\nw-full\r\nh-28\r\nresize-none\r\nbg-gray-800\r\nborder\r\nborder-gray-700\r\nrounded-xl\r\np-4\r\noutline-none\r\nfocus:border-blue-500\r\nfocus:scale-[1.02]\r\nduration-300\r\ntext-white\r\n" })] }), _jsxs("div", { children: [_jsx("label", { className: "text-gray-400 text-sm", children: "Assign Member" }), _jsxs("select", { value: form.assignee, onChange: (e) => setForm({
                                        ...form,
                                        assignee: e.target.value,
                                    }), className: "\r\nmt-2\r\nw-full\r\nbg-gray-800\r\nborder\r\nborder-gray-700\r\nrounded-xl\r\np-4\r\noutline-none\r\nfocus:border-blue-500\r\nduration-300\r\ntext-white\r\n", children: [_jsx("option", { value: "", children: "Select Team Member" }), members?.map((u) => (_jsx("option", { value: u._id, children: u.name }, u._id)))] })] }), _jsxs("div", { children: [_jsx("label", { className: "text-gray-400 text-sm", children: "Task Dependency" }), _jsxs("select", { value: form.dependency, onChange: (e) => setForm({
                                        ...form,
                                        dependency: e.target.value,
                                    }), className: "\r\nmt-2\r\nw-full\r\nbg-gray-800\r\nborder\r\nborder-gray-700\r\nrounded-xl\r\np-4\r\noutline-none\r\nfocus:border-purple-500\r\nduration-300\r\ntext-white\r\n", children: [_jsx("option", { value: "", children: "No Dependency" }), tasks?.map((task) => (_jsx("option", { value: task._id, children: task.title }, task._id)))] })] })] }), _jsx("div", { className: "\r\nmt-6\r\nbg-purple-500/10\r\nborder\r\nborder-purple-500/30\r\nrounded-2xl\r\np-4\r\ntext-purple-300\r\ntext-sm\r\n", children: "\uD83D\uDD17 Dependencies block this task until the selected task is completed." }), _jsxs("div", { className: "\r\ngrid\r\ngrid-cols-1\r\nsm:grid-cols-2\r\ngap-4\r\nmt-8\r\n", children: [_jsx("button", { disabled: creating, onClick: submit, className: "\r\npy-4\r\nrounded-xl\r\nfont-bold\r\nbg-gradient-to-r\r\nfrom-blue-600\r\nto-purple-600\r\nhover:scale-105\r\nduration-300\r\nshadow-lg\r\nshadow-blue-600/30\r\n", children: "Create Task \uD83D\uDE80" }), _jsx("button", { onClick: onClose, className: "\r\npy-4\r\nrounded-xl\r\nfont-bold\r\nbg-gray-800\r\nhover:bg-gray-700\r\nduration-300\r\n", children: "Cancel" })] })] }) }));
}
