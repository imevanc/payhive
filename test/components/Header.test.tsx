import { act, fireEvent, screen } from "@testing-library/react";
import { Header } from "@/components";
import { renderPage } from "../utils/renderPage";

const mockUsePathname = jest.fn();
jest.mock("next/navigation", () => ({
  usePathname() {
    return mockUsePathname();
  },
}));

test.each(["Home", "What We Offer", "About Us", "Sign In"])(
  "renders navigation link with text %s",
  (linkText) => {
    renderPage(<Header />);
    const link = screen.getByRole("link", { name: linkText });
    expect(link).toBeInTheDocument();
  },
);

test("opens mobile menu when menu button is clicked", async () => {
  await act(async () => renderPage(<Header />));
  const menuButton = screen.getByRole("button", { name: /open main menu/i });
  await act(async () => fireEvent.click(menuButton));
  const closeButton = await screen.findByRole("button", {
    name: /close menu/i,
  });
  expect(closeButton).toBeInTheDocument();
});

test("closes mobile menu when close button is clicked", async () => {
  await act(async () => renderPage(<Header />));
  const menuButton = screen.getByRole("button", { name: /open main menu/i });
  await act(async () => fireEvent.click(menuButton));
  const closeButton = await screen.findByRole("button", {
    name: /close menu/i,
  });
  await act(async () => fireEvent.click(closeButton));
  expect(
    screen.queryByRole("button", { name: /close menu/i }),
  ).not.toBeInTheDocument();
});

test.each(["Home", "What We Offer", "About Us", "Sign In"])(
  "renders mobile navigation link with text %s when menu is open",
  async (linkText) => {
    await act(async () => renderPage(<Header />));
    const menuButton = screen.getByRole("button", { name: /open main menu/i });
    await act(async () => fireEvent.click(menuButton));
    const links = await screen.findAllByRole("link", { name: linkText });
    expect(links.length).toBeGreaterThan(0);
  },
);

test("renders the selected path with the right styling on desktop", () => {
  mockUsePathname.mockImplementation(() => "/");
  renderPage(<Header />);
  const homeLink = screen.getByRole("link", { name: /home/i });
  expect(homeLink).toHaveClass("border-b-2 border-orange-600 text-gray-900");
});

test("renders the non-selected path with the right styling on desktop", () => {
  renderPage(<Header />);
  const whatWeOfferLink = screen.getByRole("link", { name: /what we offer/i });
  expect(whatWeOfferLink).toHaveClass("hover:border-orange-300");
});

test("renders the selected path with the right styling on mobile", async () => {
  await act(async () => renderPage(<Header />));
  const menuButton = screen.getByRole("button", { name: /open main menu/i });
  await act(async () => {
    fireEvent.click(menuButton);
    mockUsePathname.mockImplementation(() => "/");
  });
  const homeLink = await screen.findByRole("link", { name: /home/i });
  expect(homeLink).toHaveClass("bg-orange-300");
});

test("renders the non-selected path with the right styling on mobile", async () => {
  await act(async () => renderPage(<Header />));
  const menuButton = screen.getByRole("button", { name: /open main menu/i });
  await act(async () => fireEvent.click(menuButton));
  const whatWeOfferLink = await screen.findByRole("link", {
    name: /what we offer/i,
  });
  expect(whatWeOfferLink).toHaveClass("hover:bg-orange-100");
});

test("renders the selected path with the right styling on desktop after the Link click", async () => {
  const originalError = console.error;
  console.error = (...args: any[]) => {
    if (args[0]?.toString().includes("Not implemented: navigation")) {
      return;
    }
    originalError.call(console, ...args);
  };
  mockUsePathname.mockImplementation(() => "/what-we-offer");
  await act(async () => renderPage(<Header />));
  const whatWeOfferLink = screen.getByRole("link", { name: /what we offer/i });
  await act(async () => fireEvent.click(whatWeOfferLink));
  expect(whatWeOfferLink).toHaveClass(
    "border-b-2 border-orange-600 text-gray-900",
  );
  console.error = originalError;
});
