import { isValidEmail } from "@/utils";

describe("Valid emails", () => {
  test("should return true for standard email format", () => {
    expect(isValidEmail("user@example.com")).toBe(true);
  });

  test("should return true for email with subdomain", () => {
    expect(isValidEmail("user@mail.example.com")).toBe(true);
  });

  test("should return true for email with numbers", () => {
    expect(isValidEmail("user123@example.com")).toBe(true);
  });

  test("should return true for email with hyphens", () => {
    expect(isValidEmail("user-name@example-site.com")).toBe(true);
  });

  test("should return true for email with underscores", () => {
    expect(isValidEmail("user_name@example.com")).toBe(true);
  });

  test("should return true for email with dots in username", () => {
    expect(isValidEmail("user.name@example.com")).toBe(true);
  });

  test("should return true for email with plus sign", () => {
    expect(isValidEmail("user+tag@example.com")).toBe(true);
  });

  test("should return true for short domain", () => {
    expect(isValidEmail("user@ex.co")).toBe(true);
  });

  test("should return true for long domain extension", () => {
    expect(isValidEmail("user@example.museum")).toBe(true);
  });

  test("should return true for email with capital letters", () => {
    expect(isValidEmail("User@Example.COM")).toBe(true);
  });
});

describe("Invalid emails", () => {
  test("should return false for empty string", () => {
    expect(isValidEmail("")).toBe(false);
  });

  test("should return false for email without @ symbol", () => {
    expect(isValidEmail("userexample.com")).toBe(false);
  });

  test("should return false for email without domain", () => {
    expect(isValidEmail("user@")).toBe(false);
  });

  test("should return false for email without username", () => {
    expect(isValidEmail("@example.com")).toBe(false);
  });

  test("should return false for email without domain extension", () => {
    expect(isValidEmail("user@example")).toBe(false);
  });

  test("should return false for email with spaces", () => {
    expect(isValidEmail("user @example.com")).toBe(false);
    expect(isValidEmail("user@ example.com")).toBe(false);
    expect(isValidEmail("user@example .com")).toBe(false);
  });

  test("should return false for email with multiple @ symbols", () => {
    expect(isValidEmail("user@@example.com")).toBe(false);
    expect(isValidEmail("user@exam@ple.com")).toBe(false);
  });

  test("should return false for email starting with @", () => {
    expect(isValidEmail("@user@example.com")).toBe(false);
  });

  test("should return false for email ending with @", () => {
    expect(isValidEmail("user@example.com@")).toBe(false);
  });

  test("should return false for email with consecutive dots", () => {
    expect(isValidEmail("user@example..com")).toBe(false);
    expect(isValidEmail("user..name@example.com")).toBe(false);
  });

  test("should return false for email starting with dot", () => {
    expect(isValidEmail(".user@example.com")).toBe(false);
  });

  test("should return false for email ending with dot before @", () => {
    expect(isValidEmail("user.@example.com")).toBe(false);
  });

  test("should return false for domain starting with dot", () => {
    expect(isValidEmail("user@.example.com")).toBe(false);
  });

  test("should return false for domain ending with dot", () => {
    expect(isValidEmail("user@example.com.")).toBe(false);
  });

  test("should return false for email with special characters in domain", () => {
    expect(isValidEmail("user@exam#ple.com")).toBe(false);
    expect(isValidEmail("user@exam ple.com")).toBe(false);
  });

  test("should return false for very short domain extension", () => {
    expect(isValidEmail("user@example.c")).toBe(false);
  });

  test("should return false for null or undefined", () => {
    expect(isValidEmail(null as any)).toBe(false);
    expect(isValidEmail(undefined as any)).toBe(false);
  });
});

describe("Edge cases", () => {
  test("should handle very long email addresses", () => {
    const longEmail = "a".repeat(50) + "@" + "b".repeat(50) + ".com";
    expect(isValidEmail(longEmail)).toBe(true);
  });

  test("should handle email with multiple subdomains", () => {
    expect(isValidEmail("user@mail.subdomain.example.com")).toBe(true);
  });

  test("should return false for email with only spaces", () => {
    expect(isValidEmail("   ")).toBe(false);
  });

  test("should return false for email with tab characters", () => {
    expect(isValidEmail("user\t@example.com")).toBe(false);
  });

  test("should return false for email with newline characters", () => {
    expect(isValidEmail("user\n@example.com")).toBe(false);
  });
});
