export function CardSkeleton() {
  return (
    <div className="card">
      <div className="skeleton h-4 w-3/4 mb-4"></div>
      <div className="skeleton h-4 w-1/2"></div>
    </div>
  )
}

export function TableSkeleton() {
  return (
    <div className="card">
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center gap-4">
            <div className="skeleton h-12 w-12 rounded-full"></div>
            <div className="flex-1 space-y-2">
              <div className="skeleton h-4 w-1/4"></div>
              <div className="skeleton h-4 w-1/3"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function ChartSkeleton() {
  return (
    <div className="card">
      <div className="skeleton h-6 w-1/3 mb-6"></div>
      <div className="skeleton h-64 w-full"></div>
    </div>
  )
}

