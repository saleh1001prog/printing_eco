'use client'

export default function ScreenshotGallery({ screenshots }: { screenshots: any[] }) {
    return (
        <section id="screenshots" className="py-10 sm:py-12 bg-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="mb-8 text-center">
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900">لقطات الشاشة</h2>
                    <p className="text-slate-600 mt-2">استعرض واجهة البرنامج ومميزاته</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {screenshots.map((screenshot: any, index: number) => (
                        <div key={index} className="group relative overflow-hidden rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300">
                            <div className="aspect-video overflow-hidden bg-slate-100 relative">
                                <img
                                    src={screenshot.url}
                                    alt={screenshot.title || `لقطة شاشة ${index + 1}`}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                {/* View Button Overlay */}
                                <button
                                    onClick={() => {
                                        const modal = document.getElementById(`modal-${index}`) as HTMLDialogElement
                                        modal?.showModal()
                                    }}
                                    className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                                >
                                    <span className="px-6 py-3 bg-white text-slate-900 rounded-lg font-medium shadow-lg hover:bg-blue-600 hover:text-white transition-colors">
                                        عرض كامل
                                    </span>
                                </button>
                            </div>
                            {(screenshot.title || screenshot.category) && (
                                <div className="p-4 bg-white">
                                    {screenshot.title && (
                                        <h3 className="font-medium text-slate-900">{screenshot.title}</h3>
                                    )}
                                    {screenshot.category && (
                                        <span className="inline-block mt-2 px-2 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-medium">
                                            {screenshot.category}
                                        </span>
                                    )}
                                </div>
                            )}
                            
                            {/* Full Screen Modal */}
                            <dialog id={`modal-${index}`} className="backdrop:bg-black/90 bg-transparent max-w-full max-h-full p-0 m-0">
                                <div className="relative w-screen h-screen flex items-center justify-center p-4">
                                    <button
                                        onClick={() => {
                                            const modal = document.getElementById(`modal-${index}`) as HTMLDialogElement
                                            modal?.close()
                                        }}
                                        className="absolute top-4 right-4 z-50 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-colors"
                                        aria-label="إغلاق"
                                    >
                                        <svg className="w-6 h-6 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                    <img
                                        src={screenshot.url}
                                        alt={screenshot.title || `لقطة شاشة ${index + 1}`}
                                        className="max-w-full max-h-full object-contain rounded-lg shadow-2xl cursor-pointer"
                                        onClick={() => {
                                            const modal = document.getElementById(`modal-${index}`) as HTMLDialogElement
                                            modal?.close()
                                        }}
                                    />
                                    {screenshot.title && (
                                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/95 px-6 py-3 rounded-lg shadow-lg">
                                            <p className="text-slate-900 font-medium text-center">{screenshot.title}</p>
                                        </div>
                                    )}
                                </div>
                            </dialog>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
