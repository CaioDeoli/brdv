export function validateNumericCNPJ(cnpj: string): boolean {
  // Keep only digits
  cnpj = cnpj.replace(/\D/g, "");

  // Must have 14 digits and not be all the same number
  if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) return false;

  // First check digit
  const firstWeights = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    const weight = firstWeights[i];
    if (weight === undefined) return false;
    const digitChar = cnpj.charAt(i);
    if (digitChar === "") return false;
    sum += Number(digitChar) * weight;
  }
  let remainder = sum % 11;
  const firstDigit = remainder < 2 ? 0 : 11 - remainder;
  if (firstDigit !== Number(cnpj.charAt(12))) return false;

  // Second check digit
  const secondWeights = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  sum = 0;
  for (let i = 0; i < 13; i++) {
    const weight = secondWeights[i];
    if (weight === undefined) return false;
    const digitChar = cnpj.charAt(i);
    if (digitChar === "") return false;
    sum += Number(digitChar) * weight;
  }
  remainder = sum % 11;
  const secondDigit = remainder < 2 ? 0 : 11 - remainder;

  // Valid if both check digits match
  return secondDigit === Number(cnpj.charAt(13));
}
