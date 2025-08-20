import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Footer } from "@/components";

describe("Footer Component", () => {
  const defaultProps = {
    isUserSubscribed: false,
    dataTestId: "main",
  };

  beforeEach(() => (global.fetch = jest.fn()));

  const createMockResponse = (data: any, ok = true): Response => {
    return {
      ok,
      json: () => Promise.resolve(data),
      headers: new Headers(),
      redirected: false,
      status: ok ? 200 : 400,
      statusText: ok ? "OK" : "Bad Request",
      type: "basic",
      url: "http://localhost",
      clone: () => createMockResponse(data, ok),
      body: null,
      bodyUsed: false,
      arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)),
      blob: () => Promise.resolve(new Blob()),
      formData: () => Promise.resolve(new FormData()),
      text: () => Promise.resolve(""),
    } as Response;
  };

  describe("Newsletter Subscription", () => {
    test("handles successful newsletter subscription", async () => {
      const successResponse = createMockResponse({
        success: true,
        message: "Thank you for subscribing! 🎉",
      });

      global.fetch = jest.fn().mockResolvedValue(successResponse);

      const user = userEvent.setup();
      render(<Footer {...defaultProps} />);

      const emailInput = screen.getByPlaceholderText("Enter your email");
      const submitButton = screen.getByRole("button", { name: "Subscribe" });

      await user.type(emailInput, "test@example.com");
      expect(submitButton).toBeEnabled();

      await user.click(submitButton);
      expect(submitButton).toHaveTextContent("Subscribing...");
      expect(submitButton).toBeDisabled();
      expect(emailInput).toBeDisabled();

      await waitFor(() => {
        expect(
          screen.getByText("Thank you for subscribing! 🎉"),
        ).toBeInTheDocument();
      });
    });

    test("handles failed newsletter subscription", async () => {
      const errorResponse = createMockResponse(
        { error: "Subscription failed" },
        false,
      );

      global.fetch = jest.fn().mockResolvedValue(errorResponse);

      const user = userEvent.setup();
      render(<Footer {...defaultProps} />);

      const emailInput = screen.getByPlaceholderText("Enter your email");
      await user.type(emailInput, "test@example.com");
      await user.click(screen.getByRole("button", { name: "Subscribe" }));

      await waitFor(() => {
        expect(screen.getByText("Subscription failed")).toBeInTheDocument();
        expect(emailInput).toBeEnabled();
        expect(emailInput).toHaveValue("test@example.com");
      });
    });

    test("handles network error during subscription", async () => {
      global.fetch = jest.fn().mockRejectedValue(new Error("Network error"));

      const user = userEvent.setup();
      render(<Footer {...defaultProps} />);

      const emailInput = screen.getByPlaceholderText("Enter your email");
      await user.type(emailInput, "test@example.com");

      const submitButton = screen.getByRole("button", { name: "Subscribe" });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/Network error/)).toBeInTheDocument();
      });

      await waitFor(() => {
        expect(emailInput).toBeEnabled();
        expect(emailInput).toHaveValue("test@example.com");
        expect(submitButton).toBeEnabled();
        expect(submitButton).toHaveTextContent("Subscribe");
      });
    });

    test("shows loading state during submission", async () => {
      const successResponse = createMockResponse({
        success: true,
        message: "Thank you for subscribing! 🎉",
      });

      let resolvePromise!: (value: Response) => void;
      const promise = new Promise<Response>((resolve) => {
        resolvePromise = resolve;
      });

      global.fetch = jest.fn().mockReturnValue(promise);

      const user = userEvent.setup();
      render(<Footer {...defaultProps} />);

      const emailInput = screen.getByPlaceholderText("Enter your email");
      await user.type(emailInput, "test@example.com");
      await user.click(screen.getByRole("button", { name: "Subscribe" }));

      expect(screen.getByRole("button")).toHaveTextContent("Subscribing...");
      expect(screen.getByRole("button")).toBeDisabled();
      expect(emailInput).toBeDisabled();

      resolvePromise(successResponse);

      await waitFor(() => {
        expect(
          screen.queryByRole("button", { name: "Subscribing..." }),
        ).not.toBeInTheDocument();
      });
    });
  });

  afterEach(() => jest.resetAllMocks());
});
