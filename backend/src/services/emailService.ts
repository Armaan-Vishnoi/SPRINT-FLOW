import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (
  to: string,
  subject: string,
  message: string,
) => {
  const result = await resend.emails.send({
    from: "SprintFlow <onboarding@resend.dev>",

    to,

    subject,

    html: `

   <h2>SprintFlow Notification</h2>

   <p>${message}</p>

   `,
  });

  console.log("EMAIL RESULT:", result);
};
