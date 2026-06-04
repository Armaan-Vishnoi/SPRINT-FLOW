import { useEffect, useState } from "react";

import { getDashboardStats } from "../../api/dashboardApi";

import StatCard from "../../components/dashboard/StatCard";

export default function Dashboard() {
  const [stats, setStats] = useState<any>(null);

  const load = async () => {
    try {
      const res = await getDashboardStats();

      setStats(res.stats);
    } catch (error) {
      console.log("Dashboard error", error);
    }
  };

  useEffect(() => {
    load();
  }, []);

  if (!stats)
  {
    return (
      <div
        className="
space-y-6
animate-pulse
"
      >
        <div
          className="
h-10
w-60
bg-gray-800
rounded-xl
"
        />

        <div
          className="
grid
grid-cols-1
sm:grid-cols-2
lg:grid-cols-3
gap-6
"
        >
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="
h-32
bg-gray-800
rounded-2xl
"
            />
          ))}
        </div>
      </div>
    );
  }

  const progress =
    stats.tasks === 0 ? 0 : Math.round((stats.completed / stats.tasks) * 100);

  return (
    <div
      className="
space-y-8
"
    >
      {/* HEADER */}

      <div
        className="
flex
flex-col
sm:flex-row
justify-between
items-start
sm:items-center
gap-5
"
      >
        <div>
          <h1
            className="
text-3xl
sm:text-4xl
font-black
bg-gradient-to-r
from-white
to-gray-400
bg-clip-text
text-transparent
"
          >
            Dashboard
          </h1>

          <p
            className="
text-gray-400
mt-2
"
          >
            Monitor projects, sprints and team productivity
          </p>
        </div>

        <div
          className="
bg-green-500/10
text-green-400
px-5
py-2
rounded-full
border
border-green-500/30
"
        >
          ● Workspace Active
        </div>
      </div>

      {/* STATS */}

      <div
        className="
grid
grid-cols-1
sm:grid-cols-2
xl:grid-cols-1
md:grid-cols-2
xl:grid-cols-3
gap-6
"
      >
        <div
          className="
hover:-translate-y-2
duration-300
"
        >
          <StatCard title="🚀 Projects" value={stats.projects} />
        </div>

        <div
          className="
hover:-translate-y-2
duration-300
"
        >
          <StatCard title="📅 Sprints" value={stats.sprints} />
        </div>

        <div
          className="
hover:-translate-y-2
duration-300
"
        >
          <StatCard title="✅ Tasks" value={stats.tasks} />
        </div>

        <div
          className="
hover:-translate-y-2
duration-300
"
        >
          <StatCard title="🎯 Completed" value={stats.completed} />
        </div>

        <div
          className="
hover:-translate-y-2
duration-300
"
        >
          <StatCard title="⏳ Pending" value={stats.pending} />
        </div>

        <div
          className="
hover:-translate-y-2
duration-300
"
        >
          <StatCard title="⏱ Logged Hours" value={stats.hours} />
        </div>
      </div>

      {/* PROGRESS SECTION */}

      <div
        className="
grid
grid-cols-1
lg:grid-cols-3
gap-6
"
      >
        <div
          className="
lg:col-span-2
bg-gray-900/70
border
border-gray-800
rounded-3xl
p-6
shadow-xl
"
        >
          <div
            className="
flex
justify-between
items-center
mb-6
"
          >
            <h2
              className="
text-xl
font-bold
"
            >
              Task Completion
            </h2>

            <span
              className="
text-blue-400
font-bold
"
            >
              {progress}%
            </span>
          </div>

          <div
            className="
bg-gray-800
h-5
rounded-full
overflow-hidden
"
          >
            <div
              style={{
                width: `${progress}%`,
              }}
              className="
bg-gradient-to-r
from-green-500
to-blue-500
h-full
rounded-full
duration-700
"
            />
          </div>

          <p
            className="
text-gray-400
mt-4
"
          >
            {stats.completed} of {stats.tasks} tasks completed
          </p>
        </div>

        {/* SUMMARY CARD */}

        <div
          className="
bg-gradient-to-br
from-blue-600/20
to-purple-600/20
border
border-gray-800
rounded-3xl
p-6
shadow-xl
"
        >
          <h2
            className="
text-xl
font-bold
mb-5
"
          >
            SprintFlow Summary
          </h2>

          <div
            className="
space-y-4
text-gray-300
"
          >
            <p>🚀 Projects running: {stats.projects}</p>

            <p>📅 Active sprints: {stats.sprints}</p>

            <p>⚡ Productivity: {progress}%</p>
          </div>
        </div>
      </div>
    </div>
  );
}
