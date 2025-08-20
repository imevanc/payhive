import { NextRequest, NextResponse } from "next/server";
import { isValidEmail, sendEmail } from "@/utils";
import { PrismaClient } from "../../../../generated/prisma";
import { render } from "@react-email/render";
import { NewsletterEmail } from "@/components";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const errors: Array<string> = [];

  try {
    const { subscriberEmail: email } = await request.json();
    if (!email || typeof email !== "string" || !isValidEmail(email)) {
      errors.push("Valid email is required");
    }

    if (errors.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors: errors,
        },
        { status: 400 },
      );
    }

    const emailLower = email.toLowerCase().trim();

    const existingUser = await prisma.user.findUnique({
      where: { email: emailLower },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          error:
            "You already have an account and are subscribed to our newsletter.",
          alreadyRegistered: true,
        },
        { status: 409 },
      );
    }

    try {
      const newsletterEmailHtml = await render(
        NewsletterEmail({
          subscriberEmail: email,
        }),
      );

      const result = await sendEmail({
        indicator: "newsletter",
        to: "imevanc.dev@gmail.com",
        subject: "Welcome to PayHive Newsletter!",
        html: newsletterEmailHtml,
        from: "onboarding@resend.dev",
      });

      if (result.success) {
        console.log({
          success: true,
          message:
            "Thank you for your interest! Check your email for newsletter information and account creation details.",
        });
        return NextResponse.json(
          {
            success: true,
            message:
              "Thank you for your interest! Check your email for newsletter information and account creation details.",
          },
          { status: 200 },
        );
      } else {
        console.error("Failed to send notification");
      }
    } catch (error) {
      console.log({
        success: false,
        error: "Failed to register for newsletter",
      });
    }
  } catch (error) {
    await prisma.$disconnect();
    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
