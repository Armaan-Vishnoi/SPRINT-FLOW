import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getSprintTasks, createTask, updateTaskStatus, deleteTask, } from "../api/taskApi";
import { getProjectById } from "../api/projectApi";
import TaskCard from "../components/tasks/TaskCard";
import CreateTaskModal from "../components/tasks/CreateTaskModal";
import { socket } from "../socket/socket";
import toast from "react-hot-toast";
import LoadingScreen from "../components/LoadingScreen";
export default function SprintDetails() {
    const { projectId, sprintId } = useParams();
    const { user } = useAuth();
    const [tasks, setTasks] = useState([]);
    const [project, setProject] = useState(null);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const load = async () => {
        try {
            setLoading(true);
            const res = await getSprintTasks(sprintId);
            const list = res.tasks || res.data || res.task || [];
            const unique = Array.from(new Map(list.map((task) => [task._id, task])).values());
            setTasks(unique);
        }
        finally {
            setLoading(false);
        }
    };
    const loadProject = async () => {
        const res = await getProjectById(projectId);
        setProject(res.project);
    };
    useEffect(() => {
        load();
        loadProject();
    }, [sprintId]);
    useEffect(() => {
        if (!projectId || !user)
            return;
        const userId = user._id || user.id;
        socket.emit("join-project", {
            projectId,
            userId,
        });
        const reload = async () => {
            console.log("SOCKET TASK RELOAD");
            const res = await getSprintTasks(sprintId);
            const list = res.tasks || [];
            // HARD REPLACE STATE
            setTasks([...list]);
        };
        socket.off("task-created");
        socket.off("task-updated");
        socket.on("task-created", reload);
        socket.on("task-updated", reload);
        return () => {
            socket.off("task-created", reload);
            socket.off("task-updated", reload);
        };
    }, [projectId, sprintId, user]);
    const add = async (data) => {
        try {
            await createTask({
                ...data,
                projectId,
                sprintId,
                status: "TODO",
            });
            setOpen(false);
            toast.success("Task created 🚀");
        }
        catch (e) {
            toast.error("Create failed");
        }
    };
    const changeStatus = async (id, status) => {
        const oldTasks = tasks;
        setTasks((prev) => prev.map((t) => t._id === id
            ? {
                ...t,
                status,
            }
            : t));
        try {
            await updateTaskStatus(id, status);
            toast.success("Task status updated ⚡");
        }
        catch (error) {
            setTasks(oldTasks);
            toast.error("Status update failed");
        }
    };
    const remove = async (id) => {
        await deleteTask(id);
        toast.success("Task deleted 🗑");
        load();
    };
    const columns = [
        {
            name: "TODO",
            title: "To Do",
            icon: "📝",
            color: "border-yellow-500/40",
        },
        {
            name: "IN_PROGRESS",
            title: "In Progress",
            icon: "⚡",
            color: "border-blue-500/40",
        },
        {
            name: "DONE",
            title: "Completed",
            icon: "✅",
            color: "border-green-500/40",
        },
    ];
    if (loading)
        return _jsx(LoadingScreen, { text: "Loading sprint board..." });
    return (_jsxs("div", { className: "\r\nspace-y-8\r\n", children: [_jsxs("div", { className: "\r\nflex\r\nflex-col\r\nsm:flex-row\r\njustify-between\r\nitems-start\r\nsm:items-center\r\ngap-5\r\n", children: [_jsxs("div", { children: [_jsx("h1", { className: "\r\ntext-3xl\r\nsm:text-4xl\r\nfont-black\r\nbg-gradient-to-r\r\nfrom-white\r\nto-gray-400\r\nbg-clip-text\r\ntext-transparent\r\n", children: "Task Board" }), _jsx("p", { className: "\r\ntext-gray-400\r\nmt-2\r\n", children: "Manage sprint workflow and realtime collaboration" }), _jsx("div", { className: "\r\ninline-flex\r\nmt-4\r\npx-4\r\npy-2\r\nrounded-xl\r\nbg-green-500/10\r\nborder\r\nborder-green-500/30\r\ntext-green-400\r\ntext-sm\r\n", children: "\u25CF Live Collaboration" })] }), _jsx("button", { onClick: () => setOpen(true), className: "\r\nw-full\r\nsm:w-auto\r\npx-7\r\npy-4\r\nrounded-2xl\r\nfont-bold\r\nbg-gradient-to-r\r\nfrom-blue-600\r\nto-purple-600\r\nhover:scale-105\r\nduration-300\r\nshadow-lg\r\nshadow-blue-600/30\r\n", children: "+ Create Task" })] }), _jsx("div", { className: "\r\ngrid\r\ngrid-cols-1\r\nlg:grid-cols-3\r\ngap-6\r\n", children: columns.map((column) => {
                    const uniqueTasks = [
                        ...new Map(tasks.map((t) => [t._id, t])).values(),
                    ];
                    const filtered = uniqueTasks.filter((t) => t.status === column.name);
                    return (_jsxs("div", { className: `
bg-gray-900/70
border
${column.color}
rounded-3xl
p-5
min-h-[500px]
shadow-xl
`, children: [_jsxs("div", { className: "\r\nflex\r\njustify-between\r\nitems-center\r\nmb-6\r\n", children: [_jsxs("h2", { className: "\r\ntext-xl\r\nfont-black\r\n", children: [column.icon, " ", column.title] }), _jsx("span", { className: "\r\nbg-gray-800\r\npx-3\r\npy-1\r\nrounded-full\r\ntext-sm\r\n", children: filtered.length })] }), _jsxs("div", { className: "\r\nspace-y-5\r\n", children: [filtered.length === 0 && (_jsx("div", { className: "\r\ntext-center\r\ntext-gray-500\r\nmt-20\r\n", children: "No tasks here" })), filtered.map((t) => (_jsx("div", { className: "\r\nhover:-translate-y-2\r\nduration-300\r\n", children: _jsx(TaskCard, { task: t, onDelete: remove, onStatus: changeStatus }) }, t._id)))] })] }, column.name));
                }) }), open && (_jsx(CreateTaskModal, { members: project?.members || [], tasks: tasks, onCreate: add, onClose: () => setOpen(false) }))] }));
}
