import { Check, AlertCircle, Loader } from 'lucide-react'
import { useState, useEffect } from 'react'

type Status = 'saving' | 'saved' | 'error'

interface AutoSaveIndicatorProps {
  status: Status
}

export default function AutoSaveIndicator({ status }: AutoSaveIndicatorProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (status !== 'saved') {
      setVisible(true)
    } else {
      const timer = setTimeout(() => setVisible(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [status])

  if (!visible) return null

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <div className="flex items-center gap-2 bg-white dark:bg-dark-card shadow-lg rounded-lg px-4 py-3 border border-accent-medium dark:border-dark-border">
        {status === 'saving' && (
          <>
            <Loader className="w-4 h-4 animate-spin text-primary-blue" />
            <span className="text-sm text-text-gray dark:text-dark-textSecondary">در حال ذخیره...</span>
          </>
        )}
        {status === 'saved' && (
          <>
            <Check className="w-4 h-4 text-primary-green" />
            <span className="text-sm text-primary-green">ذخیره شد</span>
          </>
        )}
        {status === 'error' && (
          <>
            <AlertCircle className="w-4 h-4 text-red-500" />
            <span className="text-sm text-red-500">خطا در ذخیره</span>
          </>
        )}
      </div>
    </div>
  )
}

