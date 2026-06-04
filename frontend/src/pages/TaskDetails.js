import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { createSubTask, getTaskById, updateTaskStatus, } from "../api/taskApi";
import { createWorkLog, getTaskLogs, updateWorkLog, deleteWorkLog, } from "../api/workLogApi";
import CreateSubTaskModal from "../components/subtasks/CreateSubTaskModal";
import DependencyModal from "../components/tasks/DependencyModal";
import Attachments from "../components/attachments/Attachments";
import LoadingScreen from "../components/LoadingScreen";
export default function TaskDetails() {
    const { taskId } = useParams();
    const { user } = useAuth();
    const [task, setTask] = useState(null);
    const [logs, setLogs] = useState([]);
    const [totalHours, setTotalHours] = useState(0);
    const [open, setOpen] = useState(false);
    const [dependencyOpen, setDependencyOpen] = useState(false);
    const [showWorkForm, setShowWorkForm] = useState(false);
    const [editing, setEditing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({
        date: "",
        duration: "",
        description: "",
    });
    const load = async () => {
        try {
            setLoading(true);
            const res = await getTaskById(taskId);
            setTask(res.task);
            const logRes = await getTaskLogs(taskId);
            setLogs(logRes.logs);
            setTotalHours(logRes.totalHours || 0);
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        load();
    }, []);
    // CREATE SUBTASK
    const addSubTask = async (data) => {
        await createSubTask(taskId, {
            ...data,
            assignee: user?._id || user?.id,
        });
        toast.success("Subtask created 🚀");
        setOpen(false);
        load();
    };
    // CHANGE STATUS
    const changeSubTaskStatus = async (id, status) => {
        await updateTaskStatus(id, status);
        toast.success("Status updated ⚡");
        load();
    };
    // CREATE WORKLOG
    const saveWorkLog = async () => {
        if (new Date(form.date) > new Date()) {
            toast.error("Future date not allowed");
            return;
        }
        if (Number(form.duration) <= 0) {
            toast.error("Invalid duration");
            return;
        }
        await createWorkLog({
            taskId,
            sprintId: task.sprintId,
            date: form.date,
            duration: Number(form.duration),
            description: form.description,
        });
        toast.success("Work log created ⏱");
        setShowWorkForm(false);
        setForm({
            date: "",
            duration: "",
            description: "",
        });
        load();
    };
    // UPDATE LOG
    const saveEdit = async () => {
        await updateWorkLog(editing._id, {
            duration: Number(form.duration),
            description: form.description,
        });
        toast.success("Work log updated ✨");
        setEditing(null);
        setForm({
            date: "",
            duration: "",
            description: "",
        });
        load();
    };
    // DELETE LOG
    const removeLog = async (id) => {
        if (!confirm("Delete this work log?"))
            return;
        await deleteWorkLog(id);
        toast.success("Deleted 🗑");
        load();
    };
    if (loading)
        return _jsx(LoadingScreen, { text: "Loading task details..." });
    return (_jsxs("div", { className: "\r\nspace-y-8\r\n", children: [_jsx("div", { className: "\r\nbg-gradient-to-br\r\nfrom-gray-900\r\nto-gray-950\r\nborder\r\nborder-gray-800\r\nrounded-3xl\r\np-6\r\nshadow-xl\r\n", children: _jsxs("div", { className: "\r\nflex\r\nflex-col\r\nsm:flex-row\r\njustify-between\r\ngap-5\r\n", children: [_jsxs("div", { children: [_jsx("h1", { className: "\r\ntext-3xl\r\nsm:text-4xl\r\nfont-black\r\n", children: task?.title }), _jsx("p", { className: "\r\ntext-gray-400\r\nmt-3\r\n", children: task?.description || "No description added" }), _jsxs("div", { className: "\r\nflex\r\ngap-3\r\nflex-wrap\r\nmt-5\r\n", children: [_jsxs("span", { className: "\r\npx-4\r\npy-2\r\nrounded-xl\r\nbg-blue-500/10\r\nborder\r\nborder-blue-500/30\r\ntext-blue-400\r\n", children: ["\u26A1 ", task?.status] }), _jsxs("span", { className: "\r\npx-4\r\npy-2\r\nrounded-xl\r\nbg-green-500/10\r\nborder\r\nborder-green-500/30\r\ntext-green-400\r\n", children: ["\u23F1 ", totalHours, " Hours"] })] })] }), _jsx("button", { onClick: () => setOpen(true), className: "\r\nh-fit\r\npx-6\r\npy-3\r\nrounded-xl\r\nfont-bold\r\nbg-gradient-to-r\r\nfrom-blue-600\r\nto-purple-600\r\nhover:scale-105\r\nduration-300\r\n", children: "+ Subtask" })] }) }), _jsxs("div", { className: "\r\nbg-gray-900/70\r\nborder\r\nborder-gray-800\r\nrounded-3xl\r\np-6\r\n", children: [_jsx("h2", { className: "\r\ntext-2xl\r\nfont-bold\r\nmb-5\r\n", children: "Subtasks" }), _jsxs("div", { className: "\r\nspace-y-4\r\n", children: [task?.subtasks?.length === 0 && (_jsx("p", { className: "text-gray-500", children: "No subtasks created" })), task?.subtasks?.map((sub) => (_jsxs("div", { className: "\r\nbg-gray-800\r\nrounded-2xl\r\np-5\r\nborder\r\nborder-gray-700\r\n", children: [_jsx("h3", { className: "\r\nfont-bold\r\nmb-3\r\n", children: sub.title }), _jsxs("select", { value: sub.status, onChange: (e) => changeSubTaskStatus(sub._id, e.target.value), className: "\r\nw-full\r\nbg-gray-900\r\nborder\r\nborder-gray-700\r\nrounded-xl\r\np-3\r\noutline-none\r\n", children: [_jsx("option", { value: "TODO", children: "TODO" }), _jsx("option", { value: "IN_PROGRESS", children: "IN PROGRESS" }), _jsx("option", { value: "DONE", children: "DONE" })] })] }, sub._id)))] })] }), _jsxs("div", { className: "\r\nbg-gray-900/70\r\nborder\r\nborder-gray-800\r\nrounded-3xl\r\np-6\r\n", children: [_jsxs("div", { className: "\r\nflex\r\njustify-between\r\nitems-center\r\ngap-5\r\nflex-wrap\r\n", children: [_jsxs("div", { children: [_jsx("h2", { className: "\r\ntext-2xl\r\nfont-bold\r\n", children: "Work Logs" }), _jsxs("p", { className: "\r\ntext-gray-400\r\nmt-1\r\n", children: ["Total tracked: ", totalHours, " hours"] })] }), _jsx("button", { onClick: () => setShowWorkForm(true), className: "\r\npx-6\r\npy-3\r\nrounded-xl\r\nfont-bold\r\nbg-gradient-to-r\r\nfrom-green-600\r\nto-emerald-600\r\nhover:scale-105\r\nduration-300\r\n", children: "+ Work Log" })] }), showWorkForm && (_jsxs("div", { className: "\r\ngrid\r\ngrid-cols-1\r\nmd:grid-cols-3\r\ngap-4\r\nmt-6\r\n", children: [_jsx("input", { type: "date", value: form.date, onChange: (e) => setForm({
                                    ...form,
                                    date: e.target.value,
                                }), className: "\r\nbg-gray-800\r\nrounded-xl\r\np-3\r\n" }), _jsx("input", { type: "number", placeholder: "Hours", value: form.duration, onChange: (e) => setForm({
                                    ...form,
                                    duration: e.target.value,
                                }), className: "\r\nbg-gray-800\r\nrounded-xl\r\np-3\r\n" }), _jsx("input", { placeholder: "Description", value: form.description, onChange: (e) => setForm({
                                    ...form,
                                    description: e.target.value,
                                }), className: "\r\nbg-gray-800\r\nrounded-xl\r\np-3\r\n" }), _jsx("button", { onClick: saveWorkLog, className: "\r\nmd:col-span-3\r\nbg-blue-600\r\nrounded-xl\r\np-3\r\nfont-bold\r\n", children: "Save Work Log" })] })), _jsx("div", { className: "\r\nspace-y-4\r\nmt-6\r\n", children: logs.map((log) => (_jsxs("div", { className: "\r\nbg-gray-800\r\nborder\r\nborder-gray-700\r\nrounded-2xl\r\np-5\r\n", children: [_jsxs("p", { className: "font-bold", children: ["\u23F1 ", log.duration, " Hours"] }), _jsx("p", { className: "text-gray-400", children: log.description }), _jsx("p", { className: "\r\ntext-sm\r\ntext-gray-500\r\nmt-2\r\n", children: new Date(log.date).toLocaleDateString() }), _jsxs("div", { className: "\r\nflex\r\ngap-3\r\nmt-4\r\n", children: [_jsx("button", { onClick: () => {
                                                setEditing(log);
                                                setForm({
                                                    date: log.date,
                                                    duration: log.duration,
                                                    description: log.description,
                                                });
                                            }, className: "\r\nbg-yellow-600\r\npx-4\r\npy-2\r\nrounded-xl\r\n", children: "Edit" }), _jsx("button", { onClick: () => removeLog(log._id), className: "\r\nbg-red-600\r\npx-4\r\npy-2\r\nrounded-xl\r\n", children: "Delete" })] })] }, log._id))) })] }), editing && (_jsxs("div", { className: "\r\nbg-gray-900\r\nborder\r\nborder-gray-800\r\nrounded-3xl\r\np-6\r\n", children: [_jsx("h2", { className: "text-xl font-bold mb-4", children: "Edit Work Log" }), _jsx("input", { value: form.duration, onChange: (e) => setForm({
                            ...form,
                            duration: e.target.value,
                        }), className: "bg-gray-800 p-3 rounded-xl w-full mb-3" }), _jsx("input", { value: form.description, onChange: (e) => setForm({
                            ...form,
                            description: e.target.value,
                        }), className: "bg-gray-800 p-3 rounded-xl w-full" }), _jsx("button", { onClick: saveEdit, className: "\r\nbg-blue-600\r\npx-6\r\npy-3\r\nrounded-xl\r\nmt-5\r\n", children: "Update" })] })), taskId && _jsx(Attachments, { taskId: taskId }), open && (_jsx(CreateSubTaskModal, { onClose: () => setOpen(false), onCreate: addSubTask })), dependencyOpen && (_jsx(DependencyModal, { tasks: [], onClose: () => setDependencyOpen(false), onAdd: async () => { } }))] }));
}
