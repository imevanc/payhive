import { render, screen } from "@testing-library/react";
import AboutUsPage from "@/app/about-us/page";

describe("AboutUsPage", () => {
  test("renders the main heading and subheading", () => {
    render(<AboutUsPage />);
    expect(
      screen.getByRole("heading", { name: /Who We Are/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/And Why We Care/i)).toBeInTheDocument();
  });

  test("renders intro paragraph", () => {
    render(<AboutUsPage />);
    expect(
      screen.getByText(
        /PayHive was founded to help UK sole traders navigate the financial maze/i,
      ),
    ).toBeInTheDocument();
  });

  test("renders all highlight cards", () => {
    render(<AboutUsPage />);
    const cardTitles = [
      /Community-Driven/i,
      /Built in the UK/i,
      /Always Innovating/i,
    ];

    cardTitles.forEach((title) => {
      expect(screen.getByRole("heading", { name: title })).toBeInTheDocument();
    });
  });

  test("renders highlight descriptions", () => {
    render(<AboutUsPage />);
    expect(screen.getByText(/empowering UK sole traders/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Headquartered in the heart of Manchester/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/AI-assisted categorisation/i)).toBeInTheDocument();
  });

  test("renders Contact Us link with correct href", () => {
    render(<AboutUsPage />);
    const contactLink = screen.getByRole("link", { name: /Contact Us/i });
    expect(contactLink).toBeInTheDocument();
    expect(contactLink).toHaveAttribute("href", "/contact");
  });
});
