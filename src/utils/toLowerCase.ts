export const toLowerCase = (input: string) =>
  input
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s/g, "");
