import { screen } from "@testing-library/react";
import { expect, test } from "@jest/globals";
import { renderPage } from "../utils/renderPage";
import Home from "@/app/page";

test("render the Homepage", () => {
  renderPage(<Home />);
  expect(
    screen.getByRole("heading", {
      name: /Effortless Accounting, Bookkeeping & Invoicing/i,
    }),
  ).toBeVisible();
  expect(
    screen.getByText(
      /Focus on what you do best — we’ll handle the numbers. From tracking expenses to managing invoices, PayHive keeps your business buzzing smoothly./i,
    ),
  ).toBeVisible();
  expect(
    screen.getByRole("link", {
      name: /Read more/i,
    }),
  ).toBeVisible();
  expect(
    screen.getByRole("link", {
      name: /Read more/i,
    }),
  ).toHaveAttribute("href", "#");
  expect(
    screen.getByRole("link", {
      name: /Learn More About PayHive/i,
    }),
  ).toBeVisible();
  expect(
    screen.getByRole("link", {
      name: /Learn More About PayHive/i,
    }),
  ).toHaveAttribute("href", "#");
  expect(
    screen.getByRole("link", {
      name: /Get started Today/i,
    }),
  ).toBeVisible();
  expect(
    screen.getByRole("link", {
      name: /Get started Today/i,
    }),
  ).toHaveAttribute("href", "#");
});
