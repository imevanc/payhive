export const VALIDATE_PASSWORD = (password: string): true | string => {
  const isValidLength = password.length >= 8 && password.length <= 12;
  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasDigit = /\d/.test(password);
  const hasSpecial = /[!@#$%^&*()_\-+=[\]{}|;:,.<>?]/.test(password);

  if (!isValidLength) return "Password must be 8–12 characters long";
  if (!hasLower) return "Include at least one lowercase letter";
  if (!hasUpper) return "Include at least one uppercase letter";
  if (!hasDigit) return "Include at least one number";
  if (!hasSpecial) return "Include at least one special character";

  return true;
};
