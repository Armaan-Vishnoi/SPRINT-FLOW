import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { getUsers } from "../../api/userApi";
import toast from "react-hot-toast";
export default function AddMemberModal({ onClose, onAdd, }) {
    const [users, setUsers] = useState([]);
    const [selected, setSelected] = useState("");
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        getUsers()
            .then((res) => {
            setUsers(res.users);
        })
            .finally(() => {
            setLoading(false);
        });
    }, []);
    const addMember = () => {
        if (!selected) {
            toast.error("Please select a team member 👤");
            return;
        }
        onAdd(selected);
    };
    return (_jsx("div", { className: "\r\nfixed\r\ninset-0\r\nbg-black/70\r\nbackdrop-blur-md\r\nflex\r\nitems-center\r\njustify-center\r\nz-50\r\npx-5\r\n", children: _jsxs("div", { className: "\r\nw-full\r\nmax-w-lg\r\nbg-gray-900\r\nborder\r\nborder-gray-800\r\nrounded-3xl\r\np-6\r\nsm:p-8\r\nshadow-2xl\r\n", children: [_jsxs("div", { className: "\r\nflex\r\njustify-between\r\nitems-start\r\nmb-8\r\n", children: [_jsxs("div", { children: [_jsx("h2", { className: "\r\ntext-2xl\r\nsm:text-3xl\r\nfont-black\r\nbg-gradient-to-r\r\nfrom-blue-400\r\nto-purple-500\r\nbg-clip-text\r\ntext-transparent\r\n", children: "Add Member" }), _jsx("p", { className: "\r\ntext-gray-400\r\ntext-sm\r\nmt-2\r\n", children: "Invite people into your project workspace" })] }), _jsx("button", { onClick: onClose, className: "\r\nw-10\r\nh-10\r\nrounded-xl\r\nbg-gray-800\r\nhover:bg-red-600\r\nduration-300\r\n", children: "\u2715" })] }), _jsx("label", { className: "\r\ntext-gray-400\r\ntext-sm\r\n", children: "Team Member" }), loading ? (_jsx("div", { className: "\r\nmt-3\r\nh-14\r\nbg-gray-800\r\nrounded-xl\r\nanimate-pulse\r\n" })) : (_jsxs("select", { value: selected, onChange: (e) => setSelected(e.target.value), className: "\r\nmt-3\r\nw-full\r\nbg-gray-800\r\nborder\r\nborder-gray-700\r\nrounded-xl\r\np-4\r\noutline-none\r\nfocus:border-blue-500\r\nduration-300\r\ntext-white\r\n", children: [_jsx("option", { value: "", children: "Select team member" }), users.map((user) => (_jsxs("option", { value: user._id, children: [user.name, " (", user.email, ")"] }, user._id)))] })), _jsx("div", { className: "\r\nmt-6\r\nbg-blue-500/10\r\nborder\r\nborder-blue-500/30\r\nrounded-2xl\r\np-4\r\ntext-blue-300\r\ntext-sm\r\n", children: "\uD83D\uDC65 Added members can collaborate on tasks, sprints and project workflow." }), _jsxs("div", { className: "\r\ngrid\r\ngrid-cols-1\r\nsm:grid-cols-2\r\ngap-4\r\nmt-8\r\n", children: [_jsx("button", { onClick: addMember, className: "\r\npy-4\r\nrounded-xl\r\nfont-bold\r\nbg-gradient-to-r\r\nfrom-blue-600\r\nto-purple-600\r\nhover:scale-105\r\nduration-300\r\nshadow-lg\r\nshadow-blue-600/30\r\n", children: "Add Member \uD83D\uDE80" }), _jsx("button", { onClick: onClose, className: "\r\npy-4\r\nrounded-xl\r\nfont-bold\r\nbg-gray-800\r\nhover:bg-gray-700\r\nduration-300\r\n", children: "Cancel" })] })] }) }));
}
