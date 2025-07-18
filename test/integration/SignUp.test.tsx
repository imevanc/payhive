import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SignUpPage from "@/app/sign-up/page";

describe("SignUpPage", () => {
  test("renders the signup page with all form elements", () => {
    render(<SignUpPage />);

    expect(screen.getByText("PayHive")).toBeInTheDocument();
    expect(screen.getByText("Create your account")).toBeInTheDocument();
    expect(screen.getByLabelText("First name")).toBeInTheDocument();
    expect(screen.getByLabelText("Last name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email address")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByLabelText("Confirm password")).toBeInTheDocument();
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
    expect(screen.getByText("Terms of Service")).toBeInTheDocument();
    expect(screen.getByText("Privacy Policy")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Create account" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Already have an account?")).toBeInTheDocument();
    expect(screen.getByText("Sign in")).toBeInTheDocument();
  });

  test("renders social login buttons", () => {
    render(<SignUpPage />);

    const socialButtons = screen.getAllByRole("button");
    expect(socialButtons).toHaveLength(3);
    expect(screen.getByAltText("Google")).toBeInTheDocument();
    expect(screen.getByAltText("X")).toBeInTheDocument();
  });

  test("has correct link navigation", () => {
    render(<SignUpPage />);

    const homeLink = screen.getByText("PayHive").closest("a");
    expect(homeLink).toHaveAttribute("href", "/");

    const signInLink = screen.getByText("Sign in").closest("a");
    expect(signInLink).toHaveAttribute("href", "/sign-in");
  });

  test("updates first name input when user types", async () => {
    const user = userEvent.setup();
    render(<SignUpPage />);

    const firstNameInput = screen.getByLabelText("First name");
    await user.type(firstNameInput, "John");

    expect(firstNameInput).toHaveValue("John");
  });

  test("updates last name input when user types", async () => {
    const user = userEvent.setup();
    render(<SignUpPage />);

    const lastNameInput = screen.getByLabelText("Last name");
    await user.type(lastNameInput, "Doe");

    expect(lastNameInput).toHaveValue("Doe");
  });

  test("updates email input when user types", async () => {
    const user = userEvent.setup();
    render(<SignUpPage />);

    const emailInput = screen.getByLabelText("Email address");
    await user.type(emailInput, "john.doe@example.com");

    expect(emailInput).toHaveValue("john.doe@example.com");
  });

  test("updates password input when user types", async () => {
    const user = userEvent.setup();
    render(<SignUpPage />);

    const passwordInput = screen.getByLabelText("Password");
    await user.type(passwordInput, "password123");

    expect(passwordInput).toHaveValue("password123");
  });

  test("updates confirm password input when user types", async () => {
    const user = userEvent.setup();
    render(<SignUpPage />);

    const confirmPasswordInput = screen.getByLabelText("Confirm password");
    await user.type(confirmPasswordInput, "password123");

    expect(confirmPasswordInput).toHaveValue("password123");
  });

  test("toggles terms checkbox when clicked", async () => {
    const user = userEvent.setup();
    render(<SignUpPage />);

    const checkbox = screen.getByRole("checkbox");

    expect(checkbox).not.toBeChecked();

    await user.click(checkbox);
    expect(checkbox).toBeChecked();

    await user.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  test("can fill out complete form and submit", async () => {
    const user = userEvent.setup();
    render(<SignUpPage />);

    await user.type(screen.getByLabelText("First name"), "John");
    await user.type(screen.getByLabelText("Last name"), "Doe");
    await user.type(
      screen.getByLabelText("Email address"),
      "john.doe@example.com",
    );
    await user.type(screen.getByLabelText("Password"), "password123");
    await user.type(screen.getByLabelText("Confirm password"), "password123");
    await user.click(screen.getByRole("checkbox"));

    await user.click(screen.getByRole("button", { name: "Create account" }));

    expect(screen.getByLabelText("First name")).toHaveValue("John");
    expect(screen.getByLabelText("Last name")).toHaveValue("Doe");
    expect(screen.getByLabelText("Email address")).toHaveValue(
      "john.doe@example.com",
    );
    expect(screen.getByLabelText("Password")).toHaveValue("password123");
    expect(screen.getByLabelText("Confirm password")).toHaveValue(
      "password123",
    );
    expect(screen.getByRole("checkbox")).toBeChecked();
  });

  test("has required attributes on all form inputs", () => {
    render(<SignUpPage />);

    expect(screen.getByLabelText("First name")).toBeRequired();
    expect(screen.getByLabelText("Last name")).toBeRequired();
    expect(screen.getByLabelText("Email address")).toBeRequired();
    expect(screen.getByLabelText("Password")).toBeRequired();
    expect(screen.getByLabelText("Confirm password")).toBeRequired();
  });

  test("has correct input types", () => {
    render(<SignUpPage />);

    expect(screen.getByLabelText("First name")).toHaveAttribute("type", "text");
    expect(screen.getByLabelText("Last name")).toHaveAttribute("type", "text");
    expect(screen.getByLabelText("Email address")).toHaveAttribute(
      "type",
      "email",
    );
    expect(screen.getByLabelText("Password")).toHaveAttribute(
      "type",
      "password",
    );
    expect(screen.getByLabelText("Confirm password")).toHaveAttribute(
      "type",
      "password",
    );
  });

  test("has appropriate placeholders", () => {
    render(<SignUpPage />);

    expect(screen.getByLabelText("First name")).toHaveAttribute(
      "placeholder",
      "First name",
    );
    expect(screen.getByLabelText("Last name")).toHaveAttribute(
      "placeholder",
      "Last name",
    );
    expect(screen.getByLabelText("Email address")).toHaveAttribute(
      "placeholder",
      "Email address",
    );
    expect(screen.getByLabelText("Password")).toHaveAttribute(
      "placeholder",
      "Password",
    );
    expect(screen.getByLabelText("Confirm password")).toHaveAttribute(
      "placeholder",
      "Confirm password",
    );
  });

  test("has proper form labels associated with inputs", () => {
    render(<SignUpPage />);

    const firstNameInput = screen.getByLabelText("First name");
    expect(firstNameInput).toHaveAttribute("id", "firstName");

    const lastNameInput = screen.getByLabelText("Last name");
    expect(lastNameInput).toHaveAttribute("id", "lastName");

    const emailInput = screen.getByLabelText("Email address");
    expect(emailInput).toHaveAttribute("id", "email");

    const passwordInput = screen.getByLabelText("Password");
    expect(passwordInput).toHaveAttribute("id", "password");

    const confirmPasswordInput = screen.getByLabelText("Confirm password");
    expect(confirmPasswordInput).toHaveAttribute("id", "confirmPassword");
  });

  test("has proper checkbox label association", () => {
    render(<SignUpPage />);

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toHaveAttribute("id", "agreeToTerms");

    const label = screen.getByText(/I agree to the/);
    expect(label).toHaveAttribute("for", "agreeToTerms");
  });

  test("has proper alt text for images", () => {
    render(<SignUpPage />);

    expect(screen.getByAltText("Google")).toBeInTheDocument();
    expect(screen.getByAltText("X")).toBeInTheDocument();
  });

  test("maintains independent state for each form field", async () => {
    const user = userEvent.setup();
    render(<SignUpPage />);

    await user.type(screen.getByLabelText("First name"), "John");
    await user.type(screen.getByLabelText("Email address"), "john@example.com");
    await user.type(screen.getByLabelText("Password"), "password");

    expect(screen.getByLabelText("First name")).toHaveValue("John");
    expect(screen.getByLabelText("Last name")).toHaveValue("");
    expect(screen.getByLabelText("Email address")).toHaveValue(
      "john@example.com",
    );
    expect(screen.getByLabelText("Password")).toHaveValue("password");
    expect(screen.getByLabelText("Confirm password")).toHaveValue("");
  });

  test("checkbox state is independent of other form fields", async () => {
    const user = userEvent.setup();
    render(<SignUpPage />);

    await user.type(screen.getByLabelText("First name"), "John");
    await user.click(screen.getByRole("checkbox"));

    await user.clear(screen.getByLabelText("First name"));

    expect(screen.getByLabelText("First name")).toHaveValue("");
    expect(screen.getByRole("checkbox")).toBeChecked();
  });

  test("renders social login buttons with hover states", () => {
    render(<SignUpPage />);

    const socialButtons = screen
      .getAllByRole("button")
      .filter((button) => button.querySelector("img"));

    expect(socialButtons).toHaveLength(2);

    socialButtons.forEach((button) => {
      expect(button).toHaveClass("hover:bg-gray-100");
    });
  });
});
