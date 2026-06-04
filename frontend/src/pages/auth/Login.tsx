import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import { loginUser } from "../../api/authApi";

import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",

    password: "",
  });

  const submit = async () => {
    if (!form.email || !form.password) {
      toast.error("Please enter your email and password 🔐");

      return;
    }

    try {
      setLoading(true);

      const res = await loginUser(form);

      login(
        res.data.user,

        res.data.token,
      );

      toast.success("Welcome back! Workspace loaded 🚀");

      navigate(
        "/dashboard",

        {
          replace: true,
        },
      );
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Unable to login. Please check your details",
      );
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
bg-blue-600/20
blur-3xl
rounded-full
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
bg-purple-600/20
blur-3xl
rounded-full
bottom-0
right-0
animate-pulse
"
      />

      {/* CARD */}

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
rounded-3xl
overflow-hidden
border
border-gray-800
bg-gray-900/50
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
from-blue-600/20
to-purple-600/20
"
        >
          <h1
            className="
text-5xl
font-black
leading-tight
"
          >
            Welcome Back
            <br />
            Developer 👋
          </h1>

          <p
            className="
mt-6
text-gray-300
leading-relaxed
"
          >
            Continue managing your projects, sprints, tasks, dependencies, time
            tracking and team workflow inside SprintFlow.
          </p>

          <div
            className="
mt-10
space-y-4
"
          >
            {[
              "🚀 Active Projects",

              "⚡ Realtime Collaboration",

              "📊 Productivity Dashboard",
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
            Login
          </h1>

          <p
            className="
text-center
text-gray-400
mt-3
mb-10
"
          >
            Access your SprintFlow workspace
          </p>

          <div
            className="
space-y-5
"
          >
            <input
              placeholder="Email Address"
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,

                  email: e.target.value,
                })
              }
              className="
w-full
bg-gray-800
border
border-gray-700
p-3
sm:p-4
rounded-xl
outline-none
focus:border-blue-500
focus:scale-[1.02]
duration-300
"
            />

            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) =>
                setForm({
                  ...form,

                  password: e.target.value,
                })
              }
              className="
w-full
bg-gray-800
border
border-gray-700
p-3
sm:p-4
rounded-xl
outline-none
focus:border-blue-500
focus:scale-[1.02]
duration-300
"
            />

            <button
              disabled={loading}
              onClick={submit}
              className="
w-full
p-3
sm:p-4
rounded-xl
font-bold
bg-gradient-to-r
from-blue-600
to-purple-600
hover:scale-105
duration-300
shadow-lg
shadow-blue-600/30
disabled:opacity-60
disabled:scale-100
"
            >
              {loading ? "Connecting Workspace..." : "Login →"}
            </button>
          </div>

          <div
            className="
flex
flex-col
sm:flex-row
justify-between
gap-4
mt-7
text-sm
text-center
"
          >
            <Link
              to="/forgot-password"
              className="
text-gray-400
hover:text-white
duration-300
"
            >
              Forgot Password?
            </Link>

            <Link
              to="/register"
              className="
text-blue-400
hover:text-blue-300
duration-300
"
            >
              Create Account
            </Link>
          </div>

          <Link
            to="/"
            className="
block
text-center
mt-10
text-gray-500
hover:text-white
duration-300
"
          >
            ← Back Home
          </Link>
        </div>
      </div>
    </div>
  );
}
