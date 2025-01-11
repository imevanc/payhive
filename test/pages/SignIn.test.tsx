import { fireEvent, screen } from "@testing-library/react";
import SignIn from "@/app/sign-in/page";
import { renderPage } from "../utils/renderPage";

test("renders the page with correct heading and form elements", () => {
  renderPage(<SignIn />);

  const heading = screen.getByRole("heading", { name: "PayHive Bzzz . . ." });
  expect(heading).toBeInTheDocument();

  const emailInput = screen.getByLabelText(/email address/i);
  expect(emailInput).toBeInTheDocument();

  const passwordInput = screen.getByLabelText(/password/i);
  expect(passwordInput).toBeInTheDocument();

  const submitButton = screen.getByRole("button", { name: /submit/i });
  expect(submitButton).toBeInTheDocument();

  const googleButton = screen.getByRole("button", {
    name: /continue with google/i,
  });
  expect(googleButton).toBeInTheDocument();

  const trialLink = screen.getByRole("link", {
    name: /start a 7-day free trial/i,
  });
  expect(trialLink).toBeInTheDocument();
});

test('checks for "Continue with Google" button click', () => {
  renderPage(<SignIn />);

  const googleButton = screen.getByRole("button", {
    name: /continue with google/i,
  });

  fireEvent.click(googleButton);

  expect(googleButton).toBeInTheDocument();
});

test("simulates submitting the form with input values", () => {
  renderPage(<SignIn />);

  const emailInput = screen.getByLabelText(/email address/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const submitButton = screen.getByRole("button", { name: /submit/i });

  fireEvent.change(emailInput, { target: { value: "test@example.com" } });
  fireEvent.change(passwordInput, { target: { value: "password123" } });

  fireEvent.submit(submitButton);

  // @ts-ignore
  expect(emailInput.value).toBe("test@example.com");
  // @ts-ignore
  expect(passwordInput.value).toBe("password123");
});

test('checks for "Start a 7-day free trial" link click', () => {
  renderPage(<SignIn />);

  const trialLink = screen.getByRole("link", {
    name: /start a 7-day free trial/i,
  });

  fireEvent.click(trialLink);

  expect(trialLink).toBeInTheDocument();
});
