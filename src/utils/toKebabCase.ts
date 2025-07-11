export const toKebabCase = (input: string): string =>
  input
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[_\s]+/g, "-")
    .toLowerCase()
    .replace(/--+/g, "-")
    .replace(/^-|-$/g, "");
