import { Link } from 'react-router-dom'
import { Mail, Lock, Check, X, ArrowLeft } from 'lucide-react'
import { useState } from 'react'

export default function SignupPage() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [captcha, setCaptcha] = useState('')
  const [captchaAnswer] = useState(2 + 3)

  const passwordStrength = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password)
  }

  const strengthScore = Object.values(passwordStrength).filter(Boolean).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-green/10 via-primary-blue/10 to-background-light dark:from-dark-bg dark:via-dark-card dark:to-dark-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="card">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary-green rounded-lg flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
              ح
            </div>
            <h1 className="text-3xl font-bold text-text-dark dark:text-dark-text mb-2">
              ایجاد حساب جدید
            </h1>
            <p className="text-text-gray dark:text-dark-textSecondary">
              شروع کنید و مدیریت مالی خود را ساده کنید
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
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field pr-10"
                  placeholder="رمز عبور خود را وارد کنید"
                />
              </div>
              {password && (
                <div className="mt-2 space-y-1">
                  <div className="flex items-center gap-2 text-xs">
                    {passwordStrength.length ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <X className="w-4 h-4 text-red-500" />
                    )}
                    <span className={passwordStrength.length ? 'text-green-500' : 'text-red-500'}>
                      حداقل ۸ کاراکتر
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    {passwordStrength.uppercase || passwordStrength.lowercase ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <X className="w-4 h-4 text-red-500" />
                    )}
                    <span className={passwordStrength.uppercase || passwordStrength.lowercase ? 'text-green-500' : 'text-red-500'}>
                      حروف انگلیسی
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    {passwordStrength.number ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <X className="w-4 h-4 text-red-500" />
                    )}
                    <span className={passwordStrength.number ? 'text-green-500' : 'text-red-500'}>
                      شامل عدد
                    </span>
                  </div>
                  <div className="mt-2">
                    <div className="w-full bg-accent-light dark:bg-dark-border rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all ${
                          strengthScore === 0 ? 'bg-red-500 w-0' :
                          strengthScore === 1 ? 'bg-red-500 w-1/4' :
                          strengthScore === 2 ? 'bg-yellow-500 w-2/4' :
                          strengthScore === 3 ? 'bg-green-500 w-3/4' :
                          'bg-primary-green w-full'
                        }`}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-text-dark dark:text-dark-text">
                تکرار رمز عبور
              </label>
              <div className="relative">
                <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-gray" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`input-field pr-10 ${
                    confirmPassword && password !== confirmPassword
                      ? 'border-red-500 focus:ring-red-500'
                      : confirmPassword && password === confirmPassword
                      ? 'border-green-500 focus:ring-green-500'
                      : ''
                  }`}
                  placeholder="رمز عبور را تکرار کنید"
                />
              </div>
              {confirmPassword && password !== confirmPassword && (
                <p className="mt-1 text-xs text-red-500">رمز عبورها مطابقت ندارند</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-text-dark dark:text-dark-text">
                کد امنیتی
              </label>
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-accent-light dark:bg-dark-border px-4 py-3 rounded-lg text-center font-bold text-lg">
                  ۲ + ۳ = ?
                </div>
                <input
                  type="text"
                  value={captcha}
                  onChange={(e) => setCaptcha(e.target.value)}
                  className="input-field w-24 text-center"
                  placeholder="?"
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn-primary w-full"
              disabled={strengthScore < 3 || password !== confirmPassword || captcha !== '5'}
            >
              ایجاد حساب
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-text-gray dark:text-dark-textSecondary">
              قبلا حساب دارید؟{' '}
              <Link to="/login" className="text-primary-green hover:underline">
                ورود
              </Link>
            </p>
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

