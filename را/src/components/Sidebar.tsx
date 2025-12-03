import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  FileText,
  DollarSign,
  Package,
  Users,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  User
} from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'

interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
}

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const { isDark } = useTheme()

  const menuItems = [
    { icon: LayoutDashboard, label: 'داشبورد', path: '/app' },
    { icon: FileText, label: 'فاکتورها', path: '/app/invoices' },
    { icon: DollarSign, label: 'هزینه‌ها', path: '/app/expenses' },
    { icon: Package, label: 'محصولات و خدمات', path: '/app/products' },
    { icon: Users, label: 'مشتریان', path: '/app/clients' },
    { icon: BarChart3, label: 'گزارش‌ها', path: '/app/reports' },
    { icon: Settings, label: 'تنظیمات', path: '/app/settings' }
  ]

  const isActive = (path: string) => {
    if (path === '/app') {
      return location.pathname === '/app'
    }
    return location.pathname.startsWith(path)
  }

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed right-0 top-0 h-full bg-white dark:bg-dark-card border-l border-accent-medium dark:border-dark-border z-50 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'
        } ${isOpen ? 'w-64' : 'w-0 md:w-20'} overflow-hidden`}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-accent-medium dark:border-dark-border flex items-center justify-between">
            {isOpen && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-green rounded-lg flex items-center justify-center text-white font-bold">
                  ح
                </div>
                <span className="font-bold text-text-dark dark:text-dark-text">
                  حسابدار من
                </span>
              </div>
            )}
            <button
              onClick={onToggle}
              className="p-2 rounded-lg hover:bg-accent-light dark:hover:bg-dark-border md:hidden"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Profile */}
          {isOpen && (
            <div className="p-4 border-b border-accent-medium dark:border-dark-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-blue rounded-full flex items-center justify-center text-white">
                  <User className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-text-dark dark:text-dark-text truncate">
                    کسب‌وکار من
                  </div>
                  <div className="text-xs text-text-gray dark:text-dark-textSecondary">
                    کسب‌وکار کوچک
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon
                const active = isActive(item.path)
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                        active
                          ? 'bg-primary-green/10 text-primary-green'
                          : 'text-text-gray dark:text-dark-textSecondary hover:bg-accent-light dark:hover:bg-dark-border'
                      }`}
                      title={!isOpen ? item.label : undefined}
                    >
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      {isOpen && (
                        <span className="font-medium">{item.label}</span>
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Storage & Logout */}
          <div className="p-4 border-t border-accent-medium dark:border-dark-border space-y-4">
            {isOpen && (
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-text-gray dark:text-dark-textSecondary">
                    فضای ذخیره‌سازی
                  </span>
                  <span className="text-text-gray dark:text-dark-textSecondary">45%</span>
                </div>
                <div className="w-full bg-accent-light dark:bg-dark-border rounded-full h-2">
                  <div
                    className="bg-primary-green h-2 rounded-full"
                    style={{ width: '45%' }}
                  ></div>
                </div>
              </div>
            )}
            <button
              onClick={() => navigate('/login')}
              className="w-full flex items-center gap-3 p-3 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              {isOpen && <span>خروج</span>}
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}

