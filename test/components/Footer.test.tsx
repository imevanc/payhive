import { screen } from "@testing-library/react";
import { Footer } from "@/components";
import { renderPage } from "../utils";

jest.mock("../../src/icons", () => ({
  Logo: () => <div data-testid="mock-logo">Logo</div>,
}));

beforeEach(() => {
  jest.useFakeTimers();
  jest.setSystemTime(new Date("2025-01-01"));
});

afterEach(() => {
  jest.useRealTimers();
});

test("renders all major footer sections and content", () => {
  renderPage(<Footer />);

  expect(screen.getByTestId("mock-logo")).toBeInTheDocument();
  expect(
    screen.getByText(
      "Effortlessly making the world better through streamlined accounting, bookkeeping, and invoicing solutions.",
    ),
  ).toBeInTheDocument();

  const sections = ["Features", "Support", "Company", "Legal"];
  sections.forEach((section) => {
    expect(screen.getByRole("heading", { name: section })).toBeInTheDocument();
  });

  const socialPlatforms = ["Facebook", "Instagram", "X", "YouTube"];
  socialPlatforms.forEach((platform) => {
    expect(screen.getByRole("link", { name: platform })).toBeInTheDocument();
  });

  expect(
    screen.getByText("© 2025 PayHive. All rights reserved."),
  ).toBeInTheDocument();
});

test("renders all navigation links with correct attributes", () => {
  renderPage(<Footer />);

  const features = [
    "Bookkeping",
    "Invoicing",
    "Expense Management",
    "Financial Reporting",
    "Cloud-Based Access",
  ];
  features.forEach((feature) => {
    const link = screen.getByRole("link", { name: feature });
    expect(link).toHaveAttribute("href", "#");
    expect(link).toHaveClass(
      "text-sm/6",
      "text-gray-600",
      "hover:text-gray-900",
    );
  });

  const supportLinks = ["Contact Support", "Knowledge Base", "How-To Articles"];
  supportLinks.forEach((link) => {
    expect(screen.getByRole("link", { name: link })).toHaveAttribute(
      "href",
      "#",
    );
  });

  const companyLinks = [
    "Our Story",
    "Insights & Updates",
    "Careers",
    "Media Kit",
  ];
  companyLinks.forEach((link) => {
    expect(screen.getByRole("link", { name: link })).toHaveAttribute(
      "href",
      "#",
    );
  });

  const legalLinks = [
    "Terms & Conditions",
    "Privacy Statement",
    "Usage License",
  ];
  legalLinks.forEach((link) => {
    expect(screen.getByRole("link", { name: link })).toHaveAttribute(
      "href",
      "#",
    );
  });
});

test("renders correct structural elements", () => {
  renderPage(<Footer />);

  expect(screen.getByRole("contentinfo")).toBeInTheDocument();

  expect(screen.getAllByRole("list")).toHaveLength(4);

  expect(screen.getAllByRole("separator")).toHaveLength(4);
});

test("renders social media links with correct accessibility", () => {
  renderPage(<Footer />);

  const socialPlatforms = ["Facebook", "Instagram", "X", "YouTube"];
  socialPlatforms.forEach((platform) => {
    const link = screen.getByRole("link", { name: platform });
    expect(link).toHaveAttribute("href", "#");
    const icon = link.querySelector("svg");
    expect(icon).toHaveAttribute("aria-hidden", "true");
  });
});
