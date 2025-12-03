import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, ArrowLeft, Upload, X } from 'lucide-react'

type Currency = 'AFN' | 'IRR' | 'USD' | 'EUR' | 'OTHER'

const currencies = [
  { code: 'AFN' as Currency, name: 'افغانی', symbol: '؋', flag: '🇦🇫' },
  { code: 'IRR' as Currency, name: 'تومان', symbol: '﷼', flag: '🇮🇷' },
  { code: 'USD' as Currency, name: 'دلار', symbol: '$', flag: '🇺🇸' },
  { code: 'EUR' as Currency, name: 'یورو', symbol: '€', flag: '🇪🇺' },
  { code: 'OTHER' as Currency, name: 'دیگر', symbol: '?', flag: '🌍' }
]

export default function OnboardingWizard() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [selectedCurrency, setSelectedCurrency] = useState<Currency | null>(null)
  const [businessName, setBusinessName] = useState('')
  const [businessType, setBusinessType] = useState('')
  const [logo, setLogo] = useState<File | null>(null)
  const [itemType, setItemType] = useState<'product' | 'service'>('product')
  const [itemName, setItemName] = useState('')
  const [itemPrice, setItemPrice] = useState('')

  const totalSteps = 4

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    } else {
      navigate('/app')
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLogo(e.target.files[0])
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-green/10 via-primary-blue/10 to-background-light dark:from-dark-bg dark:via-dark-card dark:to-dark-bg flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="card">
          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-text-gray dark:text-dark-textSecondary">
                مرحله {step} از {totalSteps}
              </span>
              <span className="text-sm font-medium text-text-gray dark:text-dark-textSecondary">
                {Math.round((step / totalSteps) * 100)}%
              </span>
            </div>
            <div className="w-full bg-accent-light dark:bg-dark-border rounded-full h-2">
              <div
                className="bg-primary-green h-2 rounded-full transition-all duration-300"
                style={{ width: `${(step / totalSteps) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Step 1: Currency Selection */}
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold mb-4 text-text-dark dark:text-dark-text">
                ارز اصلی خود را انتخاب کنید
              </h2>
              <p className="text-text-gray dark:text-dark-textSecondary mb-8">
                می‌توانید بعدا تغییر دهید
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                {currencies.map((currency) => (
                  <button
                    key={currency.code}
                    onClick={() => setSelectedCurrency(currency.code)}
                    className={`p-6 rounded-lg border-2 transition-all ${
                      selectedCurrency === currency.code
                        ? 'border-primary-green bg-primary-green/10'
                        : 'border-accent-medium hover:border-primary-green/50'
                    }`}
                  >
                    <div className="text-4xl mb-2">{currency.flag}</div>
                    <div className="font-bold text-text-dark dark:text-dark-text">
                      {currency.name}
                    </div>
                    <div className="text-sm text-text-gray dark:text-dark-textSecondary">
                      {currency.code} {currency.symbol}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Business Info */}
          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold mb-4 text-text-dark dark:text-dark-text">
                مشخصات کسب‌وکار
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-text-dark dark:text-dark-text">
                    نام کسب‌وکار *
                  </label>
                  <input
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="input-field"
                    placeholder="نام کسب‌وکار خود را وارد کنید"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-text-dark dark:text-dark-text">
                    آپلود لوگو
                  </label>
                  <div className="border-2 border-dashed border-accent-medium dark:border-dark-border rounded-lg p-8 text-center">
                    {logo ? (
                      <div className="flex items-center justify-center gap-4">
                        <img
                          src={URL.createObjectURL(logo)}
                          alt="Logo"
                          className="w-20 h-20 rounded-lg object-cover"
                        />
                        <button
                          onClick={() => setLogo(null)}
                          className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    ) : (
                      <label className="cursor-pointer">
                        <Upload className="w-12 h-12 mx-auto mb-4 text-text-gray" />
                        <p className="text-text-gray dark:text-dark-textSecondary">
                          کلیک کنید یا فایل را بکشید
                        </p>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleLogoUpload}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-text-dark dark:text-dark-text">
                    زمینه فعالیت
                  </label>
                  <select
                    value={businessType}
                    onChange={(e) => setBusinessType(e.target.value)}
                    className="input-field"
                  >
                    <option value="">انتخاب کنید</option>
                    <option value="services">خدمات</option>
                    <option value="goods">کالا</option>
                    <option value="free">آزاد</option>
                  </select>
                </div>

                {businessName && (
                  <div className="mt-6 p-4 bg-accent-light dark:bg-dark-border rounded-lg">
                    <p className="text-sm text-text-gray dark:text-dark-textSecondary mb-2">
                      پیش‌نمایش:
                    </p>
                    <div className="flex items-center gap-3">
                      {logo && (
                        <img
                          src={URL.createObjectURL(logo)}
                          alt="Logo"
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                      )}
                      <div className="font-bold text-text-dark dark:text-dark-text">
                        {businessName}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 3: First Item */}
          {step === 3 && (
            <div>
              <h2 className="text-2xl font-bold mb-4 text-text-dark dark:text-dark-text">
                افزودن اولین مورد
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4 p-1 bg-accent-light dark:bg-dark-border rounded-lg">
                  <button
                    onClick={() => setItemType('product')}
                    className={`flex-1 py-2 px-4 rounded-lg transition-all ${
                      itemType === 'product'
                        ? 'bg-white dark:bg-dark-card shadow-sm'
                        : ''
                    }`}
                  >
                    محصول
                  </button>
                  <button
                    onClick={() => setItemType('service')}
                    className={`flex-1 py-2 px-4 rounded-lg transition-all ${
                      itemType === 'service'
                        ? 'bg-white dark:bg-dark-card shadow-sm'
                        : ''
                    }`}
                  >
                    خدمات
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-text-dark dark:text-dark-text">
                    نام
                  </label>
                  <input
                    type="text"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    className="input-field"
                    placeholder={`نام ${itemType === 'product' ? 'محصول' : 'خدمت'}`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-text-dark dark:text-dark-text">
                    قیمت
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={itemPrice}
                      onChange={(e) => setItemPrice(e.target.value)}
                      className="input-field"
                      placeholder="0"
                    />
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-gray">
                      {selectedCurrency && currencies.find(c => c.code === selectedCurrency)?.symbol}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleNext}
                  className="text-primary-green hover:underline text-sm"
                >
                  بعدا انجام می‌دهم
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Dashboard Tour */}
          {step === 4 && (
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4 text-text-dark dark:text-dark-text">
                معرفی داشبورد
              </h2>
              <p className="text-text-gray dark:text-dark-textSecondary mb-8">
                آماده شروع هستید!
              </p>
              <div className="bg-gradient-to-br from-primary-green/10 to-primary-blue/10 rounded-lg p-8 mb-8">
                <div className="space-y-4 text-right">
                  <div className="flex items-center gap-3 justify-end">
                    <div className="w-12 h-12 bg-primary-green rounded-lg flex items-center justify-center text-white font-bold">
                      +
                    </div>
                    <div>
                      <div className="font-bold text-text-dark dark:text-dark-text">
                        افزودن فاکتور
                      </div>
                      <div className="text-sm text-text-gray dark:text-dark-textSecondary">
                        ایجاد و ارسال فاکتور به مشتریان
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 justify-end">
                    <div className="w-12 h-12 bg-primary-blue rounded-lg flex items-center justify-center text-white font-bold">
                      📊
                    </div>
                    <div>
                      <div className="font-bold text-text-dark dark:text-dark-text">
                        مشاهده گزارش
                      </div>
                      <div className="text-sm text-text-gray dark:text-dark-textSecondary">
                        گزارش‌های مالی و آماری
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 justify-end">
                    <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center text-white font-bold">
                      ⚙️
                    </div>
                    <div>
                      <div className="font-bold text-text-dark dark:text-dark-text">
                        تنظیمات
                      </div>
                      <div className="text-sm text-text-gray dark:text-dark-textSecondary">
                        شخصی‌سازی و مدیریت حساب
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-accent-medium dark:border-dark-border">
            <button
              onClick={handleBack}
              disabled={step === 1}
              className="btn-outline flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowRight className="w-4 h-4" />
              قبلی
            </button>
            <button
              onClick={handleNext}
              disabled={
                (step === 1 && !selectedCurrency) ||
                (step === 2 && !businessName)
              }
              className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {step === totalSteps ? 'شروع کنید!' : 'بعدی'}
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

