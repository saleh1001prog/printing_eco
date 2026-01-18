'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Eye, Image as ImageIcon, LogIn, LogOut } from 'lucide-react'
import ProductForm from './ProductForm'
import { useSession, signIn, signOut } from "next-auth/react"

interface Product {
    _id: string
    slug: string
    name: string
    nameEn: string
    type: string
    status: string
    featured: boolean
    order: number
    screenshots: Array<{ url: string; title: string }>
}

export default function ProductsManagement() {
    const { data: session, status } = useSession()
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const [editingProduct, setEditingProduct] = useState<string | null>(null)

    useEffect(() => {
        if (status === 'authenticated') {
            fetchProducts()
        }
    }, [status])

    const fetchProducts = async () => {
        try {
            const res = await fetch('/api/products')
            const data = await res.json()
            if (data.success) {
                setProducts(data.products)
            }
        } catch (error) {
            console.error('Error fetching products:', error)
        } finally {
            setLoading(false)
        }
    }

    const deleteProduct = async (slug: string) => {
        if (!confirm('هل أنت متأكد من حذف هذا المنتج؟')) return

        try {
            const res = await fetch(`/api/products/${slug}`, {
                method: 'DELETE'
            })

            if (res.ok) {
                fetchProducts()
                alert('تم حذف المنتج بنجاح')
            } else {
                alert('فشل حذف المنتج')
            }
        } catch (error) {
            console.error('Error deleting product:', error)
            alert('حدث خطأ أثناء حذف المنتج')
        }
    }

    if (status === 'loading' || (status === 'authenticated' && loading)) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-slate-600">جاري التحميل...</p>
                </div>
            </div>
        )
    }

    if (status === 'unauthenticated') {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
                <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <LogIn className="w-10 h-10 text-blue-600" />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900 mb-2">تسجيل الدخول مطلوب</h1>
                    <p className="text-slate-600 mb-8">يجب عليك تسجيل الدخول بحساب المدير للوصول إلى لوحة التحكم.</p>
                    <button
                        onClick={() => signIn('google')}
                        className="w-full py-3 px-4 bg-white border-2 border-slate-200 hover:bg-slate-50 hover:border-slate-300 rounded-xl flex items-center justify-center gap-3 transition-all font-semibold text-slate-700"
                    >
                        <img src="https://www.google.com/favicon.ico" alt="Google" className="w-6 h-6" />
                        تسجيل الدخول عبر Google
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900">إدارة المنتجات</h1>
                            <p className="text-slate-600 mt-1">مرحباً {session?.user?.name}</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => signOut()}
                                className="inline-flex items-center gap-2 px-4 py-3 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-red-600 transition"
                                title="تسجيل الخروج"
                            >
                                <LogOut className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => setShowForm(true)}
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition shadow-lg shadow-blue-500/25"
                            >
                                <Plus className="w-5 h-5" />
                                إضافة منتج جديد
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Products Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <div
                            key={product._id}
                            className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all"
                        >
                            {/* Product Image */}
                            <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center relative">
                                {product.screenshots?.[0]?.url ? (
                                    <img
                                        src={product.screenshots[0].url}
                                        alt={product.name}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <ImageIcon className="w-16 h-16 text-slate-400" />
                                )}

                                {/* Status Badge */}
                                <div className="absolute top-3 left-3">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-semibold ${product.status === 'published'
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-yellow-100 text-yellow-700'
                                            }`}
                                    >
                                        {product.status === 'published' ? 'منشور' : 'مسودة'}
                                    </span>
                                </div>

                                {/* Featured Badge */}
                                {product.featured && (
                                    <div className="absolute top-3 right-3">
                                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                                            مميز
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Product Info */}
                            <div className="p-6">
                                <div className="flex items-start justify-between mb-3">
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-900">{product.name}</h3>
                                        <p className="text-sm text-slate-500">{product.nameEn}</p>
                                    </div>
                                    <span className="px-2 py-1 rounded bg-slate-100 text-slate-700 text-xs font-medium">
                                        {product.type}
                                    </span>
                                </div>

                                <div className="text-sm text-slate-600 mb-4">
                                    <span className="font-medium">الرابط:</span> /products/{product.slug}
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-2">
                                    <a
                                        href={`/products/${product.slug}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 transition text-sm font-medium"
                                    >
                                        <Eye className="w-4 h-4" />
                                        معاينة
                                    </a>
                                    <button
                                        onClick={() => {
                                            setEditingProduct(product.slug)
                                            setShowForm(true)
                                        }}
                                        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition text-sm font-medium"
                                    >
                                        <Edit className="w-4 h-4" />
                                        تعديل
                                    </button>
                                    <button
                                        onClick={() => deleteProduct(product.slug)}
                                        className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {products.length === 0 && (
                    <div className="text-center py-16">
                        <ImageIcon className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-slate-900 mb-2">لا توجد منتجات</h3>
                        <p className="text-slate-600 mb-6">ابدأ بإضافة منتجك الأول</p>
                        <button
                            onClick={() => setShowForm(true)}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
                        >
                            <Plus className="w-5 h-5" />
                            إضافة منتج جديد
                        </button>
                    </div>
                )}
            </div>

            {/* Form Modal */}
            {showForm && (
                <ProductForm
                    slug={editingProduct || undefined}
                    onClose={() => {
                        setShowForm(false)
                        setEditingProduct(null)
                    }}
                    onSuccess={fetchProducts}
                />
            )}
        </div>
    )
}
