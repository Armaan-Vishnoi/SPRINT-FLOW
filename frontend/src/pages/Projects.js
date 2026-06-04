import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { createProject, getProjects, updateProject, deleteProject, } from "../api/projectApi";
import ProjectCard from "../components/projects/ProjectCard";
import CreateProjectModal from "../components/projects/CreateProjectModal";
import EditProjectModal from "../components/projects/EditProjectModal";
import toast from "react-hot-toast";
import LoadingScreen from "../components/LoadingScreen";
export default function Projects() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [createOpen, setCreateOpen] = useState(false);
    const [editProject, setEditProject] = useState(null);
    const loadProjects = async () => {
        try {
            setLoading(true);
            const data = await getProjects();
            setProjects(data.projects);
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        loadProjects();
    }, []);
    const addProject = async (data) => {
        await createProject(data);
        toast.success("Project created successfully 🚀");
        setCreateOpen(false);
        loadProjects();
    };
    const edit = async (id, data) => {
        await updateProject(id, data);
        toast.success("Project updated successfully ✨");
        setEditProject(null);
        loadProjects();
    };
    const remove = async (id) => {
        if (confirm("Are you sure you want to delete this project?")) {
            await deleteProject(id);
            toast.success("Project removed 🗑");
            loadProjects();
        }
    };
    if (loading)
        return _jsx(LoadingScreen, { text: "Loading projects..." });
    return (_jsxs("div", { className: "\r\nspace-y-8\r\n", children: [_jsxs("div", { className: "\r\nflex\r\nflex-col\r\nsm:flex-row\r\njustify-between\r\nitems-start\r\nsm:items-center\r\ngap-5\r\n", children: [_jsxs("div", { children: [_jsx("h1", { className: "\r\ntext-3xl\r\nsm:text-4xl\r\nfont-black\r\nbg-gradient-to-r\r\nfrom-white\r\nto-gray-400\r\nbg-clip-text\r\ntext-transparent\r\n", children: "Projects" }), _jsx("p", { className: "\r\ntext-gray-400\r\nmt-2\r\n", children: "Manage workspaces, teams and development workflow" }), _jsxs("div", { className: "\r\nmt-4\r\ninline-flex\r\nitems-center\r\ngap-2\r\npx-4\r\npy-2\r\nrounded-xl\r\nbg-blue-500/10\r\nborder\r\nborder-blue-500/30\r\ntext-blue-400\r\ntext-sm\r\n", children: ["\uD83D\uDE80 ", projects.length, " Active Projects"] })] }), _jsx("button", { onClick: () => setCreateOpen(true), className: "\r\nw-full\r\nsm:w-auto\r\npx-6\r\npy-4\r\nrounded-2xl\r\nfont-bold\r\nbg-gradient-to-r\r\nfrom-blue-600\r\nto-purple-600\r\nhover:scale-105\r\nduration-300\r\nshadow-lg\r\nshadow-blue-600/30\r\n", children: "+ Create Project" })] }), loading && (_jsx("div", { className: "\r\ngrid\r\ngrid-cols-1\r\nmd:grid-cols-2\r\nxl:grid-cols-3\r\ngap-6\r\nanimate-pulse\r\n", children: [1, 2, 3, 4, 5, 6].map((i) => (_jsx("div", { className: "\r\nh-52\r\nrounded-3xl\r\nbg-gray-800\r\n" }, i))) })), !loading && projects.length === 0 && (_jsxs("div", { className: "\r\nbg-gray-900/70\r\nborder\r\nborder-gray-800\r\nrounded-3xl\r\np-12\r\ntext-center\r\n", children: [_jsx("h2", { className: "\r\ntext-3xl\r\nfont-bold\r\n", children: "No Projects Yet \uD83D\uDE80" }), _jsx("p", { className: "\r\ntext-gray-400\r\nmt-3\r\n", children: "Create your first SprintFlow project and start managing your workflow." }), _jsx("button", { onClick: () => setCreateOpen(true), className: "\r\nmt-8\r\npx-8\r\npy-3\r\nrounded-xl\r\nbg-blue-600\r\nhover:bg-blue-700\r\nduration-300\r\n", children: "Create First Project" })] })), !loading && projects.length > 0 && (_jsx("div", { className: "\r\ngrid\r\ngrid-cols-1\r\nmd:grid-cols-2\r\nxl:grid-cols-3\r\ngap-6\r\n", children: projects.map((p) => (_jsx("div", { className: "\r\nhover:-translate-y-2\r\nduration-300\r\n", children: _jsx(ProjectCard, { project: p, onEdit: setEditProject, onDelete: remove }) }, p._id))) })), createOpen && (_jsx(CreateProjectModal, { onClose: () => setCreateOpen(false), onCreate: addProject })), editProject && (_jsx(EditProjectModal, { project: editProject, onClose: () => setEditProject(null), onUpdate: edit }))] }));
}
