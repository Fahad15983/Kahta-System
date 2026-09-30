export function getBalance(record) {
  return Math.max(0, (record.totalPurchases ?? record.total ?? 0) - (record.paid ?? 0))
}

export function getStatus(total, paid) {
  if (!paid) return 'Unpaid'
  if (paid >= total) return 'Paid'
  return 'Partial'
}

export function summarizeRecords(customers, sales) {
  return {
    customers: customers.length,
    sales: sales.reduce((sum, sale) => sum + sale.total, 0),
    received: sales.reduce((sum, sale) => sum + sale.paid, 0),
    outstanding: sales.reduce((sum, sale) => sum + Math.max(0, sale.total - sale.paid), 0),
  }
}
