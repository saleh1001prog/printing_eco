import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
    Package,
    Home,
    Download,
    CheckCircle
} from 'lucide-react'

import dbConnect from '@/lib/mongodb'
import ProductModel from '@/models/Product'
import ScreenshotGallery from '../components/ScreenshotGallery'

async function getProduct(slug: string) {
    try {
        await dbConnect()
        const product = await ProductModel.findOne({ slug: slug, status: 'published' }).lean()
        if (!product) return null
        return JSON.parse(JSON.stringify(product))
    } catch (error) {
        console.error('Error fetching product:', error)
        return null
    }
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const product = await getProduct(slug)

    if (!product) {
        notFound()
    }

    return (
        <main className="min-h-screen bg-white">
            {/* Header */}
            <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 backdrop-blur-sm">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <div className="flex items-center justify-between h-14">
                        <div className="flex items-center gap-4">
                            <Link href="/" className="flex items-center gap-1.5 text-slate-500 hover:text-slate-900 transition text-sm">
                                <Home className="w-4 h-4" />
                                <span className="hidden sm:inline">الرئيسية</span>
                            </Link>
                            <span className="text-slate-300">/</span>
                            <span className="font-medium text-slate-900">{product.name}</span>
                        </div>

                        <nav className="hidden md:flex items-center gap-6">
                            <a href="#features" className="text-sm text-slate-600 hover:text-slate-900">المميزات</a>
                            <a href="#screenshots" className="text-sm text-slate-600 hover:text-slate-900">الصور</a>
                            {product.downloadUrl && (
                                <a href="#download" className="px-4 py-1.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700">
                                    تحميل
                                </a>
                            )}
                        </nav>
                    </div>
                </div>
            </header>

            {/* Hero Section - Compact with Description */}
            <section className="py-10 sm:py-14 border-b border-slate-100">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <div className="max-w-3xl">
                        {product.badge && (
                            <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium mb-4">
                                {product.badge}
                            </span>
                        )}
                        
                        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
                            {product.name}
                            <span className="block mt-1 text-blue-600">{product.shortDescription}</span>
                        </h1>

                        <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed whitespace-pre-line">
                            {product.description}
                        </p>

                        {product.downloadUrl && (
                            <div className="mt-6 flex flex-wrap items-center gap-3">
                                <a href="#download" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition">
                                    <Download className="w-4 h-4" />
                                    تحميل مجاني
                                </a>
                                <a href="#features" className="px-5 py-2.5 rounded-lg border border-slate-300 text-slate-700 font-medium hover:bg-slate-50">
                                    المميزات
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Features Section with Images */}
            {product.features && product.features.length > 0 && (
                <section id="features" className="py-10 sm:py-12">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6">
                        <div className="mb-8 text-center">
                            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">المميزات</h2>
                        </div>

                        <div className="space-y-8">
                            {product.features.map((feature: any, i: number) => (
                                <div key={i} className="rounded-xl border border-slate-200 overflow-hidden hover:border-blue-200 hover:shadow-lg transition-all">
                                    {/* Feature Title */}
                                    <div className="p-4 bg-slate-50 border-b border-slate-200">
                                        <h3 className="font-semibold text-lg text-slate-900">{feature.title}</h3>
                                        {feature.description && (
                                            <p className="text-sm text-slate-500 mt-1">{feature.description}</p>
                                        )}
                                    </div>
                                    {/* Feature Image */}
                                    {feature.imageUrl && (
                                        <div className="bg-white">
                                            <img
                                                src={feature.imageUrl}
                                                alt={feature.title}
                                                className="w-full h-auto"
                                            />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Screenshots Gallery */}
            {product.screenshots && product.screenshots.length > 0 && (
                <ScreenshotGallery screenshots={product.screenshots} />
            )}

            {/* Technologies & Requirements */}
            {((product.technologies && product.technologies.length > 0) || (product.requirements && product.requirements.length > 0)) && (
                <section id="requirements" className="py-10 sm:py-12 bg-slate-50">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Technologies */}
                            {product.technologies && product.technologies.length > 0 && (
                                <div>
                                    <h2 className="text-lg font-bold text-slate-900 mb-4 text-center">التقنيات المستخدمة</h2>
                                    <div className="space-y-2">
                                        {product.technologies.map((tech: any, i: number) => (
                                            <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-white border border-slate-200">
                                                {tech.icon && <span className="text-xl">{tech.icon}</span>}
                                                <div>
                                                    <div className="font-medium text-slate-900">{tech.name}</div>
                                                    <div className="text-xs text-slate-500">{tech.description}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Requirements */}
                            {product.requirements && product.requirements.length > 0 && (
                                <div>
                                    <h2 className="text-lg font-bold text-slate-900 mb-4 text-center">متطلبات النظام</h2>
                                    <div className="p-4 rounded-xl bg-white border border-slate-200">
                                        <ul className="space-y-2">
                                            {product.requirements.map((req: string, i: number) => (
                                                <li key={i} className="flex items-center gap-2 text-sm">
                                                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                                                    <span className="text-slate-700">{req}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            )}

            {/* Download Section */}
            {product.downloadUrl && (
                <section id="download" className="py-10 sm:py-12 bg-blue-600">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
                        <h2 className="text-2xl sm:text-3xl font-bold text-white">جاهز للبدء؟</h2>
                        <p className="mt-2 text-blue-100">حمّل {product.name} الآن واستمتع بجميع المميزات</p>

                        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
                            <a
                                href={product.downloadUrl}
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-blue-600 font-semibold hover:bg-blue-50 transition"
                            >
                                <Download className="w-5 h-5" />
                                <span>تحميل (64-bit)</span>
                            </a>
                            {product.downloadUrl32 && (
                                <a
                                    href={product.downloadUrl32}
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-400 transition"
                                >
                                    <Download className="w-5 h-5" />
                                    <span>تحميل (32-bit)</span>
                                </a>
                            )}
                        </div>

                        {(product.version || product.fileSize || product.lastUpdate) && (
                            <p className="mt-4 text-sm text-blue-200">
                                {product.version && `الإصدار ${product.version}`}
                                {product.fileSize && ` • ${product.fileSize}`}
                                {product.lastUpdate && ` • ${product.lastUpdate}`}
                            </p>
                        )}
                    </div>
                </section>
            )}

            {/* Footer */}
            <footer className="border-t border-slate-100 bg-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                            <Package className="w-5 h-5 text-blue-600" />
                            <span className="font-medium text-slate-900">{product.name}</span>
                        </div>
                        <p className="text-sm text-slate-500">
                            © {new Date().getFullYear()} <Link href="/" className="text-blue-600 hover:underline">SOFTERA-DZ</Link>
                        </p>
                    </div>
                </div>
            </footer>
        </main>
    )
}
