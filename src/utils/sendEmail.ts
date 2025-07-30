"use server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_EMAIL_KEY);

export const sendEmail = async ({
  to,
  subject,
  html,
  text,
  from = "imevanc.dev@gmail.com",
}: {
  to: string;
  subject: string;
  html: string;
  text?: string;
  from?: string;
}) => {
  try {
    const data = await resend.emails.send({
      from,
      to: [to],
      subject,
      html,
      text,
    });
    return { success: true, data };
  } catch (error) {
    console.error("Email error:", error);
    return { success: false, error };
  }
};
