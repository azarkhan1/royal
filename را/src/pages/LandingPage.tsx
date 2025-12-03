import { Link } from 'react-router-dom'
import { ArrowLeft, Check, Star, ChevronDown } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useState } from 'react'

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const features = [
    {
      icon: '📊',
      title: 'داشبورد هوشمند',
      description: 'نمودارهای لحظه‌ای و آمار کامل مالی'
    },
    {
      icon: '📄',
      title: 'صدور فاکتور',
      description: 'ایجاد سریع و آسان فاکتور'
    },
    {
      icon: '📈',
      title: 'گزارش‌های مالی',
      description: 'گزارش‌های بصری و جامع'
    },
    {
      icon: '💱',
      title: 'پشتیبانی چند ارز',
      description: 'AFN, IRR, USD, EUR'
    },
    {
      icon: '📱',
      title: 'حالت آفلاین',
      description: 'همگام‌سازی ابری هنگام آنلاین'
    },
    {
      icon: '👥',
      title: 'اشتراک گذاری ایمن',
      description: 'دسترسی محدود تیم'
    }
  ]

  const testimonials = [
    {
      name: 'علی احمدی',
      business: 'فروشگاه لوازم خانگی',
      quote: 'بسیار ساده و کاربردی است. دیگر نیازی به حسابدار ندارم!',
      rating: 5
    },
    {
      name: 'فاطمه رضایی',
      business: 'آتلیه عکاسی',
      quote: 'مدیریت فاکتورها و هزینه‌ها خیلی راحت شده. پیشنهاد می‌کنم.',
      rating: 5
    },
    {
      name: 'محمد کریمی',
      business: 'کافیشاپ',
      quote: 'رایگان و بدون محدودیت. بهترین انتخاب برای کسب‌وکارهای کوچک.',
      rating: 5
    }
  ]

  const faqs = [
    {
      question: 'آیا استفاده از این پلتفرم رایگان است؟',
      answer: 'بله، تمام امکانات به صورت رایگان در دسترس است و هیچ محدودیتی وجود ندارد.'
    },
    {
      question: 'داده‌های من چگونه محافظت می‌شوند؟',
      answer: 'تمام داده‌ها به صورت محلی در دستگاه شما ذخیره می‌شوند و فقط هنگام نیاز همگام‌سازی می‌شوند.'
    },
    {
      question: 'آیا می‌توانم به صورت آفلاین استفاده کنم؟',
      answer: 'بله، تمام امکانات به صورت آفلاین در دسترس است و هنگام اتصال به اینترنت همگام‌سازی انجام می‌شود.'
    },
    {
      question: 'آیا می‌توانم داده‌ها را خروجی بگیرم؟',
      answer: 'بله، می‌توانید گزارش‌ها را به صورت PDF یا Excel دانلود کنید.'
    },
    {
      question: 'پشتیبانی چگونه است؟',
      answer: 'از طریق فرم تماس در سایت می‌توانید با ما در ارتباط باشید. پاسخ در کمتر از ۴۸ ساعت کاری.'
    }
  ]

  return (
    <div className="min-h-screen bg-background-light dark:bg-dark-bg">
      <Header />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-right">
            <h1 className="text-4xl md:text-5xl font-bold text-text-dark dark:text-dark-text mb-6">
              مدیریت مالی ساده برای کسب‌وکارهای کوچک
            </h1>
            <p className="text-xl text-text-gray dark:text-dark-textSecondary mb-8">
              رایگان، بدون نیاز به دانش حسابداری، کاملا آفلاین
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link to="/signup" className="btn-primary">
                شروع رایگان
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <Link to="/login" className="btn-outline">
                مشاهده دمو
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="card relative z-10">
              <div className="bg-gradient-to-br from-primary-green/10 to-primary-blue/10 rounded-lg p-8">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold">داشبورد</span>
                    <span className="text-sm text-text-gray">۱۴۰۳/۰۱/۱۵</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mt-6">
                    <div className="bg-white dark:bg-dark-card p-4 rounded-lg">
                      <div className="text-sm text-text-gray">درآمد</div>
                      <div className="text-2xl font-bold text-primary-green">۱۲,۵۰۰,۰۰۰</div>
                    </div>
                    <div className="bg-white dark:bg-dark-card p-4 rounded-lg">
                      <div className="text-sm text-text-gray">هزینه</div>
                      <div className="text-2xl font-bold text-red-500">۳,۲۰۰,۰۰۰</div>
                    </div>
                    <div className="bg-white dark:bg-dark-card p-4 rounded-lg">
                      <div className="text-sm text-text-gray">سود</div>
                      <div className="text-2xl font-bold text-primary-blue">۹,۳۰۰,۰۰۰</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Floating elements */}
            <div className="absolute -top-4 -left-4 card animate-fadeIn" style={{ animationDelay: '0.2s' }}>
              <div className="text-sm font-medium">فاکتور #۱۲۳</div>
              <div className="text-xs text-text-gray">مبلغ: ۵۰۰,۰۰۰ تومان</div>
            </div>
            <div className="absolute -bottom-4 -right-4 card animate-fadeIn" style={{ animationDelay: '0.4s' }}>
              <div className="text-sm font-medium">نمودار هزینه‌ها</div>
              <div className="w-16 h-16 bg-primary-blue/20 rounded"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-white dark:bg-dark-card py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-text-dark dark:text-dark-text">
            امکانات
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card text-center hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-text-dark dark:text-dark-text">
                  {feature.title}
                </h3>
                <p className="text-text-gray dark:text-dark-textSecondary">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-accent-light dark:bg-dark-bg">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-text-dark dark:text-dark-text">
            نظرات کاربران
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-primary-green rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <div className="font-bold text-text-dark dark:text-dark-text">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-text-gray dark:text-dark-textSecondary">
                      {testimonial.business}
                    </div>
                  </div>
                </div>
                <p className="text-text-gray dark:text-dark-textSecondary mb-4">
                  {testimonial.quote}
                </p>
                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 bg-white dark:bg-dark-card">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-text-dark dark:text-dark-text">
            سوالات متداول
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="card">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between text-right"
                >
                  <span className="font-bold text-text-dark dark:text-dark-text">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${
                      openFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <p className="mt-4 text-text-gray dark:text-dark-textSecondary">
                    {faq.answer}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

