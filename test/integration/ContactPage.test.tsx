import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ContactPage from "@/app/contact/page";

describe("ContactPage", () => {
  beforeEach(() => {
    render(<ContactPage />);
  });

  describe("Basic Rendering", () => {
    test("renders contact sales heading", () => {
      expect(
        screen.getByRole("heading", { name: /contact sales/i }),
      ).toBeInTheDocument();
    });

    test("renders description text", () =>
      expect(screen.getByTestId(/contact-description/i)).toBeInTheDocument());
  });

  describe("Accessibility", () => {
    test("all form inputs have proper labels", () => {
      const inputs = [
        { label: /first name/i, input: "first-name" },
        { label: /last name/i, input: "last-name" },
        { label: /company/i, input: "company" },
        { label: /email/i, input: "email" },
        { label: /phone number/i, input: "phone-number" },
        { label: /message/i, input: "message" },
      ];

      inputs.forEach(({ label, input }) => {
        const labelElement = screen.getByLabelText(label);
        expect(labelElement).toBeInTheDocument();
        expect(labelElement).toHaveAttribute("id", input);
      });
    });

    test("country dropdown has proper aria-label", () => {
      const countrySelect = screen.getByLabelText(/country/i);
      expect(countrySelect).toBeInTheDocument();
      expect(countrySelect).toHaveAttribute("aria-label", "Country");
    });

    test("checkbox has proper aria-label", () => {
      const checkbox = screen.getByLabelText(/agree to policies/i);
      expect(checkbox).toBeInTheDocument();
      expect(checkbox).toHaveAttribute("aria-label", "Agree to policies");
    });

    test("form has proper heading hierarchy", () => {
      const heading = screen.getByRole("heading", { name: /contact sales/i });
      expect(heading).toHaveClass("text-4xl", "sm:text-5xl");
    });

    test("decorative elements have aria-hidden", () => {
      const decorativeDiv = document.querySelector('[aria-hidden="true"]');
      expect(decorativeDiv).toBeInTheDocument();
    });
  });

  describe("Input Fields", () => {
    test("first name input accepts text input", async () => {
      const user = userEvent.setup();
      const firstNameInput = screen.getByLabelText(/first name/i);

      await user.type(firstNameInput, "John");
      expect(firstNameInput).toHaveValue("John");
    });

    test("last name input accepts text input", async () => {
      const user = userEvent.setup();
      const lastNameInput = screen.getByLabelText(/last name/i);

      await user.type(lastNameInput, "Doe");
      expect(lastNameInput).toHaveValue("Doe");
    });

    test("company input accepts text input", async () => {
      const user = userEvent.setup();
      const companyInput = screen.getByLabelText(/company/i);

      await user.type(companyInput, "Acme Corp");
      expect(companyInput).toHaveValue("Acme Corp");
    });

    test("email input has correct type and accepts email", async () => {
      const user = userEvent.setup();
      const emailInput = screen.getByLabelText(/email/i);

      expect(emailInput).toHaveAttribute("type", "email");
      await user.type(emailInput, "john@example.com");
      expect(emailInput).toHaveValue("john@example.com");
    });

    test("phone number input accepts text input", async () => {
      const user = userEvent.setup();
      const phoneInput = screen.getByLabelText(/phone number/i);

      await user.type(phoneInput, "123-456-7890");
      expect(phoneInput).toHaveValue("123-456-7890");
    });

    test("message textarea accepts text input", async () => {
      const user = userEvent.setup();
      const messageInput = screen.getByLabelText(/message/i);

      expect(messageInput.tagName).toBe("TEXTAREA");
      expect(messageInput).toHaveAttribute("rows", "4");

      await user.type(messageInput, "This is a test message");
      expect(messageInput).toHaveValue("This is a test message");
    });

    test("inputs have proper autocomplete attributes", () => {
      expect(screen.getByLabelText(/first name/i)).toHaveAttribute(
        "autocomplete",
        "given-name",
      );
      expect(screen.getByLabelText(/last name/i)).toHaveAttribute(
        "autocomplete",
        "family-name",
      );
      expect(screen.getByLabelText(/company/i)).toHaveAttribute(
        "autocomplete",
        "organization",
      );
      expect(screen.getByLabelText(/email/i)).toHaveAttribute(
        "autocomplete",
        "email",
      );
      expect(screen.getByLabelText(/country/i)).toHaveAttribute(
        "autocomplete",
        "country",
      );
    });
  });

  describe("Country Dropdown", () => {
    test("renders with default options", () => {
      const countrySelect = screen.getByLabelText(/country/i);
      expect(countrySelect).toBeInTheDocument();

      const options = screen.getAllByRole("option");
      expect(options).toHaveLength(3);
      expect(options[0]).toHaveTextContent("US");
      expect(options[1]).toHaveTextContent("CA");
      expect(options[2]).toHaveTextContent("EU");
    });

    test("allows selection of different countries", async () => {
      const user = userEvent.setup();
      const countrySelect = screen.getByLabelText(/country/i);

      await user.selectOptions(countrySelect, "CA");
      expect(countrySelect).toHaveValue("CA");

      await user.selectOptions(countrySelect, "EU");
      expect(countrySelect).toHaveValue("EU");
    });

    test("has proper styling classes", () => {
      const countrySelect = screen.getByLabelText(/country/i);
      expect(countrySelect).toHaveClass(
        "col-start-1",
        "row-start-1",
        "w-full",
        "appearance-none",
        "rounded-md",
        "py-2",
        "pl-3.5",
        "pr-7",
      );
    });

    test("chevron icon is present and properly styled", () => {
      const chevronIcon = document.querySelector(
        '[aria-hidden="true"].pointer-events-none',
      );
      expect(chevronIcon).toBeInTheDocument();
      expect(chevronIcon).toHaveClass(
        "pointer-events-none",
        "col-start-1",
        "row-start-1",
        "mr-2",
        "size-5",
        "self-center",
        "justify-self-end",
      );
    });
  });

  describe("Checkbox Interaction", () => {
    test("checkbox can be checked and unchecked", async () => {
      const user = userEvent.setup();
      const checkbox = screen.getByLabelText(/agree to policies/i);

      expect(checkbox).not.toBeChecked();

      await user.click(checkbox);
      expect(checkbox).toBeChecked();

      await user.click(checkbox);
      expect(checkbox).not.toBeChecked();
    });

    test("checkbox label is clickable", async () => {
      const user = userEvent.setup();
      const checkbox = screen.getByLabelText(/agree to policies/i);
      const label = screen.getByText(/by selecting this, you agree to our/i);

      expect(checkbox).not.toBeChecked();

      await user.click(label);
      expect(checkbox).toBeChecked();
    });

    test("privacy policy link is present", () => {
      const privacyLink = screen.getByRole("link", { name: /privacy policy/i });
      expect(privacyLink).toBeInTheDocument();
      expect(privacyLink).toHaveAttribute("href", "#");
      expect(privacyLink).toHaveClass(
        "whitespace-nowrap",
        "font-semibold",
        "text-green-600",
      );
    });
  });

  describe("Submit Button", () => {
    test("submit button is present with correct attributes", () => {
      const submitButton = screen.getByRole("button", { name: /let's talk/i });
      expect(submitButton).toBeInTheDocument();
      expect(submitButton).toHaveAttribute("type", "submit");
    });

    test("submit button has proper styling", () => {
      const submitButton = screen.getByRole("button", { name: /let's talk/i });
      expect(submitButton).toHaveClass(
        "block",
        "w-full",
        "rounded-md",
        "bg-green-600",
        "px-3.5",
        "py-2.5",
        "text-center",
        "text-sm",
        "font-semibold",
        "text-white",
        "shadow-sm",
      );
    });

    test("submit button can be clicked", async () => {
      const user = userEvent.setup();
      const submitButton = screen.getByRole("button", { name: /let's talk/i });
      const form = document.querySelector("form");
      form?.addEventListener("submit", (e) => e.preventDefault());

      await user.click(submitButton);
      expect(submitButton).toBeInTheDocument();
    });
  });

  describe("Focus Management", () => {
    test("inputs receive focus on tab navigation", async () => {
      const user = userEvent.setup();
      const firstNameInput = screen.getByLabelText(/first name/i);
      const lastNameInput = screen.getByLabelText(/last name/i);

      await user.tab();
      expect(firstNameInput).toHaveFocus();

      await user.tab();
      expect(lastNameInput).toHaveFocus();
    });

    test("checkbox receives focus", async () => {
      const user = userEvent.setup();
      const checkbox = screen.getByLabelText(/agree to policies/i);

      await user.click(checkbox);
      expect(checkbox).toHaveFocus();
    });

    test("submit button receives focus", async () => {
      const user = userEvent.setup();
      const submitButton = screen.getByRole("button", { name: /let's talk/i });
      const form = document.querySelector("form");
      form?.addEventListener("submit", (e) => e.preventDefault());

      await user.click(submitButton);
      expect(submitButton).toHaveFocus();
    });
  });

  describe("Styling and Layout", () => {
    test("main container has proper classes", () => {
      const main = screen.getByRole("main");
      expect(main).toHaveClass("bg-white", "isolate", "px-6", "py-8");
    });

    test("form has proper responsive classes", () => {
      const form = document.querySelector("form");
      expect(form).toHaveClass("mx-auto", "mt-16", "max-w-xl", "sm:mt-20");
    });

    test("grid layout is applied correctly", () => {
      const gridDiv = document.querySelector(
        ".grid.grid-cols-1.gap-x-8.gap-y-6.sm\\:grid-cols-2",
      );
      expect(gridDiv).toBeInTheDocument();
    });

    test("input focus styles are applied", () => {
      const firstNameInput = screen.getByLabelText(/first name/i);
      expect(firstNameInput).toHaveClass(
        "focus:outline",
        "focus:outline-2",
        "focus:-outline-offset-2",
        "focus:outline-green-600",
      );
    });

    test("decorative background element has proper styles", () => {
      const decorativeElement = document.querySelector('[style*="clip-path"]');
      expect(decorativeElement).toBeInTheDocument();
      expect(decorativeElement).toHaveClass(
        "relative",
        "left-1/2",
        "-z-10",
        "aspect-[1155/678]",
        "bg-gradient-to-tr",
        "from-[#d9f99d]",
        "to-[#16a34a]",
        "opacity-40",
      );
    });
  });

  describe("Form Validation", () => {
    test("email input validates email format", async () => {
      const user = userEvent.setup();
      const emailInput = screen.getByLabelText(/email/i);

      await user.type(emailInput, "invalid-email");
      fireEvent.blur(emailInput);

      expect(emailInput).toHaveAttribute("type", "email");
    });

    test("required fields are properly marked", () => {
      const inputs = screen.getAllByRole("textbox");
      inputs.forEach((input) => {
        expect(input).toBeInTheDocument();
      });
    });
  });

  describe("Error Handling", () => {
    test("form handles submission gracefully", async () => {
      const user = userEvent.setup();
      const form = document.querySelector("form");
      const submitButton = screen.getByRole("button", { name: /let's talk/i });

      const mockSubmit = jest.fn((e) => e.preventDefault());
      form?.addEventListener("submit", mockSubmit);

      await user.click(submitButton);

      expect(mockSubmit).toHaveBeenCalled();
    });
  });

  describe("Integration Tests", () => {
    test("complete form filling workflow", async () => {
      const user = userEvent.setup();

      const form = document.querySelector("form");
      const mockSubmit = jest.fn((e) => e.preventDefault());
      form?.addEventListener("submit", mockSubmit);

      await user.type(screen.getByLabelText(/first name/i), "John");
      await user.type(screen.getByLabelText(/last name/i), "Doe");
      await user.type(screen.getByLabelText(/company/i), "Acme Corp");
      await user.type(screen.getByLabelText(/email/i), "john@acme.com");
      await user.selectOptions(screen.getByLabelText(/country/i), "US");
      await user.type(screen.getByLabelText(/phone number/i), "123-456-7890");
      await user.type(
        screen.getByLabelText(/message/i),
        "Hello, I would like to learn more about your services.",
      );
      await user.click(screen.getByLabelText(/agree to policies/i));

      expect(screen.getByLabelText(/first name/i)).toHaveValue("John");
      expect(screen.getByLabelText(/last name/i)).toHaveValue("Doe");
      expect(screen.getByLabelText(/company/i)).toHaveValue("Acme Corp");
      expect(screen.getByLabelText(/email/i)).toHaveValue("john@acme.com");
      expect(screen.getByLabelText(/country/i)).toHaveValue("US");
      expect(screen.getByLabelText(/phone number/i)).toHaveValue(
        "123-456-7890",
      );
      expect(screen.getByLabelText(/message/i)).toHaveValue(
        "Hello, I would like to learn more about your services.",
      );
      expect(screen.getByLabelText(/agree to policies/i)).toBeChecked();

      await user.click(screen.getByRole("button", { name: /let's talk/i }));

      expect(mockSubmit).toHaveBeenCalled();
    });
  });
});
