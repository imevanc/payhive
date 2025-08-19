"use server";
import { Resend } from "resend";
import { SendEmailParams } from "@/types";

const resend = new Resend(process.env.RESEND_EMAIL_KEY);

export const sendEmail = async (params: SendEmailParams) => {
  const { indicator, to, from = "imevanc.dev@gmail.com" } = params;

  try {
    let emailData;

    if (indicator === "newsletter") {
      emailData = {
        from,
        to: [to],
        subject: "Welcome to our Newsletter!",
        html: `
          <h2>Welcome to our Newsletter!</h2>
          <p>Thank you for subscribing to our newsletter. We're excited to have you join our community!</p>
          <p>You'll receive weekly updates with the latest content and insights.</p>
          <p>Best regards,<br>The Newsletter Team</p>
        `,
        text: "Welcome to our Newsletter! Thank you for subscribing. You'll receive weekly updates with the latest content and insights.",
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
