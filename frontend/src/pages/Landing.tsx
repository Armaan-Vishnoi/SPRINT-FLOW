import { useState } from "react";

import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState("");

  const go = (path: string) => {
    setLoading(path);

    setTimeout(() => {
      navigate(path);
    }, 400);
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
overflow-x-hidden
relative
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
-top-20
-left-20
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

      {/* NAVBAR */}

      <nav
        className="
relative
z-10
flex
items-center
justify-between
px-5
sm:px-10
lg:px-20
py-6
"
      >
        <h1
          className="
text-2xl
sm:text-3xl
font-black
bg-gradient-to-r
from-blue-400
to-purple-500
bg-clip-text
text-transparent
"
        >
          SprintFlow
        </h1>

        <div
          className="
flex
gap-3
sm:gap-5
"
        >
          <button
            onClick={() => go("/login")}
            className="
px-4
sm:px-6
py-2
border
border-gray-700
rounded-xl
hover:bg-white
hover:text-black
duration-300
"
          >
            {loading === "/login" ? "Opening..." : "Login"}
          </button>

          <button
            onClick={() => go("/register")}
            className="
px-4
sm:px-6
py-2
rounded-xl
bg-gradient-to-r
from-blue-600
to-purple-600
hover:scale-105
duration-300
shadow-lg
shadow-blue-500/30
"
          >
            {loading === "/register" ? "Starting..." : "Start"}
          </button>
        </div>
      </nav>

      {/* HERO */}

      <section
        className="
relative
z-10
grid
grid-cols-1
lg:grid-cols-2
gap-16
items-center
px-6
sm:px-12
lg:px-20
pt-16
"
      >
        {/* LEFT */}

        <div>
          <p
            className="
inline-block
bg-blue-600/20
text-blue-400
px-5
py-2
rounded-full
text-sm
"
          >
            🚀 Modern Project Management Platform
          </p>

          <h1
            className="
mt-8
text-4xl
sm:text-5xl
lg:text-7xl
font-black
leading-tight
"
          >
            Manage Work.
            <br />
            Build Faster.
            <br />
            Grow Together.
          </h1>

          <p
            className="
mt-6
text-gray-400
text-base
sm:text-lg
max-w-xl
leading-relaxed
"
          >
            SprintFlow helps teams organize projects, manage agile sprints,
            track tasks, handle dependencies, collaborate realtime and deliver
            products faster.
          </p>

          <button
            onClick={() => go("/register")}
            className="
mt-10
w-full
sm:w-auto
px-12
py-4
rounded-2xl
font-bold
bg-gradient-to-r
from-blue-600
to-purple-600
hover:scale-105
duration-300
shadow-xl
shadow-blue-600/30
"
          >
            {loading === "/register"
              ? "Preparing Workspace..."
              : "Start Free →"}
          </button>
        </div>

        {/* RIGHT ANIMATION */}

        <div
          className="
hidden
lg:block
relative

"
        >
          <div
            className="
bg-gray-900/70
border
border-gray-800
rounded-3xl
p-8
shadow-2xl
animate-pulse
m-10
"
          >
            <h2
              className="
text-2xl
font-bold
mb-6
"
            >
              Live Sprint Board
            </h2>

            {[
              ["Frontend UI", "Completed"],

              ["Backend API", "Running"],

              ["Testing", "Review"],

              ["Deploy", "Pending"],
            ].map((item) => (
              <div
                key={item[0]}
                className="
bg-gray-800
mb-4
p-5
rounded-xl
flex
justify-between
hover:scale-105
duration-300
"
              >
                <span>{item[0]}</span>

                <span className="text-blue-400">{item[1]}</span>
              </div>
            ))}
          </div>

          <div
            className="
absolute
-bottom-8
-left-8
bg-blue-600
px-8
py-4
rounded-2xl
"
          >
            Team Active ●
          </div>
        </div>
      </section>

      {/* FEATURES */}

      <section
        className="
relative
z-10
grid
grid-cols-1
sm:grid-cols-2
lg:grid-cols-3
gap-8
p-6
sm:p-12
lg:p-20
mt-20
"
      >
        {[
          ["📁 Projects", "Manage multiple workspaces"],

          ["⚡ Realtime", "Instant team updates"],

          ["✅ Tasks", "Subtasks and dependencies"],

          ["⏱ Tracking", "Monitor productivity"],

          ["🔐 Security", "Protected file storage"],

          ["📊 Analytics", "Better decisions"],
        ].map((item) => (
          <div
            key={item[0]}
            className="
bg-gray-900/70
border
border-gray-800
rounded-3xl
p-8
hover:-translate-y-3
hover:border-blue-500
duration-300
"
          >
            <h2 className="text-2xl font-bold">{item[0]}</h2>

            <p className="text-gray-400 mt-3">{item[1]}</p>
          </div>
        ))}
      </section>

      <footer
        className="
text-center
p-8
text-gray-500
border-t
border-gray-900
"
      >
        © 2026 SprintFlow — Plan. Build. Deliver.
      </footer>
    </div>
  );
}
