export default function StatCard({
  title,

  value,
}: any) {
  const icons: any = {
    Projects: "🚀",

    Sprints: "⚡",

    Tasks: "📋",

    Completed: "✅",

    Pending: "⏳",

    "Logged Hours": "⏱",
  };

  return (
    <div
      className="
group
relative
overflow-hidden

bg-gray-900/80
border
border-gray-800

rounded-3xl

p-5
sm:p-6

shadow-xl

hover:border-blue-500/50
hover:shadow-blue-600/20

hover:-translate-y-1

duration-300
"
    >
      {/* BACKGROUND EFFECT */}

      <div
        className="
absolute
w-28
h-28

bg-blue-600/10

rounded-full

blur-3xl

-top-10
-right-10

group-hover:bg-purple-600/20

duration-300
"
      />

      {/* CONTENT */}

      <div
        className="
relative
flex
justify-between
items-start
"
      >
        <div>
          <p
            className="
text-gray-400
text-sm
font-medium
"
          >
            {title}
          </p>

          <h1
            className="
text-3xl
sm:text-4xl
font-black
mt-3
"
          >
            {value}
          </h1>
        </div>

        <div
          className="
w-12
h-12

rounded-2xl

bg-gradient-to-br
from-blue-600
to-purple-600

flex
items-center
justify-center

text-xl

shadow-lg
"
        >
          {icons[title] || "📊"}
        </div>
      </div>

      {/* SMALL FOOTER */}

      <div
        className="
relative

mt-6

h-2

rounded-full

bg-gray-800

overflow-hidden
"
      >
        <div
          className="
h-full

w-2/3

bg-gradient-to-r
from-blue-500
to-purple-500

rounded-full
"
        />
      </div>
    </div>
  );
}
