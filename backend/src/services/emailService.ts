import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",

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
    from: process.env.EMAIL_USER,

    to,

    subject,

    html: `

<div>

<h2>
SprintFlow Notification
</h2>


<p>

${message}

</p>


</div>

`,
  });
};
