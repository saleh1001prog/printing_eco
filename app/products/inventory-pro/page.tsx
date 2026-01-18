import {
    Package,
    ShoppingCart,
    Users,
    BarChart3,
    Factory,
    Shield,
    Download,
    CheckCircle,
    Monitor,
    Database,
    Zap,
    Globe,
    Clock,
    FileSpreadsheet,
    Printer,
    ScanBarcode,
    UserCog,
    Wallet,
    TrendingUp,
    Bell,
    Layers,
    ArrowRight,
    Home,
    Sparkles,
    Star
} from 'lucide-react'
import Link from 'next/link'

const features = [
    {
        icon: ShoppingCart,
        title: 'نقطة البيع (POS)',
        titleEn: 'Point of Sale',
        description: 'واجهة بيع سهلة وسريعة مع دعم الباركود وطرق دفع متعددة',
        descriptionEn: 'Fast and easy sales interface with barcode support and multiple payment methods',
        color: 'from-blue-500 to-blue-600'
    },
    {
        icon: Package,
        title: 'إدارة المخزون',
        titleEn: 'Inventory Management',
        description: 'تتبع المنتجات بشكل فوري مع تنبيهات المخزون المنخفض',
        descriptionEn: 'Real-time product tracking with low stock alerts',
        color: 'from-green-500 to-green-600'
    },
    {
        icon: Wallet,
        title: 'إدارة المشتريات',
        titleEn: 'Purchase Management',
        description: 'أوامر الشراء واستلام البضائع وإدارة الموردين',
        descriptionEn: 'Purchase orders, goods receiving, and supplier management',
        color: 'from-purple-500 to-purple-600'
    },
    {
        icon: Factory,
        title: 'التصنيع والإنتاج',
        titleEn: 'Manufacturing',
        description: 'قوائم المواد وأوامر الإنتاج وتتبع العمليات',
        descriptionEn: 'Bill of materials, production orders, and process tracking',
        color: 'from-orange-500 to-orange-600'
    },
    {
        icon: Users,
        title: 'إدارة الموارد البشرية',
        titleEn: 'HR Management',
        description: 'الحضور والانصراف وحساب الرواتب الشهرية',
        descriptionEn: 'Attendance tracking and monthly payroll calculation',
        color: 'from-pink-500 to-pink-600'
    },
    {
        icon: BarChart3,
        title: 'التقارير والتحليلات',
        titleEn: 'Reports & Analytics',
        description: 'لوحة معلومات تفاعلية مع تصدير Excel و PDF',
        descriptionEn: 'Interactive dashboard with Excel & PDF export',
        color: 'from-indigo-500 to-indigo-600'
    },
]

const additionalFeatures = [
    { icon: ScanBarcode, text: 'قراءة الباركود', textEn: 'Barcode Scanner' },
    { icon: Printer, text: 'طباعة الفواتير', textEn: 'Invoice Printing' },
    { icon: FileSpreadsheet, text: 'تصدير Excel', textEn: 'Excel Export' },
    { icon: Bell, text: 'تنبيهات ذكية', textEn: 'Smart Alerts' },
    { icon: UserCog, text: 'صلاحيات المستخدمين', textEn: 'User Permissions' },
    { icon: Layers, text: 'فئات متعددة', textEn: 'Multi Categories' },
    { icon: TrendingUp, text: 'رسوم بيانية', textEn: 'Charts & Graphs' },
    { icon: Clock, text: 'سجل الأنشطة', textEn: 'Activity Log' },
]

const technologies = [
    { name: '.NET 8.0', description: 'أحدث إصدار', icon: '🚀' },
    { name: 'WPF', description: 'واجهة عصرية', icon: '🎨' },
    { name: 'SQLite', description: 'قاعدة بيانات محلية', icon: '💾' },
    { name: 'Entity Framework', description: 'ORM متقدم', icon: '⚡' },
]

const requirements = [
    'Windows 10 / 11',
    '.NET 8.0 Runtime',
    '4 GB RAM (الحد الأدنى)',
    '500 MB مساحة تخزين',
]

const benefits = [
    {
        icon: Zap,
        title: 'سرعة وأداء عالي',
        description: 'مصمم للعمل بكفاءة حتى مع كميات كبيرة من البيانات'
    },
    {
        icon: Shield,
        title: 'أمان البيانات',
        description: 'حماية متقدمة لبياناتك مع نسخ احتياطي تلقائي'
    },
    {
        icon: Globe,
        title: 'يعمل بدون إنترنت',
        description: 'لا حاجة للاتصال بالإنترنت بعد التفعيل'
    },
    {
        icon: Star,
        title: 'دعم فني مميز',
        description: 'فريق دعم متخصص جاهز لمساعدتك'
    }
]

export default function InventoryProPage() {
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
                                    <div className="text-lg font-bold text-slate-900">Inventory Pro</div>
                                    <div className="text-xs text-slate-500">نظام إدارة المخزون</div>
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
                            <a href="#requirements" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition">
                                المتطلبات
                            </a>
                        </nav>

                        <a
                            href="#download"
                            className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-semibold hover:from-blue-700 hover:to-blue-800 transition shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40"
                        >
                            <span className="hidden sm:inline">تحميل البرنامج</span>
                            <span className="sm:hidden">تحميل</span>
                        </a>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative overflow-hidden">
                {/* Enhanced Background decoration */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-blue-100 blur-3xl opacity-60 animate-pulse" />
                    <div className="absolute top-1/3 -left-40 w-[400px] h-[400px] rounded-full bg-indigo-100 blur-3xl opacity-50" />
                    <div className="absolute -bottom-40 right-1/3 w-[450px] h-[450px] rounded-full bg-purple-100 blur-3xl opacity-40" />
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
                    <div className="text-center max-w-4xl mx-auto">
                        {/* Enhanced Badge */}
                        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 text-blue-700 text-sm font-semibold mb-8 shadow-sm hover:shadow-md transition-shadow">
                            <Sparkles className="w-4 h-4 animate-pulse" />
                            <span>تطبيق سطح مكتب احترافي لنظام Windows</span>
                        </div>

                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 leading-tight tracking-tight">
                            نظام إدارة المخزون
                            <span className="block mt-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                الأكثر تكاملاً
                            </span>
                        </h1>

                        <p className="mt-8 text-xl sm:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                            حل متكامل لإدارة مخزونك ومبيعاتك ومشترياتك وموظفيك.
                            <span className="block mt-2 text-lg text-slate-500">
                                مصمم خصيصاً للشركات الصغيرة والمتوسطة في الجزائر والعالم العربي
                            </span>
                        </p>

                        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
                            <a
                                href="#download"
                                className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105"
                            >
                                <Download className="w-6 h-6 group-hover:animate-bounce" />
                                تحميل مجاني - نسخة تجريبية 15 يوم
                            </a>
                            <a
                                href="#features"
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 py-5 rounded-xl border-2 border-slate-300 text-slate-700 font-semibold text-lg hover:bg-slate-50 hover:border-blue-300 transition-all"
                            >
                                استكشف المميزات
                                <ArrowRight className="w-5 h-5" />
                            </a>
                        </div>

                        {/* Enhanced Stats */}
                        <div className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-8">
                            {[
                                { value: '6+', label: 'وحدات متكاملة', icon: Layers },
                                { value: '50+', label: 'ميزة احترافية', icon: Star },
                                { value: '100%', label: 'يعمل بدون انترنت', icon: Globe },
                                { value: 'RTL', label: 'دعم كامل للعربية', icon: CheckCircle },
                            ].map((stat, i) => (
                                <div key={i} className="group text-center p-6 rounded-2xl bg-white/50 backdrop-blur-sm border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all">
                                    <stat.icon className="w-8 h-8 mx-auto mb-3 text-blue-600 group-hover:scale-110 transition-transform" />
                                    <div className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                        {stat.value}
                                    </div>
                                    <div className="mt-2 text-sm font-medium text-slate-600">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits Section - NEW */}
            <section className="py-20 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                            لماذا Inventory Pro؟
                        </h2>
                        <p className="text-xl text-blue-100">
                            الحل الأمثل لإدارة أعمالك بكفاءة واحترافية
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {benefits.map((benefit, i) => (
                            <div key={i} className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all">
                                <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4">
                                    <benefit.icon className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">{benefit.title}</h3>
                                <p className="text-blue-100 text-sm leading-relaxed">{benefit.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section - Enhanced */}
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
                        <p className="mt-4 text-xl text-slate-600">
                            ستة وحدات متكاملة تغطي جميع احتياجات عملك التجاري
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, i) => (
                            <div
                                key={i}
                                className="group p-8 rounded-2xl border-2 border-slate-200 bg-white hover:border-transparent hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
                            >
                                {/* Gradient overlay on hover */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity`} />

                                <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} text-white flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all`}>
                                    <feature.icon className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-2">{feature.title}</h3>
                                <p className="text-sm text-slate-400 mb-4 font-medium">{feature.titleEn}</p>
                                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>

                    {/* Additional Features Grid - Enhanced */}
                    <div className="mt-20 p-10 rounded-3xl bg-gradient-to-br from-slate-50 to-blue-50 border-2 border-slate-200">
                        <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center">مميزات إضافية</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {additionalFeatures.map((feature, i) => (
                                <div key={i} className="flex items-center gap-3 p-5 rounded-xl bg-white border-2 border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all">
                                    <feature.icon className="w-6 h-6 text-blue-600 flex-shrink-0" />
                                    <div>
                                        <div className="text-sm font-semibold text-slate-900">{feature.text}</div>
                                        <div className="text-xs text-slate-400">{feature.textEn}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Screenshots Section - Enhanced */}
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
                        <p className="mt-4 text-xl text-slate-600">
                            تصميم احترافي مستوحى من Material Design مع دعم كامل للغة العربية
                        </p>
                    </div>

                    {/* Real Screenshots */}
                    <div className="space-y-8">
                        {/* Product Creation Screenshot */}
                        <div className="group relative rounded-3xl overflow-hidden border-2 border-slate-200 hover:border-blue-300 transition-all shadow-2xl hover:shadow-blue-500/20">
                            <div className="absolute top-4 right-4 z-10 px-4 py-2 rounded-full bg-blue-600 text-white text-sm font-semibold shadow-lg">
                                إدارة المنتجات
                            </div>
                            <img
                                src="/images-inventory-desktopAPP/products creation.png"
                                alt="واجهة إنشاء وتعديل المنتجات - Inventory Pro"
                                className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/90 to-transparent p-6">
                                <h3 className="text-xl font-bold text-white mb-2">واجهة إدارة المنتجات</h3>
                                <p className="text-slate-200 text-sm">
                                    إضافة وتعديل المنتجات بسهولة مع دعم الباركود والمتغيرات والصور
                                </p>
                            </div>
                        </div>

                        {/* Placeholder for more screenshots */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="group aspect-video rounded-3xl bg-gradient-to-br from-slate-800 via-slate-900 to-blue-900 p-10 flex items-center justify-center border-2 border-slate-700 hover:border-blue-500 transition-all shadow-2xl hover:shadow-blue-500/20">
                                <div className="text-center">
                                    <Monitor className="w-20 h-20 text-blue-400 mx-auto mb-6 group-hover:scale-110 transition-transform" />
                                    <p className="text-xl font-bold text-slate-200">لوحة المعلومات</p>
                                    <p className="text-sm text-slate-400 mt-2">Dashboard</p>
                                    <p className="text-xs text-slate-500 mt-4">قريباً...</p>
                                </div>
                            </div>
                            <div className="group aspect-video rounded-3xl bg-gradient-to-br from-slate-800 via-slate-900 to-indigo-900 p-10 flex items-center justify-center border-2 border-slate-700 hover:border-indigo-500 transition-all shadow-2xl hover:shadow-indigo-500/20">
                                <div className="text-center">
                                    <ShoppingCart className="w-20 h-20 text-indigo-400 mx-auto mb-6 group-hover:scale-110 transition-transform" />
                                    <p className="text-xl font-bold text-slate-200">نقطة البيع</p>
                                    <p className="text-sm text-slate-400 mt-2">Point of Sale</p>
                                    <p className="text-xs text-slate-500 mt-4">قريباً...</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Technology & Requirements - Enhanced */}
            <section id="requirements" className="py-20 sm:py-28 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Technologies */}
                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-semibold mb-6">
                                <Zap className="w-4 h-4" />
                                التقنيات
                            </div>
                            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-8">
                                التقنيات المستخدمة
                            </h2>
                            <div className="space-y-4">
                                {technologies.map((tech, i) => (
                                    <div key={i} className="group flex items-center gap-4 p-6 rounded-2xl bg-gradient-to-r from-slate-50 to-blue-50 border-2 border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all">
                                        <div className="text-4xl">{tech.icon}</div>
                                        <div className="flex-1">
                                            <div className="font-bold text-lg text-slate-900">{tech.name}</div>
                                            <div className="text-sm text-slate-600">{tech.description}</div>
                                        </div>
                                        <CheckCircle className="w-6 h-6 text-green-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Requirements */}
                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-semibold mb-6">
                                <Monitor className="w-4 h-4" />
                                المتطلبات
                            </div>
                            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-8">
                                متطلبات النظام
                            </h2>
                            <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-50 to-blue-50 border-2 border-slate-200">
                                <ul className="space-y-4 mb-8">
                                    {requirements.map((req, i) => (
                                        <li key={i} className="flex items-center gap-3 text-lg">
                                            <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                                            <span className="text-slate-700 font-medium">{req}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="space-y-4">
                                    <div className="p-5 rounded-2xl bg-blue-50 border-2 border-blue-200">
                                        <div className="flex items-start gap-3">
                                            <Database className="w-6 h-6 text-blue-600 mt-0.5 flex-shrink-0" />
                                            <div>
                                                <div className="font-bold text-blue-900 mb-1">قاعدة بيانات محلية</div>
                                                <p className="text-sm text-blue-700 leading-relaxed">
                                                    يستخدم البرنامج قاعدة بيانات SQLite محلية، لا حاجة لتثبيت خادم قواعد بيانات
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-5 rounded-2xl bg-green-50 border-2 border-green-200">
                                        <div className="flex items-start gap-3">
                                            <Globe className="w-6 h-6 text-green-600 mt-0.5 flex-shrink-0" />
                                            <div>
                                                <div className="font-bold text-green-900 mb-1">يعمل بدون إنترنت</div>
                                                <p className="text-sm text-green-700 leading-relaxed">
                                                    البرنامج يعمل بالكامل بدون اتصال بالإنترنت بعد التفعيل
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Download Section - Enhanced */}
            <section id="download" className="py-20 sm:py-32 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 relative overflow-hidden">
                {/* Animated background elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000" />
                </div>

                <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-semibold mb-8 border border-white/20">
                        <Shield className="w-4 h-4" />
                        <span>نسخة تجريبية مجانية لمدة 15 يوم</span>
                    </div>

                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
                        جاهز لتحسين إدارة مخزونك؟
                    </h2>

                    <p className="mt-8 text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
                        حمّل النسخة التجريبية الآن واستمتع بجميع المميزات لمدة 15 يوم مجاناً.
                        <span className="block mt-2 font-semibold">لا حاجة لبطاقة ائتمان أو تسجيل.</span>
                    </p>

                    <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a
                            href="#"
                            className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-6 rounded-2xl bg-white text-blue-600 font-bold text-lg hover:bg-blue-50 transition-all shadow-2xl hover:shadow-white/30 hover:scale-105"
                        >
                            <Download className="w-6 h-6 group-hover:animate-bounce" />
                            <div className="text-right">
                                <div>تحميل للويندوز</div>
                                <div className="text-xs text-blue-400 font-normal">Windows 10/11 - 64bit</div>
                            </div>
                        </a>
                    </div>

                    <p className="mt-10 text-sm text-blue-200 font-medium">
                        الإصدار 1.0.0 • حجم الملف: ~50 MB • آخر تحديث: يناير 2026
                    </p>

                    <div className="mt-12 flex items-center justify-center gap-8 text-white/80">
                        <div className="flex items-center gap-2">
                            <CheckCircle className="w-5 h-5" />
                            <span className="text-sm">تثبيت سهل</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle className="w-5 h-5" />
                            <span className="text-sm">تحديثات مجانية</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle className="w-5 h-5" />
                            <span className="text-sm">دعم فني</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-slate-200 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 text-white flex items-center justify-center">
                                <Package className="w-5 h-5" />
                            </div>
                            <div>
                                <div className="font-bold text-slate-900">Inventory Pro</div>
                                <div className="text-xs text-slate-500">نظام إدارة المخزون</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-6 text-sm text-slate-500">
                            <Link href="/" className="hover:text-slate-900 transition">الرئيسية</Link>
                            <a href="#features" className="hover:text-slate-900 transition">المميزات</a>
                            <a href="#download" className="hover:text-slate-900 transition">التحميل</a>
                            <a href="mailto:support@inventorypro.com" className="hover:text-slate-900 transition">الدعم الفني</a>
                        </div>
                    </div>

                    <div className="mt-8 pt-8 border-t border-slate-100 text-center">
                        <p className="text-sm text-slate-500">
                            © {new Date().getFullYear()} Inventory Pro. جميع الحقوق محفوظة.
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
