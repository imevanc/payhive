import { toKebabCase } from "@/utils/toKebabCase";

test("converts camelCase to kebab-case", () => {
  expect(toKebabCase("camelCaseString")).toBe("camel-case-string");
});

test("converts PascalCase to kebab-case", () => {
  expect(toKebabCase("PascalCaseString")).toBe("pascal-case-string");
});

test("converts snake_case to kebab-case", () => {
  expect(toKebabCase("snake_case_string")).toBe("snake-case-string");
});

test("converts space separated to kebab-case", () => {
  expect(toKebabCase("space separated string")).toBe("space-separated-string");
});

test("removes leading and trailing dashes", () => {
  expect(toKebabCase("  leading and trailing  ")).toBe("leading-and-trailing");
});

test("handles multiple consecutive separators", () => {
  expect(toKebabCase("foo__bar  baz")).toBe("foo-bar-baz");
});

test("returns empty string for empty input", () => {
  expect(toKebabCase("")).toBe("");
});
