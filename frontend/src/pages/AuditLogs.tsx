import { useEffect, useState } from "react";

import { getAuditLogs } from "../api/auditApi";

export default function AuditLogs() {
  const [logs, setLogs] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const res = await getAuditLogs();

      setLogs(res.logs);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  if (loading) {
    return (
      <div
        className="
space-y-5
animate-pulse
"
      >
        <div className="h-20 bg-gray-800 rounded-3xl" />

        <div className="h-40 bg-gray-800 rounded-3xl" />

        <div className="h-40 bg-gray-800 rounded-3xl" />
      </div>
    );
  }

  return (
    <div
      className="
space-y-8
"
    >
      {/* HEADER */}

      <div
        className="
bg-gradient-to-br
from-gray-900
to-gray-950
border
border-gray-800
rounded-3xl
p-6
"
      >
        <h1
          className="
text-3xl
sm:text-4xl
font-black
bg-gradient-to-r
from-blue-400
to-purple-500
bg-clip-text
text-transparent
"
        >
          Audit History
        </h1>

        <p
          className="
text-gray-400
mt-2
"
        >
          Track all system changes and activities 🔍
        </p>
      </div>

      {/* EMPTY */}

      {logs.length === 0 && (
        <div
          className="
text-center
bg-gray-900
rounded-3xl
p-10
text-gray-500
"
        >
          No audit records found
        </div>
      )}

      {/* LOG LIST */}

      <div
        className="
space-y-5
"
      >
        {logs.map((log) => (
          <div
            key={log._id}
            className="
group
bg-gray-900/80
border
border-gray-800
rounded-3xl
p-5
sm:p-6

hover:border-blue-500/40
hover:-translate-y-1

duration-300
"
          >
            {/* TOP */}

            <div
              className="
flex
flex-col
sm:flex-row
justify-between
gap-3
"
            >
              <div>
                <h2
                  className="
text-xl
font-bold
"
                >
                  ⚡ {log.action} {log.entity}
                </h2>

                <p
                  className="
text-gray-500
text-sm
mt-1
"
                >
                  Activity record
                </p>
              </div>

              <p
                className="
text-gray-400
text-sm
"
              >
                {new Date(log.createdAt).toLocaleString()}
              </p>
            </div>

            {/* CHANGES */}

            <div
              className="
grid
grid-cols-1
xl:grid-cols-2
gap-5
mt-6
"
            >
              {/* BEFORE */}

              <div
                className="
bg-red-500/10
border
border-red-500/20
rounded-2xl
p-4
overflow-hidden
"
              >
                <p
                  className="
text-red-400
font-bold
mb-3
"
                >
                  Before
                </p>

                <pre
                  className="
text-sm
text-gray-300
overflow-x-auto
whitespace-pre-wrap
"
                >
                  {JSON.stringify(
                    log.oldValue,

                    null,

                    2,
                  )}
                </pre>
              </div>

              {/* AFTER */}

              <div
                className="
bg-green-500/10
border
border-green-500/20
rounded-2xl
p-4
overflow-hidden
"
              >
                <p
                  className="
text-green-400
font-bold
mb-3
"
                >
                  After
                </p>

                <pre
                  className="
text-sm
text-gray-300
overflow-x-auto
whitespace-pre-wrap
"
                >
                  {JSON.stringify(
                    log.newValue,

                    null,

                    2,
                  )}
                </pre>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
