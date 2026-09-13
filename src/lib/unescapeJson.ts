export function unescapeJson(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) {
    throw new Error('No hay texto para procesar.');
  }

  let current = trimmed;
  for (let i = 0; i < 5; i++) {
    try {
      JSON.parse(current);
      return current;
    } catch {
      // todavía no es JSON válido, intentamos decodificar otra capa
    }
    try {
      const decoded = JSON.parse(`"${current}"`);
      if (typeof decoded !== 'string') break;
      current = decoded;
    } catch {
      break;
    }
  }

  throw new Error('El texto no es un JSON encapsulado con diagonales de escape.');
}