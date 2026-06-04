import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { registerUser } from "../../api/authApi";
export default function Register() {
    const nav = useNavigate();
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const submit = async () => {
        if (!form.name || !form.email || !form.password) {
            toast.error("Please complete all fields 📝");
            return;
        }
        try {
            setLoading(true);
            await registerUser(form);
            toast.success("Workspace created successfully 🚀");
            nav("/login");
        }
        catch (error) {
            toast.error(error.response?.data?.message || "Unable to create account");
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsxs("div", { className: "\r\nmin-h-screen\r\nbg-gradient-to-br\r\nfrom-gray-950\r\nvia-gray-900\r\nto-black\r\ntext-white\r\nflex\r\nitems-center\r\njustify-center\r\nrelative\r\noverflow-x-hidden\r\npx-5\r\n", children: [_jsx("div", { className: "\r\nabsolute\r\nw-72\r\nsm:w-96\r\nh-72\r\nsm:h-96\r\nbg-blue-600/20\r\nrounded-full\r\nblur-3xl\r\ntop-0\r\nright-0\r\nanimate-pulse\r\n" }), _jsx("div", { className: "\r\nabsolute\r\nw-72\r\nsm:w-96\r\nh-72\r\nsm:h-96\r\nbg-purple-600/20\r\nrounded-full\r\nblur-3xl\r\nbottom-0\r\nleft-0\r\nanimate-pulse\r\n" }), _jsxs("div", { className: "\r\nrelative\r\nz-10\r\ngrid\r\ngrid-cols-1\r\nlg:grid-cols-2\r\nw-full\r\nsm:w-[90%]\r\nlg:max-w-6xl\r\nbg-gray-900/50\r\nborder\r\nborder-gray-800\r\nrounded-3xl\r\noverflow-hidden\r\nshadow-2xl\r\n", children: [_jsxs("div", { className: "\r\nhidden\r\nlg:flex\r\nflex-col\r\njustify-center\r\np-14\r\nbg-gradient-to-br\r\nfrom-blue-600/20\r\nto-purple-600/20\r\n", children: [_jsxs("h1", { className: "\r\ntext-5xl\r\nfont-black\r\nleading-tight\r\n", children: ["Create Your", _jsx("br", {}), "Workspace \uD83D\uDE80"] }), _jsx("p", { className: "\r\ntext-gray-300\r\nmt-6\r\nleading-relaxed\r\n", children: "Start organizing your development workflow with projects, sprints, task tracking, collaboration and productivity tools." }), _jsx("div", { className: "\r\nspace-y-4\r\nmt-10\r\n", children: [
                                    "📁 Project Management",
                                    "🧩 Smart Dependencies",
                                    "⏱ Time Tracking",
                                    "🔐 Secure Workspace",
                                ].map((item) => (_jsx("div", { className: "\r\nbg-gray-900/60\r\np-4\r\nrounded-xl\r\nhover:translate-x-3\r\nduration-300\r\n", children: item }, item))) })] }), _jsxs("div", { className: "\r\np-6\r\nsm:p-10\r\nlg:p-14\r\n", children: [_jsx("h1", { className: "\r\ntext-center\r\ntext-3xl\r\nsm:text-4xl\r\nfont-black\r\n", children: "Register" }), _jsx("p", { className: "\r\ntext-center\r\ntext-gray-400\r\nmt-3\r\nmb-10\r\n", children: "Create your SprintFlow account" }), _jsxs("div", { className: "\r\nspace-y-5\r\n", children: [_jsx("input", { placeholder: "Full Name", value: form.name, onChange: (e) => setForm({
                                            ...form,
                                            name: e.target.value,
                                        }), className: "\r\nw-full\r\nbg-gray-800\r\nborder\r\nborder-gray-700\r\np-3\r\nsm:p-4\r\nrounded-xl\r\noutline-none\r\nfocus:border-blue-500\r\nfocus:scale-[1.02]\r\nduration-300\r\n" }), _jsx("input", { placeholder: "Email Address", value: form.email, onChange: (e) => setForm({
                                            ...form,
                                            email: e.target.value,
                                        }), className: "\r\nw-full\r\nbg-gray-800\r\nborder\r\nborder-gray-700\r\np-3\r\nsm:p-4\r\nrounded-xl\r\noutline-none\r\nfocus:border-blue-500\r\nfocus:scale-[1.02]\r\nduration-300\r\n" }), _jsx("input", { type: "password", placeholder: "Password", value: form.password, onChange: (e) => setForm({
                                            ...form,
                                            password: e.target.value,
                                        }), className: "\r\nw-full\r\nbg-gray-800\r\nborder\r\nborder-gray-700\r\np-3\r\nsm:p-4\r\nrounded-xl\r\noutline-none\r\nfocus:border-blue-500\r\nfocus:scale-[1.02]\r\nduration-300\r\n" }), _jsx("button", { type: "button", disabled: loading, onClick: submit, className: "\r\nw-full\r\np-3\r\nsm:p-4\r\nrounded-xl\r\nfont-bold\r\nbg-gradient-to-r\r\nfrom-blue-600\r\nto-purple-600\r\nhover:scale-105\r\nduration-300\r\nshadow-lg\r\nshadow-blue-600/30\r\ndisabled:opacity-60\r\ndisabled:scale-100\r\n", children: loading ? "Creating Workspace..." : "Create Account →" })] }), _jsxs("p", { className: "\r\ntext-center\r\nmt-8\r\ntext-gray-400\r\n", children: ["Already have account?", " ", _jsx(Link, { to: "/login", className: "\r\ntext-blue-400\r\nhover:text-blue-300\r\nduration-300\r\n", children: "Login" })] }), _jsx(Link, { to: "/", className: "\r\nblock\r\ntext-center\r\nmt-8\r\ntext-gray-500\r\nhover:text-white\r\nduration-300\r\n", children: "\u2190 Back Home" })] })] })] }));
}
