import { sendEmail } from "@/utils";
import { Resend } from "resend";
import type { SendEmailParams } from "@/types";

jest.mock("resend", () => {
  return {
    Resend: jest.fn().mockImplementation(() => ({
      emails: {
        send: jest.fn(),
      },
    })),
  };
});

const mockSend = (Resend as unknown as jest.Mock).mock.results[0].value.emails
  .send;

describe("sendEmail", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should send a newsletter email successfully", async () => {
    mockSend.mockResolvedValueOnce({ id: "123" });

    const params: SendEmailParams = {
      indicator: "newsletter",
      to: "test@example.com",
      html: "<p>Hello newsletter</p>",
      subject: "Newsletter Subject",
    };

    const result = await sendEmail(params);

    expect(mockSend).toHaveBeenCalledWith({
      from: "imevanc.dev@gmail.com",
      to: ["test@example.com"],
      html: "<p>Hello newsletter</p>",
      subject: "Newsletter Subject",
    });

    expect(result).toEqual({ success: true, data: { id: "123" } });
  });

  test("should send a contact-us email successfully", async () => {
    mockSend.mockResolvedValueOnce({ id: "456" });

    const params: SendEmailParams = {
      indicator: "contact-us",
      to: "support@example.com",
      subject: "Help needed",
      html: "<p>Support request</p>",
      text: "Plain text fallback",
    };

    const result = await sendEmail(params);

    expect(mockSend).toHaveBeenCalledWith({
      from: "imevanc.dev@gmail.com",
      to: ["support@example.com"],
      subject: "Help needed",
      html: "<p>Support request</p>",
      text: "Plain text fallback",
    });

    expect(result).toEqual({ success: true, data: { id: "456" } });
  });

  test("should return error when indicator is invalid", async () => {
    const params: SendEmailParams = {
      indicator: "invalid" as any,
      to: "fail@example.com",
      html: "<p>bad</p>",
      subject: "Bad",
    };

    const result = await sendEmail(params);

    expect(result.success).toBe(false);
    expect(result.error).toBeInstanceOf(Error);
    expect((result.error as Error).message).toBe("Invalid email indicator");
    expect(mockSend).not.toHaveBeenCalled();
  });

  test("should return error when resend throws", async () => {
    mockSend.mockRejectedValueOnce(new Error("Resend service down"));

    const params: SendEmailParams = {
      indicator: "newsletter",
      to: "test@example.com",
      html: "<p>Failure</p>",
      subject: "Failure",
    };

    const result = await sendEmail(params);

    expect(result.success).toBe(false);
    expect(result.error).toBeInstanceOf(Error);
    expect((result.error as Error).message).toBe("Resend service down");
  });
});
