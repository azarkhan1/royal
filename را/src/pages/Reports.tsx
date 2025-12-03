import { Download, Printer, FileSpreadsheet, Calendar, Filter } from 'lucide-react'
import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'

const timeRanges = ['امروز', 'این هفته', 'این ماه', 'سه ماه اخیر', 'این سال', 'سفارشی']

const reportData = {
  summary: {
    income: '۱۲,۵۰۰,۰۰۰',
    expenses: '۳,۲۰۰,۰۰۰',
    profit: '۹,۳۰۰,۰۰۰'
  },
  topCustomers: [
    { name: 'محمد کریمی', amount: '۸,۲۰۰,۰۰۰', invoices: 15 },
    { name: 'علی احمدی', amount: '۶,۰۰۰,۰۰۰', invoices: 12 },
    { name: 'فاطمه رضایی', amount: '۴,۵۰۰,۰۰۰', invoices: 8 }
  ],
  topExpenses: [
    { category: 'اجاره', amount: '۵,۰۰۰,۰۰۰', percentage: 35 },
    { category: 'حقوق', amount: '۳,۰۰۰,۰۰۰', percentage: 25 },
    { category: 'مواد اولیه', amount: '۱,۲۰۰,۰۰۰', percentage: 20 }
  ],
  cashFlow: [
    { month: 'مهر', income: 10000000, expense: 3000000 },
    { month: 'آبان', income: 11000000, expense: 3200000 },
    { month: 'آذر', income: 9500000, expense: 2800000 },
    { month: 'دی', income: 12000000, expense: 3500000 },
    { month: 'بهمن', income: 13000000, expense: 3300000 },
    { month: 'اسفند', income: 12500000, expense: 3100000 }
  ]
}

export default function Reports() {
  const [selectedRange, setSelectedRange] = useState('این ماه')
  const [reportType, setReportType] = useState('all')

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-text-dark dark:text-dark-text">گزارش‌ها</h1>
        <div className="flex items-center gap-3">
          <button className="btn-outline">
            <Printer className="w-5 h-5" />
            چاپ
          </button>
          <button className="btn-outline">
            <Download className="w-5 h-5" />
            PDF
          </button>
          <button className="btn-outline">
            <FileSpreadsheet className="w-5 h-5" />
            Excel
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-text-gray" />
            <span className="font-medium text-text-dark dark:text-dark-text">بازه زمانی:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {timeRanges.map((range) => (
              <button
                key={range}
                onClick={() => setSelectedRange(range)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedRange === range
                    ? 'bg-primary-green text-white'
                    : 'bg-accent-light dark:bg-dark-border text-text-gray dark:text-dark-textSecondary hover:bg-accent-medium'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Report Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Summary Card */}
        <div className="card">
          <h3 className="font-bold mb-4 text-text-dark dark:text-dark-text">خلاصه مالی</h3>
          <div className="space-y-3">
            <div>
              <div className="text-sm text-text-gray dark:text-dark-textSecondary mb-1">درآمد</div>
              <div className="text-lg font-bold text-primary-green">
                {reportData.summary.income} تومان
              </div>
            </div>
            <div>
              <div className="text-sm text-text-gray dark:text-dark-textSecondary mb-1">هزینه</div>
              <div className="text-lg font-bold text-red-500">
                {reportData.summary.expenses} تومان
              </div>
            </div>
            <div className="pt-3 border-t border-accent-medium dark:border-dark-border">
              <div className="text-sm text-text-gray dark:text-dark-textSecondary mb-1">سود خالص</div>
              <div className="text-xl font-bold text-primary-blue">
                {reportData.summary.profit} تومان
              </div>
            </div>
          </div>
        </div>

        {/* Top Customers Card */}
        <div className="card">
          <h3 className="font-bold mb-4 text-text-dark dark:text-dark-text">بهترین مشتریان</h3>
          <div className="space-y-3">
            {reportData.topCustomers.map((customer, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-text-dark dark:text-dark-text">{customer.name}</div>
                  <div className="text-xs text-text-gray dark:text-dark-textSecondary">
                    {customer.invoices} فاکتور
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-primary-green">{customer.amount}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Expenses Card */}
        <div className="card">
          <h3 className="font-bold mb-4 text-text-dark dark:text-dark-text">پر هزینه‌ترین دسته‌ها</h3>
          <div className="space-y-3">
            {reportData.topExpenses.map((expense, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-text-dark dark:text-dark-text">
                    {expense.category}
                  </span>
                  <span className="text-sm font-bold text-text-dark dark:text-dark-text">
                    {expense.amount}
                  </span>
                </div>
                <div className="w-full bg-accent-light dark:bg-dark-border rounded-full h-2">
                  <div
                    className="bg-primary-green h-2 rounded-full"
                    style={{ width: `${expense.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cash Flow Card */}
        <div className="card">
          <h3 className="font-bold mb-4 text-text-dark dark:text-dark-text">گردش حساب</h3>
          <div className="text-3xl font-bold text-primary-blue mb-2">
            {reportData.summary.profit}
          </div>
          <div className="text-sm text-text-gray dark:text-dark-textSecondary">
            سود خالص در {selectedRange}
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Income vs Expense Chart */}
        <div className="card">
          <h3 className="text-xl font-bold mb-4 text-text-dark dark:text-dark-text">
            درآمد در مقابل هزینه
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={reportData.cashFlow}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="income" fill="#22C55E" name="درآمد" />
              <Bar dataKey="expense" fill="#EF4444" name="هزینه" />
              <Legend />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Cash Flow Line Chart */}
        <div className="card">
          <h3 className="text-xl font-bold mb-4 text-text-dark dark:text-dark-text">
            گردش نقدی
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={reportData.cashFlow.map(item => ({
              ...item,
              profit: item.income - item.expense
            }))}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="profit" stroke="#3B82F6" strokeWidth={2} name="سود" />
              <Legend />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

