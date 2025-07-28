import { render, screen } from "@testing-library/react";
import ServicesPage from "@/app/services/page";

describe("ServicesPage", () => {
  beforeEach(() => {
    render(<ServicesPage />);
  });

  test("renders main heading and subheading", () => {
    expect(
      screen.getByRole("heading", { name: /Professional Services/i }),
    ).toBeInTheDocument();

    expect(screen.getByText(/Go beyond bookkeeping/i)).toBeInTheDocument();
  });

  test("renders all service cards", () => {
    const serviceTitles = [
      /Business Analytics/i,
      /Real-time Metrics/i,
      /Security & Compliance/i,
      /Expert Support/i,
    ];

    serviceTitles.forEach((title) => {
      expect(screen.getByRole("heading", { name: title })).toBeInTheDocument();
    });
  });

  test("renders correct service descriptions", () => {
    expect(
      screen.getByText(/performance reports, trend forecasting/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/revenue, expenses, and growth/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/GDPR-compliant and HMRC-ready/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/quarterly reviews, bookkeeping help/i),
    ).toBeInTheDocument();
  });

  test("renders call-to-action button linking to signup", () => {
    const cta = screen.getByRole("link", { name: /Start Free Trial/i });
    expect(cta).toBeInTheDocument();
    expect(cta).toHaveAttribute("href", "/sign-up");
  });
});
