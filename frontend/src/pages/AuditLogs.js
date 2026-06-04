import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { getAuditLogs } from "../api/auditApi";
export default function AuditLogs() {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const load = async () => {
        try {
            const res = await getAuditLogs();
            setLogs(res.logs);
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        load();
    }, []);
    if (loading) {
        return (_jsxs("div", { className: "\r\nspace-y-5\r\nanimate-pulse\r\n", children: [_jsx("div", { className: "h-20 bg-gray-800 rounded-3xl" }), _jsx("div", { className: "h-40 bg-gray-800 rounded-3xl" }), _jsx("div", { className: "h-40 bg-gray-800 rounded-3xl" })] }));
    }
    return (_jsxs("div", { className: "\r\nspace-y-8\r\n", children: [_jsxs("div", { className: "\r\nbg-gradient-to-br\r\nfrom-gray-900\r\nto-gray-950\r\nborder\r\nborder-gray-800\r\nrounded-3xl\r\np-6\r\n", children: [_jsx("h1", { className: "\r\ntext-3xl\r\nsm:text-4xl\r\nfont-black\r\nbg-gradient-to-r\r\nfrom-blue-400\r\nto-purple-500\r\nbg-clip-text\r\ntext-transparent\r\n", children: "Audit History" }), _jsx("p", { className: "\r\ntext-gray-400\r\nmt-2\r\n", children: "Track all system changes and activities \uD83D\uDD0D" })] }), logs.length === 0 && (_jsx("div", { className: "\r\ntext-center\r\nbg-gray-900\r\nrounded-3xl\r\np-10\r\ntext-gray-500\r\n", children: "No audit records found" })), _jsx("div", { className: "\r\nspace-y-5\r\n", children: logs.map((log) => (_jsxs("div", { className: "\r\ngroup\r\nbg-gray-900/80\r\nborder\r\nborder-gray-800\r\nrounded-3xl\r\np-5\r\nsm:p-6\r\n\r\nhover:border-blue-500/40\r\nhover:-translate-y-1\r\n\r\nduration-300\r\n", children: [_jsxs("div", { className: "\r\nflex\r\nflex-col\r\nsm:flex-row\r\njustify-between\r\ngap-3\r\n", children: [_jsxs("div", { children: [_jsxs("h2", { className: "\r\ntext-xl\r\nfont-bold\r\n", children: ["\u26A1 ", log.action, " ", log.entity] }), _jsx("p", { className: "\r\ntext-gray-500\r\ntext-sm\r\nmt-1\r\n", children: "Activity record" })] }), _jsx("p", { className: "\r\ntext-gray-400\r\ntext-sm\r\n", children: new Date(log.createdAt).toLocaleString() })] }), _jsxs("div", { className: "\r\ngrid\r\ngrid-cols-1\r\nxl:grid-cols-2\r\ngap-5\r\nmt-6\r\n", children: [_jsxs("div", { className: "\r\nbg-red-500/10\r\nborder\r\nborder-red-500/20\r\nrounded-2xl\r\np-4\r\noverflow-hidden\r\n", children: [_jsx("p", { className: "\r\ntext-red-400\r\nfont-bold\r\nmb-3\r\n", children: "Before" }), _jsx("pre", { className: "\r\ntext-sm\r\ntext-gray-300\r\noverflow-x-auto\r\nwhitespace-pre-wrap\r\n", children: JSON.stringify(log.oldValue, null, 2) })] }), _jsxs("div", { className: "\r\nbg-green-500/10\r\nborder\r\nborder-green-500/20\r\nrounded-2xl\r\np-4\r\noverflow-hidden\r\n", children: [_jsx("p", { className: "\r\ntext-green-400\r\nfont-bold\r\nmb-3\r\n", children: "After" }), _jsx("pre", { className: "\r\ntext-sm\r\ntext-gray-300\r\noverflow-x-auto\r\nwhitespace-pre-wrap\r\n", children: JSON.stringify(log.newValue, null, 2) })] })] })] }, log._id))) })] }));
}
