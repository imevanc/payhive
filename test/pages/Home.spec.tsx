import { screen } from "@testing-library/react";
import { expect, test } from "@jest/globals";
import { renderPage } from "../utils/renderPage";
import Home from "@/app/page";

test("render the Homepage", async () => {
  renderPage(<Home />);
  expect(
    screen.getByRole("heading", {
      name: /PayHive/i,
    }),
  ).toBeVisible();
  expect(
    screen.getByRole("heading", {
      name: /Split bills with friends, track memberships, and manage shared expenses./i,
    }),
  ).toBeVisible();
});
