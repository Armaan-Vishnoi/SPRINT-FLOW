import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div
      className="
min-h-screen
bg-gray-950
text-white
"
    >
      {/* Navbar */}

      <nav
        className="
flex
justify-between
items-center
px-10
py-6
"
      >
        <h1
          className="
text-3xl
font-bold
"
        >
          SprintFlow
        </h1>

        <div
          className="
space-x-4
"
        >
          <Link
            to="/login"
            className="
px-5
py-2
border
rounded-lg
"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="
px-5
py-2
bg-blue-600
rounded-lg
"
          >
            Sign Up
          </Link>
        </div>
      </nav>

      {/* HERO */}

      <section
        className="
flex
flex-col
items-center
justify-center
text-center
h-[80vh]
px-6
"
      >
        <h2
          className="
text-6xl
font-bold
mb-6
"
        >
          Manage Projects Faster
        </h2>

        <p
          className="
max-w-2xl
text-gray-400
text-xl
"
        >
          SprintFlow helps teams manage projects, sprints, tasks, work logs,
          files and realtime collaboration.
        </p>

        <div
          className="
mt-10
flex
gap-5
"
        >
          <Link
            to="/register"
            className="
bg-blue-600
px-8
py-3
rounded-lg
text-lg
"
          >
            Get Started
          </Link>

          <Link
            to="/login"
            className="
border
px-8
py-3
rounded-lg
text-lg
"
          >
            Login
          </Link>
        </div>
      </section>

      {/* FEATURES */}

      <section
        className="
grid
grid-cols-3
gap-6
p-10
"
      >
        {[
          "Project Management",

          "Sprint Planning",

          "Task Tracking",

          "Realtime Updates",

          "File Sharing",

          "Notifications",
        ].map((item) => (
          <div
            key={item}
            className="
bg-gray-900
p-6
rounded-xl
"
          >
            <h3
              className="
text-xl
font-semibold
"
            >
              {item}
            </h3>
          </div>
        ))}
      </section>
    </div>
  );
}
