export const classNames = (...classes: Array<string>): string =>
  classes.filter(Boolean).join(" ");
