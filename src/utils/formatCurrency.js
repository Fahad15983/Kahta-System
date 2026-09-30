export function formatCurrency(value) {
  return `PKR ${new Intl.NumberFormat('en-PK').format(Math.round(value || 0))}`
}
