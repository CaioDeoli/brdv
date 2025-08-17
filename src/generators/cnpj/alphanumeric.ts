export function generateAlphanumericCNPJ(): string {
  // Random body (12 chars 0-9 / A-Z)
  const charset = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let body = '';
  for (let i = 0; i < 12; i++) body += charset[Math.floor(Math.random() * charset.length)];

  // Same helpers used by the validator
  const toValue = (c: string) => c.charCodeAt(0) - 48;

  const calcCheck = (vals: number[]) => {
    let sum = 0;
    vals.forEach((val, i) => {
      const weight = ((vals.length - 1 - i) % 8) + 2;
      sum += val * weight;
    });
    const mod = sum % 11;
    return (mod === 0 || mod === 1) ? 0 : 11 - mod;
  };

  const base = body.split('').map(toValue);
  const d1 = calcCheck(base);
  const d2 = calcCheck([...base, d1]);

  return body + d1.toString() + d2.toString();
}
