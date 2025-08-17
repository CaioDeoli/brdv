export function generateCep(useDash = true): string {
  const firstPart = Math.floor(Math.random() * 100000).toString().padStart(5, '0'); // 5 random digits
  const lastPart = Math.floor(Math.random() * 1000).toString().padStart(3, '0'); // 3 random digits
  return useDash ? `${firstPart}-${lastPart}` : `${firstPart}${lastPart}`;
}
