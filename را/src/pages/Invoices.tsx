import { Plus, Eye, Mail, FileText, Edit, Filter } from 'lucide-react'
import { useState } from 'react'

const invoices = [
  { id: '#123', customer: 'علی احمدی', date: '۱۴۰۳/۰۱/۱۵', amount: '۵۰۰,۰۰۰', status: 'paid' },
  { id: '#122', customer: 'فاطمه رضایی', date: '۱۴۰۳/۰۱/۱۴', amount: '۷۵۰,۰۰۰', status: 'pending' },
  { id: '#121', customer: 'محمد کریمی', date: '۱۴۰۳/۰۱/۱۳', amount: '۳۰۰,۰۰۰', status: 'partial' },
  { id: '#120', customer: 'زهرا محمدی', date: '۱۴۰۳/۰۱/۱۲', amount: '۱,۲۰۰,۰۰۰', status: 'paid' },
  { id: '#119', customer: 'حسن علی‌زاده', date: '۱۴۰۳/۰۱/۱۱', amount: '۶۰۰,۰۰۰', status: 'pending' }
]

export default function Invoices() {
  const [statusFilter, setStatusFilter] = useState('all')
  const [showCreateModal, setShowCreateModal] = useState(false)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <span className="badge-success">پرداخت شده</span>
      case 'pending':
        return <span className="badge-danger">پرداخت نشده</span>
      case 'partial':
        return <span className="badge-warning">بخشی</span>
      default:
        return null
    }
  }

  const filteredInvoices = statusFilter === 'all'
    ? invoices
    : invoices.filter(inv => inv.status === statusFilter)

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-text-dark dark:text-dark-text">فاکتورها</h1>
        <button onClick={() => setShowCreateModal(true)} className="btn-primary">
          <Plus className="w-5 h-5" />
          فاکتور جدید
        </button>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-text-gray" />
            <span className="font-medium text-text-dark dark:text-dark-text">فیلتر:</span>
          </div>
          <div className="flex gap-2">
            {['all', 'paid', 'pending', 'partial'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  statusFilter === status
                    ? 'bg-primary-green text-white'
                    : 'bg-accent-light dark:bg-dark-border text-text-gray dark:text-dark-textSecondary hover:bg-accent-medium'
                }`}
              >
                {status === 'all' ? 'همه' :
                 status === 'paid' ? 'پرداخت شده' :
                 status === 'pending' ? 'پرداخت نشده' : 'بخشی'}
              </button>
            ))}
          </div>
          <input
            type="date"
            className="input-field"
            placeholder="تاریخ"
          />
        </div>
      </div>

      {/* Table */}
      <div className="card overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-accent-medium dark:border-dark-border">
              <th className="text-right py-3 px-4 font-medium text-text-dark dark:text-dark-text">شماره</th>
              <th className="text-right py-3 px-4 font-medium text-text-dark dark:text-dark-text">مشتری</th>
              <th className="text-right py-3 px-4 font-medium text-text-dark dark:text-dark-text">تاریخ</th>
              <th className="text-right py-3 px-4 font-medium text-text-dark dark:text-dark-text">مبلغ</th>
              <th className="text-right py-3 px-4 font-medium text-text-dark dark:text-dark-text">وضعیت</th>
              <th className="text-right py-3 px-4 font-medium text-text-dark dark:text-dark-text">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {filteredInvoices.map((invoice) => (
              <tr
                key={invoice.id}
                className="border-b border-accent-medium dark:border-dark-border hover:bg-accent-light dark:hover:bg-dark-border transition-colors"
              >
                <td className="py-3 px-4 text-text-dark dark:text-dark-text">{invoice.id}</td>
                <td className="py-3 px-4 text-text-dark dark:text-dark-text">{invoice.customer}</td>
                <td className="py-3 px-4 text-text-gray dark:text-dark-textSecondary">{invoice.date}</td>
                <td className="py-3 px-4 font-medium text-text-dark dark:text-dark-text">{invoice.amount} تومان</td>
                <td className="py-3 px-4">{getStatusBadge(invoice.status)}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-accent-light dark:hover:bg-dark-border rounded transition-colors" title="مشاهده">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 hover:bg-accent-light dark:hover:bg-dark-border rounded transition-colors" title="ارسال">
                      <Mail className="w-4 h-4" />
                    </button>
                    <button className="p-2 hover:bg-accent-light dark:hover:bg-dark-border rounded transition-colors" title="PDF">
                      <FileText className="w-4 h-4" />
                    </button>
                    <button className="p-2 hover:bg-accent-light dark:hover:bg-dark-border rounded transition-colors" title="ویرایش">
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create Invoice Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-dark-card rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-accent-medium dark:border-dark-border">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-text-dark dark:text-dark-text">ایجاد فاکتور جدید</h2>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="p-2 hover:bg-accent-light dark:hover:bg-dark-border rounded"
                >
                  ×
                </button>
              </div>
            </div>
            <div className="p-6 space-y-6">
              {/* Customer Selection */}
              <div>
                <label className="block text-sm font-medium mb-2 text-text-dark dark:text-dark-text">
                  انتخاب مشتری
                </label>
                <select className="input-field">
                  <option>انتخاب مشتری</option>
                  <option>علی احمدی</option>
                  <option>فاطمه رضایی</option>
                  <option>محمد کریمی</option>
                  <option>+ مشتری جدید</option>
                </select>
              </div>

              {/* Due Date */}
              <div>
                <label className="block text-sm font-medium mb-2 text-text-dark dark:text-dark-text">
                  تاریخ سررسید
                </label>
                <input type="date" className="input-field" />
              </div>

              {/* Items Table */}
              <div>
                <label className="block text-sm font-medium mb-2 text-text-dark dark:text-dark-text">
                  آیتم‌ها
                </label>
                <table className="w-full border border-accent-medium dark:border-dark-border rounded-lg">
                  <thead>
                    <tr className="bg-accent-light dark:bg-dark-border">
                      <th className="text-right py-2 px-4">محصول</th>
                      <th className="text-right py-2 px-4">تعداد</th>
                      <th className="text-right py-2 px-4">قیمت</th>
                      <th className="text-right py-2 px-4">مالیات</th>
                      <th className="text-right py-2 px-4">تخفیف</th>
                      <th className="text-right py-2 px-4">جمع</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-2 px-4">
                        <input type="text" className="input-field" placeholder="نام محصول" />
                      </td>
                      <td className="py-2 px-4">
                        <input type="number" className="input-field" placeholder="1" />
                      </td>
                      <td className="py-2 px-4">
                        <input type="number" className="input-field" placeholder="0" />
                      </td>
                      <td className="py-2 px-4">
                        <input type="number" className="input-field" placeholder="0%" />
                      </td>
                      <td className="py-2 px-4">
                        <input type="number" className="input-field" placeholder="0%" />
                      </td>
                      <td className="py-2 px-4 font-medium">۰ تومان</td>
                    </tr>
                  </tbody>
                </table>
                <button className="mt-2 text-primary-green hover:underline text-sm">
                  + افزودن آیتم
                </button>
              </div>

              {/* Summary */}
              <div className="bg-accent-light dark:bg-dark-border p-4 rounded-lg space-y-2">
                <div className="flex justify-between">
                  <span className="text-text-gray dark:text-dark-textSecondary">جمع کل:</span>
                  <span className="font-medium">۰ تومان</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-gray dark:text-dark-textSecondary">مالیات:</span>
                  <span className="font-medium">۰ تومان</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-gray dark:text-dark-textSecondary">تخفیف:</span>
                  <span className="font-medium">۰ تومان</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-accent-medium dark:border-dark-border">
                  <span className="font-bold text-text-dark dark:text-dark-text">قابل پرداخت:</span>
                  <span className="font-bold text-primary-green">۰ تومان</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button className="btn-outline flex-1">ذخیره پیش‌نویس</button>
                <button className="btn-secondary flex-1">پیش‌نمایش</button>
                <button className="btn-primary flex-1">ارسال</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

