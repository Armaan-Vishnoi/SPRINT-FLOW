import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "74.125.130.108",

  port: 587,

  secure: false,

  requireTLS: true,

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
  await transporter.sendMail({
    from: `SprintFlow <${process.env.EMAIL_USER}>`,

    to,

    subject,

    html: `

  <h2>SprintFlow Notification</h2>

  <p>${message}</p>

  `,
  });

  console.log("EMAIL SENT:", to);
};
