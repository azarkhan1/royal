import { Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-text-dark dark:bg-dark-card text-white dark:text-dark-text py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Column 1: Logo */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary-green rounded-lg flex items-center justify-center text-white font-bold text-xl">
                ح
              </div>
              <span className="text-xl font-bold">حسابدار من</span>
            </div>
            <p className="text-gray-400 dark:text-dark-textSecondary">
              طراحی شده برای فارسی‌زبانان
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-bold mb-4">لینک‌های سریع</h3>
            <ul className="space-y-2 text-gray-400 dark:text-dark-textSecondary">
              <li>
                <a href="#" className="hover:text-white transition-colors">حریم خصوصی</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">شرایط استفاده</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">درباره ما</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h3 className="font-bold mb-4">تماس با ما</h3>
            <div className="flex items-center gap-2 text-gray-400 dark:text-dark-textSecondary">
              <Mail className="w-5 h-5" />
              <a href="mailto:support@hesabdar.ir" className="hover:text-white transition-colors">
                support@hesabdar.ir
              </a>
            </div>
          </div>

          {/* Column 4: Social */}
          <div>
            <h3 className="font-bold mb-4">شبکه‌های اجتماعی</h3>
            <div className="flex gap-4">
              {/* Social icons placeholder */}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center text-gray-400 dark:text-dark-textSecondary">
          © ۲۰۲۳ - طراحی شده برای فارسی‌زبانان
        </div>
      </div>
    </footer>
  )
}

