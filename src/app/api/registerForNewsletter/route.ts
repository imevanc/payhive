import { NextRequest, NextResponse } from "next/server";
import { isValidEmail, sendEmail } from "@/utils";
import { PrismaClient } from "@prisma/client";
import { render } from "@react-email/render";
import { NewsletterEmail } from "@/components";

const prisma = new PrismaClient();

export async function POST(request: NextRequest): Promise<NextResponse> {
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

    const existingNewsletter = await prisma.newsletter.findUnique({
      where: { email: emailLower },
    });

    if (existingNewsletter) {
      return NextResponse.json(
        {
          error: "You are already subscribed to our newsletter.",
          alreadySubscribed: true,
        },
        { status: 409 },
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: emailLower },
    });

    try {
      const newsletterSubscription = await prisma.newsletter.create({
        data: {
          id: crypto.randomUUID(),
          email: emailLower,
          userId: existingUser?.id || null,
          updatedAt: new Date(),
          refNumber: 0,
        },
      });

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

      await sendEmail({
        indicator: "newsletter",
        to: "imevanc.dev@gmail.com",
        subject: `New Newsletter Subscription - Ref #${newsletterSubscription.refNumber}`,
        html: `New newsletter subscription from: ${email}<br>Reference Number: ${newsletterSubscription.refNumber}`,
        from: "onboarding@resend.dev",
      });

      if (result.success) {
        return NextResponse.json(
          {
            success: true,
            message:
              "Thank you for subscribing! Check your email for confirmation.",
            refNumber: newsletterSubscription.refNumber,
          },
          { status: 200 },
        );
      } else {
        await prisma.newsletter.delete({
          where: { id: newsletterSubscription.id },
        });

        return NextResponse.json(
          { error: "Failed to send confirmation email" },
          { status: 500 },
        );
      }
    } catch (error) {
      console.error("Newsletter creation error:", error);
      return NextResponse.json(
        { error: "Failed to create newsletter subscription" },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  } finally {
    await prisma.$disconnect();
  }
}
