import multer from "multer";

import path from "path";

// STORAGE

const storage = multer.diskStorage({
  destination: (
    req,

    file,

    cb,
  ) => {
    cb(null, "uploads/attachments");
  },

  filename: (
    req,

    file,

    cb,
  ) => {
    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);

    cb(null, uniqueName);
  },
});

// FILE FILTER

const fileFilter = (
  req: any,

  file: any,

  cb: any,
) => {
  const allowed = [
    "application/pdf",

    "image/png",

    "image/jpeg",

    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type"));
  }
};

export const upload = multer({
  storage,

  limits: {
    fileSize: 10 * 1024 * 1024,
  },

  fileFilter,
});
