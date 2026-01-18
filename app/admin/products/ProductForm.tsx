'use client'

import { useState, useEffect } from 'react'
import { X, Save, Upload, Trash2, Plus, Loader2 } from 'lucide-react'

interface ProductFormProps {
    slug?: string
    onClose: () => void
    onSuccess: () => void
}

export default function ProductForm({ slug, onClose, onSuccess }: ProductFormProps) {
    const [loading, setLoading] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [formData, setFormData] = useState({
        slug: '',
        name: '',
        nameEn: '',
        description: '',
        descriptionEn: '',
        type: 'Desktop' as 'Desktop' | 'Web' | 'Mobile' | 'Enterprise',
        shortDescription: '',
        shortDescriptionEn: '',
        badge: '',
        badgeEn: '',
        features: [] as any[],
        screenshots: [] as any[],
        technologies: [] as any[],
        requirements: [] as string[],
        benefits: [] as any[],
        downloadUrl: '',
        version: '',
        fileSize: '',
        lastUpdate: '',
        status: 'draft' as 'draft' | 'published',
        featured: false,
        order: 0,
    })

    useEffect(() => {
        if (slug) {
            fetchProduct()
        }
    }, [slug])

    const fetchProduct = async () => {
        try {
            const res = await fetch(`/api/products/${slug}`)
            const data = await res.json()
            if (data.success && data.product) {
                // Merge fetched data with default state to avoid undefined values
                setFormData(prev => ({
                    ...prev,
                    ...data.product,
                    // Ensure arrays are at least empty arrays if missing in DB
                    features: data.product.features || [],
                    screenshots: data.product.screenshots || [],
                    technologies: data.product.technologies || [],
                    requirements: data.product.requirements || [],
                    benefits: data.product.benefits || [],
                    // Ensure strings are empty strings if missing/null in DB
                    name: data.product.name || '',
                    nameEn: data.product.nameEn || '',
                    description: data.product.description || '',
                    descriptionEn: data.product.descriptionEn || '',
                    shortDescription: data.product.shortDescription || '',
                    shortDescriptionEn: data.product.shortDescriptionEn || '',
                    badge: data.product.badge || '',
                    badgeEn: data.product.badgeEn || '',
                    downloadUrl: data.product.downloadUrl || '',
                    version: data.product.version || '',
                    fileSize: data.product.fileSize || '',
                    lastUpdate: data.product.lastUpdate || '',
                }))
            }
        } catch (error) {
            console.error('Error fetching product:', error)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const url = slug ? `/api/products/${slug}` : '/api/products'
            const method = slug ? 'PATCH' : 'POST'

            const res = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })

            if (res.ok) {
                alert(slug ? 'تم تحديث المنتج بنجاح' : 'تم إضافة المنتج بنجاح')
                onSuccess()
                onClose()
            } else {
                const data = await res.json()
                alert('خطأ: ' + data.error)
            }
        } catch (error) {
            console.error('Error saving product:', error)
            alert('حدث خطأ أثناء حفظ المنتج')
        } finally {
            setLoading(false)
        }
    }

    const uploadImage = async (file: File) => {
        setUploading(true)
        try {
            const formData = new FormData()
            formData.append('file', file)
            formData.append('folder', 'products')

            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            })

            const data = await res.json()
            if (data.success) {
                return data.url
            } else {
                throw new Error(data.error)
            }
        } catch (error) {
            console.error('Upload error:', error)
            alert('فشل رفع الصورة')
            return null
        } finally {
            setUploading(false)
        }
    }

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        const url = await uploadImage(file)
        if (url) {
            setFormData(prev => ({
                ...prev,
                screenshots: [...prev.screenshots, {
                    url,
                    title: '',
                    titleEn: '',
                    description: '',
                    descriptionEn: '',
                    category: ''
                }]
            }))
        }
    }

    const addFeature = () => {
        setFormData(prev => ({
            ...prev,
            features: [...prev.features, {
                icon: 'Package',
                title: '',
                titleEn: '',
                description: '',
                descriptionEn: '',
                color: 'from-blue-500 to-blue-600'
            }]
        }))
    }

    const addTechnology = () => {
        setFormData(prev => ({
            ...prev,
            technologies: [...prev.technologies, {
                name: '',
                description: '',
                icon: '🚀'
            }]
        }))
    }

    const addBenefit = () => {
        setFormData(prev => ({
            ...prev,
            benefits: [...prev.benefits, {
                icon: 'Star',
                title: '',
                description: ''
            }]
        }))
    }

    const addRequirement = () => {
        setFormData(prev => ({
            ...prev,
            requirements: [...prev.requirements, '']
        }))
    }

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm">
            <div className="flex min-h-screen items-center justify-center p-4 text-center">
                <div className="relative w-full max-w-6xl rounded-2xl bg-white text-right shadow-xl my-8" dir="rtl">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 rounded-t-2xl">
                        <h2 className="text-2xl font-bold text-slate-900">
                            {slug ? 'تعديل المنتج' : 'إضافة منتج جديد'}
                        </h2>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-slate-100 rounded-lg transition"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="p-6 space-y-8">
                        {/* Basic Info */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-bold text-slate-900">المعلومات الأساسية</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        الاسم (عربي) *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                        placeholder="مثال: Inventory Pro"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        الاسم (إنجليزي) *
                                    </label>
                                    <input
                                        dir="ltr"
                                        type="text"
                                        required
                                        value={formData.nameEn}
                                        onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-left"
                                        placeholder="Example: Inventory Pro"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        النوع *
                                    </label>
                                    <select
                                        required
                                        value={formData.type}
                                        onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                    >
                                        <option value="Desktop">Desktop Application</option>
                                        <option value="Web">Web Application</option>
                                        <option value="Mobile">Mobile Application</option>
                                        <option value="Enterprise">Enterprise System</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Slug (رابط المنتج) *
                                    </label>
                                    <div className="space-y-1">
                                        <input
                                            dir="ltr"
                                            type="text"
                                            required
                                            disabled={!!slug}
                                            value={formData.slug}
                                            onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none disabled:bg-slate-100 text-left font-mono"
                                            placeholder="inventory-pro"
                                        />
                                        <p className="text-xs text-slate-500 font-mono text-left" dir="ltr">URL: /products/{formData.slug || 'slug'}</p>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        الوصف القصير (عربي) *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.shortDescription}
                                        onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                        placeholder="الأكثر تكاملاً"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        الوصف القصير (إنجليزي) *
                                    </label>
                                    <input
                                        dir="ltr"
                                        type="text"
                                        required
                                        value={formData.shortDescriptionEn}
                                        onChange={(e) => setFormData({ ...formData, shortDescriptionEn: e.target.value })}
                                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-left"
                                        placeholder="Most Integrated"
                                    />
                                </div>
                            </div>

                            {/* Full width textareas for better editing */}
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        الوصف الكامل (عربي) *
                                    </label>
                                    <textarea
                                        required
                                        rows={4}
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                                        placeholder="وصف تفصيلي للمنتج..."
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        الوصف الكامل (إنجليزي) *
                                    </label>
                                    <textarea
                                        dir="ltr"
                                        required
                                        rows={4}
                                        value={formData.descriptionEn}
                                        onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })}
                                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none text-left"
                                        placeholder="Detailed product description..."
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Badge (عربي)
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.badge}
                                        onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                        placeholder="تطبيق سطح مكتب احترافي"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Badge (إنجليزي)
                                    </label>
                                    <input
                                        dir="ltr"
                                        type="text"
                                        value={formData.badgeEn}
                                        onChange={(e) => setFormData({ ...formData, badgeEn: e.target.value })}
                                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-left"
                                        placeholder="Professional Desktop App"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Screenshots */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-bold text-slate-900">لقطات الشاشة</h3>
                                <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition text-sm font-medium">
                                    <Upload className="w-4 h-4" />
                                    {uploading ? 'جاري الرفع...' : 'رفع صورة'}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                        disabled={uploading}
                                    />
                                </label>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {formData.screenshots.map((screenshot, index) => (
                                    <div key={index} className="border border-slate-200 rounded-lg p-4 space-y-3">
                                        <img src={screenshot.url} alt="" className="w-full h-32 object-cover rounded" />
                                        <input
                                            type="text"
                                            value={screenshot.title}
                                            onChange={(e) => {
                                                const newScreenshots = [...formData.screenshots]
                                                newScreenshots[index].title = e.target.value
                                                setFormData({ ...formData, screenshots: newScreenshots })
                                            }}
                                            placeholder="العنوان (عربي)"
                                            className="w-full px-3 py-2 border border-slate-300 rounded text-sm"
                                        />
                                        <input
                                            type="text"
                                            value={screenshot.category}
                                            onChange={(e) => {
                                                const newScreenshots = [...formData.screenshots]
                                                newScreenshots[index].category = e.target.value
                                                setFormData({ ...formData, screenshots: newScreenshots })
                                            }}
                                            placeholder="التصنيف"
                                            className="w-full px-3 py-2 border border-slate-300 rounded text-sm"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setFormData({
                                                    ...formData,
                                                    screenshots: formData.screenshots.filter((_, i) => i !== index)
                                                })
                                            }}
                                            className="w-full px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition text-sm"
                                        >
                                            <Trash2 className="w-4 h-4 mx-auto" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Download Info */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-bold text-slate-900">معلومات التحميل</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        رابط التحميل
                                    </label>
                                    <input
                                        dir="ltr"
                                        type="url"
                                        value={formData.downloadUrl}
                                        onChange={(e) => setFormData({ ...formData, downloadUrl: e.target.value })}
                                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-left font-mono"
                                        placeholder="https://..."
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        الإصدار
                                    </label>
                                    <input
                                        dir="ltr"
                                        type="text"
                                        value={formData.version}
                                        onChange={(e) => setFormData({ ...formData, version: e.target.value })}
                                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-left"
                                        placeholder="1.0.0"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        حجم الملف
                                    </label>
                                    <input
                                        dir="ltr"
                                        type="text"
                                        value={formData.fileSize}
                                        onChange={(e) => setFormData({ ...formData, fileSize: e.target.value })}
                                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-left"
                                        placeholder="~50 MB"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        آخر تحديث
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.lastUpdate}
                                        onChange={(e) => setFormData({ ...formData, lastUpdate: e.target.value })}
                                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                        placeholder="يناير 2026"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Status & Settings */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-bold text-slate-900">الإعدادات</h3>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        الحالة
                                    </label>
                                    <select
                                        value={formData.status}
                                        onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                    >
                                        <option value="draft">مسودة</option>
                                        <option value="published">منشور</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        الترتيب
                                    </label>
                                    <input
                                        type="number"
                                        value={formData.order}
                                        onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                    />
                                </div>

                                <div className="flex items-center pt-8">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={formData.featured}
                                            onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                                            className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                                        />
                                        <span className="text-sm font-medium text-slate-700">منتج مميز</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Note about features, benefits, etc. */}
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <p className="text-sm text-blue-800">
                                <strong>ملاحظة:</strong> يمكنك إضافة المميزات، الفوائد، التقنيات، والمتطلبات بعد حفظ المنتج من خلال تعديله.
                                هذا النموذج يركز على المعلومات الأساسية فقط.
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-end gap-4 pt-6 border-t border-slate-200">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-6 py-3 rounded-lg border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition"
                            >
                                إلغاء
                            </button>
                            <button
                                type="submit"
                                disabled={loading || uploading}
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        جاري الحفظ...
                                    </>
                                ) : (
                                    <>
                                        <Save className="w-5 h-5" />
                                        {slug ? 'تحديث المنتج' : 'إضافة المنتج'}
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
