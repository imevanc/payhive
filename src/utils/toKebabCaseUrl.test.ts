import { toKebabCaseUrl } from "./toKebabCaseUrl";

test("converts simple string to kebab case", () => {
  expect(toKebabCaseUrl("Home")).toBe("home");
});

test("converts multi-word string to kebab case", () => {
  expect(toKebabCaseUrl("What We Offer")).toBe("what-we-offer");
});

test("handles empty string", () => {
  expect(toKebabCaseUrl("")).toBe("");
});

test("handles string with special characters", () => {
  expect(toKebabCaseUrl("About Us!")).toBe("about-us");
});

test("handles multiple spaces", () => {
  expect(toKebabCaseUrl("Log   In")).toBe("log-in");
});

test("handles already kebab-cased string", () => {
  expect(toKebabCaseUrl("already-kebab-case")).toBe("already-kebab-case");
});

test("handles string with multiple special characters and spaces", () => {
  expect(toKebabCaseUrl("Contact & Support Center")).toBe(
    "contact-support-center",
  );
});

test("handles string with leading/trailing spaces", () => {
  expect(toKebabCaseUrl("  User Profile  ")).toBe("user-profile");
});
