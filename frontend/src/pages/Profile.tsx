import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import {
  getProfile,
  updateProfile,
  updatePassword,
  uploadProfileImage,
  deactivateAccount,
  updateEmailPreference,
} from "../api/profileApi";
import LoadingScreen from "../components/LoadingScreen";
import { useAuth } from "../context/AuthContext";
export default function Profile() {
  const [user, setUser] = useState<any>(null);

  const [image, setImage] = useState<any>(null);

  const [emailNotification, setEmailNotification] = useState(false);
  const { updateUser } = useAuth();
  const [password, setPassword] = useState({
    currentPassword: "",

    newPassword: "",
  });

  const load = async () => {
    const res = await getProfile();

    setUser(res.user);

    updateUser(res.user);

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

      toast.success(
        value
          ? "Email notifications enabled 🔔"
          : "Email notifications disabled",
      );
    } catch {
      toast.error("Failed to update setting");
    }
  };

  const saveImage = async () => {
    if (!image) {
      toast.error("Select image first 📸");

      return;
    }

    await uploadProfileImage(image);

    await load();

    toast.success("Profile image updated ✨");
  };

  const saveProfile = async () => {
    await updateProfile(user);

    await load();

    toast.success("Profile updated 🚀");
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
    if (!confirm("Deactivate account?")) return;

    await deactivateAccount();

    localStorage.clear();

    location.href = "/login";
  };
  if (!user) return <LoadingScreen text="Loading profile..." />;
  return (
    <div
      className="
space-y-8
"
    >
      {/* HEADER */}

      <div
        className="
bg-gradient-to-br
from-gray-900
to-gray-950
border
border-gray-800
rounded-3xl
p-6
"
      >
        <h1
          className="
text-3xl
sm:text-4xl
font-black
bg-gradient-to-r
from-blue-400
to-purple-500
bg-clip-text
text-transparent
"
        >
          My Profile
        </h1>

        <p
          className="
text-gray-400
mt-2
"
        >
          Manage your SprintFlow account settings ⚙️
        </p>
      </div>

      {/* PROFILE CARD */}

      <div
        className="
grid
grid-cols-1
xl:grid-cols-3
gap-8
"
      >
        {/* IMAGE */}

        <div
          className="
bg-gray-900
border
border-gray-800
rounded-3xl
p-8
flex
flex-col
items-center
"
        >
          <img
            src={
              user?.profilePicture
                ? user.profilePicture.startsWith("http")
                  ? user.profilePicture
                  : `http://localhost:5000/${user.profilePicture}`
                : "/default.png"
            }
            className="
w-36
h-36
rounded-full
object-cover
border-4
border-blue-500
shadow-xl
"
          />

          <h2
            className="
font-bold
text-xl
mt-5
"
          >
            {user?.name}
          </h2>

          <p
            className="
text-gray-400
text-sm
break-all
"
          >
            {user?.email}
          </p>

          <input
            type="file"
            onChange={(e) => setImage(e.target.files?.[0])}
            className="
mt-6
text-sm
text-gray-400
"
          />

          <button
            onClick={saveImage}
            className="
mt-5
w-full
py-3
rounded-xl
font-bold
bg-gradient-to-r
from-purple-600
to-blue-600
hover:scale-105
duration-300
"
          >
            Upload Image
          </button>
        </div>

        {/* PROFILE INFO */}

        <div
          className="
xl:col-span-2
bg-gray-900
border
border-gray-800
rounded-3xl
p-8
space-y-5
"
        >
          <h2
            className="
text-2xl
font-bold
"
          >
            Personal Information
          </h2>

          <input
            value={user?.name || ""}
            placeholder="Name"
            onChange={(e) =>
              setUser({
                ...user,

                name: e.target.value,
              })
            }
            className="
w-full
bg-gray-800
border
border-gray-700
rounded-xl
p-4
outline-none
focus:border-blue-500
"
          />

          <input
            value={user?.email || ""}
            disabled
            className="
w-full
bg-gray-800
rounded-xl
p-4
text-gray-400
"
          />

          <input
            value={user?.phone || ""}
            placeholder="Phone"
            onChange={(e) =>
              setUser({
                ...user,

                phone: e.target.value,
              })
            }
            className="
w-full
bg-gray-800
border
border-gray-700
rounded-xl
p-4
outline-none
focus:border-blue-500
"
          />

          <button
            onClick={saveProfile}
            className="
px-8
py-3
rounded-xl
font-bold
bg-blue-600
hover:scale-105
duration-300
"
          >
            Save Changes
          </button>
        </div>
      </div>

      {/* SECURITY */}

      <div
        className="
bg-gray-900
border
border-gray-800
rounded-3xl
p-8
space-y-5
"
      >
        <h2
          className="
text-2xl
font-bold
"
        >
          Security 🔐
        </h2>

        <input
          type="password"
          placeholder="Current Password"
          value={password.currentPassword}
          onChange={(e) =>
            setPassword({
              ...password,

              currentPassword: e.target.value,
            })
          }
          className="
w-full
bg-gray-800
rounded-xl
p-4
"
        />

        <input
          type="password"
          placeholder="New Password"
          value={password.newPassword}
          onChange={(e) =>
            setPassword({
              ...password,

              newPassword: e.target.value,
            })
          }
          className="
w-full
bg-gray-800
rounded-xl
p-4
"
        />

        <button
          onClick={savePassword}
          className="
px-8
py-3
rounded-xl
font-bold
bg-green-600
hover:scale-105
duration-300
"
        >
          Change Password
        </button>
      </div>

      {/* SETTINGS */}

      <div
        className="
bg-gray-900
border
border-gray-800
rounded-3xl
p-8
"
      >
        <div
          className="
flex
flex-col
sm:flex-row
justify-between
gap-5
"
        >
          <div>
            <h2
              className="
text-2xl
font-bold
"
            >
              Notification Settings
            </h2>

            <p
              className="
text-gray-400
mt-2
"
            >
              Receive email updates from SprintFlow
            </p>
          </div>

          <button
            onClick={changeEmailPreference}
            className={`

px-8
py-3

rounded-xl

font-bold

duration-300


${
  emailNotification
    ? "bg-green-600 shadow-lg shadow-green-600/30"
    : "bg-gray-700"
}

`}
          >
            {emailNotification ? "Enabled" : "Disabled"}
          </button>
        </div>
      </div>

      {/* DANGER */}

      <div
        className="
bg-red-500/10
border
border-red-500/30
rounded-3xl
p-8
"
      >
        <h2
          className="
text-xl
font-bold
text-red-400
"
        >
          Danger Zone
        </h2>

        <p
          className="
text-gray-400
mt-2
"
        >
          Deactivate your SprintFlow account permanently
        </p>

        <button
          onClick={deactivate}
          className="
mt-5
bg-red-600
px-8
py-3
rounded-xl
font-bold
hover:scale-105
duration-300
"
        >
          Deactivate Account
        </button>
      </div>
    </div>
  );
}
