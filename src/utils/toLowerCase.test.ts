import { toLowerCase } from "@/utils/toLowerCase";

test("converts uppercase to lowercase", () => {
  expect(toLowerCase("HELLO")).toBe("hello");
  expect(toLowerCase("HeLLo WoRLD")).toBe("helloworld");
});

test("removes special characters", () => {
  expect(toLowerCase("hello!")).toBe("hello");
  expect(toLowerCase("hello@world.com")).toBe("helloworldcom");
  expect(toLowerCase("user#123")).toBe("user123");
  expect(toLowerCase("test$%^&*()")).toBe("test");
});

test("handles multiple spaces", () => {
  expect(toLowerCase("hello   world")).toBe("helloworld");
  expect(toLowerCase("  hello  world  ")).toBe("helloworld");
  expect(toLowerCase("hello\tworld")).toBe("helloworld");
  expect(toLowerCase("hello\nworld")).toBe("helloworld");
});

test("handles empty strings and whitespace", () => {
  expect(toLowerCase("")).toBe("");
  expect(toLowerCase("   ")).toBe("");
});

test("preserves numbers", () => {
  expect(toLowerCase("hello123")).toBe("hello123");
  expect(toLowerCase("123hello")).toBe("123hello");
  expect(toLowerCase("hello123world")).toBe("hello123world");
});

test("handles mixed case with special characters and spaces", () => {
  expect(toLowerCase("Hello@World 123!")).toBe("helloworld123");
  expect(toLowerCase("First_Last-Name")).toBe("firstlastname");
  expect(toLowerCase("User.Name@email.com")).toBe("usernameemailcom");
});

test("handles non-English characters", () => {
  expect(toLowerCase("héllo")).toBe("hllo");
  expect(toLowerCase("señor")).toBe("seor");
  expect(toLowerCase("über")).toBe("ber");
});

test("edge cases", () => {
  expect(toLowerCase("!@#$%^&*()")).toBe("");
  expect(toLowerCase("123!@#456")).toBe("123456");
  expect(toLowerCase("   !@#   ")).toBe("");
});
