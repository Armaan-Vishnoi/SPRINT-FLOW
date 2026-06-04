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

      await resetPassword(
        token!,

        password,
      );

      toast.success("Password updated successfully 🚀");

      navigate("/login");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Unable to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
min-h-screen
bg-gradient-to-br
from-gray-950
via-gray-900
to-black
text-white
flex
items-center
justify-center
relative
overflow-x-hidden
px-5
"
    >
      {/* BACKGROUND */}

      <div
        className="
absolute
w-72
sm:w-96
h-72
sm:h-96
bg-green-600/20
rounded-full
blur-3xl
top-0
left-0
animate-pulse
"
      />

      <div
        className="
absolute
w-72
sm:w-96
h-72
sm:h-96
bg-blue-600/20
rounded-full
blur-3xl
bottom-0
right-0
animate-pulse
"
      />

      {/* MAIN */}

      <div
        className="
relative
z-10
grid
grid-cols-1
lg:grid-cols-2
w-full
sm:w-[90%]
lg:max-w-6xl
bg-gray-900/50
border
border-gray-800
rounded-3xl
overflow-hidden
shadow-2xl
"
      >
        {/* LEFT */}

        <div
          className="
hidden
lg:flex
flex-col
justify-center
p-14
bg-gradient-to-br
from-green-600/20
to-blue-600/20
"
        >
          <h1
            className="
text-5xl
font-black
leading-tight
"
          >
            Create New
            <br />
            Password 🔑
          </h1>

          <p
            className="
text-gray-300
mt-6
leading-relaxed
"
          >
            Protect your SprintFlow workspace with a secure password and
            continue managing projects safely.
          </p>

          <div
            className="
mt-10
space-y-4
"
          >
            {[
              "🔐 Encrypted Security",

              "🛡 Account Protection",

              "🚀 Continue Workflow",
            ].map((item) => (
              <div
                key={item}
                className="
bg-gray-900/60
p-4
rounded-xl
hover:translate-x-3
duration-300
"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* FORM */}

        <div
          className="
p-6
sm:p-10
lg:p-14
"
        >
          <h1
            className="
text-center
text-3xl
sm:text-4xl
font-black
"
          >
            Reset Password
          </h1>

          <p
            className="
text-center
text-gray-400
mt-3
mb-10
"
          >
            Enter a new secure password
          </p>

          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="
w-full
bg-gray-800
border
border-gray-700
p-3
sm:p-4
rounded-xl
outline-none
focus:border-green-500
focus:scale-[1.02]
duration-300
"
          />

          <button
            disabled={loading}
            onClick={submit}
            className="
mt-5
w-full
p-3
sm:p-4
rounded-xl
font-bold
bg-gradient-to-r
from-green-600
to-blue-600
hover:scale-105
duration-300
shadow-lg
shadow-green-600/30
disabled:opacity-60
disabled:scale-100
"
          >
            {loading ? "Updating Password..." : "Change Password →"}
          </button>
        </div>
      </div>
    </div>
  );
}
