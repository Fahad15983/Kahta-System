import { useMemo, useState } from 'react'
import { Eye, Plus, Trash2 } from 'lucide-react'
import Button from '../components/common/Button'
import Modal from '../components/common/Modal'
import StatusBadge from '../components/common/StatusBadge'
import { formatCurrency } from '../utils/formatCurrency'
import { getStatus, summarizeRecords } from '../utils/calculations'

const blankItem = { name: '', quantity: 1, price: 0 }

function SaleForm({ customers, onSave, onClose }) {
  const [customerId, setCustomerId] = useState(customers[0]?.id || '')
  const [items, setItems] = useState([{ ...blankItem }])
  const [paid, setPaid] = useState(0)
  const customer = customers.find((item) => item.id === customerId)
  const subtotal = items.reduce((sum, item) => sum + Number(item.quantity || 0) * Number(item.price || 0), 0)
  const previousBalance = customer ? Math.max(0, customer.totalPurchases - customer.paid) : 0
  const grandTotal = subtotal + previousBalance
  const remaining = Math.max(0, grandTotal - Number(paid || 0))
  function updateItem(index, key, value) { setItems(items.map((item, itemIndex) => itemIndex === index ? { ...item, [key]: value } : item)) }
  function submit(event) { event.preventDefault(); onSave({ customerId, customer: customer.name, date: '30 Sep 2026', items: items.length, total: grandTotal, paid: Number(paid || 0) }); onClose() }
  return <form onSubmit={submit}><div className="sale-form-grid"><label>Customer<select value={customerId} onChange={(event) => setCustomerId(event.target.value)}>{customers.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label><div className="balance-callout"><span>Previous balance</span><strong>{formatCurrency(previousBalance)}</strong></div></div><div className="item-heading"><h3>Items</h3><Button type="button" variant="secondary" icon={Plus} onClick={() => setItems([...items, { ...blankItem }])}>Add item</Button></div><div className="items-list">{items.map((item, index) => <div className="item-row" key={index}><label>Product name<input required value={item.name} onChange={(event) => updateItem(index, 'name', event.target.value)} placeholder="e.g. Cooking oil 5L" /></label><label>Qty<input type="number" min="1" value={item.quantity} onChange={(event) => updateItem(index, 'quantity', event.target.value)} /></label><label>Unit price<input type="number" min="0" value={item.price} onChange={(event) => updateItem(index, 'price', event.target.value)} /></label><div className="item-total"><span>Total</span><strong>{formatCurrency(Number(item.quantity || 0) * Number(item.price || 0))}</strong></div>{items.length > 1 && <button className="remove-item" type="button" onClick={() => setItems(items.filter((_, itemIndex) => itemIndex !== index))}><Trash2 size={16} /></button>}</div>)}</div><div className="sale-summary"><div><span>Subtotal</span><strong>{formatCurrency(subtotal)}</strong></div><div><span>Previous customer balance</span><strong>{formatCurrency(previousBalance)}</strong></div><div className="summary-total"><span>Grand total</span><strong>{formatCurrency(grandTotal)}</strong></div></div><div className="payment-entry"><label>Amount paid now<input type="number" min="0" max={grandTotal} value={paid} onChange={(event) => setPaid(event.target.value)} placeholder="0" /></label><div><span>Remaining balance</span><strong className={remaining ? 'amount-due' : 'positive-text'}>{formatCurrency(remaining)}</strong></div></div><div className="modal-actions"><Button type="button" variant="secondary" onClick={onClose}>Cancel</Button><Button type="submit">Save sale</Button></div></form>
}

export default function Sales({ customers, sales, onSaveSale }) {
  const [showModal, setShowModal] = useState(false)
  const summary = summarizeRecords(customers, sales)
  return <div className="content-page"><div className="page-heading"><div><span className="eyebrow">REVENUE OPERATIONS</span><h2>Sales &amp; Bills</h2><p>Track invoices, products, and customer balances.</p></div><Button icon={Plus} onClick={() => setShowModal(true)}>Create new sale</Button></div><section className="stat-strip"><div><span>Total sales</span><strong>{formatCurrency(summary.sales)}</strong></div><div><span>Received</span><strong className="positive-text">{formatCurrency(summary.received)}</strong></div><div><span>Outstanding</span><strong className="amount-due">{formatCurrency(summary.outstanding)}</strong></div></section><section className="panel table-panel"><div className="table-toolbar simple"><div><h3>All invoices</h3><p>{sales.length} sales records in this demo</p></div><button className="filter-button"><Eye size={16} /> Recent activity</button></div><div className="table-wrap"><table><thead><tr><th>Invoice #</th><th>Customer</th><th>Date</th><th>Items</th><th>Total bill</th><th>Paid</th><th>Remaining</th><th>Status</th><th>Actions</th></tr></thead><tbody>{sales.map((sale) => <tr key={sale.id}><td><span className="invoice-id">{sale.id}</span></td><td><strong>{sale.customer}</strong></td><td>{sale.date}</td><td>{sale.items} items</td><td>{formatCurrency(sale.total)}</td><td>{formatCurrency(sale.paid)}</td><td className={sale.total - sale.paid ? 'amount-due' : ''}>{formatCurrency(sale.total - sale.paid)}</td><td><StatusBadge status={getStatus(sale.total, sale.paid)} /></td><td><button className="table-action">View</button></td></tr>)}</tbody></table></div></section>{showModal && <Modal title="Create new sale" subtitle="Add an invoice and record payment" wide onClose={() => setShowModal(false)}><SaleForm customers={customers} onSave={onSaveSale} onClose={() => setShowModal(false)} /></Modal>}</div>
}
