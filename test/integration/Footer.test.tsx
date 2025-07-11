import React, { act } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Footer } from "@/components";

jest.mock("next/link", () => ({ children, href, ...props }: any) => (
  <a href={href} {...props}>
    {children}
  </a>
));

jest.mock("../../src/utils", () => ({
  getCurrentYear: () => 2024,
}));

describe("Footer Component", () => {
  const defaultProps = {
    isUserSubscribed: false,
    dataTestId: "main",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Rendering", () => {
    test("renders the footer with correct data-testid", () => {
      render(<Footer {...defaultProps} />);

      expect(screen.getByTestId("footer-main")).toBeInTheDocument();
    });

    test("renders the PayHive brand name", () => {
      render(<Footer {...defaultProps} />);

      expect(screen.getByText("PayHive")).toBeInTheDocument();
    });

    test("renders the current year in copyright", () => {
      render(<Footer {...defaultProps} />);

      expect(
        screen.getByText("© 2024 PayHive Ltd. All rights reserved."),
      ).toBeInTheDocument();
    });

    test("renders newsletter subscription section", () => {
      render(<Footer {...defaultProps} />);

      expect(screen.getByText("Stay Updated")).toBeInTheDocument();
      expect(
        screen.getByText(
          "Get the latest updates and insights delivered to your inbox.",
        ),
      ).toBeInTheDocument();
    });

    test("renders all navigation links", () => {
      render(<Footer {...defaultProps} />);

      const expectedLinks = [
        "About",
        "Blog",
        "Jobs",
        "Press",
        "Accessibility",
        "Partners",
      ];

      expectedLinks.forEach((linkText) => {
        expect(screen.getByText(linkText)).toBeInTheDocument();
      });
    });

    test("renders all social media icons", () => {
      render(<Footer {...defaultProps} />);

      const expectedSocialLinks = ["Facebook", "Instagram", "X", "YouTube"];

      expectedSocialLinks.forEach((socialName) => {
        expect(
          screen.getByText(socialName, { selector: ".sr-only" }),
        ).toBeInTheDocument();
      });
    });

    test("renders footer with correct background and styling", () => {
      render(<Footer {...defaultProps} />);

      const footer = screen.getByTestId("footer-main");
      expect(footer).toHaveClass(
        "bg-white/95",
        "backdrop-blur-sm",
        "border-t",
        "border-gray-200",
      );
    });
  });

  describe("Newsletter Subscription", () => {
    test("renders email input and subscribe button when not subscribed", () => {
      render(<Footer {...defaultProps} />);

      expect(
        screen.getByPlaceholderText("Enter your email"),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Subscribe" }),
      ).toBeInTheDocument();
    });

    test("shows subscription form when isUserSubscribed is false", () => {
      render(<Footer {...defaultProps} isUserSubscribed={false} />);

      expect(
        screen.getByPlaceholderText("Enter your email"),
      ).toBeInTheDocument();
      expect(
        screen.queryByText("Thank you for subscribing! 🎉"),
      ).not.toBeInTheDocument();
    });

    test("shows thank you message when isUserSubscribed is true", () => {
      render(<Footer {...defaultProps} isUserSubscribed={true} />);

      expect(
        screen.getByText("Thank you for subscribing! 🎉"),
      ).toBeInTheDocument();
      expect(
        screen.queryByPlaceholderText("Enter your email"),
      ).not.toBeInTheDocument();
    });

    test("handles email input change", async () => {
      const user = userEvent.setup();
      render(<Footer {...defaultProps} />);

      const emailInput = screen.getByPlaceholderText("Enter your email");

      await user.type(emailInput, "test@example.com");

      expect(emailInput).toHaveValue("test@example.com");
    });

    test("submits form and shows success message", async () => {
      const user = userEvent.setup();
      render(<Footer {...defaultProps} />);

      const emailInput = screen.getByPlaceholderText("Enter your email");
      const submitButton = screen.getByRole("button", { name: "Subscribe" });

      await user.type(emailInput, "test@example.com");
      await user.click(submitButton);

      expect(
        screen.getByText("Thank you for subscribing! 🎉"),
      ).toBeInTheDocument();
      expect(
        screen.queryByPlaceholderText("Enter your email"),
      ).not.toBeInTheDocument();
    });

    test("clears email input after successful submission", async () => {
      const user = userEvent.setup();
      render(<Footer {...defaultProps} />);

      const emailInput = screen.getByPlaceholderText("Enter your email");
      const submitButton = screen.getByRole("button", { name: "Subscribe" });

      await user.type(emailInput, "test@example.com");
      await user.click(submitButton);

      expect(
        screen.getByText("Thank you for subscribing! 🎉"),
      ).toBeInTheDocument();
    });

    test("reverts to form after 3 seconds", async () => {
      jest.useFakeTimers();
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

      render(<Footer {...defaultProps} />);

      const emailInput = screen.getByPlaceholderText("Enter your email");
      const submitButton = screen.getByRole("button", { name: "Subscribe" });

      await user.type(emailInput, "test@example.com");
      await user.click(submitButton);

      expect(
        screen.getByText("Thank you for subscribing! 🎉"),
      ).toBeInTheDocument();

      act(() => {
        jest.advanceTimersByTime(3000);
      });

      await waitFor(() => {
        expect(
          screen.getByPlaceholderText("Enter your email"),
        ).toBeInTheDocument();
        expect(
          screen.queryByText("Thank you for subscribing! 🎉"),
        ).not.toBeInTheDocument();
      });

      jest.useRealTimers();
    });

    test("does not submit form with empty email", async () => {
      const user = userEvent.setup();
      render(<Footer {...defaultProps} />);

      const submitButton = screen.getByRole("button", { name: "Subscribe" });

      await user.click(submitButton);

      expect(
        screen.queryByText("Thank you for subscribing! 🎉"),
      ).not.toBeInTheDocument();
      expect(
        screen.getByPlaceholderText("Enter your email"),
      ).toBeInTheDocument();
    });

    test("requires valid email format", () => {
      render(<Footer {...defaultProps} />);

      const emailInput = screen.getByPlaceholderText("Enter your email");

      expect(emailInput).toHaveAttribute("type", "email");
      expect(emailInput).toHaveAttribute("required");
    });

    test("email input has correct styling classes", () => {
      render(<Footer {...defaultProps} />);

      const emailInput = screen.getByPlaceholderText("Enter your email");
      expect(emailInput).toHaveClass(
        "flex-1",
        "px-4",
        "py-2",
        "border",
        "border-gray-300",
        "rounded-lg",
      );
    });

    test("subscribe button has correct styling classes", () => {
      render(<Footer {...defaultProps} />);

      const submitButton = screen.getByRole("button", { name: "Subscribe" });
      expect(submitButton).toHaveClass(
        "px-6",
        "py-2",
        "bg-green-700",
        "hover:bg-green-800",
        "text-white",
        "font-semibold",
        "rounded-lg",
      );
    });
  });

  describe("Navigation Links", () => {
    test("renders navigation links with correct href attributes", () => {
      render(<Footer {...defaultProps} />);

      const aboutLink = screen.getByText("About").closest("a");
      const blogLink = screen.getByText("Blog").closest("a");

      expect(aboutLink).toHaveAttribute("href", "#");
      expect(blogLink).toHaveAttribute("href", "#");
    });

    test("renders brand link with correct href", () => {
      render(<Footer {...defaultProps} />);

      const brandLink = screen.getByText("PayHive").closest("a");

      expect(brandLink).toHaveAttribute("href", "/");
    });

    test("navigation links have correct styling", () => {
      render(<Footer {...defaultProps} />);

      const aboutLink = screen.getByText("About");
      expect(aboutLink).toHaveClass(
        "text-lg",
        "font-semibold",
        "transition-colors",
        "px-2",
        "py-1",
        "rounded",
        "text-gray-600",
        "hover:text-green-700",
      );
    });
  });

  describe("Social Media Links", () => {
    test("renders social media links with correct href attributes", () => {
      render(<Footer {...defaultProps} />);

      const facebookLink = screen
        .getByText("Facebook", { selector: ".sr-only" })
        .closest("a");
      const instagramLink = screen
        .getByText("Instagram", { selector: ".sr-only" })
        .closest("a");
      const xLink = screen
        .getByText("X", { selector: ".sr-only" })
        .closest("a");
      const youtubeLink = screen
        .getByText("YouTube", { selector: ".sr-only" })
        .closest("a");

      expect(facebookLink).toHaveAttribute("href", "#");
      expect(instagramLink).toHaveAttribute("href", "#");
      expect(xLink).toHaveAttribute("href", "#");
      expect(youtubeLink).toHaveAttribute("href", "#");
    });

    test("has proper screen reader text for social icons", () => {
      render(<Footer {...defaultProps} />);

      const socialLinks = ["Facebook", "Instagram", "X", "YouTube"];

      socialLinks.forEach((socialName) => {
        const srText = screen.getByText(socialName, { selector: ".sr-only" });
        expect(srText).toBeInTheDocument();
        expect(srText).toHaveClass("sr-only");
      });
    });

    test("social media links have correct styling", () => {
      render(<Footer {...defaultProps} />);

      const facebookLink = screen
        .getByText("Facebook", { selector: ".sr-only" })
        .closest("a");
      expect(facebookLink).toHaveClass(
        "text-gray-600",
        "transition-colors",
        "p-2",
        "rounded-lg",
        "group",
      );
    });

    test("social media icons have correct size and hover styling", () => {
      render(<Footer {...defaultProps} />);

      const socialLinks = ["Facebook", "Instagram", "X", "YouTube"];

      socialLinks.forEach((socialName) => {
        const srText = screen.getByText(socialName, { selector: ".sr-only" });
        const link = srText.closest("a");
        const icon = link?.querySelector("svg");
        expect(icon).toHaveClass("size-6", "group-hover:text-green-700");
      });
    });
  });

  describe("Accessibility", () => {
    test("has proper ARIA labels", () => {
      render(<Footer {...defaultProps} />);

      const nav = screen.getByRole("navigation");
      expect(nav).toHaveAttribute("aria-label", "Footer");
    });

    test("has proper form structure", () => {
      render(<Footer {...defaultProps} />);

      const emailInput = screen.getByPlaceholderText("Enter your email");
      const submitButton = screen.getByRole("button", { name: "Subscribe" });

      expect(emailInput).toHaveAttribute("type", "email");
      expect(emailInput).toHaveAttribute("required");
      expect(submitButton).toHaveAttribute("type", "submit");
    });

    test("social icons have aria-hidden attribute", () => {
      render(<Footer {...defaultProps} />);

      const socialLinks = ["Facebook", "Instagram", "X", "YouTube"];

      socialLinks.forEach((socialName) => {
        const srText = screen.getByText(socialName, { selector: ".sr-only" });
        const link = srText.closest("a");
        const icon = link?.querySelector("svg");
        expect(icon).toHaveAttribute("aria-hidden", "true");
      });
    });

    test("footer has correct semantic structure", () => {
      render(<Footer {...defaultProps} />);

      const footer = screen.getByRole("contentinfo");
      expect(footer).toBeInTheDocument();
    });
  });

  describe("Form Interactions", () => {
    test("handles form submission with preventDefault", async () => {
      const user = userEvent.setup();
      render(<Footer {...defaultProps} />);

      const emailInput = screen.getByPlaceholderText("Enter your email");
      const form = emailInput.closest("form");
      const submitButton = screen.getByRole("button", { name: "Subscribe" });

      expect(form).toBeInTheDocument();

      await user.type(emailInput, "test@example.com");
      await user.click(submitButton);

      expect(
        screen.getByText("Thank you for subscribing! 🎉"),
      ).toBeInTheDocument();
    });

    test("form submission via Enter key", async () => {
      const user = userEvent.setup();
      render(<Footer {...defaultProps} />);

      const emailInput = screen.getByPlaceholderText("Enter your email");

      await user.type(emailInput, "test@example.com");
      await user.keyboard("{Enter}");

      expect(
        screen.getByText("Thank you for subscribing! 🎉"),
      ).toBeInTheDocument();
    });

    test("handles input focus and blur events", async () => {
      const user = userEvent.setup();
      render(<Footer {...defaultProps} />);

      const emailInput = screen.getByPlaceholderText("Enter your email");

      await user.click(emailInput);
      expect(emailInput).toHaveFocus();

      await user.tab();
      expect(emailInput).not.toHaveFocus();
    });
  });

  describe("Success Message Styling", () => {
    test("success message has correct styling when subscribed", () => {
      render(<Footer {...defaultProps} isUserSubscribed={true} />);

      const successMessage = screen.getByText("Thank you for subscribing! 🎉");
      const successContainer = successMessage.closest("div");

      expect(successContainer).toHaveClass(
        "p-4",
        "rounded-lg",
        "border",
        "border-green-200",
      );
      expect(successContainer).toHaveStyle({
        backgroundColor: "#f0fdf4",
      });
      expect(successMessage).toHaveClass("font-semibold");
      expect(successMessage).toHaveStyle({
        color: "#15803d",
      });
    });
  });

  describe("Layout and Structure", () => {
    test("has correct container structure", () => {
      render(<Footer {...defaultProps} />);

      const footer = screen.getByTestId("footer-main");
      const container = footer.querySelector(".mx-auto.max-w-7xl");
      expect(container).toBeInTheDocument();
    });

    test("newsletter section has correct layout classes", () => {
      render(<Footer {...defaultProps} />);

      const heading = screen.getByText("Stay Updated");
      expect(heading).toHaveClass(
        "text-2xl",
        "font-bold",
        "text-gray-900",
        "mb-2",
      );

      const description = screen.getByText(
        "Get the latest updates and insights delivered to your inbox.",
      );
      expect(description).toHaveClass("text-gray-600", "mb-6", "font-semibold");
    });

    test("copyright section has correct layout", () => {
      render(<Footer {...defaultProps} />);

      const copyrightText = screen.getByText(
        "© 2024 PayHive Ltd. All rights reserved.",
      );
      expect(copyrightText).toHaveClass("text-sm", "text-gray-600");
    });
  });

  describe("Component State Management", () => {
    test("maintains independent state from props", async () => {
      const user = userEvent.setup();
      const { rerender } = render(
        <Footer {...defaultProps} isUserSubscribed={false} />,
      );

      const emailInput = screen.getByPlaceholderText("Enter your email");
      const submitButton = screen.getByRole("button", { name: "Subscribe" });

      await user.type(emailInput, "test@example.com");
      await user.click(submitButton);

      expect(
        screen.getByText("Thank you for subscribing! 🎉"),
      ).toBeInTheDocument();

      rerender(<Footer {...defaultProps} isUserSubscribed={false} />);

      expect(
        screen.getByText("Thank you for subscribing! 🎉"),
      ).toBeInTheDocument();
    });
  });
});
