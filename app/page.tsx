import {
  Monitor,
  Smartphone,
  Layers,
  Globe,
  Mail,
  Phone,
  ChevronRight
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import connectDB from '@/lib/mongodb'
import Product from '@/models/Product'
import Settings from '@/models/Settings'
import { generateOrganizationSchema } from '@/lib/structuredData'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'الرئيسية - حلول برمجية احترافية للشركات',
  description: 'Softera-DZ شركة جزائرية متخصصة في تطوير البرمجيات. نقدم أنظمة إدارة المخزون، نقطة البيع POS، برامج المحاسبة، تطبيقات الويب والموبايل للشركات الصغيرة والمتوسطة في الجزائر.',
  keywords: [
    'شركة برمجيات الجزائر',
    'تطوير تطبيقات الجزائر',
    'Softera-DZ',
    'أنظمة إدارة الأعمال',
    'حلول تقنية للشركات',
  ],
  openGraph: {
    title: 'Softera-DZ | حلول برمجية احترافية',
    description: 'شركة جزائرية رائدة في تطوير البرمجيات وأنظمة إدارة الأعمال',
    url: 'https://softera-dz.com',
  },
  alternates: {
    canonical: 'https://softera-dz.com',
  },
}

const services = [
  {
    icon: Monitor,
    title: 'تطبيقات سطح المكتب',
    description: 'تطوير تطبيقات احترافية باستخدام .NET و WPF',
  },
  {
    icon: Globe,
    title: 'تطبيقات الويب',
    description: 'بناء تطبيقات ويب سريعة باستخدام React و Next.js',
  },
  {
    icon: Smartphone,
    title: 'تطبيقات الموبايل',
    description: 'تطوير تطبيقات لنظامي iOS و Android',
  },
  {
    icon: Layers,
    title: 'أنظمة إدارة',
    description: 'حلول متكاملة لإدارة الأعمال والمخزون',
  },
]

const technologies = [
  '.NET', 'React', 'Next.js', 'TypeScript', 'Node.js', 'MongoDB', 'SQL Server', 'WPF'
]

// Fetch published products directly from database
async function getProducts() {
  try {
    await connectDB()
    const products = await Product.find({ status: 'published' })
      .sort({ order: 1, createdAt: -1 })
      .lean()
    
    // Convert MongoDB documents to plain objects
    return JSON.parse(JSON.stringify(products))
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

// Fetch settings directly from database
async function getSettings() {
  try {
    await connectDB()
    let settings = await Settings.findOne().lean()
    
    if (!settings) {
      // Return default settings if none exist
      return {
        email: 'info@softera-dz.com',
        phone: '+213 XXX XXX XXX',
        companyName: 'SOFTERA-DZ',
        companyNameAr: 'حلول برمجية متكاملة',
      }
    }
    
    // Convert MongoDB document to plain object
    return JSON.parse(JSON.stringify(settings))
  } catch (error) {
    console.error('Error fetching settings:', error)
    return null
  }
}

export default async function Home() {
  const [products, settings] = await Promise.all([getProducts(), getSettings()])
  
  const contactEmail = settings?.email || 'info@softera-dz.com'
  const contactPhone = settings?.phone || '+213 XXX XXX XXX'

  const organizationSchema = generateOrganizationSchema()

  return (
    <main className="min-h-screen bg-white">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Image src="/logo.png" alt="SOFTERA-DZ" width={36} height={36} className="rounded-lg" />
              <span className="font-semibold text-slate-800">SOFTERA-DZ</span>
            </div>

            <nav className="hidden md:flex items-center gap-8">
              <a href="#services" className="text-sm text-slate-600 hover:text-slate-900">الخدمات</a>
              <a href="#projects" className="text-sm text-slate-600 hover:text-slate-900">المشاريع</a>
              <a href="#contact" className="text-sm text-slate-600 hover:text-slate-900">تواصل معنا</a>
            </nav>

            <a href="#contact" className="px-4 py-2 rounded-lg bg-slate-900 text-white text-sm font-medium hover:bg-slate-800">
              ابدأ مشروعك
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
            حلول برمجية احترافية
            <span className="block mt-1 text-indigo-600">لنجاح أعمالك</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
            نطور تطبيقات سطح المكتب والويب والموبايل بأحدث التقنيات
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="#contact" className="w-full sm:w-auto px-6 py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700">
              ابدأ مشروعك
            </a>
            <a href="#projects" className="w-full sm:w-auto px-6 py-3 rounded-lg border border-slate-300 text-slate-700 font-medium hover:bg-slate-50">
              عرض المشاريع
            </a>
          </div>

          {/* Tech Stack */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
            {technologies.map((tech, i) => (
              <span key={i} className="px-3 py-1.5 text-sm text-slate-600 bg-slate-100 rounded-md">{tech}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-12 sm:py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">خدماتنا</h2>
            <p className="mt-2 text-slate-600">حلول برمجية متكاملة لجميع احتياجاتك</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {services.map((service, i) => (
              <div key={i} className="p-5 rounded-xl bg-white border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all">
                <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3">
                  <service.icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-1">{service.title}</h3>
                <p className="text-sm text-slate-500">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">مشاريعنا</h2>
            <p className="mt-2 text-slate-600">حلول برمجية متميزة لعملائنا</p>
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {products.map((product: any, i: number) => (
                <Link
                  key={product._id || i}
                  href={`/products/${product.slug}`}
                  className="group block rounded-xl border border-slate-200 bg-white overflow-hidden hover:border-indigo-300 hover:shadow-lg transition-all"
                >
                  {product.screenshots?.[0]?.url && (
                    <div className="aspect-video overflow-hidden bg-slate-100">
                      <img
                        src={product.screenshots[0].url}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <span className="inline-block px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-600 mb-2">
                      {product.type}
                    </span>
                    <h3 className="font-semibold text-slate-900 group-hover:text-indigo-600 transition">
                      {product.name}
                    </h3>
                    <p className="text-sm text-slate-500 mt-1 line-clamp-2">{product.shortDescription}</p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Layers className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500">قريباً...</p>
            </div>
          )}

          {products.length > 0 && (
            <div className="mt-8 text-center">
              <Link href="/products" className="inline-flex items-center gap-1 text-indigo-600 font-medium hover:gap-2 transition-all">
                عرض الكل <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12 sm:py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">تواصل معنا</h2>
            <p className="mt-2 text-slate-600">نحن هنا لمساعدتك في تحويل فكرتك إلى واقع</p>
          </div>

          <div className="max-w-xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a href={`mailto:${contactEmail}`} className="flex items-center gap-3 p-4 rounded-lg bg-white border border-slate-200 hover:border-indigo-300 transition-all">
                <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-500">البريد الإلكتروني</div>
                  <div className="text-sm font-medium text-slate-900">{contactEmail}</div>
                </div>
              </a>

              <a href={`tel:${contactPhone.replace(/\s/g, '')}`} className="flex items-center gap-3 p-4 rounded-lg bg-white border border-slate-200 hover:border-indigo-300 transition-all">
                <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-500">الهاتف</div>
                  <div className="text-sm font-medium text-slate-900">{contactPhone}</div>
                </div>
              </a>
            </div>

            <div className="mt-6 text-center">
              <a href={`mailto:${contactEmail}`} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition">
                <Mail className="w-4 h-4" />
                راسلنا الآن
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Image src="/logo.png" alt="SOFTERA-DZ" width={28} height={28} className="rounded-md" />
              <span className="text-sm font-medium text-slate-700">SOFTERA-DZ</span>
            </div>
            <p className="text-sm text-slate-500">
              © {new Date().getFullYear()} جميع الحقوق محفوظة
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
