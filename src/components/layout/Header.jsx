import { Bell, ChevronDown, Menu, Search } from 'lucide-react'
import { useLocation } from 'react-router-dom'

const titles = { '/': ['Dashboard', 'Tuesday, September 30, 2026'], '/customers': ['Customers', 'Manage your customer accounts'], '/sales': ['Sales & Bills', 'Track invoices and sales activity'], '/payments': ['Payments', 'Monitor received and outstanding payments'], '/reports': ['Reports', 'Business performance at a glance'], '/settings': ['Settings', 'Manage your workspace preferences'] }

export default function Header({ onMenu }) {
  const { pathname } = useLocation()
  const [title, subtitle] = titles[pathname] || titles['/']
  return <header className="topbar"><div className="topbar-title"><button className="menu-button" onClick={onMenu}><Menu size={20} /></button><div><h1>{title}</h1><p>{subtitle}</p></div></div><div className="topbar-actions"><button className="header-search"><Search size={17} /><span>Search anything</span><kbd>⌘ K</kbd></button><button className="notification-button" aria-label="Notifications"><Bell size={19} /><span /></button><div className="profile"><div className="avatar">AK</div><div className="profile-copy"><strong>Ahmed Khan</strong><span>Owner</span></div><ChevronDown size={15} /></div></div></header>
}
