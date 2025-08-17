export function generateNumericCNPJ(): string {
  while (true) {
    // 12 random digits
    let cnpj = "";
    for (let i = 0; i < 12; i++) cnpj += Math.floor(Math.random() * 10);

    // Reject sequences like 000000000000
    if (/^(\d)\1+$/.test(cnpj)) continue;

    // First check digit
    const w1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    let sum = w1.reduce((s, w, i) => s + Number(cnpj[i]) * w, 0);
    let rest = sum % 11;
    cnpj += rest < 2 ? "0" : String(11 - rest);

    // Second check digit
    const w2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    sum = w2.reduce((s, w, i) => s + Number(cnpj[i]) * w, 0);
    rest = sum % 11;
    cnpj += rest < 2 ? "0" : String(11 - rest);

    return cnpj; // Valid 14-digit CNPJ
  }
}
