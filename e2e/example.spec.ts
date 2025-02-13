import { expect, test } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("https://nextjs-starter-delta-one.vercel.app/");

  await expect(page).toHaveTitle(/Next.js starter/);
});

test("has all the accessible elements", async ({ page }) => {
  await page.goto("https://nextjs-starter-delta-one.vercel.app/");

  await expect(
    page.getByRole("heading", {
      name: /PayHive/i,
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", {
      name: /Split bills with friends, track memberships, and manage shared expenses./i,
    }),
  ).toBeVisible();
});
