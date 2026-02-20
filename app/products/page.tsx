import { Metadata } from 'next'
import Link from 'next/link'
import { Package, Home, ArrowRight, Filter } from 'lucide-react'
import dbConnect from '@/lib/mongodb'
import Product from '@/models/Product'
import { generateWebPageSchema } from '@/lib/structuredData'

export const metadata: Metadata = {
    title: 'منتجاتنا - أنظمة وبرامج إدارة الأعمال',
    description: 'استكشف مجموعة منتجات Softera-DZ من أنظمة إدارة المخزون، نقطة البيع، برامج المحاسبة، وحلول الأعمال المتكاملة للشركات في الجزائر.',
    keywords: [
        'منتجات Softera-DZ',
        'برامج إدارة الأعمال',
        'أنظمة المخزون الجزائر',
        'برامج المحاسبة',
        'نقطة البيع POS',
    ],
    openGraph: {
        title: 'منتجات Softera-DZ | أنظمة إدارة الأعمال',
        description: 'حلول برمجية متكاملة للشركات الجزائرية',
        url: 'https://softera-dz.com/products',
    },
    alternates: {
        canonical: 'https://softera-dz.com/products',
    },
}

// Fetch all published products directly from database
async function getProducts() {
    try {
        await dbConnect()
        const products = await Product.find({ status: 'published' })
            .sort({ order: 1, createdAt: -1 })
            .lean()

        return JSON.parse(JSON.stringify(products))
    } catch (error) {
        console.error('Error fetching products:', error)
        return []
    }
}

export default async function ProductsPage() {
    const products = await getProducts()

    // Generate structured data
    const pageSchema = generateWebPageSchema({
        title: 'منتجات Softera-DZ',
        description: 'مجموعة من الحلول البرمجية للشركات',
        url: 'https://softera-dz.com/products',
    })

    // Group products by type
    const productsByType = products.reduce((acc: any, product: any) => {
        if (!acc[product.type]) {
            acc[product.type] = []
        }
        acc[product.type].push(product)
        return acc
    }, {})

    const types = Object.keys(productsByType)

    return (
        <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
            {/* Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
            />
            {/* Header */}
            <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-lg shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between py-4">
                        <div className="flex items-center gap-6">
                            <Link href="/" className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition">
                                <Home className="w-5 h-5" />
                                <span className="text-sm font-medium hidden sm:inline">الرئيسية</span>
                            </Link>

                            <div className="h-6 w-px bg-slate-300" />

                            <div className="flex items-center gap-3">
                                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-700 text-white flex items-center justify-center shadow-lg shadow-indigo-500/25">
                                    <Package className="w-6 h-6" />
                                </div>
                                <div className="leading-tight">
                                    <div className="text-lg font-bold text-slate-900">جميع المنتجات</div>
                                    <div className="text-xs text-slate-500">All Products</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative overflow-hidden py-20 sm:py-28">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-indigo-100 blur-3xl opacity-50" />
                    <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-purple-100 blur-3xl opacity-50" />
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight">
                            منتجاتنا البرمجية
                            <span className="block mt-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                حلول متكاملة لأعمالك
                            </span>
                        </h1>
                        <p className="mt-6 text-xl text-slate-600">
                            اكتشف مجموعتنا الكاملة من الحلول البرمجية المصممة لتلبية احتياجاتك
                        </p>
                    </div>

                    {/* Stats */}
                    <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                {products.length}
                            </div>
                            <div className="mt-1 text-sm text-slate-500">منتج متاح</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                {types.length}
                            </div>
                            <div className="mt-1 text-sm text-slate-500">فئة</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                100%
                            </div>
                            <div className="mt-1 text-sm text-slate-500">دعم عربي</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                24/7
                            </div>
                            <div className="mt-1 text-sm text-slate-500">دعم فني</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Products by Type */}
            {types.length > 0 ? (
                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
                        {types.map((type) => (
                            <div key={type}>
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
                                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 px-4">
                                        {type === 'Desktop' && 'تطبيقات سطح المكتب'}
                                        {type === 'Web' && 'تطبيقات الويب'}
                                        {type === 'Mobile' && 'تطبيقات الموبايل'}
                                        {type === 'Enterprise' && 'أنظمة المؤسسات'}
                                    </h2>
                                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {productsByType[type].map((product: any) => (
                                        <Link
                                            key={product._id}
                                            href={`/products/${product.slug}`}
                                            className="group relative rounded-2xl border-2 border-slate-200 bg-white hover:border-indigo-300 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 overflow-hidden"
                                        >
                                            {/* Product Image */}
                                            {product.screenshots?.[0]?.url ? (
                                                <div className="aspect-video overflow-hidden bg-slate-100">
                                                    <img
                                                        src={product.screenshots[0].url}
                                                        alt={product.name}
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="aspect-video bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
                                                    <Package className="w-16 h-16 text-indigo-300" />
                                                </div>
                                            )}

                                            {/* Product Info */}
                                            <div className="p-6">
                                                <div className="flex items-start justify-between mb-3">
                                                    <div>
                                                        <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition">
                                                            {product.name}
                                                        </h3>
                                                        <p className="text-sm text-slate-400 mt-1">{product.nameEn}</p>
                                                    </div>
                                                    {product.featured && (
                                                        <span className="px-2 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-semibold">
                                                            مميز
                                                        </span>
                                                    )}
                                                </div>

                                                <p className="text-slate-600 leading-relaxed mb-4 line-clamp-2">
                                                    {product.description}
                                                </p>

                                                {/* Features Count */}
                                                {product.features && product.features.length > 0 && (
                                                    <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
                                                        <Filter className="w-4 h-4" />
                                                        <span>{product.features.length} ميزة رئيسية</span>
                                                    </div>
                                                )}

                                                <div className="flex items-center gap-2 text-indigo-600 font-medium text-sm group-hover:gap-3 transition-all">
                                                    <span>عرض التفاصيل</span>
                                                    <ArrowRight className="w-4 h-4" />
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            ) : (
                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <Package className="w-20 h-20 text-slate-300 mx-auto mb-6" />
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">لا توجد منتجات حالياً</h2>
                        <p className="text-slate-600 mb-8">نحن نعمل على إضافة منتجات جديدة قريباً</p>
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
                        >
                            <Home className="w-5 h-5" />
                            العودة للرئيسية
                        </Link>
                    </div>
                </section>
            )}

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                        لم تجد ما تبحث عنه؟
                    </h2>
                    <p className="text-xl text-indigo-100 mb-8">
                        نقدم حلولاً مخصصة تلبي احتياجاتك الخاصة
                    </p>
                    <Link
                        href="/#contact"
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-indigo-600 font-semibold hover:bg-indigo-50 transition shadow-xl"
                    >
                        تواصل معنا
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-slate-200 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-700 text-white flex items-center justify-center">
                                <Package className="w-5 h-5" />
                            </div>
                            <div>
                                <div className="font-bold text-slate-900">Informatics Solutions</div>
                                <div className="text-xs text-slate-500">حلول برمجية متكاملة</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-6 text-sm text-slate-500">
                            <Link href="/" className="hover:text-slate-900 transition">الرئيسية</Link>
                            <Link href="/#services" className="hover:text-slate-900 transition">الخدمات</Link>
                            <Link href="/#contact" className="hover:text-slate-900 transition">تواصل معنا</Link>
                        </div>
                    </div>

                    <div className="mt-8 pt-8 border-t border-slate-100 text-center">
                        <p className="text-sm text-slate-500">
                            © {new Date().getFullYear()} Informatics Solutions. جميع الحقوق محفوظة.
                        </p>
                        <p className="mt-2 text-xs text-slate-400">
                            صُنع بـ ❤️ في الجزائر
                        </p>
                    </div>
                </div>
            </footer>
        </main>
    )
}
