import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",

  port: 465,

  secure: true,

  family: 4,

  auth: {
    user: process.env.EMAIL_USER,

    pass: process.env.EMAIL_PASS,
  },

  connectionTimeout: 10000,
} as SMTPTransport.Options);

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

  console.log("EMAIL SENT SUCCESS");
};
