import { Search, Bell, Plus, Menu } from 'lucide-react'
import { useState } from 'react'
import { useTheme } from '../contexts/ThemeContext'

interface TopBarProps {
  onMenuClick: () => void
}

export default function TopBar({ onMenuClick }: TopBarProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const { isDark } = useTheme()

  // Get current Jalali date (simplified)
  const currentDate = '۱۴۰۳/۰۱/۱۵'

  return (
    <header className="sticky top-0 z-30 bg-white dark:bg-dark-card border-b border-accent-medium dark:border-dark-border">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Search */}
          <div className="flex-1 max-w-md relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-gray" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="جستجو..."
              className="input-field pr-10 w-full"
            />
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {/* Date */}
            <div className="hidden md:block text-sm text-text-gray dark:text-dark-textSecondary">
              {currentDate}
            </div>

            {/* Notifications */}
            <button className="relative p-2 rounded-lg hover:bg-accent-light dark:hover:bg-dark-border transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 left-0 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                3
              </span>
            </button>

            {/* Quick Add */}
            <button className="btn-primary">
              <Plus className="w-5 h-5" />
              <span className="hidden md:inline">افزودن سریع</span>
            </button>

            {/* Mobile Menu */}
            <button
              onClick={onMenuClick}
              className="md:hidden p-2 rounded-lg hover:bg-accent-light dark:hover:bg-dark-border"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

