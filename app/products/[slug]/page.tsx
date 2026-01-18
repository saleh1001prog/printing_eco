import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
    Package,
    Home,
    Download,
    CheckCircle,
    Monitor,
    Database,
    Zap,
    Globe,
    Shield,
    Star,
    Sparkles,
    ArrowRight,
    Layers
} from 'lucide-react'
import * as LucideIcons from 'lucide-react'
import ScreenshotsSlider from '../components/ScreenshotsSlider'

// Helper function to get icon component by name
const getIconComponent = (iconName: string) => {
    const IconComponent = (LucideIcons as any)[iconName]
    return IconComponent || Package
}

import dbConnect from '@/lib/mongodb'
import ProductModel from '@/models/Product'

async function getProduct(slug: string) {
    try {
        await dbConnect()
        const product = await ProductModel.findOne({ slug: slug, status: 'published' }).lean()
        if (!product) return null

        // Convert _id to string to pass to client component key if needed, and cleanup logs
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
        <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
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
                                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 text-white flex items-center justify-center shadow-lg shadow-blue-500/25">
                                    <Package className="w-6 h-6" />
                                </div>
                                <div className="leading-tight">
                                    <div className="text-lg font-bold text-slate-900">{product.name}</div>
                                    <div className="text-xs text-slate-500">{product.nameEn}</div>
                                </div>
                            </div>
                        </div>

                        <nav className="hidden md:flex items-center gap-6">
                            <a href="#features" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition">
                                المميزات
                            </a>
                            <a href="#screenshots" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition">
                                لقطات الشاشة
                            </a>
                            {product.requirements && product.requirements.length > 0 && (
                                <a href="#requirements" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition">
                                    المتطلبات
                                </a>
                            )}
                        </nav>

                        {product.downloadUrl && (
                            <a
                                href="#download"
                                className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-semibold hover:from-blue-700 hover:to-blue-800 transition shadow-lg shadow-blue-500/30"
                            >
                                <span className="hidden sm:inline">تحميل البرنامج</span>
                                <span className="sm:hidden">تحميل</span>
                            </a>
                        )}
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-blue-100 blur-3xl opacity-60 animate-pulse" />
                    <div className="absolute top-1/3 -left-40 w-[400px] h-[400px] rounded-full bg-indigo-100 blur-3xl opacity-50" />
                    <div className="absolute -bottom-40 right-1/3 w-[450px] h-[450px] rounded-full bg-purple-100 blur-3xl opacity-40" />
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
                    <div className="text-center max-w-4xl mx-auto">
                        {product.badge && (
                            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 text-blue-700 text-sm font-semibold mb-8 shadow-sm">
                                <Sparkles className="w-4 h-4 animate-pulse" />
                                <span>{product.badge}</span>
                            </div>
                        )}

                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 leading-tight tracking-tight">
                            {product.name}
                            <span className="block mt-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                {product.shortDescription}
                            </span>
                        </h1>

                        <p className="mt-8 text-xl sm:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed whitespace-pre-line">
                            {product.description}
                        </p>

                        {product.downloadUrl && (
                            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
                                <a
                                    href="#download"
                                    className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105"
                                >
                                    <Download className="w-6 h-6 group-hover:animate-bounce" />
                                    تحميل مجاني
                                </a>
                                <a
                                    href="#features"
                                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 py-5 rounded-xl border-2 border-slate-300 text-slate-700 font-semibold text-lg hover:bg-slate-50 hover:border-blue-300 transition-all"
                                >
                                    استكشف المميزات
                                    <ArrowRight className="w-5 h-5" />
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            {product.benefits && product.benefits.length > 0 && (
                <section className="py-20 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                                لماذا {product.name}؟
                            </h2>
                        </div>

                        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${Math.min(product.benefits.length, 4)} gap-6`}>
                            {product.benefits.map((benefit: any, i: number) => {
                                const IconComponent = getIconComponent(benefit.icon)
                                return (
                                    <div key={i} className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all">
                                        <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4">
                                            <IconComponent className="w-7 h-7 text-white" />
                                        </div>
                                        <h3 className="text-lg font-bold text-white mb-2">{benefit.title}</h3>
                                        <p className="text-blue-100 text-sm leading-relaxed">{benefit.description}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </section>
            )}

            {/* Features Section */}
            {product.features && product.features.length > 0 && (
                <section id="features" className="py-20 sm:py-28 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-semibold mb-4">
                                <Layers className="w-4 h-4" />
                                المميزات الرئيسية
                            </div>
                            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900">
                                كل ما تحتاجه في برنامج واحد
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {product.features.map((feature: any, i: number) => {
                                const IconComponent = getIconComponent(feature.icon)
                                return (
                                    <div
                                        key={i}
                                        className="group p-8 rounded-2xl border-2 border-slate-200 bg-white hover:border-transparent hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
                                    >
                                        <div className={`absolute inset-0 bg-gradient-to-br ${feature.color || 'from-blue-500 to-blue-600'} opacity-0 group-hover:opacity-5 transition-opacity`} />

                                        <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color || 'from-blue-500 to-blue-600'} text-white flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all`}>
                                            <IconComponent className="w-8 h-8" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-slate-900 mb-2">{feature.title}</h3>
                                        <p className="text-sm text-slate-400 mb-4 font-medium">{feature.titleEn}</p>
                                        <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </section>
            )}

            {/* Screenshots Section */}
            {product.screenshots && product.screenshots.length > 0 && (
                <section id="screenshots" className="py-20 sm:py-28 bg-gradient-to-b from-slate-50 to-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-semibold mb-4">
                                <Monitor className="w-4 h-4" />
                                لقطات الشاشة
                            </div>
                            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900">
                                واجهة مستخدم عصرية واحترافية
                            </h2>
                        </div>

                        <ScreenshotsSlider screenshots={product.screenshots} />
                    </div>
                </section>
            )}

            {/* Technologies & Requirements */}
            {((product.technologies && product.technologies.length > 0) || (product.requirements && product.requirements.length > 0)) && (
                <section id="requirements" className="py-20 sm:py-28 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            {/* Technologies */}
                            {product.technologies && product.technologies.length > 0 && (
                                <div>
                                    <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-8">
                                        التقنيات المستخدمة
                                    </h2>
                                    <div className="space-y-4">
                                        {product.technologies.map((tech: any, i: number) => (
                                            <div key={i} className="group flex items-center gap-4 p-6 rounded-2xl bg-gradient-to-r from-slate-50 to-blue-50 border-2 border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all">
                                                {tech.icon && <div className="text-4xl">{tech.icon}</div>}
                                                <div className="flex-1">
                                                    <div className="font-bold text-lg text-slate-900">{tech.name}</div>
                                                    <div className="text-sm text-slate-600">{tech.description}</div>
                                                </div>
                                                <CheckCircle className="w-6 h-6 text-green-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Requirements */}
                            {product.requirements && product.requirements.length > 0 && (
                                <div>
                                    <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-8">
                                        متطلبات النظام
                                    </h2>
                                    <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-50 to-blue-50 border-2 border-slate-200">
                                        <ul className="space-y-4">
                                            {product.requirements.map((req: string, i: number) => (
                                                <li key={i} className="flex items-center gap-3 text-lg">
                                                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                                                    <span className="text-slate-700 font-medium">{req}</span>
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
                <section id="download" className="py-20 sm:py-32 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 relative overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" />
                        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000" />
                    </div>

                    <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
                            جاهز للبدء؟
                        </h2>

                        <p className="mt-8 text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
                            حمّل {product.name} الآن واستمتع بجميع المميزات
                        </p>

                        <div className="mt-12">
                            <a
                                href={product.downloadUrl}
                                className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-6 rounded-2xl bg-white text-blue-600 font-bold text-lg hover:bg-blue-50 transition-all shadow-2xl hover:shadow-white/30 hover:scale-105"
                            >
                                <Download className="w-6 h-6 group-hover:animate-bounce" />
                                <div className="text-right">
                                    <div>تحميل الآن</div>
                                    {product.version && (
                                        <div className="text-xs text-blue-400 font-normal">الإصدار {product.version}</div>
                                    )}
                                </div>
                            </a>
                        </div>

                        {(product.version || product.fileSize || product.lastUpdate) && (
                            <p className="mt-10 text-sm text-blue-200 font-medium">
                                {product.version && `الإصدار ${product.version}`}
                                {product.fileSize && ` • حجم الملف: ${product.fileSize}`}
                                {product.lastUpdate && ` • آخر تحديث: ${product.lastUpdate}`}
                            </p>
                        )}
                    </div>
                </section>
            )}

            {/* Footer */}
            <footer className="border-t border-slate-200 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 text-white flex items-center justify-center">
                                <Package className="w-5 h-5" />
                            </div>
                            <div>
                                <div className="font-bold text-slate-900">{product.name}</div>
                                <div className="text-xs text-slate-500">{product.nameEn}</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-6 text-sm text-slate-500">
                            <Link href="/" className="hover:text-slate-900 transition">الرئيسية</Link>
                            <a href="#features" className="hover:text-slate-900 transition">المميزات</a>
                            {product.downloadUrl && (
                                <a href="#download" className="hover:text-slate-900 transition">التحميل</a>
                            )}
                        </div>
                    </div>

                    <div className="mt-8 pt-8 border-t border-slate-100 text-center">
                        <p className="text-sm text-slate-500">
                            © {new Date().getFullYear()} {product.name}. جميع الحقوق محفوظة.
                        </p>
                        <p className="mt-2 text-xs text-slate-400">
                            منتج من <Link href="/" className="text-blue-600 hover:text-blue-700 font-medium">Informatics Solutions</Link> • صُنع بـ ❤️ في الجزائر
                        </p>
                    </div>
                </div>
            </footer>
        </main>
    )
}
