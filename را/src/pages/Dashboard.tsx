import { TrendingUp, TrendingDown, BarChart3, Plus, Eye } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

const statsData = [
  { label: 'مجموع درآمد', value: '۱۲,۵۰۰,۰۰۰', change: '+۱۲%', icon: TrendingUp, color: 'text-primary-green', bgColor: 'bg-green-100 dark:bg-green-900/20' },
  { label: 'مجموع هزینه‌ها', value: '۳,۲۰۰,۰۰۰', change: '-۵%', icon: TrendingDown, color: 'text-red-500', bgColor: 'bg-red-100 dark:bg-red-900/20' },
  { label: 'سود خالص', value: '۹,۳۰۰,۰۰۰', change: '+۱۸%', icon: BarChart3, color: 'text-primary-blue', bgColor: 'bg-blue-100 dark:bg-blue-900/20' }
]

const expenseData = [
  { name: 'اجاره', value: 35, color: '#22C55E' },
  { name: 'حقوق', value: 25, color: '#3B82F6' },
  { name: 'مواد اولیه', value: 20, color: '#F59E0B' },
  { name: 'بازاریابی', value: 15, color: '#EF4444' },
  { name: 'سایر', value: 5, color: '#8B5CF6' }
]

const incomeData = [
  { month: 'مهر', income: 10000000 },
  { month: 'آبان', income: 11000000 },
  { month: 'آذر', income: 9500000 },
  { month: 'دی', income: 12000000 },
  { month: 'بهمن', income: 13000000 },
  { month: 'اسفند', income: 12500000 }
]

const recentActivity = [
  { type: 'فاکتور', id: '#123', date: '۱۴۰۳/۰۱/۱۵', amount: '۵۰۰,۰۰۰', status: 'paid' },
  { type: 'هزینه', id: '#456', date: '۱۴۰۳/۰۱/۱۴', amount: '۱۵۰,۰۰۰', status: 'expense' },
  { type: 'فاکتور', id: '#122', date: '۱۴۰۳/۰۱/۱۳', amount: '۷۵۰,۰۰۰', status: 'pending' },
  { type: 'هزینه', id: '#455', date: '۱۴۰۳/۰۱/۱۲', amount: '۲۰۰,۰۰۰', status: 'expense' },
  { type: 'فاکتور', id: '#121', date: '۱۴۰۳/۰۱/۱۱', amount: '۳۰۰,۰۰۰', status: 'paid' }
]

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-text-dark dark:text-dark-text">داشبورد</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statsData.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="card">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <span className={`text-sm font-medium ${stat.color}`}>
                  {stat.change}
                </span>
              </div>
              <div className="text-sm text-text-gray dark:text-dark-textSecondary mb-1">
                {stat.label}
              </div>
              <div className="text-2xl font-bold text-text-dark dark:text-dark-text">
                {stat.value} تومان
              </div>
            </div>
          )
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Expense Pie Chart */}
        <div className="card">
          <h2 className="text-xl font-bold mb-4 text-text-dark dark:text-dark-text">
            نمودار دایره‌ای هزینه‌ها
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={expenseData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {expenseData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Income Bar Chart */}
        <div className="card">
          <h2 className="text-xl font-bold mb-4 text-text-dark dark:text-dark-text">
            نمودار میله‌ای درآمد ۶ ماه اخیر
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={incomeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="income" fill="#22C55E" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div className="card">
          <h2 className="text-xl font-bold mb-4 text-text-dark dark:text-dark-text">
            اقدامات سریع
          </h2>
          <div className="space-y-3">
            <Link
              to="/app/invoices"
              className="flex items-center gap-3 p-4 rounded-lg border border-accent-medium dark:border-dark-border hover:bg-accent-light dark:hover:bg-dark-border transition-colors"
            >
              <Plus className="w-5 h-5 text-primary-green" />
              <span className="font-medium text-text-dark dark:text-dark-text">افزودن فاکتور</span>
            </Link>
            <Link
              to="/app/expenses"
              className="flex items-center gap-3 p-4 rounded-lg border border-accent-medium dark:border-dark-border hover:bg-accent-light dark:hover:bg-dark-border transition-colors"
            >
              <Plus className="w-5 h-5 text-red-500" />
              <span className="font-medium text-text-dark dark:text-dark-text">ثبت هزینه</span>
            </Link>
            <Link
              to="/app/reports"
              className="flex items-center gap-3 p-4 rounded-lg border border-accent-medium dark:border-dark-border hover:bg-accent-light dark:hover:bg-dark-border transition-colors"
            >
              <Eye className="w-5 h-5 text-primary-blue" />
              <span className="font-medium text-text-dark dark:text-dark-text">مشاهده گزارش</span>
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card">
          <h2 className="text-xl font-bold mb-4 text-text-dark dark:text-dark-text">
            فعالیت‌های اخیر
          </h2>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg border border-accent-medium dark:border-dark-border"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    activity.status === 'paid' ? 'bg-green-100 dark:bg-green-900/20' :
                    activity.status === 'pending' ? 'bg-yellow-100 dark:bg-yellow-900/20' :
                    'bg-red-100 dark:bg-red-900/20'
                  }`}>
                    <span className={`text-sm font-bold ${
                      activity.status === 'paid' ? 'text-green-600' :
                      activity.status === 'pending' ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {activity.type === 'فاکتور' ? 'ف' : 'ه'}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium text-text-dark dark:text-dark-text">
                      {activity.type} {activity.id}
                    </div>
                    <div className="text-xs text-text-gray dark:text-dark-textSecondary">
                      {activity.date}
                    </div>
                  </div>
                </div>
                <div className={`font-bold ${
                  activity.status === 'expense' ? 'text-red-500' : 'text-primary-green'
                }`}>
                  {activity.status === 'expense' ? '-' : '+'}{activity.amount}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

