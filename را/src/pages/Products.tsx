import { Plus, Grid, List, Edit, Trash2, Package, Wrench } from 'lucide-react'
import { useState } from 'react'

const products = [
  { id: 1, name: 'محصول A', price: '۵۰۰,۰۰۰', type: 'product', image: null },
  { id: 2, name: 'خدمت B', price: '۳۰۰,۰۰۰', type: 'service', image: null },
  { id: 3, name: 'محصول C', price: '۷۵۰,۰۰۰', type: 'product', image: null },
  { id: 4, name: 'خدمت D', price: '۲۰۰,۰۰۰', type: 'service', image: null }
]

export default function Products() {
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid')
  const [showModal, setShowModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState<number | null>(null)

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-text-dark dark:text-dark-text">محصولات و خدمات</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-accent-light dark:bg-dark-border rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded transition-colors ${
                viewMode === 'grid' ? 'bg-white dark:bg-dark-card shadow-sm' : ''
              }`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-2 rounded transition-colors ${
                viewMode === 'table' ? 'bg-white dark:bg-dark-card shadow-sm' : ''
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
          <button onClick={() => setShowModal(true)} className="btn-primary">
            <Plus className="w-5 h-5" />
            افزودن
          </button>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="card">
              <div className="mb-4">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-full h-48 bg-accent-light dark:bg-dark-border rounded-lg flex items-center justify-center">
                    {product.type === 'product' ? (
                      <Package className="w-16 h-16 text-text-gray" />
                    ) : (
                      <Wrench className="w-16 h-16 text-text-gray" />
                    )}
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-text-dark dark:text-dark-text">{product.name}</h3>
                <span className={`text-xs px-2 py-1 rounded ${
                  product.type === 'product'
                    ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300'
                    : 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300'
                }`}>
                  {product.type === 'product' ? 'محصول' : 'خدمات'}
                </span>
              </div>
              <div className="text-lg font-bold text-primary-green mb-4">
                {product.price} تومان
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setEditingProduct(product.id)
                    setShowModal(true)
                  }}
                  className="flex-1 btn-outline text-sm py-2"
                >
                  <Edit className="w-4 h-4 inline ml-1" />
                  ویرایش
                </button>
                <button className="flex-1 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-200 dark:hover:bg-red-900/30 transition-colors">
                  <Trash2 className="w-4 h-4 inline ml-1" />
                  حذف
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-accent-medium dark:border-dark-border">
                <th className="text-right py-3 px-4 font-medium text-text-dark dark:text-dark-text">تصویر</th>
                <th className="text-right py-3 px-4 font-medium text-text-dark dark:text-dark-text">نام</th>
                <th className="text-right py-3 px-4 font-medium text-text-dark dark:text-dark-text">نوع</th>
                <th className="text-right py-3 px-4 font-medium text-text-dark dark:text-dark-text">قیمت</th>
                <th className="text-right py-3 px-4 font-medium text-text-dark dark:text-dark-text">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="border-b border-accent-medium dark:border-dark-border hover:bg-accent-light dark:hover:bg-dark-border"
                >
                  <td className="py-3 px-4">
                    <div className="w-12 h-12 bg-accent-light dark:bg-dark-border rounded-lg flex items-center justify-center">
                      {product.type === 'product' ? (
                        <Package className="w-6 h-6 text-text-gray" />
                      ) : (
                        <Wrench className="w-6 h-6 text-text-gray" />
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4 font-medium text-text-dark dark:text-dark-text">{product.name}</td>
                  <td className="py-3 px-4">
                    <span className={`text-xs px-2 py-1 rounded ${
                      product.type === 'product'
                        ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-800'
                        : 'bg-green-100 dark:bg-green-900/20 text-green-800'
                    }`}>
                      {product.type === 'product' ? 'محصول' : 'خدمات'}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-medium text-text-dark dark:text-dark-text">{product.price} تومان</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setEditingProduct(product.id)
                          setShowModal(true)
                        }}
                        className="p-2 hover:bg-accent-light dark:hover:bg-dark-border rounded"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-red-100 dark:hover:bg-red-900/20 rounded text-red-500">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-dark-card rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-accent-medium dark:border-dark-border">
              <h2 className="text-2xl font-bold text-text-dark dark:text-dark-text">
                {editingProduct ? 'ویرایش' : 'افزودن'} محصول/خدمت
              </h2>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-text-dark dark:text-dark-text">
                  نام
                </label>
                <input type="text" className="input-field" placeholder="نام محصول یا خدمت" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-text-dark dark:text-dark-text">
                  قیمت
                </label>
                <input type="number" className="input-field" placeholder="0" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-text-dark dark:text-dark-text">
                  نوع
                </label>
                <select className="input-field">
                  <option value="product">محصول</option>
                  <option value="service">خدمات</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-text-dark dark:text-dark-text">
                  مالیات
                </label>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="tax" value="yes" className="w-4 h-4" />
                    <span>بله</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="tax" value="no" className="w-4 h-4" defaultChecked />
                    <span>خیر</span>
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-text-dark dark:text-dark-text">
                  توضیحات
                </label>
                <textarea className="input-field" rows={4} placeholder="توضیحات اختیاری"></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-text-dark dark:text-dark-text">
                  آپلود تصویر (اختیاری)
                </label>
                <input type="file" accept="image/*" className="input-field" />
              </div>
              <div className="flex gap-3">
                <button className="btn-outline flex-1">ذخیره</button>
                <button className="btn-primary flex-1">ذخیره و جدید</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

