import { Mail, Upload, Send } from 'lucide-react'
import { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    file: null as File | null
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    alert('پیام شما ارسال شد. پاسخ در کمتر از ۴۸ ساعت کاری ارسال می‌شود.')
  }

  return (
    <div className="min-h-screen bg-background-light dark:bg-dark-bg">
      <Header />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 text-text-dark dark:text-dark-text">
              تماس با ما
            </h1>
            <p className="text-text-gray dark:text-dark-textSecondary">
              سوالی دارید؟ ما اینجا هستیم تا کمک کنیم
            </p>
          </div>

          <div className="card">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-text-dark dark:text-dark-text">
                  نام
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input-field"
                  placeholder="نام و نام خانوادگی"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-text-dark dark:text-dark-text">
                  ایمیل
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="input-field"
                  placeholder="example@email.com"
                  dir="ltr"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-text-dark dark:text-dark-text">
                  موضوع
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="input-field"
                  placeholder="موضوع پیام"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-text-dark dark:text-dark-text">
                  پیام
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="input-field"
                  rows={6}
                  placeholder="پیام خود را بنویسید..."
                  required
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-text-dark dark:text-dark-text">
                  آپلود فایل (برای گزارش مشکل)
                </label>
                <div className="border-2 border-dashed border-accent-medium dark:border-dark-border rounded-lg p-6 text-center">
                  <Upload className="w-12 h-12 mx-auto mb-4 text-text-gray" />
                  <input
                    type="file"
                    onChange={(e) => setFormData({ ...formData, file: e.target.files?.[0] || null })}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <div className="text-text-gray dark:text-dark-textSecondary mb-2">
                      کلیک کنید یا فایل را بکشید
                    </div>
                    {formData.file && (
                      <div className="text-sm text-primary-green">{formData.file.name}</div>
                    )}
                  </label>
                </div>
              </div>

              <button type="submit" className="btn-primary w-full">
                <Send className="w-5 h-5" />
                ارسال پیام
              </button>
            </form>

            <div className="mt-8 p-4 bg-accent-light dark:bg-dark-border rounded-lg">
              <div className="flex items-center gap-2 text-sm text-text-gray dark:text-dark-textSecondary">
                <Mail className="w-4 h-4" />
                <span>پاسخ انتظار: ۴۸ ساعت کاری</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

