export function validateCep(postalCode: string): boolean {
  // Pattern: 5 digits, optional dash, 3 digits
  const pattern = /^\d{5}-?\d{3}$/;
  // Trim spaces and test
  return pattern.test(postalCode.trim());
}
