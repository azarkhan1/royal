import { Plus, Repeat, Tag, ChevronDown } from 'lucide-react'
import { useState } from 'react'

const expenseCategories = [
  { id: 1, name: 'اجاره', icon: '🏢', color: '#22C55E' },
  { id: 2, name: 'حقوق', icon: '💼', color: '#3B82F6' },
  { id: 3, name: 'مواد اولیه', icon: '📦', color: '#F59E0B' },
  { id: 4, name: 'بازاریابی', icon: '📢', color: '#EF4444' },
  { id: 5, name: 'حمل و نقل', icon: '🚚', color: '#8B5CF6' },
  { id: 6, name: 'خدمات', icon: '🔧', color: '#EC4899' },
  { id: 7, name: 'ابزار', icon: '🛠️', color: '#14B8A6' },
  { id: 8, name: 'سایر', icon: '📝', color: '#6B7280' }
]

const expenses = [
  { id: 1, category: 'اجاره', vendor: 'مالک', date: '۱۴۰۳/۰۱/۱۵', amount: '۵,۰۰۰,۰۰۰', isRecurring: true },
  { id: 2, category: 'مواد اولیه', vendor: 'تامین‌کننده A', date: '۱۴۰۳/۰۱/۱۴', amount: '۱,۲۰۰,۰۰۰', isRecurring: false },
  { id: 3, category: 'حقوق', vendor: 'کارمند ۱', date: '۱۴۰۳/۰۱/۱۰', amount: '۳,۰۰۰,۰۰۰', isRecurring: true },
  { id: 4, category: 'بازاریابی', vendor: 'آژانس تبلیغاتی', date: '۱۴۰۳/۰۱/۰۸', amount: '۸۰۰,۰۰۰', isRecurring: false }
]

export default function Expenses() {
  const [activeTab, setActiveTab] = useState<'all' | 'recurring' | 'categories'>('all')
  const [showQuickForm, setShowQuickForm] = useState(false)
  const [showFullForm, setShowFullForm] = useState(false)
  const [quickCategory, setQuickCategory] = useState('')
  const [quickAmount, setQuickAmount] = useState('')
  const [quickDescription, setQuickDescription] = useState('')

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-text-dark dark:text-dark-text">هزینه‌ها</h1>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-accent-medium dark:border-dark-border">
        {[
          { id: 'all', label: 'همه هزینه‌ها' },
          { id: 'recurring', label: 'هزینه‌های تکراری' },
          { id: 'categories', label: 'دسته‌بندی‌ها' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-6 py-3 font-medium transition-colors border-b-2 ${
              activeTab === tab.id
                ? 'border-primary-green text-primary-green'
                : 'border-transparent text-text-gray dark:text-dark-textSecondary hover:text-text-dark dark:hover:text-dark-text'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Quick Add Form */}
      {showQuickForm && (
        <div className="card sticky top-24 z-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-text-dark dark:text-dark-text">افزودن سریع هزینه</h2>
            <button
              onClick={() => setShowQuickForm(false)}
              className="text-text-gray hover:text-text-dark"
            >
              ×
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-text-dark dark:text-dark-text">
                دسته‌بندی
              </label>
              <select
                value={quickCategory}
                onChange={(e) => setQuickCategory(e.target.value)}
                className="input-field"
              >
                <option value="">انتخاب کنید</option>
                {expenseCategories.map((cat) => (
                  <option key={cat.id} value={cat.name}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-text-dark dark:text-dark-text">
                مبلغ
              </label>
              <input
                type="number"
                value={quickAmount}
                onChange={(e) => setQuickAmount(e.target.value)}
                className="input-field"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-text-dark dark:text-dark-text">
                توضیح مختصر
              </label>
              <input
                type="text"
                value={quickDescription}
                onChange={(e) => setQuickDescription(e.target.value)}
                className="input-field"
                placeholder="توضیحات"
              />
            </div>
            <div className="flex items-end">
              <button className="btn-primary w-full">افزودن</button>
            </div>
          </div>
          <button
            onClick={() => {
              setShowQuickForm(false)
              setShowFullForm(true)
            }}
            className="mt-4 text-sm text-primary-green hover:underline"
          >
            ورود جزئیات بیشتر
          </button>
        </div>
      )}

      {!showQuickForm && (
        <button
          onClick={() => setShowQuickForm(true)}
          className="btn-primary"
        >
          <Plus className="w-5 h-5" />
          افزودن هزینه
        </button>
      )}

      {/* Expenses List */}
      {activeTab === 'all' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {expenses.map((expense) => {
            const category = expenseCategories.find(c => c.name === expense.category)
            return (
              <div key={expense.id} className="card">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
                      style={{ backgroundColor: `${category?.color}20` }}
                    >
                      {category?.icon}
                    </div>
                    <div>
                      <div className="font-bold text-text-dark dark:text-dark-text">
                        {expense.category}
                      </div>
                      <div className="text-sm text-text-gray dark:text-dark-textSecondary">
                        {expense.vendor}
                      </div>
                      <div className="text-xs text-text-gray dark:text-dark-textSecondary mt-1">
                        {expense.date}
                      </div>
                    </div>
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-red-500 text-lg">
                      {expense.amount} تومان
                    </div>
                    {expense.isRecurring && (
                      <div className="flex items-center gap-1 text-xs text-primary-blue mt-1">
                        <Repeat className="w-3 h-3" />
                        تکراری
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {activeTab === 'recurring' && (
        <div className="card">
          <p className="text-text-gray dark:text-dark-textSecondary text-center py-8">
            هزینه‌های تکراری شما اینجا نمایش داده می‌شوند
          </p>
        </div>
      )}

      {activeTab === 'categories' && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {expenseCategories.map((category) => (
            <div key={category.id} className="card text-center">
              <div
                className="w-16 h-16 rounded-lg flex items-center justify-center text-4xl mx-auto mb-3"
                style={{ backgroundColor: `${category.color}20` }}
              >
                {category.icon}
              </div>
              <div className="font-medium text-text-dark dark:text-dark-text">
                {category.name}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

