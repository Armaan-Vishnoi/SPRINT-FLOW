import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { forgotPassword } from "../../api/authApi";
export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [resetLink, setResetLink] = useState("");
    const submit = async () => {
        if (!email) {
            toast.error("Please enter your email address 📧");
            return;
        }
        try {
            setLoading(true);
            const res = await forgotPassword(email);
            setResetLink(res.link);
            toast.success("Password reset link generated 🔐");
        }
        catch (error) {
            toast.error(error.response?.data?.message || "Unable to generate reset link");
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsxs("div", { className: "\r\nmin-h-screen\r\nbg-gradient-to-br\r\nfrom-gray-950\r\nvia-gray-900\r\nto-black\r\ntext-white\r\nflex\r\nitems-center\r\njustify-center\r\nrelative\r\noverflow-x-hidden\r\npx-5\r\n", children: [_jsx("div", { className: "\r\nabsolute\r\nw-72\r\nsm:w-96\r\nh-72\r\nsm:h-96\r\nbg-blue-600/20\r\nrounded-full\r\nblur-3xl\r\ntop-0\r\nleft-0\r\nanimate-pulse\r\n" }), _jsx("div", { className: "\r\nabsolute\r\nw-72\r\nsm:w-96\r\nh-72\r\nsm:h-96\r\nbg-purple-600/20\r\nrounded-full\r\nblur-3xl\r\nbottom-0\r\nright-0\r\nanimate-pulse\r\n" }), _jsxs("div", { className: "\r\nrelative\r\nz-10\r\ngrid\r\ngrid-cols-1\r\nlg:grid-cols-2\r\nw-full\r\nsm:w-[90%]\r\nlg:max-w-6xl\r\nbg-gray-900/50\r\nborder\r\nborder-gray-800\r\nrounded-3xl\r\noverflow-hidden\r\nshadow-2xl\r\n", children: [_jsxs("div", { className: "\r\nhidden\r\nlg:flex\r\nflex-col\r\njustify-center\r\np-14\r\nbg-gradient-to-br\r\nfrom-blue-600/20\r\nto-purple-600/20\r\n", children: [_jsxs("h1", { className: "\r\ntext-5xl\r\nfont-black\r\nleading-tight\r\n", children: ["Recover Your", _jsx("br", {}), "Account \uD83D\uDD10"] }), _jsx("p", { className: "\r\ntext-gray-300\r\nmt-6\r\nleading-relaxed\r\n", children: "Securely restore your SprintFlow workspace access and continue managing your projects, tasks and team workflow." }), _jsx("div", { className: "\r\nspace-y-4\r\nmt-10\r\n", children: [
                                    "🔒 Secure Verification",
                                    "⚡ Instant Recovery",
                                    "🚀 Continue Projects",
                                ].map((item) => (_jsx("div", { className: "\r\nbg-gray-900/60\r\np-4\r\nrounded-xl\r\nhover:translate-x-3\r\nduration-300\r\n", children: item }, item))) })] }), _jsxs("div", { className: "\r\np-6\r\nsm:p-10\r\nlg:p-14\r\n", children: [_jsx("h1", { className: "\r\ntext-center\r\ntext-3xl\r\nsm:text-4xl\r\nfont-black\r\n", children: "Forgot Password" }), _jsx("p", { className: "\r\ntext-center\r\ntext-gray-400\r\nmt-3\r\nmb-10\r\n", children: "Generate your secure reset link" }), _jsx("input", { value: email, placeholder: "Email Address", onChange: (e) => setEmail(e.target.value), className: "\r\nw-full\r\nbg-gray-800\r\nborder\r\nborder-gray-700\r\np-3\r\nsm:p-4\r\nrounded-xl\r\noutline-none\r\nfocus:border-blue-500\r\nfocus:scale-[1.02]\r\nduration-300\r\n" }), _jsx("button", { disabled: loading, onClick: submit, className: "\r\nmt-5\r\nw-full\r\np-3\r\nsm:p-4\r\nrounded-xl\r\nfont-bold\r\nbg-gradient-to-r\r\nfrom-blue-600\r\nto-purple-600\r\nhover:scale-105\r\nduration-300\r\nshadow-lg\r\nshadow-blue-600/30\r\ndisabled:opacity-60\r\ndisabled:scale-100\r\n", children: loading ? "Generating Secure Link..." : "Send Reset Link →" }), resetLink && (_jsxs("div", { className: "\r\nmt-8\r\nbg-gray-800/80\r\nborder\r\nborder-green-500/40\r\nrounded-2xl\r\np-5\r\nbreak-all\r\nanimate-pulse\r\n", children: [_jsx("p", { className: "\r\ntext-green-400\r\nfont-semibold\r\nmb-3\r\n", children: "\u2705 Reset Link Ready" }), _jsx("a", { href: resetLink, className: "\r\ntext-blue-400\r\nhover:text-blue-300\r\nduration-300\r\ntext-sm\r\n", children: resetLink })] })), _jsx(Link, { to: "/login", className: "\r\nblock\r\ntext-center\r\nmt-10\r\ntext-gray-500\r\nhover:text-white\r\nduration-300\r\n", children: "\u2190 Back Login" })] })] })] }));
}
