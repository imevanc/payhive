import { NextRequest, NextResponse } from "next/server";
import { ContactFormData } from "@/types";
import { isValidEmail } from "@/utils";
import { PrismaClient } from "../../../../generated/prisma";

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

  if (data.name && data.name.length > 100) {
    errors.push("Name must be less than 100 characters");
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
    const { firstName, lastName, email, subject, message } =
      body as ContactFormData;

    const validation = validateContactForm({
      firstName,
      lastName,
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

    return NextResponse.json(
      {
        success: true,
        message: "Contact form submitted successfully",
        data: {
          id: newContact.id,
          firstName: newContact.firstName,
          lastName: newContact.lastName,
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
