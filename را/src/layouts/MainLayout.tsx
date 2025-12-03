import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import TopBar from '../components/TopBar'

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="min-h-screen bg-background-light dark:bg-dark-bg flex">
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'mr-64' : 'mr-0'}`}>
        <TopBar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

