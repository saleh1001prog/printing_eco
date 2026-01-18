import {
  Code,
  Monitor,
  Smartphone,
  Layers,
  Zap,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Users,
  TrendingUp,
  Shield,
  Rocket,
  Globe,
  Award,
  Building2,
  Mail,
  Phone
} from 'lucide-react'
import Link from 'next/link'

const services = [
  {
    icon: Monitor,
    title: 'تطبيقات سطح المكتب',
    titleEn: 'Desktop Applications',
    description: 'تطوير تطبيقات سطح مكتب احترافية باستخدام أحدث التقنيات مثل .NET، WPF، وElectron',
    features: ['واجهات مستخدم عصرية', 'أداء عالي', 'دعم Windows/Mac/Linux']
  },
  {
    icon: Globe,
    title: 'تطبيقات الويب',
    titleEn: 'Web Applications',
    description: 'بناء تطبيقات ويب متقدمة وسريعة باستخدام React، Next.js، وأحدث تقنيات الويب',
    features: ['تصميم متجاوب', 'أداء ممتاز', 'SEO محسّن']
  },
  {
    icon: Smartphone,
    title: 'تطبيقات الموبايل',
    titleEn: 'Mobile Applications',
    description: 'تطوير تطبيقات موبايل أصلية ومتعددة المنصات لنظامي iOS وAndroid',
    features: ['تجربة مستخدم سلسة', 'أداء أصلي', 'دعم كامل للمنصات']
  },
  {
    icon: Layers,
    title: 'أنظمة إدارة متكاملة',
    titleEn: 'Enterprise Systems',
    description: 'حلول برمجية متكاملة لإدارة الأعمال، المخزون، المبيعات، والموارد البشرية',
    features: ['حلول مخصصة', 'قابلة للتوسع', 'دعم فني مستمر']
  },
]

const technologies = [
  { name: '.NET / C#', category: 'Desktop' },
  { name: 'React / Next.js', category: 'Web' },
  { name: 'TypeScript', category: 'Web' },
  { name: 'WPF / XAML', category: 'Desktop' },
  { name: 'Node.js', category: 'Backend' },
  { name: 'SQL Server', category: 'Database' },
  { name: 'MongoDB', category: 'Database' },
  { name: 'Azure / AWS', category: 'Cloud' },
]

const stats = [
  { value: '50+', label: 'مشروع منجز' },
  { value: '30+', label: 'عميل راضٍ' },
  { value: '5+', label: 'سنوات خبرة' },
  { value: '24/7', label: 'دعم فني' },
]

// Fetch published products from API
async function getProducts() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/products?status=published`, {
      cache: 'no-store'
    })

    if (!res.ok) return []

    const data = await res.json()
    return data.success ? data.products : []
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

export default async function Home() {
  const products = await getProducts()

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-700 text-white flex items-center justify-center shadow-lg shadow-indigo-500/25">
                <Code className="w-6 h-6" />
              </div>
              <div className="leading-tight">
                <div className="text-lg font-bold text-slate-900">Informatics Solutions</div>
                <div className="text-xs text-slate-500">حلول برمجية متكاملة</div>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-6">
              <a href="#services" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition">
                الخدمات
              </a>
              <a href="#projects" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition">
                المشاريع
              </a>
              <a href="#technologies" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition">
                التقنيات
              </a>
              <a href="#contact" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition">
                تواصل معنا
              </a>
            </nav>

            <a
              href="#contact"
              className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold hover:from-indigo-700 hover:to-purple-700 transition shadow-lg shadow-indigo-500/25"
            >
              <span className="hidden sm:inline">ابدأ مشروعك</span>
              <span className="sm:hidden">تواصل</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-indigo-100 blur-3xl opacity-50" />
          <div className="absolute top-1/2 -left-40 w-96 h-96 rounded-full bg-purple-100 blur-3xl opacity-50" />
          <div className="absolute -bottom-40 right-1/3 w-96 h-96 rounded-full bg-blue-100 blur-3xl opacity-50" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 text-indigo-700 text-sm font-medium mb-8 animate-pulse">
              <Sparkles className="w-4 h-4" />
              <span>نحول أفكارك إلى واقع رقمي</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
              حلول برمجية احترافية
              <span className="block mt-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                لنجاح أعمالك
              </span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              نقدم خدمات تطوير البرمجيات المتكاملة من تطبيقات سطح المكتب إلى تطبيقات الويب والموبايل.
              نساعدك في بناء حلول تقنية مبتكرة تلبي احتياجات عملك وتحقق أهدافك.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:from-indigo-700 hover:to-purple-700 transition shadow-xl shadow-indigo-500/25"
              >
                <Rocket className="w-5 h-5" />
                ابدأ مشروعك الآن
              </a>
              <a
                href="#services"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border-2 border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition"
              >
                استكشف خدماتنا
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>

            {/* Stats */}
            <div className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-8">
              {stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-sm text-slate-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-700 text-sm font-medium mb-4">
              <Layers className="w-4 h-4" />
              خدماتنا
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
              نقدم حلولاً برمجية شاملة
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              من التصميم إلى التطوير والنشر، نوفر كل ما تحتاجه لمشروعك
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, i) => (
              <div
                key={i}
                className="group p-8 rounded-2xl border border-slate-200 bg-white hover:border-indigo-200 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 text-indigo-600 flex items-center justify-center mb-6 group-hover:from-indigo-600 group-hover:to-purple-600 group-hover:text-white transition-all duration-300">
                  <service.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{service.title}</h3>
                <p className="text-sm text-slate-400 mb-3">{service.titleEn}</p>
                <p className="text-slate-600 leading-relaxed mb-6">{service.description}</p>

                <div className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-slate-600">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 sm:py-28 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-700 text-sm font-medium mb-4">
              <Award className="w-4 h-4" />
              مشاريعنا
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
              منتجاتنا وحلولنا البرمجية
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              نفخر بتقديم حلول برمجية متميزة لعملائنا
            </p>
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {products.map((product: any, i: number) => (
                <Link
                  key={product._id || i}
                  href={`/products/${product.slug}`}
                  className="group p-8 rounded-2xl border border-slate-200 bg-white hover:border-indigo-200 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300"
                >
                  {product.screenshots?.[0]?.url && (
                    <div className="mb-6 aspect-video rounded-lg overflow-hidden">
                      <img
                        src={product.screenshots[0].url}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-medium">
                      {product.type}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition">
                    {product.name}
                  </h3>
                  <p className="text-slate-600 leading-relaxed mb-6">{product.shortDescription}</p>
                  <div className="flex items-center gap-2 text-indigo-600 font-medium text-sm group-hover:gap-3 transition-all">
                    <span>اعرف المزيد</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Award className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">قريباً...</h3>
              <p className="text-slate-600">نحن نعمل على إضافة منتجاتنا</p>
            </div>
          )}

          {products.length > 0 && (
            <div className="mt-12 text-center">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border-2 border-indigo-600 text-indigo-600 font-semibold hover:bg-indigo-600 hover:text-white transition-all"
              >
                عرض جميع المنتجات
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Technologies Section */}
      <section id="technologies" className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-700 text-sm font-medium mb-4">
              <Zap className="w-4 h-4" />
              التقنيات
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
              نستخدم أحدث التقنيات
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              نعتمد على أفضل الأدوات والتقنيات لضمان جودة عالية
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {technologies.map((tech, i) => (
              <div
                key={i}
                className="p-6 rounded-xl border border-slate-200 bg-white hover:border-indigo-200 hover:shadow-lg transition-all duration-300 text-center"
              >
                <div className="font-semibold text-slate-900 mb-1">{tech.name}</div>
                <div className="text-xs text-slate-500">{tech.category}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 sm:py-28 bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              لماذا تختارنا؟
            </h2>
            <p className="mt-4 text-lg text-indigo-100">
              نقدم أكثر من مجرد كود، نقدم شراكة طويلة الأمد
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: 'جودة عالية',
                description: 'نلتزم بأعلى معايير الجودة في كل مشروع'
              },
              {
                icon: Users,
                title: 'فريق محترف',
                description: 'فريق من المطورين ذوي الخبرة والكفاءة'
              },
              {
                icon: TrendingUp,
                title: 'دعم مستمر',
                description: 'دعم فني متواصل وتحديثات دورية'
              }
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm text-white flex items-center justify-center mx-auto mb-6">
                  <item.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-indigo-100">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 sm:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-700 text-sm font-medium mb-4">
              <Building2 className="w-4 h-4" />
              تواصل معنا
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
              هل لديك مشروع في ذهنك؟
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              نحن هنا لمساعدتك في تحويل فكرتك إلى واقع
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl border border-slate-200 bg-slate-50 hover:border-indigo-200 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-4">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">البريد الإلكتروني</h3>
              <a href="mailto:info@informaticssolutions.com" className="text-indigo-600 hover:text-indigo-700 transition">
                info@informaticssolutions.com
              </a>
            </div>

            <div className="p-8 rounded-2xl border border-slate-200 bg-slate-50 hover:border-indigo-200 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-4">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">الهاتف</h3>
              <a href="tel:+213XXXXXXXXX" className="text-indigo-600 hover:text-indigo-700 transition">
                +213 XXX XXX XXX
              </a>
            </div>
          </div>

          <div className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100 text-center">
            <p className="text-slate-700 mb-6">
              جاهز لبدء مشروعك؟ تواصل معنا اليوم واحصل على استشارة مجانية
            </p>
            <a
              href="mailto:info@informaticssolutions.com"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:from-indigo-700 hover:to-purple-700 transition shadow-lg shadow-indigo-500/25"
            >
              <Mail className="w-5 h-5" />
              راسلنا الآن
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-700 text-white flex items-center justify-center">
                <Code className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-slate-900">Informatics Solutions</div>
                <div className="text-xs text-slate-500">حلول برمجية متكاملة</div>
              </div>
            </div>

            <div className="flex items-center gap-6 text-sm text-slate-500">
              <a href="#services" className="hover:text-slate-900 transition">الخدمات</a>
              <a href="#projects" className="hover:text-slate-900 transition">المشاريع</a>
              <a href="#contact" className="hover:text-slate-900 transition">تواصل معنا</a>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-slate-200 text-center">
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
