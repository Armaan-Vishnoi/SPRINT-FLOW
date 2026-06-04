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
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Unable to generate reset link",
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
      {/* BACKGROUND EFFECT */}

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
rounded-full
blur-3xl
bottom-0
right-0
animate-pulse
"
      />

      {/* MAIN CARD */}

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
        {/* LEFT SIDE */}

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
            Recover Your
            <br />
            Account 🔐
          </h1>

          <p
            className="
text-gray-300
mt-6
leading-relaxed
"
          >
            Securely restore your SprintFlow workspace access and continue
            managing your projects, tasks and team workflow.
          </p>

          <div
            className="
space-y-4
mt-10
"
          >
            {[
              "🔒 Secure Verification",

              "⚡ Instant Recovery",

              "🚀 Continue Projects",
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
            Forgot Password
          </h1>

          <p
            className="
text-center
text-gray-400
mt-3
mb-10
"
          >
            Generate your secure reset link
          </p>

          <input
            value={email}
            placeholder="Email Address"
            onChange={(e) => setEmail(e.target.value)}
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
mt-5
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
            {loading ? "Generating Secure Link..." : "Send Reset Link →"}
          </button>

          {resetLink && (
            <div
              className="
mt-8
bg-gray-800/80
border
border-green-500/40
rounded-2xl
p-5
break-all
animate-pulse
"
            >
              <p
                className="
text-green-400
font-semibold
mb-3
"
              >
                ✅ Reset Link Ready
              </p>

              <a
                href={resetLink}
                className="
text-blue-400
hover:text-blue-300
duration-300
text-sm
"
              >
                {resetLink}
              </a>
            </div>
          )}

          <Link
            to="/login"
            className="
block
text-center
mt-10
text-gray-500
hover:text-white
duration-300
"
          >
            ← Back Login
          </Link>
        </div>
      </div>
    </div>
  );
}
