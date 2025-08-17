export function generateCPF(): string {
  // Generate first 9 random digits
  let cpf = "";
  for (let i = 0; i < 9; i++) {
    cpf += Math.floor(Math.random() * 10).toString();
  }

  // Function to calculate a check digit
  const calcCheckDigit = (cpfPartial: string, factor: number): number => {
    let sum = 0;
    for (let i = 0; i < cpfPartial.length; i++) {
      sum += parseInt(cpfPartial.charAt(i), 10) * (factor - i);
    }
    let remainder = (sum * 10) % 11;
    return remainder === 10 ? 0 : remainder;
  };

  // Calculate first check digit
  cpf += calcCheckDigit(cpf, 10).toString();

  // Calculate second check digit
  cpf += calcCheckDigit(cpf, 11).toString();

  return cpf;
}
