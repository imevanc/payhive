import { fireEvent, render, screen } from "@testing-library/react";
import NotFound from "@/app/not-found";

jest.mock("next/font/google", () => ({
  Rufina: () => ({ className: "rufina-font" }),
}));

test("renders the 404 error icon", () => {
  render(<NotFound />);
  const errorIcon = screen.getByTestId(/404 error icon/i);
  expect(errorIcon).toBeInTheDocument();
});

test("renders the heading with the error message", () => {
  render(<NotFound />);
  const heading = screen.getByRole("heading", {
    name: /looks like these numbers don't balance!/i,
  });
  expect(heading).toBeInTheDocument();
});

test("renders the subtext explaining the error", () => {
  render(<NotFound />);
  const subtext1 = screen.getByText(
    /our busy bees have audited this url and found it doesn't compute\./i,
  );
  const subtext2 = screen.getByText(/perhaps it's been depreciated\?/i);

  expect(subtext1).toBeInTheDocument();
  expect(subtext2).toBeInTheDocument();
});

test("renders the error code", () => {
  render(<NotFound />);
  const errorCode = screen.getByText(/error code: missing_asset_404/i);
  expect(errorCode).toBeInTheDocument();
});

test("renders the return to home button with correct attributes", () => {
  render(<NotFound />);
  const homeButton = screen.getByRole("link", {
    name: /return to home ledger/i,
  });
  expect(homeButton).toBeInTheDocument();
  expect(homeButton).toHaveAttribute("href", "/");
  fireEvent.click(homeButton);
  expect(window.location.pathname).toBe("/");
});
