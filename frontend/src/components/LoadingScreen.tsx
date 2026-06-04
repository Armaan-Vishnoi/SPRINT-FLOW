export default function LoadingScreen({
  text = "Loading SprintFlow...",
}: {
  text?: string;
}) {
  return (
    <div
      className="
min-h-screen
flex
items-center
justify-center
bg-gray-950
text-white
overflow-hidden
relative
"
    >
      {/* BACKGROUND EFFECTS */}

      <div
        className="
absolute
w-72
h-72
bg-blue-600/20
rounded-full
blur-3xl
top-20
left-10
animate-pulse
"
      />

      <div
        className="
absolute
w-72
h-72
bg-purple-600/20
rounded-full
blur-3xl
bottom-20
right-10
animate-pulse
"
      />

      {/* CARD */}

      <div
        className="
relative
bg-gray-900/70
border
border-gray-800
backdrop-blur-xl

rounded-3xl

px-12
py-10

flex
flex-col
items-center

shadow-2xl
"
      >
        {/* LOGO */}

        <div
          className="
w-20
h-20

rounded-3xl

bg-gradient-to-br
from-blue-600
to-purple-600

flex
items-center
justify-center

text-4xl

shadow-lg
shadow-blue-600/40

animate-bounce
"
        >
          ⚡
        </div>

        {/* SPINNER */}

        <div
          className="
mt-8

w-14
h-14

border-4
border-gray-700
border-t-blue-500

rounded-full

animate-spin
"
        />

        <h1
          className="
mt-8

text-3xl
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

        <p
          className="
text-gray-400
mt-3
text-center
"
        >
          {text}
        </p>

        {/* DOTS */}

        <div
          className="
flex
gap-2
mt-6
"
        >
          <span className="w-2 h-2 bg-blue-500 rounded-full animate-ping" />

          <span className="w-2 h-2 bg-purple-500 rounded-full animate-ping" />

          <span className="w-2 h-2 bg-blue-500 rounded-full animate-ping" />
        </div>
      </div>
    </div>
  );
}
