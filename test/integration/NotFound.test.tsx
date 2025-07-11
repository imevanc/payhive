import { render, screen } from "@testing-library/react";
import NotFound from "@/app/not-found";

test("renders the NotFound component without crashing", () => {
  render(<NotFound />);
  expect(screen.getByRole("main")).toBeInTheDocument();
});

test("displays the main error icon (Error404)", () => {
  render(<NotFound />);
  const svgIcons = screen.getAllByRole("img", { hidden: true });
  expect(svgIcons.length).toBeGreaterThanOrEqual(1);
});

test("renders headline text", () => {
  render(<NotFound />);
  expect(
    screen.getByText("Looks like these numbers don't balance!"),
  ).toBeInTheDocument();
});

test("renders explanation text about auditing the URL", () => {
  render(<NotFound />);
  expect(
    screen.getByText(/audited this URL and found it doesn't compute/i),
  ).toBeInTheDocument();
  expect(
    screen.getByText(/Perhaps it's been depreciated/i),
  ).toBeInTheDocument();
});

test("displays the error code message", () => {
  render(<NotFound />);
  expect(screen.getByText("Error Code: MISSING_ASSET_404")).toBeInTheDocument();
});

test("renders a link back to the homepage", () => {
  render(<NotFound />);
  const link = screen.getByRole("link", {
    name: /Return to Home Ledger/i,
  });
  expect(link).toBeInTheDocument();
  expect(link).toHaveAttribute("href", "/");
});
