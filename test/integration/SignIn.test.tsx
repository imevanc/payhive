import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import SignInPage from "@/app/sign-in/page";
import { useRouter } from "next/router";

const mockConsoleLog = jest.fn();
const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("SignInPage", () => {
  beforeEach(() => {
    mockConsoleLog.mockClear();
    global.console = { ...global.console, log: mockConsoleLog };
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  describe("Rendering", () => {
    test("renders the sign-in page with all required elements", () => {
      render(<SignInPage />);

      expect(screen.getByText("PayHive")).toBeInTheDocument();
      expect(screen.getByText("Sign in to your account")).toBeInTheDocument();
      expect(screen.getByLabelText("Email address")).toBeInTheDocument();
      expect(screen.getByLabelText("Password")).toBeInTheDocument();
      expect(screen.getByLabelText("Remember me")).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Sign in" }),
      ).toBeInTheDocument();
    });

    test("renders logo with correct link", () => {
      render(<SignInPage />);

      const logoLink = screen.getByRole("link", { name: "PayHive" });
      expect(logoLink).toHaveAttribute("href", "/");
      expect(logoLink).toContainElement(screen.getByText("PayHive"));
    });

    test("renders forgot password link", () => {
      render(<SignInPage />);

      const forgotPasswordLink = screen.getByText("Forgot password?");
      expect(forgotPasswordLink).toBeInTheDocument();
      expect(forgotPasswordLink).toHaveAttribute("href", "#");
    });

    test("renders sign up link", () => {
      render(<SignInPage />);

      expect(screen.getByText("Not a member?")).toBeInTheDocument();
      expect(screen.getByText("Start a free trial")).toBeInTheDocument();
    });

    test("renders social login buttons", () => {
      render(<SignInPage />);

      const googleButton = screen.getByRole("img", { name: "Google" });
      const xButton = screen.getByRole("img", { name: "X" });

      expect(googleButton).toBeInTheDocument();
      expect(xButton).toBeInTheDocument();
    });
  });

  describe("Form Interactions", () => {
    test("updates email input value when typed", async () => {
      render(<SignInPage />);

      const emailInput = screen.getByLabelText(
        "Email address",
      ) as HTMLInputElement;

      fireEvent.change(emailInput, { target: { value: "test@example.com" } });

      await waitFor(() => {
        expect(emailInput.value).toBe("test@example.com");
      });
    });

    test("updates password input value when typed", async () => {
      render(<SignInPage />);

      const passwordInput = screen.getByLabelText(
        "Password",
      ) as HTMLInputElement;

      fireEvent.change(passwordInput, { target: { value: "password123" } });

      await waitFor(() => {
        expect(passwordInput.value).toBe("password123");
      });
    });

    test("toggles remember me checkbox", async () => {
      render(<SignInPage />);

      const rememberMeCheckbox = screen.getByLabelText(
        "Remember me",
      ) as HTMLInputElement;

      expect(rememberMeCheckbox.checked).toBe(false);

      fireEvent.click(rememberMeCheckbox);

      await waitFor(() => {
        expect(rememberMeCheckbox.checked).toBe(true);
      });

      fireEvent.click(rememberMeCheckbox);

      await waitFor(() => {
        expect(rememberMeCheckbox.checked).toBe(false);
      });
    });

    test("calls console.log when sign in button is clicked", async () => {
      render(<SignInPage />);

      const signInButton = screen.getByRole("button", { name: "Sign in" });

      fireEvent.click(signInButton);

      await waitFor(() => {
        expect(mockConsoleLog).toHaveBeenCalledWith("Form submitted");
      });
    });
  });

  describe("Form Validation", () => {
    test("email input has correct attributes", () => {
      render(<SignInPage />);

      const emailInput = screen.getByLabelText("Email address");

      expect(emailInput).toHaveAttribute("type", "email");
      expect(emailInput).toHaveAttribute("required");
      expect(emailInput).toHaveAttribute("placeholder", "Email address");
    });

    test("password input has correct attributes", () => {
      render(<SignInPage />);

      const passwordInput = screen.getByLabelText("Password");

      expect(passwordInput).toHaveAttribute("type", "password");
      expect(passwordInput).toHaveAttribute("required");
      expect(passwordInput).toHaveAttribute("placeholder", "Password");
    });

    test("checkbox has correct attributes", () => {
      render(<SignInPage />);

      const checkbox = screen.getByLabelText("Remember me");

      expect(checkbox).toHaveAttribute("type", "checkbox");
      expect(checkbox).toHaveAttribute("id", "rememberMe");
    });
  });

  describe("Component State", () => {
    test("maintains form state across multiple interactions", async () => {
      render(<SignInPage />);

      const emailInput = screen.getByLabelText(
        "Email address",
      ) as HTMLInputElement;
      const passwordInput = screen.getByLabelText(
        "Password",
      ) as HTMLInputElement;
      const rememberMeCheckbox = screen.getByLabelText(
        "Remember me",
      ) as HTMLInputElement;

      fireEvent.change(emailInput, { target: { value: "user@test.com" } });
      fireEvent.change(passwordInput, { target: { value: "securepass" } });
      fireEvent.click(rememberMeCheckbox);

      await waitFor(() => {
        expect(emailInput.value).toBe("user@test.com");
        expect(passwordInput.value).toBe("securepass");
        expect(rememberMeCheckbox.checked).toBe(true);
      });
    });

    test("form starts with empty values", () => {
      render(<SignInPage />);

      const emailInput = screen.getByLabelText(
        "Email address",
      ) as HTMLInputElement;
      const passwordInput = screen.getByLabelText(
        "Password",
      ) as HTMLInputElement;
      const rememberMeCheckbox = screen.getByLabelText(
        "Remember me",
      ) as HTMLInputElement;

      expect(emailInput.value).toBe("");
      expect(passwordInput.value).toBe("");
      expect(rememberMeCheckbox.checked).toBe(false);
    });
  });

  describe("Accessibility", () => {
    test("has proper form labels", () => {
      render(<SignInPage />);

      expect(screen.getByLabelText("Email address")).toBeInTheDocument();
      expect(screen.getByLabelText("Password")).toBeInTheDocument();
      expect(screen.getByLabelText("Remember me")).toBeInTheDocument();
    });

    test("has proper heading structure", () => {
      render(<SignInPage />);

      const heading = screen.getByRole("heading", { level: 2 });
      expect(heading).toHaveTextContent("Sign in to your account");
    });

    test("buttons have proper roles", () => {
      render(<SignInPage />);

      const signInButton = screen.getByRole("button", { name: "Sign in" });
      const socialButtons = screen.getAllByRole("button");

      expect(signInButton).toBeInTheDocument();
      expect(socialButtons).toHaveLength(3); // Sign in + 2 social buttons
    });
  });

  describe("Social Login Buttons", () => {
    test("social login buttons are clickable", () => {
      render(<SignInPage />);

      const googleButton = screen
        .getByRole("img", { name: "Google" })
        .closest("button");
      const xButton = screen.getByRole("img", { name: "X" }).closest("button");

      expect(googleButton).toBeInTheDocument();
      expect(xButton).toBeInTheDocument();

      fireEvent.click(googleButton!);
      fireEvent.click(xButton!);
    });

    test("social login images have correct src attributes", () => {
      render(<SignInPage />);

      const googleImage = screen.getByRole("img", { name: "Google" });
      const xImage = screen.getByRole("img", { name: "X" });

      expect(googleImage).toHaveAttribute(
        "src",
        "https://img.icons8.com/ios-filled/50/000000/google-logo.png",
      );
      expect(xImage).toHaveAttribute(
        "src",
        "https://logos-world.net/wp-content/uploads/2023/08/X-Logo.jpg",
      );
    });
  });
});
