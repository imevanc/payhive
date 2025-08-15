import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SignUpPage from "@/app/sign-up/page";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("SignUpPage", () => {
  const setup = async () => {
    render(<SignUpPage />);
    return await userEvent.setup();
  };

  test("renders all core form elements", async () => {
    await setup();

    expect(screen.getByText("PayHive")).toBeInTheDocument();
    expect(screen.getByText("Create your account")).toBeInTheDocument();

    const labels = ["First name", "Last name", "Email address", "Password"];
    labels.forEach((label) => {
      expect(screen.getByLabelText(label)).toBeInTheDocument();
    });

    expect(screen.getByRole("checkbox")).toBeInTheDocument();
    expect(screen.getByText("Terms of Service")).toBeInTheDocument();
    expect(screen.getByText("Privacy Policy")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Create account" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Already have an account?")).toBeInTheDocument();
    expect(screen.getByText("Sign in")).toBeInTheDocument();
  });

  test("has correct link destinations", async () => {
    await setup();

    expect(screen.getByText("PayHive").closest("a")).toHaveAttribute(
      "href",
      "/",
    );
    expect(screen.getByText("Sign in").closest("a")).toHaveAttribute(
      "href",
      "/sign-in",
    );
  });

  test("updates input fields correctly", async () => {
    const user = await setup();

    await user.type(screen.getByLabelText("First name"), "John");
    await user.type(screen.getByLabelText("Last name"), "Doe");
    await user.type(screen.getByLabelText("Email address"), "john@example.com");
    await user.type(screen.getByLabelText("Password"), "Password123!");

    expect(screen.getByLabelText("First name")).toHaveValue("John");
    expect(screen.getByLabelText("Last name")).toHaveValue("Doe");
    expect(screen.getByLabelText("Email address")).toHaveValue(
      "john@example.com",
    );
    expect(screen.getByLabelText("Password")).toHaveValue("Password123!");
  });

  test("toggles checkbox state independently", async () => {
    const user = await setup();
    const checkbox = screen.getByRole("checkbox");

    expect(checkbox).not.toBeChecked();
    await user.click(checkbox);
    expect(checkbox).toBeChecked();
    await user.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  test("submits form with valid data", async () => {
    const user = await setup();

    await user.type(screen.getByLabelText("First name"), "John");
    await user.type(screen.getByLabelText("Last name"), "Doe");
    await user.type(
      screen.getByLabelText("Email address"),
      "john.doe@example.com",
    );
    await user.type(screen.getByLabelText("Password"), "Password123!");
    await user.click(screen.getByRole("checkbox"));
    await user.click(screen.getByRole("button", { name: "Create account" }));

    expect(screen.getByRole("checkbox")).toBeChecked();
  });

  test("shows required field errors on empty submit", async () => {
    const user = await setup();
    await user.click(screen.getByRole("button", { name: /Create account/i }));

    expect(
      await screen.findByText("First name is required"),
    ).toBeInTheDocument();
    expect(screen.getByText("Last name is required")).toBeInTheDocument();
    expect(screen.getByText("Email is required")).toBeInTheDocument();
    expect(screen.getByText("Password is required")).toBeInTheDocument();
    expect(
      screen.getByText("Please confirm your password"),
    ).toBeInTheDocument();
    expect(screen.getByText("You must agree to the terms")).toBeInTheDocument();
  });

  test("shows password complexity errors", async () => {
    const user = await setup();

    await user.type(screen.getByLabelText("Password"), "pass");
    await user.click(screen.getByRole("button", { name: /Create account/i }));

    expect(screen.getByText("• Must be 8–12 characters")).toBeInTheDocument();
    expect(
      screen.getByText("• Must include an uppercase letter"),
    ).toBeInTheDocument();
    expect(screen.getByText("• Must include a number")).toBeInTheDocument();
    expect(
      screen.getByText("• Must include a special character"),
    ).toBeInTheDocument();
  });

  test("has correct input types and placeholders", async () => {
    await setup();

    const fields = [
      { label: "First name", type: "text", placeholder: "First name" },
      { label: "Last name", type: "text", placeholder: "Last name" },
      { label: "Email address", type: "email", placeholder: "Email address" },
      { label: "Password", type: "password", placeholder: "Password" },
    ];

    fields.forEach(({ label, type, placeholder }) => {
      const input = screen.getByLabelText(label);
      expect(input).toHaveAttribute("type", type);
      expect(input).toHaveAttribute("placeholder", placeholder);
    });
  });

  test("has correct label associations", async () => {
    await setup();

    expect(screen.getByLabelText("First name")).toHaveAttribute(
      "id",
      "firstName",
    );
    expect(screen.getByLabelText("Last name")).toHaveAttribute(
      "id",
      "lastName",
    );
    expect(screen.getByLabelText("Email address")).toHaveAttribute(
      "id",
      "email",
    );
    expect(screen.getByLabelText("Password")).toHaveAttribute("id", "password");

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toHaveAttribute("id", "agreeToTerms");
  });

  test("renders social login buttons with alt text and hover states", async () => {
    await setup();

    const socialImages = ["Google", "X"];
    socialImages.forEach((alt) => {
      expect(screen.getByAltText(alt)).toBeInTheDocument();
    });

    const socialButtons = screen
      .getAllByRole("button")
      .filter((btn) => btn.querySelector("img"));

    expect(socialButtons).toHaveLength(2);
    socialButtons.forEach((btn) => {
      expect(btn).toHaveClass("hover:bg-gray-100");
    });
  });

  test("maintains independent state across fields", async () => {
    const user = await setup();

    await user.type(screen.getByLabelText("First name"), "John");
    await user.type(screen.getByLabelText("Email address"), "john@example.com");
    await user.type(screen.getByLabelText("Password"), "Password123!");

    expect(screen.getByLabelText("First name")).toHaveValue("John");
    expect(screen.getByLabelText("Last name")).toHaveValue("");
    expect(screen.getByLabelText("Email address")).toHaveValue(
      "john@example.com",
    );
    expect(screen.getByLabelText("Password")).toHaveValue("Password123!");
  });

  test("checkbox state is independent of other fields", async () => {
    const user = await setup();

    await user.type(screen.getByLabelText("First name"), "John");
    await user.click(screen.getByRole("checkbox"));
    await user.clear(screen.getByLabelText("First name"));

    expect(screen.getByLabelText("First name")).toHaveValue("");
    expect(screen.getByRole("checkbox")).toBeChecked();
  });
});
