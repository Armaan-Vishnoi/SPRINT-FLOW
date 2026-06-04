import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProjectSprints, createSprint, updateSprint, deleteSprint, } from "../api/sprintApi";
import { getProjectById, addProjectMember } from "../api/projectApi";
import SprintCard from "../components/sprints/SprintCard";
import CreateSprintModal from "../components/sprints/CreateSprintModal";
import EditSprintModal from "../components/sprints/EditSprintModal";
import AddMemberModal from "../components/projects/AddMemberModal";
import toast from "react-hot-toast";
import LoadingScreen from "../components/LoadingScreen";
export default function ProjectDetails() {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [sprints, setSprints] = useState([]);
    const [createOpen, setCreateOpen] = useState(false);
    const [editSprint, setEditSprint] = useState(null);
    const [memberOpen, setMemberOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const load = async () => {
        try {
            setLoading(true);
            const p = await getProjectById(id);
            setProject(p.project);
            const s = await getProjectSprints(id);
            setSprints(s.sprints || s.data || s);
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        load();
    }, []);
    const addMember = async (userId) => {
        await addProjectMember(id, userId);
        toast.success("Member added successfully 👥");
        setMemberOpen(false);
        load();
    };
    const addSprint = async (data) => {
        await createSprint({
            ...data,
            projectId: id,
        });
        toast.success("Sprint created 🚀");
        setCreateOpen(false);
        load();
    };
    const edit = async (sid, data) => {
        await updateSprint(sid, data);
        toast.success("Sprint updated ✨");
        setEditSprint(null);
        load();
    };
    const remove = async (id) => {
        if (confirm("Delete this sprint?")) {
            await deleteSprint(id);
            toast.success("Sprint deleted 🗑");
            load();
        }
    };
    if (loading) {
        return (_jsxs("div", { className: "\r\nspace-y-6\r\nanimate-pulse\r\n", children: [_jsx("div", { className: "h-20 bg-gray-800 rounded-3xl" }), _jsxs("div", { className: "\r\ngrid\r\ngrid-cols-1\r\nmd:grid-cols-3\r\ngap-6\r\n", children: [_jsx("div", { className: "h-48 bg-gray-800 rounded-3xl" }), _jsx("div", { className: "h-48 bg-gray-800 rounded-3xl" }), _jsx("div", { className: "h-48 bg-gray-800 rounded-3xl" })] })] }));
    }
    if (loading)
        return _jsx(LoadingScreen, { text: "Opening project workspace..." });
    return (_jsxs("div", { className: "\r\nspace-y-8\r\n", children: [_jsx("div", { className: "\r\nbg-gradient-to-br\r\nfrom-gray-900\r\nto-gray-950\r\nborder\r\nborder-gray-800\r\nrounded-3xl\r\np-6\r\nshadow-xl\r\n", children: _jsxs("div", { className: "\r\nflex\r\nflex-col\r\nlg:flex-row\r\njustify-between\r\ngap-6\r\n", children: [_jsxs("div", { children: [_jsx("h1", { className: "\r\ntext-3xl\r\nsm:text-4xl\r\nfont-black\r\nbg-gradient-to-r\r\nfrom-white\r\nto-gray-400\r\nbg-clip-text\r\ntext-transparent\r\n", children: project?.name || "Project Workspace" }), _jsx("p", { className: "\r\ntext-gray-400\r\nmt-3\r\n", children: "Manage team members, agile sprints and workflow" }), _jsxs("div", { className: "\r\nmt-5\r\nflex\r\ngap-4\r\nflex-wrap\r\n", children: [_jsxs("div", { className: "\r\npx-5\r\npy-2\r\nrounded-xl\r\nbg-blue-500/10\r\nborder\r\nborder-blue-500/30\r\ntext-blue-400\r\n", children: ["\uD83D\uDE80 ", sprints.length, " Sprints"] }), _jsxs("div", { className: "\r\npx-5\r\npy-2\r\nrounded-xl\r\nbg-green-500/10\r\nborder\r\nborder-green-500/30\r\ntext-green-400\r\n", children: ["\uD83D\uDC65 ", project?.members?.length || 0, " Members"] })] })] }), _jsxs("div", { className: "\r\nflex\r\nflex-col\r\nsm:flex-row\r\ngap-3\r\n", children: [_jsx("button", { onClick: () => setMemberOpen(true), className: "\r\n              h-15\r\npx-2\r\npy-2\r\nrounded-xl\r\nfont-bold\r\nbg-gradient-to-r\r\nfrom-purple-600\r\nto-pink-600\r\nhover:scale-105\r\nduration-300\r\n", children: "+ Member" }), _jsx("button", { onClick: () => setCreateOpen(true), className: "\r\n              h-15\r\npx-4\r\npy-4\r\nrounded-xl\r\nfont-bold\r\nbg-gradient-to-r\r\nfrom-blue-600\r\nto-purple-600\r\nhover:scale-105\r\nduration-300\r\n", children: "+ Sprint" })] })] }) }), _jsx("div", { className: "\r\nflex\r\ngap-3\r\nflex-wrap\r\n", children: project?.members?.map((m) => (_jsxs("div", { className: "\r\nflex\r\nitems-center\r\ngap-3\r\nbg-gray-900\r\nborder\r\nborder-gray-800\r\npx-4\r\npy-3\r\nrounded-2xl\r\n", children: [_jsx("div", { className: "\r\nw-9\r\nh-9\r\nrounded-full\r\nbg-gradient-to-r\r\nfrom-blue-600\r\nto-purple-600\r\nflex\r\nitems-center\r\njustify-center\r\nfont-bold\r\n", children: m.name.charAt(0) }), _jsx("span", { children: m.name })] }, m._id))) }), sprints.length === 0 ? (_jsxs("div", { className: "\r\ntext-center\r\nbg-gray-900\r\nrounded-3xl\r\np-12\r\nborder\r\nborder-gray-800\r\n", children: [_jsx("h2", { className: "text-2xl font-bold", children: "No Sprints Yet \uD83D\uDE80" }), _jsx("p", { className: "text-gray-400 mt-3", children: "Create your first sprint and start planning tasks." })] })) : (_jsx("div", { className: "\r\ngrid\r\ngrid-cols-1\r\nmd:grid-cols-2\r\nxl:grid-cols-3\r\ngap-6\r\n", children: sprints.map((s) => (_jsx("div", { className: "\r\nhover:-translate-y-2\r\nduration-300\r\n", children: _jsx(SprintCard, { sprint: s, projectId: id, onEdit: setEditSprint, onDelete: remove }) }, s._id))) })), createOpen && (_jsx(CreateSprintModal, { onCreate: addSprint, onClose: () => setCreateOpen(false) })), editSprint && (_jsx(EditSprintModal, { sprint: editSprint, onUpdate: edit, onClose: () => setEditSprint(null) })), memberOpen && (_jsx(AddMemberModal, { onAdd: addMember, onClose: () => setMemberOpen(false) }))] }));
}
