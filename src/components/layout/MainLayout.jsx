import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  return <div className="app-shell"><Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} /><div className="main-shell"><Header onMenu={() => setSidebarOpen(true)} /><main className="page-content"><Outlet /></main></div>{sidebarOpen && <div className="mobile-overlay" onClick={() => setSidebarOpen(false)} />}</div>
}
