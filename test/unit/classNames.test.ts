import { classNames } from "@/utils";

test("joins multiple class names with spaces", () => {
  expect(classNames("foo", "bar", "baz")).toBe("foo bar baz");
});

test("returns an empty string if no arguments are provided", () => {
  expect(classNames()).toBe("");
});

test("returns a single class name unchanged", () => {
  expect(classNames("foo")).toBe("foo");
});
