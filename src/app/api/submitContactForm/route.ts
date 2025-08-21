import { NextRequest, NextResponse } from "next/server";
import { ContactFormData } from "@/types";
import { isValidEmail, sendEmail } from "@/utils";
import { PrismaClient } from "../../../../generated/prisma";
import { render } from "@react-email/render";
import { ContactNotificationEmail } from "@/components";

const prisma = new PrismaClient();

const validateContactForm = (
  data: any,
): { isValid: boolean; errors: Array<string> } => {
  const errors: Array<string> = [];

  if (
    !data.firstName ||
    typeof data.firstName !== "string" ||
    data.firstName.trim().length === 0
  ) {
    errors.push("FirstName is required");
  }

  if (
    !data.lastName ||
    typeof data.lastName !== "string" ||
    data.lastName.trim().length === 0
  ) {
    errors.push("LastName is required");
  }

  if (
    !data.telephoneNumber ||
    typeof data.telephoneNumber !== "string" ||
    data.telephoneNumber.trim().length === 0
  ) {
    errors.push("Telephone number is required");
  }

  if (data.company && typeof data.company !== "string") {
    errors.push("Company must be a string");
  }

  if (
    !data.email ||
    typeof data.email !== "string" ||
    !isValidEmail(data.email)
  ) {
    errors.push("Valid email is required");
  }

  if (
    !data.message ||
    typeof data.message !== "string" ||
    data.message.trim().length === 0
  ) {
    errors.push("Message is required");
  }

  if (data.privacyAccepted !== true) {
    errors.push("You must accept the privacy policy");
  }

  if (data.subject && data.subject.length > 200) {
    errors.push("Subject must be less than 200 characters");
  }

  if (data.message && data.message.length > 2000) {
    errors.push("Message must be less than 2000 characters");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      firstName,
      lastName,
      telephoneNumber,
      company,
      email,
      subject,
      message,
    } = body as ContactFormData;

    const validation = validateContactForm({
      firstName,
      lastName,
      telephoneNumber,
      company,
      email,
      subject,
      message,
    });

    if (!validation.isValid) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors: validation.errors,
        },
        { status: 400 },
      );
    }

    const emailLower = email.toLowerCase().trim();

    const existingUser = await prisma.user.findUnique({
      where: { email: emailLower },
    });

    if (existingUser) {
      await prisma.contact.updateMany({
        where: {
          email: emailLower,
          userId: null,
        },
        data: {
          userId: existingUser.id,
        },
      });
    }

    const contactData = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      telephoneNumber: telephoneNumber.trim(),
      company: company ? company.trim() : null,
      email: email.toLowerCase().trim(),
      subject: subject?.trim() || null,
      message: message.trim(),
      userId: existingUser?.id || null,
    };

    const newContact = await prisma.contact.create({
      data: contactData,
      include: {
        user: existingUser
          ? {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
              },
            }
          : false,
      },
    });

    try {
      const supportEmailHtml = await render(
        ContactNotificationEmail({
          customerFirstName: firstName,
          customerLastName: lastName,
          customerTelephoneNumber: telephoneNumber,
          customerCompany: company,
          customerEmail: email,
          subject: `Contact from ${firstName} ${lastName}`,
          message: message,
          submittedAt: new Date().toLocaleString(),
        }),
      );
      const result = await sendEmail({
        indicator: "contact-us",
        to: "imevanc.dev@gmail.com",
        subject: `[SUPPORT] New Contact: ${firstName} ${lastName}`,
        html: supportEmailHtml,
        from: "onboarding@resend.dev",
      });

      if (result.success) {
        console.log({
          success: true,
          message: "Your message has been sent to our support team",
        });
      } else {
        console.error("Failed to send notification");
      }
    } catch (error) {
      console.error("Contact form error:", error);
      console.log({
        success: false,
        error: "Failed to submit contact form",
      });
    }

    return NextResponse.json(
      {
        success: true,
        message: "Contact form submitted successfully",
        data: {
          id: newContact.id,
          firstName: newContact.firstName,
          lastName: newContact.lastName,
          telephoneNumber: newContact.telephoneNumber,
          company: newContact?.company,
          email: newContact.email,
          subject: newContact.subject,
          message: newContact.message,
          createdAt: newContact.createdAt,
          linkedToUser: !!existingUser,
          user: newContact.user || null,
          retroactivelyLinked: !!existingUser,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error submitting contact form:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error. Please try again later.",
      },
      { status: 500 },
    );
  } finally {
    await prisma.$disconnect();
  }
}
