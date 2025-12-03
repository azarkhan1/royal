import { Link } from 'react-router-dom'
import { Home, HelpCircle } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-dark-bg flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="text-8xl mb-6">📄</div>
        <h1 className="text-4xl font-bold mb-4 text-text-dark dark:text-dark-text">
          صفحه مورد نظر یافت نشد
        </h1>
        <p className="text-text-gray dark:text-dark-textSecondary mb-8">
          متأسفانه صفحه‌ای که به دنبال آن هستید وجود ندارد یا حذف شده است.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/app" className="btn-primary">
            <Home className="w-5 h-5" />
            بازگشت به داشبورد
          </Link>
          <Link to="/#contact" className="btn-outline">
            <HelpCircle className="w-5 h-5" />
            تماس با پشتیبانی
          </Link>
        </div>
      </div>
    </div>
  )
}

