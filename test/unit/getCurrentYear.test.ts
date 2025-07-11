import { getCurrentYear } from "@/utils";

test("returns the current year", () => {
  const expectedYear = new Date().getFullYear();
  expect(getCurrentYear()).toBe(expectedYear);
});
