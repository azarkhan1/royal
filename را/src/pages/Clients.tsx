import { Plus, User, Mail, Phone, FileText, Edit } from 'lucide-react'
import { useState } from 'react'

const clients = [
  { id: 1, name: 'علی احمدی', email: 'ali@example.com', phone: '09123456789', invoices: 12, total: '۶,۰۰۰,۰۰۰' },
  { id: 2, name: 'فاطمه رضایی', email: 'fateme@example.com', phone: '09123456790', invoices: 8, total: '۴,۵۰۰,۰۰۰' },
  { id: 3, name: 'محمد کریمی', email: 'mohammad@example.com', phone: '09123456791', invoices: 15, total: '۸,۲۰۰,۰۰۰' },
  { id: 4, name: 'زهرا محمدی', email: 'zahra@example.com', phone: '09123456792', invoices: 5, total: '۲,۳۰۰,۰۰۰' }
]

export default function Clients() {
  const [selectedClient, setSelectedClient] = useState<number | null>(null)
  const [showModal, setShowModal] = useState(false)

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-text-dark dark:text-dark-text">مشتریان</h1>
        <button onClick={() => setShowModal(true)} className="btn-primary">
          <Plus className="w-5 h-5" />
          افزودن مشتری
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clients.map((client) => (
          <div
            key={client.id}
            className="card cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setSelectedClient(client.id)}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-primary-blue rounded-full flex items-center justify-center text-white text-xl font-bold">
                {getInitials(client.name)}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-text-dark dark:text-dark-text">
                  {client.name}
                </h3>
              </div>
            </div>
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-text-gray dark:text-dark-textSecondary">
                <Mail className="w-4 h-4" />
                {client.email}
              </div>
              <div className="flex items-center gap-2 text-sm text-text-gray dark:text-dark-textSecondary">
                <Phone className="w-4 h-4" />
                {client.phone}
              </div>
              <div className="flex items-center gap-2 text-sm text-text-gray dark:text-dark-textSecondary">
                <FileText className="w-4 h-4" />
                {client.invoices} فاکتور
              </div>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-accent-medium dark:border-dark-border">
              <div>
                <div className="text-xs text-text-gray dark:text-dark-textSecondary">کل خریداری شده</div>
                <div className="font-bold text-primary-green">{client.total} تومان</div>
              </div>
              <button className="btn-primary text-sm py-2 px-4">
                فاکتور جدید
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Client Details Modal */}
      {selectedClient && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-dark-card rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-accent-medium dark:border-dark-border">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-text-dark dark:text-dark-text">
                  جزئیات مشتری
                </h2>
                <button
                  onClick={() => setSelectedClient(null)}
                  className="p-2 hover:bg-accent-light dark:hover:bg-dark-border rounded"
                >
                  ×
                </button>
              </div>
            </div>
            <div className="p-6">
              {(() => {
                const client = clients.find(c => c.id === selectedClient)
                if (!client) return null
                return (
                  <div>
                    {/* Tabs */}
                    <div className="flex gap-2 border-b border-accent-medium dark:border-dark-border mb-6">
                      {['اطلاعات', 'فاکتورها', 'یادداشت‌ها'].map((tab) => (
                        <button
                          key={tab}
                          className="px-6 py-3 font-medium border-b-2 border-primary-green text-primary-green"
                        >
                          {tab}
                        </button>
                      ))}
                    </div>

                    {/* Info Tab */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="w-20 h-20 bg-primary-blue rounded-full flex items-center justify-center text-white text-2xl font-bold">
                          {getInitials(client.name)}
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-text-dark dark:text-dark-text">
                            {client.name}
                          </h3>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1 text-text-gray dark:text-dark-textSecondary">
                            ایمیل
                          </label>
                          <div className="text-text-dark dark:text-dark-text">{client.email}</div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1 text-text-gray dark:text-dark-textSecondary">
                            تلفن
                          </label>
                          <div className="text-text-dark dark:text-dark-text">{client.phone}</div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1 text-text-gray dark:text-dark-textSecondary">
                            تعداد فاکتورها
                          </label>
                          <div className="text-text-dark dark:text-dark-text">{client.invoices}</div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1 text-text-gray dark:text-dark-textSecondary">
                            کل مبلغ خریداری شده
                          </label>
                          <div className="text-primary-green font-bold">{client.total} تومان</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })()}
            </div>
          </div>
        </div>
      )}

      {/* Add Client Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-dark-card rounded-lg max-w-2xl w-full">
            <div className="p-6 border-b border-accent-medium dark:border-dark-border">
              <h2 className="text-2xl font-bold text-text-dark dark:text-dark-text">افزودن مشتری جدید</h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-text-dark dark:text-dark-text">
                  نام کامل
                </label>
                <input type="text" className="input-field" placeholder="نام و نام خانوادگی" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-text-dark dark:text-dark-text">
                  ایمیل
                </label>
                <input type="email" className="input-field" placeholder="example@email.com" dir="ltr" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-text-dark dark:text-dark-text">
                  تلفن
                </label>
                <input type="tel" className="input-field" placeholder="09123456789" />
              </div>
              <div className="flex gap-3">
                <button onClick={() => setShowModal(false)} className="btn-outline flex-1">
                  انصراف
                </button>
                <button onClick={() => setShowModal(false)} className="btn-primary flex-1">
                  افزودن
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

