import { User, DollarSign, Palette, Download, Upload, Trash2, Users, Moon, Sun, Calendar } from 'lucide-react'
import { useState } from 'react'
import { useTheme } from '../contexts/ThemeContext'

const settingsSections = [
  { id: 'profile', label: 'پروفایل', icon: User },
  { id: 'accounts', label: 'حساب‌ها', icon: DollarSign },
  { id: 'display', label: 'نمایش', icon: Palette },
  { id: 'backup', label: 'پشتیبان‌گیری', icon: Download },
  { id: 'members', label: 'اعضا', icon: Users },
  { id: 'about', label: 'درباره', icon: User }
]

export default function Settings() {
  const [activeSection, setActiveSection] = useState('profile')
  const { isDark, toggleTheme } = useTheme()
  const [dateFormat, setDateFormat] = useState<'jalali' | 'gregorian'>('jalali')

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-text-dark dark:text-dark-text">تنظیمات</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Menu */}
        <div className="lg:col-span-1">
          <div className="card">
            <nav className="space-y-2">
              {settingsSections.map((section) => {
                const Icon = section.icon
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors text-right ${
                      activeSection === section.id
                        ? 'bg-primary-green/10 text-primary-green'
                        : 'text-text-gray dark:text-dark-textSecondary hover:bg-accent-light dark:hover:bg-dark-border'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{section.label}</span>
                  </button>
                )
              })}
            </nav>
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          <div className="card">
            {/* Profile Section */}
            {activeSection === 'profile' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-text-dark dark:text-dark-text">پروفایل</h2>
                <div>
                  <label className="block text-sm font-medium mb-2 text-text-dark dark:text-dark-text">
                    نام کسب‌وکار
                  </label>
                  <input type="text" className="input-field" defaultValue="کسب‌وکار من" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-text-dark dark:text-dark-text">
                    آپلود لوگو
                  </label>
                  <div className="border-2 border-dashed border-accent-medium dark:border-dark-border rounded-lg p-8 text-center">
                    <input type="file" accept="image/*" className="hidden" id="logo-upload" />
                    <label htmlFor="logo-upload" className="cursor-pointer">
                      <div className="text-text-gray dark:text-dark-textSecondary">
                        کلیک کنید یا فایل را بکشید
                      </div>
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-text-dark dark:text-dark-text">
                    اطلاعات تماس
                  </label>
                  <textarea className="input-field" rows={4} placeholder="آدرس، تلفن، ایمیل و..."></textarea>
                </div>
                <button className="btn-primary">ذخیره تغییرات</button>
              </div>
            )}

            {/* Accounts Section */}
            {activeSection === 'accounts' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-text-dark dark:text-dark-text">حساب‌ها</h2>
                <div>
                  <label className="block text-sm font-medium mb-2 text-text-dark dark:text-dark-text">
                    ارزهای پشتیبانی شده
                  </label>
                  <div className="space-y-2">
                    {['AFN', 'IRR', 'USD', 'EUR'].map((currency) => (
                      <label key={currency} className="flex items-center gap-3 p-3 border border-accent-medium dark:border-dark-border rounded-lg cursor-pointer hover:bg-accent-light dark:hover:bg-dark-border">
                        <input type="checkbox" defaultChecked={currency === 'IRR'} className="w-4 h-4" />
                        <span className="font-medium">{currency}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-text-dark dark:text-dark-text">
                    نرخ تبدیل (دستی)
                  </label>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <input type="number" className="input-field flex-1" placeholder="1" />
                      <span className="font-medium">USD =</span>
                      <input type="number" className="input-field flex-1" placeholder="42000" />
                      <span className="font-medium">IRR</span>
                    </div>
                  </div>
                </div>
                <button className="btn-primary">ذخیره</button>
              </div>
            )}

            {/* Display Section */}
            {activeSection === 'display' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-text-dark dark:text-dark-text">نمایش</h2>
                <div>
                  <label className="block text-sm font-medium mb-4 text-text-dark dark:text-dark-text">
                    حالت تاریک/روشن
                  </label>
                  <button
                    onClick={toggleTheme}
                    className="flex items-center gap-3 p-4 border border-accent-medium dark:border-dark-border rounded-lg hover:bg-accent-light dark:hover:bg-dark-border transition-colors"
                  >
                    {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    <span className="font-medium">{isDark ? 'حالت روشن' : 'حالت تاریک'}</span>
                  </button>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-4 text-text-dark dark:text-dark-text">
                    ترتیب تاریخ
                  </label>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setDateFormat('jalali')}
                      className={`flex-1 p-4 border-2 rounded-lg transition-colors ${
                        dateFormat === 'jalali'
                          ? 'border-primary-green bg-primary-green/10'
                          : 'border-accent-medium dark:border-dark-border'
                      }`}
                    >
                      <Calendar className="w-5 h-5 mx-auto mb-2" />
                      <div className="font-medium">شمسی</div>
                    </button>
                    <button
                      onClick={() => setDateFormat('gregorian')}
                      className={`flex-1 p-4 border-2 rounded-lg transition-colors ${
                        dateFormat === 'gregorian'
                          ? 'border-primary-green bg-primary-green/10'
                          : 'border-accent-medium dark:border-dark-border'
                      }`}
                    >
                      <Calendar className="w-5 h-5 mx-auto mb-2" />
                      <div className="font-medium">میلادی</div>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Backup Section */}
            {activeSection === 'backup' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-text-dark dark:text-dark-text">پشتیبان‌گیری</h2>
                <div className="space-y-4">
                  <button className="btn-primary w-full">
                    <Download className="w-5 h-5" />
                    دانلود پشتیبان (JSON)
                  </button>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-text-dark dark:text-dark-text">
                      آپلود بازیابی
                    </label>
                    <div className="border-2 border-dashed border-accent-medium dark:border-dark-border rounded-lg p-8 text-center">
                      <Upload className="w-12 h-12 mx-auto mb-4 text-text-gray" />
                      <input type="file" accept=".json" className="hidden" id="backup-upload" />
                      <label htmlFor="backup-upload" className="cursor-pointer">
                        <div className="text-text-gray dark:text-dark-textSecondary">
                          فایل JSON را انتخاب کنید
                        </div>
                      </label>
                    </div>
                  </div>
                  <button className="btn-outline w-full text-red-500 border-red-500 hover:bg-red-50 dark:hover:bg-red-900/20">
                    <Trash2 className="w-5 h-5" />
                    حذف تمام داده‌ها
                  </button>
                </div>
              </div>
            )}

            {/* Members Section */}
            {activeSection === 'members' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-text-dark dark:text-dark-text">اعضا</h2>
                  <button className="btn-primary">
                    <Users className="w-5 h-5" />
                    افزودن عضو
                  </button>
                </div>
                <div className="space-y-3">
                  <div className="p-4 border border-accent-medium dark:border-dark-border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-text-dark dark:text-dark-text">admin@example.com</div>
                        <div className="text-sm text-text-gray dark:text-dark-textSecondary">مالک</div>
                      </div>
                      <span className="badge-success">مالک</span>
                    </div>
                  </div>
                </div>
                <div className="card bg-accent-light dark:bg-dark-border">
                  <h3 className="font-bold mb-3 text-text-dark dark:text-dark-text">افزودن عضو جدید</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-text-dark dark:text-dark-text">
                        ایمیل
                      </label>
                      <input type="email" className="input-field" placeholder="member@example.com" dir="ltr" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-text-dark dark:text-dark-text">
                        سطح دسترسی
                      </label>
                      <select className="input-field">
                        <option>مشاهده</option>
                        <option>ویرایش</option>
                      </select>
                    </div>
                    <button className="btn-primary">ارسال دعوت</button>
                  </div>
                </div>
              </div>
            )}

            {/* About Section */}
            {activeSection === 'about' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-text-dark dark:text-dark-text">درباره</h2>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-text-gray dark:text-dark-textSecondary mb-1">نسخه</div>
                    <div className="font-medium text-text-dark dark:text-dark-text">1.0.0</div>
                  </div>
                  <div>
                    <div className="text-sm text-text-gray dark:text-dark-textSecondary mb-1">تاریخ انتشار</div>
                    <div className="font-medium text-text-dark dark:text-dark-text">۱۴۰۳/۰۱/۱۵</div>
                  </div>
                  <div>
                    <div className="text-sm text-text-gray dark:text-dark-textSecondary mb-1">مجوز</div>
                    <div className="font-medium text-text-dark dark:text-dark-text">رایگان و متن باز</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

