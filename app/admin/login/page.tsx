'use client'

import { Suspense, useEffect } from 'react'
import { useSession, signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Shield } from 'lucide-react'

// Inner component that uses useSearchParams — must be inside <Suspense>
function AdminLoginContent() {
  const { status } = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()

  // If already authenticated, redirect to admin dashboard
  useEffect(() => {
    if (status === 'authenticated') {
      const callbackUrl = searchParams.get('callbackUrl') || '/admin'
      // Safety check: only allow relative URLs within this app
      const safeCallback = callbackUrl.startsWith('/') ? callbackUrl : '/admin'
      router.replace(safeCallback)
    }
  }, [status, router, searchParams])

  if (status === 'loading' || status === 'authenticated') {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  const error = searchParams.get('error')

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

          {/* Error message from NextAuth */}
          {error && (
            <div className="mb-6 p-3 rounded-lg bg-red-50 text-red-700 text-sm">
              {error === 'AccessDenied'
                ? 'غير مصرح لك بالدخول. يرجى استخدام البريد الإلكتروني الصحيح.'
                : 'حدث خطأ أثناء تسجيل الدخول. يرجى المحاولة مرة أخرى.'}
            </div>
          )}

          <button
            onClick={() => signIn('google', { callbackUrl: '/admin' })}
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

// Spinner shown while the inner component is loading
function LoginFallback() {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  )
}

// ✅ Default export wraps the content in Suspense as required by Next.js
export default function AdminLoginPage() {
  return (
    <Suspense fallback={<LoginFallback />}>
      <AdminLoginContent />
    </Suspense>
  )
}
