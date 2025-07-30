export const isValidEmail = (email: string): boolean => {
  if (!email || email.trim().length === 0) {
    return false;
  }

  const atCount = (email.match(/@/g) || []).length;
  if (atCount !== 1) {
    return false;
  }

  const [localPart, domainPart] = email.split("@");

  if (!localPart || localPart.length === 0) {
    return false;
  }

  if (localPart.startsWith(".") || localPart.endsWith(".")) {
    return false;
  }

  if (localPart.includes("..")) {
    return false;
  }

  if (/\s/.test(localPart)) {
    return false;
  }

  if (!domainPart || domainPart.length === 0) {
    return false;
  }

  if (domainPart.startsWith(".") || domainPart.endsWith(".")) {
    return false;
  }

  if (domainPart.includes("..")) {
    return false;
  }

  if (/\s/.test(domainPart)) {
    return false;
  }

  if (!domainPart.includes(".")) {
    return false;
  }

  const domainParts = domainPart.split(".");

  for (const part of domainParts) {
    if (!part || part.length === 0) {
      return false;
    }

    if (!/^[a-zA-Z0-9-]+$/.test(part)) {
      return false;
    }

    if (part.startsWith("-") || part.endsWith("-")) {
      return false;
    }
  }

  const tld = domainParts[domainParts.length - 1];
  if (tld.length < 2 || !/^[a-zA-Z]+$/.test(tld)) {
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
