export function validateCPF(cpf: string): boolean {
  // Remove all non-numeric characters
  cpf = cpf.replace(/\D/g, "");
  
  // Check if length is 11 or all digits are the same
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

  // Calculate first check digit
  let sum = 0;
  for (let i = 0; i < 9; i++) sum += parseInt(cpf.charAt(i), 10) * (10 - i);
  let remainder = (sum * 10) % 11;
  if (remainder === 10) remainder = 0;
  if (remainder !== parseInt(cpf.charAt(9), 10)) return false;

  // Calculate second check digit
  sum = 0;
  for (let i = 0; i < 10; i++) sum += parseInt(cpf.charAt(i), 10) * (11 - i);
  remainder = (sum * 10) % 11;
  if (remainder === 10) remainder = 0;

  return remainder === parseInt(cpf.charAt(10), 10);
}
