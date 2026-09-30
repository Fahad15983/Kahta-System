import { useMemo, useState } from 'react'
import { Plus, SlidersHorizontal } from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from '../components/common/Button'
import Modal from '../components/common/Modal'
import SearchBar from '../components/common/SearchBar'
import StatusBadge from '../components/common/StatusBadge'
import { formatCurrency } from '../utils/formatCurrency'
import { getBalance, getStatus } from '../utils/calculations'

export default function Customers({ customers, onAddCustomer }) {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('All')
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', cnic: '', address: '' })
  const filtered = useMemo(() => customers.filter((customer) => {
    const matchesQuery = `${customer.name} ${customer.phone} ${customer.cnic}`.toLowerCase().includes(query.toLowerCase())
    const matchesFilter = filter === 'All' || getStatus(customer.totalPurchases, customer.paid) === filter
    return matchesQuery && matchesFilter
  }), [customers, query, filter])
  function submit(event) { event.preventDefault(); onAddCustomer(form); setForm({ name: '', phone: '', cnic: '', address: '' }); setShowModal(false) }
  return <div className="content-page"><div className="page-heading"><div><span className="eyebrow">CUSTOMER DIRECTORY</span><h2>Customers</h2><p>Manage customer information and account balances.</p></div><Button icon={Plus} onClick={() => setShowModal(true)}>Add customer</Button></div><section className="panel table-panel"><div className="table-toolbar"><SearchBar value={query} onChange={setQuery} placeholder="Search by name, phone or CNIC..." /><div className="filter-tabs">{['All', 'Paid', 'Partial', 'Unpaid'].map((item) => <button className={filter === item ? 'filter-tab active' : 'filter-tab'} onClick={() => setFilter(item)} key={item}>{item}<span>{item === 'All' ? customers.length : customers.filter((customer) => getStatus(customer.totalPurchases, customer.paid) === item).length}</span></button>)}</div><button className="filter-button"><SlidersHorizontal size={16} /> Filters</button></div><div className="table-wrap"><table className="customers-table"><thead><tr><th>Customer</th><th>Phone</th><th>CNIC</th><th>Address</th><th>Total purchases</th><th>Paid</th><th>Balance</th><th>Status</th><th></th></tr></thead><tbody>{filtered.map((customer) => { const balance = getBalance(customer); const status = getStatus(customer.totalPurchases, customer.paid); return <tr key={customer.id}><td><Link className="customer-name-link" to={`/customers/${customer.id}`}><div className="table-customer"><div className="customer-avatar">{customer.name.split(' ').map((word) => word[0]).slice(0, 2).join('')}</div><strong>{customer.name}</strong></div></Link></td><td>{customer.phone}</td><td>{customer.cnic}</td><td className="address-cell">{customer.address}</td><td>{formatCurrency(customer.totalPurchases)}</td><td>{formatCurrency(customer.paid)}</td><td className={balance ? 'amount-due' : ''}>{formatCurrency(balance)}</td><td><StatusBadge status={status} /></td><td><Link className="table-action" to={`/customers/${customer.id}`}>View</Link></td></tr> })}</tbody></table>{!filtered.length && <div className="empty-state">No customers match your search.</div>}</div></section>{showModal && <Modal title="Add customer" subtitle="Create a new customer account" onClose={() => setShowModal(false)}><form className="form-grid" onSubmit={submit}><label>Customer name *<input required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="e.g. Imran Traders" /></label><label>Mobile number *<input required value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} placeholder="03XX-XXXXXXX" /></label><label>CNIC number<input value={form.cnic} onChange={(event) => setForm({ ...form, cnic: event.target.value })} placeholder="XXXXX-XXXXXXX-X" /></label><label>Address<textarea value={form.address} onChange={(event) => setForm({ ...form, address: event.target.value })} placeholder="Business address" rows="3" /></label><div className="modal-actions"><Button type="button" variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button><Button type="submit">Save customer</Button></div></form></Modal>}</div>
}
