export function generateBrazilPhone(
  withCountryCode = false,
  useDash = true
): string {
  // 2-digit area code 10–99 (cannot start with 0)
  const areaCode = (Math.floor(Math.random() * 90) + 10).toString();

  // Random choice: 9-digit mobile (60 %) or 8-digit landline (40 %)
  const isMobile = Math.random() < 0.6;

  // Build first block of the subscriber number
  let firstPart: string;
  if (isMobile) {
    // mobile starts with 9 and totals 5 digits before dash
    firstPart =
      '9' + Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  } else {
    // landline starts with 2–8 and totals 4 digits before dash
    const firstDigit = Math.floor(Math.random() * 7 + 2).toString(); // 2-8
    firstPart = firstDigit + Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  }

  // last block (4 digits)
  const secondPart = Math.floor(Math.random() * 10000).toString().padStart(4, '0');

  // Merge with or without dash
  const subscriber = useDash ? `${firstPart}-${secondPart}` : `${firstPart}${secondPart}`;

  // Add area code and optional country code
  const phone = `(${areaCode}) ${subscriber}`;
  return withCountryCode ? `+55 ${phone}` : phone;
}
