import { Link } from 'react-router-dom'
import { Moon, Sun, Globe, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useTheme } from '../contexts/ThemeContext'

export default function Header() {
  const { isDark, toggleTheme, language, toggleLanguage } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 glassmorphism shadow-sm">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-green rounded-lg flex items-center justify-center text-white font-bold text-xl">
              ح
            </div>
            <span className="text-xl font-bold text-text-dark dark:text-dark-text">حسابدار من</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/#features" className="text-text-gray hover:text-primary-green transition-colors">
              امکانات
            </Link>
            <Link to="/#pricing" className="text-text-gray hover:text-primary-green transition-colors">
              تعرفه‌ها
            </Link>
            <Link to="/#about" className="text-text-gray hover:text-primary-green transition-colors">
              درباره ما
            </Link>
            <Link to="/contact" className="text-text-gray hover:text-primary-green transition-colors">
              تماس
            </Link>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleLanguage}
              className="p-2 rounded-lg hover:bg-accent-light dark:hover:bg-dark-border transition-colors"
              aria-label="Toggle language"
            >
              <Globe className="w-5 h-5" />
              <span className="text-xs ml-1">{language === 'fa' ? 'EN' : 'FA'}</span>
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-accent-light dark:hover:bg-dark-border transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <div className="hidden md:flex items-center gap-3">
              <Link
                to="/login"
                className="text-text-gray hover:text-primary-green transition-colors"
              >
                ورود
              </Link>
              <Link
                to="/signup"
                className="btn-primary"
              >
                ثبت‌نام
              </Link>
            </div>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-accent-light dark:hover:bg-dark-border"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-accent-medium dark:border-dark-border">
            <div className="flex flex-col gap-3 mt-4">
              <Link to="/#features" className="text-text-gray hover:text-primary-green">امکانات</Link>
              <Link to="/#pricing" className="text-text-gray hover:text-primary-green">تعرفه‌ها</Link>
              <Link to="/#about" className="text-text-gray hover:text-primary-green">درباره ما</Link>
              <Link to="/contact" className="text-text-gray hover:text-primary-green">تماس</Link>
              <div className="flex gap-3 pt-3 border-t border-accent-medium dark:border-dark-border">
                <Link to="/login" className="flex-1 text-center py-2 text-text-gray">ورود</Link>
                <Link to="/signup" className="flex-1 text-center py-2 btn-primary">ثبت‌نام</Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

