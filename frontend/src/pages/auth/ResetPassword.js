import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { resetPassword } from "../../api/authApi";
export default function ResetPassword() {
    const { token } = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const submit = async () => {
        if (!password) {
            toast.error("Please enter your new password 🔐");
            return;
        }
        try {
            setLoading(true);
            await resetPassword(token, password);
            toast.success("Password updated successfully 🚀");
            navigate("/login");
        }
        catch (error) {
            toast.error(error.response?.data?.message || "Unable to reset password");
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsxs("div", { className: "\r\nmin-h-screen\r\nbg-gradient-to-br\r\nfrom-gray-950\r\nvia-gray-900\r\nto-black\r\ntext-white\r\nflex\r\nitems-center\r\njustify-center\r\nrelative\r\noverflow-x-hidden\r\npx-5\r\n", children: [_jsx("div", { className: "\r\nabsolute\r\nw-72\r\nsm:w-96\r\nh-72\r\nsm:h-96\r\nbg-green-600/20\r\nrounded-full\r\nblur-3xl\r\ntop-0\r\nleft-0\r\nanimate-pulse\r\n" }), _jsx("div", { className: "\r\nabsolute\r\nw-72\r\nsm:w-96\r\nh-72\r\nsm:h-96\r\nbg-blue-600/20\r\nrounded-full\r\nblur-3xl\r\nbottom-0\r\nright-0\r\nanimate-pulse\r\n" }), _jsxs("div", { className: "\r\nrelative\r\nz-10\r\ngrid\r\ngrid-cols-1\r\nlg:grid-cols-2\r\nw-full\r\nsm:w-[90%]\r\nlg:max-w-6xl\r\nbg-gray-900/50\r\nborder\r\nborder-gray-800\r\nrounded-3xl\r\noverflow-hidden\r\nshadow-2xl\r\n", children: [_jsxs("div", { className: "\r\nhidden\r\nlg:flex\r\nflex-col\r\njustify-center\r\np-14\r\nbg-gradient-to-br\r\nfrom-green-600/20\r\nto-blue-600/20\r\n", children: [_jsxs("h1", { className: "\r\ntext-5xl\r\nfont-black\r\nleading-tight\r\n", children: ["Create New", _jsx("br", {}), "Password \uD83D\uDD11"] }), _jsx("p", { className: "\r\ntext-gray-300\r\nmt-6\r\nleading-relaxed\r\n", children: "Protect your SprintFlow workspace with a secure password and continue managing projects safely." }), _jsx("div", { className: "\r\nmt-10\r\nspace-y-4\r\n", children: [
                                    "🔐 Encrypted Security",
                                    "🛡 Account Protection",
                                    "🚀 Continue Workflow",
                                ].map((item) => (_jsx("div", { className: "\r\nbg-gray-900/60\r\np-4\r\nrounded-xl\r\nhover:translate-x-3\r\nduration-300\r\n", children: item }, item))) })] }), _jsxs("div", { className: "\r\np-6\r\nsm:p-10\r\nlg:p-14\r\n", children: [_jsx("h1", { className: "\r\ntext-center\r\ntext-3xl\r\nsm:text-4xl\r\nfont-black\r\n", children: "Reset Password" }), _jsx("p", { className: "\r\ntext-center\r\ntext-gray-400\r\nmt-3\r\nmb-10\r\n", children: "Enter a new secure password" }), _jsx("input", { type: "password", placeholder: "New Password", value: password, onChange: (e) => setPassword(e.target.value), className: "\r\nw-full\r\nbg-gray-800\r\nborder\r\nborder-gray-700\r\np-3\r\nsm:p-4\r\nrounded-xl\r\noutline-none\r\nfocus:border-green-500\r\nfocus:scale-[1.02]\r\nduration-300\r\n" }), _jsx("button", { disabled: loading, onClick: submit, className: "\r\nmt-5\r\nw-full\r\np-3\r\nsm:p-4\r\nrounded-xl\r\nfont-bold\r\nbg-gradient-to-r\r\nfrom-green-600\r\nto-blue-600\r\nhover:scale-105\r\nduration-300\r\nshadow-lg\r\nshadow-green-600/30\r\ndisabled:opacity-60\r\ndisabled:scale-100\r\n", children: loading ? "Updating Password..." : "Change Password →" })] })] })] }));
}
