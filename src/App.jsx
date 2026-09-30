import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { customers as initialCustomers } from './data/customers'
import { sales as initialSales } from './data/sales'
import Dashboard from './pages/Dashboard'
import Customers from './pages/Customers'
import CustomerProfile from './pages/CustomerProfile'
import Sales from './pages/Sales'
import Payments from './pages/Payments'
import Reports from './pages/Reports'
import MainLayout from './components/layout/MainLayout'

export default function App() {
  const [customers, setCustomers] = useState(initialCustomers)
  const [sales, setSales] = useState(initialSales)
  function addCustomer(form) { setCustomers((current) => [...current, { ...form, id: `CUS-${String(current.length + 1).padStart(3, '0')}`, totalPurchases: 0, paid: 0 }]) }
  function saveSale(sale) { setSales((current) => [{ ...sale, id: `INV-${1049 + current.length}` }, ...current]); setCustomers((current) => current.map((customer) => customer.id === sale.customerId ? { ...customer, totalPurchases: customer.totalPurchases + sale.total, paid: customer.paid + sale.paid } : customer)) }
  function receivePayment(customerId, amount) {
    let remainingPayment = amount
    setSales((current) => current.map((sale) => {
      if (sale.customerId !== customerId || remainingPayment <= 0) return sale
      const invoiceBalance = Math.max(0, sale.total - sale.paid)
      const applied = Math.min(invoiceBalance, remainingPayment)
      remainingPayment -= applied
      return { ...sale, paid: sale.paid + applied }
    }))
    setCustomers((current) => current.map((customer) => customer.id === customerId ? { ...customer, paid: Math.min(customer.totalPurchases, customer.paid + amount) } : customer))
  }
  return <BrowserRouter><Routes><Route element={<MainLayout />}><Route path="/" element={<Dashboard customers={customers} sales={sales} />} /><Route path="/customers" element={<Customers customers={customers} onAddCustomer={addCustomer} />} /><Route path="/customers/:customerId" element={<CustomerProfile customers={customers} sales={sales} />} /><Route path="/sales" element={<Sales customers={customers} sales={sales} onSaveSale={saveSale} />} /><Route path="/payments" element={<Payments customers={customers} sales={sales} onReceivePayment={receivePayment} />} /><Route path="/reports" element={<Reports customers={customers} sales={sales} />} /><Route path="/settings" element={<Reports customers={customers} sales={sales} />} /></Route></Routes></BrowserRouter>
}
