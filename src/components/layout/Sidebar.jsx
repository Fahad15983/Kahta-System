import { NavLink } from 'react-router-dom'
import { BarChart3, CircleDollarSign, FileText, LayoutDashboard, LogOut, Settings, ShoppingBag, Users } from 'lucide-react'

const links = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/customers', label: 'Customers', icon: Users },
  { to: '/sales', label: 'Sales / Bills', icon: FileText },
  { to: '/payments', label: 'Payments', icon: CircleDollarSign },
  { to: '/reports', label: 'Reports', icon: BarChart3 },
]

export default function Sidebar({ open, onClose }) {
  return <aside className={`sidebar ${open ? 'sidebar-open' : ''}`}><div className="brand"><div className="brand-mark"><ShoppingBag size={20} /></div><div><strong>Wholesale</strong><span>MANAGER</span></div><button className="sidebar-close" onClick={onClose}>×</button></div><div className="workspace-label">WORKSPACE</div><nav>{links.map(({ to, label, icon: Icon }) => <NavLink key={to} to={to} end={to === '/'} onClick={onClose} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}><Icon size={18} /><span>{label}</span></NavLink>)}</nav><div className="sidebar-footer"><NavLink to="/settings" className="nav-link"><Settings size={18} /><span>Settings</span></NavLink><button className="nav-link logout"><LogOut size={18} /><span>Log out</span></button><div className="sidebar-version">Wholesale Manager <span>v1.0 demo</span></div></div></aside>
}
