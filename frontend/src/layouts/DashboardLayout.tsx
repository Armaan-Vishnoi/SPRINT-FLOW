import { useState } from "react";

import { Outlet } from "react-router-dom";

import Sidebar from "../components/Sidebar";

import Navbar from "../components/Navbar";

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div
      className="
min-h-screen
bg-gray-950
text-white
flex
overflow-hidden
"
    >
      {/* MOBILE DARK OVERLAY */}

      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="
fixed
inset-0
bg-black/70
backdrop-blur-sm
z-40
lg:hidden
"
        />
      )}

      {/* SIDEBAR */}

      <div
        className={`

fixed
lg:static
top-0
left-0
z-50

h-screen

transition-transform
duration-300

${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}

`}
      >
        <Sidebar />
      </div>

      {/* MAIN AREA */}

      <div
        className="
flex-1
min-w-0
flex
flex-col
h-screen
overflow-hidden
"
      >
        {/* MOBILE TOP MENU */}

        <div
          className="
lg:hidden
flex
items-center
justify-between
p-4
bg-gray-900
border-b
border-gray-800
"
        >
          <h1
            className="
text-xl
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

          <button
            onClick={() => setSidebarOpen(true)}
            className="
bg-gray-800
border
border-gray-700
px-4
py-2
rounded-xl
active:scale-95
duration-300
"
          >
            ☰
          </button>
        </div>

        {/* NAVBAR */}

        <Navbar />

        {/* CONTENT */}

        <main
          className="
flex-1

overflow-y-auto
overflow-x-hidden

p-4
sm:p-6
lg:p-8
"
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
