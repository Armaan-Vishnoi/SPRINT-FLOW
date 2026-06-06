import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",

  port: 587,

  secure: false,

  auth: {
    user: process.env.EMAIL_USER,

    pass: process.env.EMAIL_PASS,
  },
});

export const sendEmail = async (
  to: string,
  subject: string,
  message: string,
) => {
  const result = await transporter.sendMail({
    from: `SprintFlow <${process.env.EMAIL_USER}>`,

    to,

    subject,

    text: message,
  });

  return result;
};
