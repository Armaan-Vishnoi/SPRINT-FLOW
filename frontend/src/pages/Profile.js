import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getProfile, updateProfile, updatePassword, uploadProfileImage, deactivateAccount, updateEmailPreference, } from "../api/profileApi";
import LoadingScreen from "../components/LoadingScreen";
export default function Profile() {
    const [user, setUser] = useState(null);
    const [image, setImage] = useState(null);
    const [emailNotification, setEmailNotification] = useState(false);
    const [password, setPassword] = useState({
        currentPassword: "",
        newPassword: "",
    });
    const load = async () => {
        const res = await getProfile();
        setUser(res.user);
        setEmailNotification(Boolean(res.user.emailNotification));
    };
    useEffect(() => {
        load();
    }, []);
    const changeEmailPreference = async () => {
        try {
            const value = !emailNotification;
            const res = await updateEmailPreference(value);
            setEmailNotification(Boolean(res.user.emailNotification));
            toast.success(value
                ? "Email notifications enabled 🔔"
                : "Email notifications disabled");
        }
        catch {
            toast.error("Failed to update setting");
        }
    };
    const saveImage = async () => {
        if (!image) {
            toast.error("Select image first 📸");
            return;
        }
        await uploadProfileImage(image);
        toast.success("Profile image updated ✨");
        load();
    };
    const saveProfile = async () => {
        await updateProfile(user);
        toast.success("Profile updated 🚀");
        load();
    };
    const savePassword = async () => {
        await updatePassword(password);
        toast.success("Password changed 🔐");
        setPassword({
            currentPassword: "",
            newPassword: "",
        });
    };
    const deactivate = async () => {
        if (!confirm("Deactivate account?"))
            return;
        await deactivateAccount();
        localStorage.clear();
        location.href = "/login";
    };
    if (!user)
        return _jsx(LoadingScreen, { text: "Loading profile..." });
    return (_jsxs("div", { className: "\r\nspace-y-8\r\n", children: [_jsxs("div", { className: "\r\nbg-gradient-to-br\r\nfrom-gray-900\r\nto-gray-950\r\nborder\r\nborder-gray-800\r\nrounded-3xl\r\np-6\r\n", children: [_jsx("h1", { className: "\r\ntext-3xl\r\nsm:text-4xl\r\nfont-black\r\nbg-gradient-to-r\r\nfrom-blue-400\r\nto-purple-500\r\nbg-clip-text\r\ntext-transparent\r\n", children: "My Profile" }), _jsx("p", { className: "\r\ntext-gray-400\r\nmt-2\r\n", children: "Manage your SprintFlow account settings \u2699\uFE0F" })] }), _jsxs("div", { className: "\r\ngrid\r\ngrid-cols-1\r\nxl:grid-cols-3\r\ngap-8\r\n", children: [_jsxs("div", { className: "\r\nbg-gray-900\r\nborder\r\nborder-gray-800\r\nrounded-3xl\r\np-8\r\nflex\r\nflex-col\r\nitems-center\r\n", children: [_jsx("img", { src: user?.profilePicture
                                    ? user.profilePicture.startsWith("http")
                                        ? user.profilePicture
                                        : `http://localhost:5000/${user.profilePicture}`
                                    : "/default.png", className: "\r\nw-36\r\nh-36\r\nrounded-full\r\nobject-cover\r\nborder-4\r\nborder-blue-500\r\nshadow-xl\r\n" }), _jsx("h2", { className: "\r\nfont-bold\r\ntext-xl\r\nmt-5\r\n", children: user?.name }), _jsx("p", { className: "\r\ntext-gray-400\r\ntext-sm\r\nbreak-all\r\n", children: user?.email }), _jsx("input", { type: "file", onChange: (e) => setImage(e.target.files?.[0]), className: "\r\nmt-6\r\ntext-sm\r\ntext-gray-400\r\n" }), _jsx("button", { onClick: saveImage, className: "\r\nmt-5\r\nw-full\r\npy-3\r\nrounded-xl\r\nfont-bold\r\nbg-gradient-to-r\r\nfrom-purple-600\r\nto-blue-600\r\nhover:scale-105\r\nduration-300\r\n", children: "Upload Image" })] }), _jsxs("div", { className: "\r\nxl:col-span-2\r\nbg-gray-900\r\nborder\r\nborder-gray-800\r\nrounded-3xl\r\np-8\r\nspace-y-5\r\n", children: [_jsx("h2", { className: "\r\ntext-2xl\r\nfont-bold\r\n", children: "Personal Information" }), _jsx("input", { value: user?.name || "", placeholder: "Name", onChange: (e) => setUser({
                                    ...user,
                                    name: e.target.value,
                                }), className: "\r\nw-full\r\nbg-gray-800\r\nborder\r\nborder-gray-700\r\nrounded-xl\r\np-4\r\noutline-none\r\nfocus:border-blue-500\r\n" }), _jsx("input", { value: user?.email || "", disabled: true, className: "\r\nw-full\r\nbg-gray-800\r\nrounded-xl\r\np-4\r\ntext-gray-400\r\n" }), _jsx("input", { value: user?.phone || "", placeholder: "Phone", onChange: (e) => setUser({
                                    ...user,
                                    phone: e.target.value,
                                }), className: "\r\nw-full\r\nbg-gray-800\r\nborder\r\nborder-gray-700\r\nrounded-xl\r\np-4\r\noutline-none\r\nfocus:border-blue-500\r\n" }), _jsx("button", { onClick: saveProfile, className: "\r\npx-8\r\npy-3\r\nrounded-xl\r\nfont-bold\r\nbg-blue-600\r\nhover:scale-105\r\nduration-300\r\n", children: "Save Changes" })] })] }), _jsxs("div", { className: "\r\nbg-gray-900\r\nborder\r\nborder-gray-800\r\nrounded-3xl\r\np-8\r\nspace-y-5\r\n", children: [_jsx("h2", { className: "\r\ntext-2xl\r\nfont-bold\r\n", children: "Security \uD83D\uDD10" }), _jsx("input", { type: "password", placeholder: "Current Password", value: password.currentPassword, onChange: (e) => setPassword({
                            ...password,
                            currentPassword: e.target.value,
                        }), className: "\r\nw-full\r\nbg-gray-800\r\nrounded-xl\r\np-4\r\n" }), _jsx("input", { type: "password", placeholder: "New Password", value: password.newPassword, onChange: (e) => setPassword({
                            ...password,
                            newPassword: e.target.value,
                        }), className: "\r\nw-full\r\nbg-gray-800\r\nrounded-xl\r\np-4\r\n" }), _jsx("button", { onClick: savePassword, className: "\r\npx-8\r\npy-3\r\nrounded-xl\r\nfont-bold\r\nbg-green-600\r\nhover:scale-105\r\nduration-300\r\n", children: "Change Password" })] }), _jsx("div", { className: "\r\nbg-gray-900\r\nborder\r\nborder-gray-800\r\nrounded-3xl\r\np-8\r\n", children: _jsxs("div", { className: "\r\nflex\r\nflex-col\r\nsm:flex-row\r\njustify-between\r\ngap-5\r\n", children: [_jsxs("div", { children: [_jsx("h2", { className: "\r\ntext-2xl\r\nfont-bold\r\n", children: "Notification Settings" }), _jsx("p", { className: "\r\ntext-gray-400\r\nmt-2\r\n", children: "Receive email updates from SprintFlow" })] }), _jsx("button", { onClick: changeEmailPreference, className: `

px-8
py-3

rounded-xl

font-bold

duration-300


${emailNotification
                                ? "bg-green-600 shadow-lg shadow-green-600/30"
                                : "bg-gray-700"}

`, children: emailNotification ? "Enabled" : "Disabled" })] }) }), _jsxs("div", { className: "\r\nbg-red-500/10\r\nborder\r\nborder-red-500/30\r\nrounded-3xl\r\np-8\r\n", children: [_jsx("h2", { className: "\r\ntext-xl\r\nfont-bold\r\ntext-red-400\r\n", children: "Danger Zone" }), _jsx("p", { className: "\r\ntext-gray-400\r\nmt-2\r\n", children: "Deactivate your SprintFlow account permanently" }), _jsx("button", { onClick: deactivate, className: "\r\nmt-5\r\nbg-red-600\r\npx-8\r\npy-3\r\nrounded-xl\r\nfont-bold\r\nhover:scale-105\r\nduration-300\r\n", children: "Deactivate Account" })] })] }));
}
