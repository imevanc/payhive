import { act, fireEvent, screen } from "@testing-library/react";
import { Header } from "@/components";
import { renderPage } from "../utils/renderPage";

test.each(["Product", "Features", "Company", "Log in"])(
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

test.each(["Product", "Features", "Company", "Log in"])(
  "renders mobile navigation link with text %s when menu is open",
  async (linkText) => {
    await act(async () => renderPage(<Header />));
    const menuButton = screen.getByRole("button", { name: /open main menu/i });
    await act(async () => fireEvent.click(menuButton));
    const links = await screen.findAllByRole("link", { name: linkText });
    expect(links.length).toBeGreaterThan(0);
  },
);
