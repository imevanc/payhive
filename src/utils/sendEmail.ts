"use server";
import { Resend } from "resend";
import { SendEmailParams } from "@/types";

const resend = new Resend(process.env.RESEND_EMAIL_KEY);

export const sendEmail = async (params: SendEmailParams) => {
  const {
    indicator,
    to,
    from = "imevanc.dev@gmail.com",
    html,
    subject,
  } = params;

  try {
    let emailData;

    if (indicator === "newsletter") {
      emailData = {
        from,
        to: [to],
        html,
        subject,
      };
    } else if (indicator === "contact-us") {
      const { subject, html, text } = params;
      emailData = {
        from,
        to: [to],
        subject,
        html,
        text,
      };
    } else {
      throw new Error("Invalid email indicator");
    }

    const data = await resend.emails.send(emailData);
    return { success: true, data };
  } catch (error) {
    console.error("Email error:", error);
    return { success: false, error };
  }
};
