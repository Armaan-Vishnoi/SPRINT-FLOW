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
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Unable to create account");
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
rounded-full
blur-3xl
top-0
right-0
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
rounded-full
blur-3xl
bottom-0
left-0
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
            Create Your
            <br />
            Workspace 🚀
          </h1>

          <p
            className="
text-gray-300
mt-6
leading-relaxed
"
          >
            Start organizing your development workflow with projects, sprints,
            task tracking, collaboration and productivity tools.
          </p>

          <div
            className="
space-y-4
mt-10
"
          >
            {[
              "📁 Project Management",

              "🧩 Smart Dependencies",

              "⏱ Time Tracking",

              "🔐 Secure Workspace",
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
            Register
          </h1>

          <p
            className="
text-center
text-gray-400
mt-3
mb-10
"
          >
            Create your SprintFlow account
          </p>

          <div
            className="
space-y-5
"
          >
            <input
              placeholder="Full Name"
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,

                  name: e.target.value,
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
              type="button"
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
              {loading ? "Creating Workspace..." : "Create Account →"}
            </button>
          </div>

          <p
            className="
text-center
mt-8
text-gray-400
"
          >
            Already have account?{" "}
            <Link
              to="/login"
              className="
text-blue-400
hover:text-blue-300
duration-300
"
            >
              Login
            </Link>
          </p>

          <Link
            to="/"
            className="
block
text-center
mt-8
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
