import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { uploadAttachment, getAttachments, deleteAttachment, } from "../../api/attachmentApi";
export default function Attachments({ taskId }) {
    const [files, setFiles] = useState([]);
    const [file, setFile] = useState(null);
    const downloadFile = async (url, name) => {
        const response = await fetch(url);
        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = name;
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(downloadUrl);
    };
    const load = async () => {
        const res = await getAttachments(taskId);
        setFiles(res.files);
    };
    useEffect(() => {
        if (taskId)
            load();
    }, [taskId]);
    const upload = async () => {
        if (!file) {
            toast.error("Select a file first 📂");
            return;
        }
        const allowed = [
            "application/pdf",
            "image/png",
            "image/jpeg",
            "image/jpg",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ];
        if (!allowed.includes(file.type)) {
            toast.error("Only PDF PNG JPG DOCX allowed");
            return;
        }
        if (file.size > 10 * 1024 * 1024) {
            toast.error("Maximum size is 10MB");
            return;
        }
        await uploadAttachment(taskId, file);
        toast.success("File uploaded 🚀");
        setFile(null);
        load();
    };
    const remove = async (id) => {
        if (!confirm("Delete attachment?"))
            return;
        await deleteAttachment(id);
        toast.success("Attachment deleted 🗑");
        load();
    };
    return (_jsxs("div", { className: "\r\nbg-gray-900/70\r\nborder\r\nborder-gray-800\r\nrounded-3xl\r\np-6\r\nmt-8\r\nshadow-xl\r\n", children: [_jsxs("div", { className: "\r\nflex\r\nflex-col\r\nsm:flex-row\r\njustify-between\r\ngap-5\r\nmb-8\r\n", children: [_jsxs("div", { children: [_jsx("h2", { className: "\r\ntext-2xl\r\nfont-black\r\n", children: "Attachments" }), _jsx("p", { className: "\r\ntext-gray-400\r\ntext-sm\r\nmt-2\r\n", children: "Upload project files and documents \uD83D\uDCC1" })] }), _jsxs("div", { className: "\r\npx-4\r\npy-2\r\nrounded-xl\r\nbg-blue-500/10\r\nborder\r\nborder-blue-500/30\r\ntext-blue-400\r\nh-fit\r\n", children: [files.length, " Files"] })] }), _jsxs("div", { className: "\r\nborder\r\nborder-dashed\r\nborder-gray-700\r\nrounded-3xl\r\np-6\r\nbg-gray-800/50\r\n", children: [_jsx("input", { type: "file", onChange: (e) => setFile(e.target.files?.[0]), className: "\r\nw-full\r\ntext-gray-400\r\n" }), file && (_jsxs("p", { className: "\r\ntext-green-400\r\nmt-3\r\ntext-sm\r\n", children: ["Selected: ", file.name] })), _jsx("button", { onClick: upload, className: "\r\nmt-5\r\nw-full\r\nsm:w-auto\r\n\r\npx-8\r\npy-3\r\n\r\nrounded-xl\r\n\r\nfont-bold\r\n\r\nbg-gradient-to-r\r\nfrom-blue-600\r\nto-purple-600\r\n\r\nhover:scale-105\r\n\r\nduration-300\r\n\r\nshadow-lg\r\nshadow-blue-600/20\r\n", children: "Upload File \uD83D\uDE80" })] }), _jsxs("div", { className: "\r\nmt-8\r\nspace-y-4\r\n", children: [files.length === 0 && (_jsx("div", { className: "\r\ntext-center\r\ntext-gray-500\r\npy-10\r\n", children: "No attachments uploaded" })), files.map((f) => (_jsxs("div", { className: "\r\nbg-gray-800\r\nborder\r\nborder-gray-700\r\nrounded-2xl\r\np-5\r\n\r\nflex\r\nflex-col\r\nlg:flex-row\r\n\r\njustify-between\r\ngap-5\r\n\r\nhover:border-blue-500/40\r\n\r\nduration-300\r\n", children: [_jsxs("div", { children: [_jsxs("p", { className: "\r\nfont-bold\r\nbreak-all\r\n", children: ["\uD83D\uDCC4 ", f.originalName] }), _jsxs("p", { className: "\r\ntext-gray-400\r\ntext-sm\r\nmt-2\r\n", children: [(f.size / 1024).toFixed(1), " KB"] })] }), _jsxs("div", { className: "\r\nflex\r\nflex-wrap\r\ngap-3\r\n", children: [_jsx("a", { href: f.path, target: "_blank", className: "\r\nbg-green-600\r\npx-4\r\npy-2\r\nrounded-xl\r\nhover:scale-105\r\nduration-300\r\n", children: "Open" }), _jsx("button", { onClick: () => downloadFile(f.path, f.originalName), className: "\r\nbg-blue-600\r\npx-4\r\npy-2\r\nrounded-xl\r\nhover:scale-105\r\nduration-300\r\n", children: "Download" }), _jsx("button", { onClick: () => remove(f._id), className: "\r\nbg-red-600\r\npx-4\r\npy-2\r\nrounded-xl\r\nhover:scale-105\r\nduration-300\r\n", children: "Delete" })] })] }, f._id)))] })] }));
}
