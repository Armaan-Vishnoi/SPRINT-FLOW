import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import {
  uploadAttachment,
  getAttachments,
  deleteAttachment,
} from "../../api/attachmentApi";

export default function Attachments({ taskId }: any) {
  const [files, setFiles] = useState<any[]>([]);

  const [file, setFile] = useState<any>(null);

  const downloadFile = async (
    url: string,

    name: string,
  ) => {
    const response = await fetch(url);

    const blob = await response.blob();

    const downloadUrl = window.URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = downloadUrl;

    link.download = name;

    document.body.appendChild(link);

    link.click();

    link.remove();

    window.URL.revokeObjectURL(downloadUrl);
  };

  const load = async () => {
    const res = await getAttachments(taskId);

    setFiles(res.files);
  };

  useEffect(() => {
    if (taskId) load();
  }, [taskId]);

  const upload = async () => {
    if (!file) {
      toast.error("Select a file first 📂");

      return;
    }

    const allowed = [
      "application/pdf",

      "image/png",

      "image/jpeg",

      "image/jpg",

      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowed.includes(file.type)) {
      toast.error("Only PDF PNG JPG DOCX allowed");

      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error("Maximum size is 10MB");

      return;
    }

    await uploadAttachment(
      taskId,

      file,
    );

    toast.success("File uploaded 🚀");

    setFile(null);

    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete attachment?")) return;

    await deleteAttachment(id);

    toast.success("Attachment deleted 🗑");

    load();
  };

  return (
    <div
      className="
bg-gray-900/70
border
border-gray-800
rounded-3xl
p-6
mt-8
shadow-xl
"
    >
      {/* HEADER */}

      <div
        className="
flex
flex-col
sm:flex-row
justify-between
gap-5
mb-8
"
      >
        <div>
          <h2
            className="
text-2xl
font-black
"
          >
            Attachments
          </h2>

          <p
            className="
text-gray-400
text-sm
mt-2
"
          >
            Upload project files and documents 📁
          </p>
        </div>

        <div
          className="
px-4
py-2
rounded-xl
bg-blue-500/10
border
border-blue-500/30
text-blue-400
h-fit
"
        >
          {files.length} Files
        </div>
      </div>

      {/* UPLOAD BOX */}

      <div
        className="
border
border-dashed
border-gray-700
rounded-3xl
p-6
bg-gray-800/50
"
      >
        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0])}
          className="
w-full
text-gray-400
"
        />

        {file && (
          <p
            className="
text-green-400
mt-3
text-sm
"
          >
            Selected: {file.name}
          </p>
        )}

        <button
          onClick={upload}
          className="
mt-5
w-full
sm:w-auto

px-8
py-3

rounded-xl

font-bold

bg-gradient-to-r
from-blue-600
to-purple-600

hover:scale-105

duration-300

shadow-lg
shadow-blue-600/20
"
        >
          Upload File 🚀
        </button>
      </div>

      {/* FILE LIST */}

      <div
        className="
mt-8
space-y-4
"
      >
        {files.length === 0 && (
          <div
            className="
text-center
text-gray-500
py-10
"
          >
            No attachments uploaded
          </div>
        )}

        {files.map((f: any) => (
          <div
            key={f._id}
            className="
bg-gray-800
border
border-gray-700
rounded-2xl
p-5

flex
flex-col
lg:flex-row

justify-between
gap-5

hover:border-blue-500/40

duration-300
"
          >
            <div>
              <p
                className="
font-bold
break-all
"
              >
                📄 {f.originalName}
              </p>

              <p
                className="
text-gray-400
text-sm
mt-2
"
              >
                {(f.size / 1024).toFixed(1)} KB
              </p>
            </div>

            <div
              className="
flex
flex-wrap
gap-3
"
            >
              <a
                href={f.path}
                target="_blank"
                className="
bg-green-600
px-4
py-2
rounded-xl
hover:scale-105
duration-300
"
              >
                Open
              </a>

              <button
                onClick={() =>
                  downloadFile(
                    f.path,

                    f.originalName,
                  )
                }
                className="
bg-blue-600
px-4
py-2
rounded-xl
hover:scale-105
duration-300
"
              >
                Download
              </button>

              <button
                onClick={() => remove(f._id)}
                className="
bg-red-600
px-4
py-2
rounded-xl
hover:scale-105
duration-300
"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
