'use client'

import { useState, useEffect } from 'react'
import {
  Shield,
  CheckCircle,
  XCircle,
  Clock,
  Trash2,
  RefreshCw,
  Monitor,
  User,
  Mail,
  Phone,
  Calendar,
  Key,
  AlertCircle,
  LogOut,
  AppWindow
} from 'lucide-react'
import { useSession, signIn, signOut } from "next-auth/react"

interface ActivationRequest {
  _id: string
  hardwareId: string
  machineName: string
  userName: string
  email?: string
  phone: string
  appName: string
  status: 'pending' | 'approved' | 'rejected'
  requestedAt: string
  approvedAt?: string
  rejectedAt?: string
  rejectionReason?: string
  notes?: string
}

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const [activations, setActivations] = useState<ActivationRequest[]>([])
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState<string>('all')
  const [error, setError] = useState<string | null>(null)
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  const fetchActivations = async () => {
    setLoading(true)
    setError(null)

    try {
      const statusParam = filter !== 'all' ? `?status=${filter}` : ''
      const res = await fetch(`/api/admin/activations${statusParam}`)

      if (res.status === 401) {
        setError('Unauthorized')
        return
      }

      const data = await res.json()

      if (data.success) {
        setActivations(data.activations)
      } else {
        setError(data.error)
      }
    } catch (err) {
      setError('Failed to fetch activations')
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async (id: string) => {
    setActionLoading(id)
    try {
      const res = await fetch(`/api/admin/activations/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'approved' }),
      })

      if (res.ok) {
        fetchActivations()
      }
    } catch (err) {
      setError('Failed to approve activation')
    } finally {
      setActionLoading(null)
    }
  }

  const handleReject = async (id: string) => {
    const reason = prompt('Enter rejection reason (optional):')
    setActionLoading(id)

    try {
      const res = await fetch(`/api/admin/activations/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'rejected', rejectionReason: reason }),
      })

      if (res.ok) {
        fetchActivations()
      }
    } catch (err) {
      setError('Failed to reject activation')
    } finally {
      setActionLoading(null)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this activation request?')) return

    setActionLoading(id)
    try {
      const res = await fetch(`/api/admin/activations/${id}`, {
        method: 'DELETE'
      })

      if (res.ok) {
        fetchActivations()
      }
    } catch (err) {
      setError('Failed to delete activation')
    } finally {
      setActionLoading(null)
    }
  }

  useEffect(() => {
    if (status === 'authenticated') {
      fetchActivations()
    }
  }, [status, filter])

  const handleLogout = () => {
    signOut()
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('ar-DZ', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <Clock className="w-3 h-3" />
            قيد الانتظار
          </span>
        )
      case 'approved':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3" />
            مفعّل
          </span>
        )
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <XCircle className="w-3 h-3" />
            مرفوض
          </span>
        )
      default:
        return null
    }
  }

  // Login Screen
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

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

  // Admin Dashboard
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
                <a
                  href="/admin"
                  className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg transition"
                >
                  طلبات التفعيل
                </a>
                <a
                  href="/admin/products"
                  className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                >
                  إدارة المنتجات
                </a>
                <a
                  href="/admin/settings"
                  className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                >
                  الإعدادات
                </a>
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-yellow-100 text-yellow-600 flex items-center justify-center">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">
                  {activations.filter(a => a.status === 'pending').length}
                </div>
                <div className="text-sm text-slate-500">قيد الانتظار</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-green-100 text-green-600 flex items-center justify-center">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">
                  {activations.filter(a => a.status === 'approved').length}
                </div>
                <div className="text-sm text-slate-500">مفعّل</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
                <XCircle className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">
                  {activations.filter(a => a.status === 'rejected').length}
                </div>
                <div className="text-sm text-slate-500">مرفوض</div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters & Actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 rounded-lg border border-slate-300 bg-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              <option value="all">جميع الطلبات</option>
              <option value="pending">قيد الانتظار</option>
              <option value="approved">مفعّل</option>
              <option value="rejected">مرفوض</option>
            </select>
          </div>

          <button
            onClick={fetchActivations}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition text-sm"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            تحديث
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-50 text-red-700 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            {error}
          </div>
        )}

        {/* Activations List */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <RefreshCw className="w-8 h-8 text-slate-400 animate-spin mx-auto mb-4" />
              <p className="text-slate-500">جاري التحميل...</p>
            </div>
          ) : activations.length === 0 ? (
            <div className="p-12 text-center">
              <Key className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500">لا توجد طلبات تفعيل</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {activations.map((activation) => (
                <div key={activation._id} className="p-6 hover:bg-slate-50 transition">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-3 flex-wrap">
                        {getStatusBadge(activation.status)}
                        {/* App Name Badge */}
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          <AppWindow className="w-3 h-3" />
                          {activation.appName || 'Unknown App'}
                        </span>
                        <span className="text-xs text-slate-400 font-mono">
                          {activation.hardwareId ? `${activation.hardwareId.substring(0, 20)}...` : 'N/A'}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
                        <div className="flex items-center gap-2 text-slate-600">
                          <Monitor className="w-4 h-4 text-slate-400" />
                          {activation.machineName}
                        </div>
                        <div className="flex items-center gap-2 text-slate-600">
                          <User className="w-4 h-4 text-slate-400" />
                          {activation.userName}
                        </div>
                        {activation.email && (
                          <div className="flex items-center gap-2 text-slate-600">
                            <Mail className="w-4 h-4 text-slate-400" />
                            {activation.email}
                          </div>
                        )}
                        <div className="flex items-center gap-2 text-slate-600">
                          <Phone className="w-4 h-4 text-slate-400" />
                          {activation.phone}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <Calendar className="w-3 h-3" />
                        طلب بتاريخ: {formatDate(activation.requestedAt)}
                        {activation.approvedAt && (
                          <span className="text-green-600">
                            • تم التفعيل: {formatDate(activation.approvedAt)}
                          </span>
                        )}
                        {activation.rejectedAt && (
                          <span className="text-red-600">
                            • تم الرفض: {formatDate(activation.rejectedAt)}
                          </span>
                        )}
                      </div>

                      {activation.rejectionReason && (
                        <div className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">
                          سبب الرفض: {activation.rejectionReason}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {activation.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleApprove(activation._id)}
                            disabled={actionLoading === activation._id}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition text-sm disabled:opacity-50"
                          >
                            <CheckCircle className="w-4 h-4" />
                            تفعيل
                          </button>
                          <button
                            onClick={() => handleReject(activation._id)}
                            disabled={actionLoading === activation._id}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition text-sm disabled:opacity-50"
                          >
                            <XCircle className="w-4 h-4" />
                            رفض
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => handleDelete(activation._id)}
                        disabled={actionLoading === activation._id}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-500 hover:bg-slate-100 transition text-sm disabled:opacity-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
