export function validateAlphanumericCNPJ(input: string): boolean {
  // Remove non-alphanumeric and uppercase
  const clean = input.replace(/[^0-9A-Za-z]/g, '').toUpperCase();

  // Must be 14 chars: 12 alphanum + 2 digits
  if (!/^[0-9A-Z]{12}[0-9]{2}$/.test(clean)) return false;

  // Convert char → numeric value (ASCII - 48)
  const toValue = (c: string): number => {
    const code = c.charCodeAt(0);
    if (code >= 48 && code <= 57) return code - 48; // 0-9
    if (code >= 65 && code <= 90) return code - 48; // A-Z → 17-42
    throw new Error("invalid character");
  };

  // Mod-11 check digit calculator with weights 2-9
  const calcCheck = (vals: number[]): number => {
    let sum = 0;
    vals.forEach((val, i) => {
      const weight = ((vals.length - 1 - i) % 8) + 2;
      sum += val * weight;
    });
    const mod = sum % 11;
    return (mod === 0 || mod === 1) ? 0 : 11 - mod;
  };  

  // First check digit
  const base = clean.slice(0, 12).split('').map(toValue);
  const d1 = calcCheck(base);

  // Second check digit
  const d2 = calcCheck([...base, d1]);

  // Compare with provided digits
  return d1 === Number(clean[12]) && d2 === Number(clean);
}
