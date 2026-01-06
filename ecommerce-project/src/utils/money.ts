export function formatMoney(amountCents: number) {
  return `${amountCents < 0 ? '-' : ''}$${(Math.abs(amountCents) / 100).toFixed(2)}`;
}