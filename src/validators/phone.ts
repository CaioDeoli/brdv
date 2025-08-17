export function validatePhone(phone: string): boolean {
  // Optional "+55", mandatory 2-digit area code, then 8- or 9-digit subscriber
  const regex = /^(?:\+55\s?)?\(?[1-9]{2}\)?\s?(?:9?\d{4}-?\d{4})$/;
  return regex.test(phone.trim());
}
