'use client'

import { useState, useEffect } from 'react'
import {
  Shield,
  Save,
  RefreshCw,
  Mail,
  Phone,
  Building2,
  Globe,
  CheckCircle,
  AlertCircle,
  LogOut,
  ArrowRight
} from 'lucide-react'
import { useSession, signIn, signOut } from "next-auth/react"
import Link from 'next/link'

interface Settings {
  email: string
  phone: string
  facebook?: string
  instagram?: string
  twitter?: string
  linkedin?: string
  companyName?: string
  companyNameAr?: string
  address?: string
  addressAr?: string
}

export default function SettingsPage() {
  const { data: session, status } = useSession()
  const [settings, setSettings] = useState<Settings>({
    email: '',
    phone: '',
    facebook: '',
    instagram: '',
    twitter: '',
    linkedin: '',
    companyName: '',
    companyNameAr: '',
    address: '',
    addressAr: '',
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  const fetchSettings = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/settings')
      const data = await res.json()

      if (data.success) {
        setSettings({
          email: data.settings.email || '',
          phone: data.settings.phone || '',
          facebook: data.settings.facebook || '',
          instagram: data.settings.instagram || '',
          twitter: data.settings.twitter || '',
          linkedin: data.settings.linkedin || '',
          companyName: data.settings.companyName || '',
          companyNameAr: data.settings.companyNameAr || '',
          address: data.settings.address || '',
          addressAr: data.settings.addressAr || '',
        })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'فشل في جلب الإعدادات' })
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    setMessage(null)

    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
      })

      const data = await res.json()

      if (data.success) {
        setMessage({ type: 'success', text: 'تم حفظ الإعدادات بنجاح' })
      } else {
        setMessage({ type: 'error', text: 'فشل في حفظ الإعدادات' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'حدث خطأ أثناء الحفظ' })
    } finally {
      setSaving(false)
    }
  }

  useEffect(() => {
    if (status === 'authenticated') {
      fetchSettings()
    }
  }, [status])

  const handleLogout = () => {
    signOut()
  }

  // Loading Screen
  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  // Login Screen
  if (status === 'unauthenticated') {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="mb-8">
              <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8" />
              </div>
              <h1 className="text-2xl font-bold text-slate-900">لوحة الإدارة</h1>
              <p className="text-slate-500 mt-2">يرجى تسجيل الدخول للمتابعة</p>
            </div>

            <button
              onClick={() => signIn('google')}
              className="w-full py-3 px-4 rounded-lg bg-white border-2 border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-slate-700 font-semibold transition flex items-center justify-center gap-3"
            >
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
              تسجيل الدخول عبر Google
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-100" dir="rtl">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-slate-900">لوحة الإدارة</h1>
                  <p className="text-xs text-slate-500">SOFTERA-DZ</p>
                </div>
              </div>

              {/* Navigation */}
              <nav className="hidden md:flex items-center gap-4">
                <Link
                  href="/admin"
                  className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                >
                  طلبات التفعيل
                </Link>
                <Link
                  href="/admin/products"
                  className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                >
                  إدارة المنتجات
                </Link>
                <Link
                  href="/admin/settings"
                  className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg transition"
                >
                  الإعدادات
                </Link>
              </nav>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:text-slate-900 transition"
            >
              <LogOut className="w-4 h-4" />
              تسجيل الخروج
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900">إعدادات الموقع</h2>
          <p className="text-slate-500 mt-1">قم بتعديل معلومات التواصل الخاصة بالموقع</p>
        </div>

        {/* Message */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg flex items-center gap-2 ${
            message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
          }`}>
            {message.type === 'success' ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <AlertCircle className="w-5 h-5" />
            )}
            {message.text}
          </div>
        )}

        {/* Settings Form */}
        <div className="space-y-6">
          {/* Contact Information */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
              <Mail className="w-5 h-5 text-blue-600" />
              معلومات التواصل
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  البريد الإلكتروني
                </label>
                <div className="relative">
                  <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="email"
                    value={settings.email}
                    onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                    className="w-full pr-10 pl-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    placeholder="info@example.com"
                    dir="ltr"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  رقم الهاتف
                </label>
                <div className="relative">
                  <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="tel"
                    value={settings.phone}
                    onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                    className="w-full pr-10 pl-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    placeholder="+213 XXX XXX XXX"
                    dir="ltr"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Company Information */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-blue-600" />
              معلومات الشركة
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  اسم الشركة (English)
                </label>
                <input
                  type="text"
                  value={settings.companyName}
                  onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="SOFTERA-DZ"
                  dir="ltr"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  اسم الشركة (عربي)
                </label>
                <input
                  type="text"
                  value={settings.companyNameAr}
                  onChange={(e) => setSettings({ ...settings, companyNameAr: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="حلول برمجية متكاملة"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  العنوان (عربي)
                </label>
                <input
                  type="text"
                  value={settings.addressAr}
                  onChange={(e) => setSettings({ ...settings, addressAr: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="الجزائر"
                />
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
              <Globe className="w-5 h-5 text-blue-600" />
              وسائل التواصل الاجتماعي
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Facebook
                </label>
                <input
                  type="url"
                  value={settings.facebook}
                  onChange={(e) => setSettings({ ...settings, facebook: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="https://facebook.com/..."
                  dir="ltr"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Instagram
                </label>
                <input
                  type="url"
                  value={settings.instagram}
                  onChange={(e) => setSettings({ ...settings, instagram: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="https://instagram.com/..."
                  dir="ltr"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Twitter / X
                </label>
                <input
                  type="url"
                  value={settings.twitter}
                  onChange={(e) => setSettings({ ...settings, twitter: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="https://twitter.com/..."
                  dir="ltr"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  LinkedIn
                </label>
                <input
                  type="url"
                  value={settings.linkedin}
                  onChange={(e) => setSettings({ ...settings, linkedin: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="https://linkedin.com/..."
                  dir="ltr"
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end gap-4">
            <button
              onClick={fetchSettings}
              disabled={loading}
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition font-medium"
            >
              <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
              إعادة تحميل
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition font-medium disabled:opacity-50"
            >
              <Save className={`w-5 h-5 ${saving ? 'animate-pulse' : ''}`} />
              {saving ? 'جاري الحفظ...' : 'حفظ الإعدادات'}
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
