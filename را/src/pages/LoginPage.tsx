import { Link } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react'
import { useState } from 'react'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-green/10 via-primary-blue/10 to-background-light dark:from-dark-bg dark:via-dark-card dark:to-dark-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="card">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary-green rounded-lg flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
              ح
            </div>
            <h1 className="text-3xl font-bold text-text-dark dark:text-dark-text mb-2">
              ورود به حساب کاربری
            </h1>
            <p className="text-text-gray dark:text-dark-textSecondary">
              به حسابدار من خوش آمدید
            </p>
          </div>

          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-text-dark dark:text-dark-text">
                ایمیل
              </label>
              <div className="relative">
                <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-gray" />
                <input
                  type="email"
                  className="input-field pr-10"
                  placeholder="example@email.com"
                  dir="ltr"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-text-dark dark:text-dark-text">
                رمز عبور
              </label>
              <div className="relative">
                <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-gray" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="input-field pr-10 pl-10"
                  placeholder="رمز عبور خود را وارد کنید"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-gray hover:text-text-dark"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-primary-green rounded focus:ring-primary-green"
                />
                <span className="text-sm text-text-gray dark:text-dark-textSecondary">
                  مرا به خاطر بسپار
                </span>
              </label>
              <Link
                to="/forgot-password"
                className="text-sm text-primary-green hover:underline"
              >
                رمز عبور را فراموش کرده‌اید؟
              </Link>
            </div>

            <button type="submit" className="btn-primary w-full">
              ورود
            </button>
          </form>

          <div className="mt-6 text-center">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-accent-medium dark:border-dark-border"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-dark-card text-text-gray dark:text-dark-textSecondary">
                  یا
                </span>
              </div>
            </div>
            <Link
              to="/signup"
              className="mt-4 block text-center text-primary-green hover:underline"
            >
              ساخت حساب جدید
            </Link>
          </div>

          <Link
            to="/"
            className="mt-6 flex items-center justify-center gap-2 text-text-gray hover:text-primary-green transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            بازگشت به صفحه اصلی
          </Link>
        </div>
      </div>
    </div>
  )
}

