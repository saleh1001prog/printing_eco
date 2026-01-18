'use client'

import { useState, useMemo } from 'react'
import { ChevronRight, ChevronLeft, Monitor, Maximize2, X } from 'lucide-react'

interface Screenshot {
    url: string
    title: string
    category?: string
    description?: string
}

interface ScreenshotsSliderProps {
    screenshots: Screenshot[]
}

export default function ScreenshotsSlider({ screenshots }: ScreenshotsSliderProps) {
    const [selectedCategory, setSelectedCategory] = useState<string>('All')
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isFullscreen, setIsFullscreen] = useState(false)

    // Extract unique categories
    const categories = useMemo(() => {
        const cats = new Set(screenshots.map(s => s.category).filter(Boolean))
        return ['All', ...Array.from(cats)]
    }, [screenshots])

    // Filter screenshots based on category
    const filteredScreenshots = useMemo(() => {
        if (selectedCategory === 'All') return screenshots
        return screenshots.filter(s => s.category === selectedCategory)
    }, [screenshots, selectedCategory])

    // Reset index when category changes
    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category)
        setCurrentIndex(0)
    }

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % filteredScreenshots.length)
    }

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + filteredScreenshots.length) % filteredScreenshots.length)
    }

    if (!screenshots || screenshots.length === 0) return null

    const currentImage = filteredScreenshots[currentIndex]

    return (
        <div className="space-y-8">
            {/* Categories Tabs */}
            {categories.length > 1 && ( // Only show tabs if there are actual categories besides 'All' and undefined ones grouped
                <div className="flex flex-wrap items-center justify-center gap-3">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => handleCategoryChange(cat as string)}
                            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedCategory === cat
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 scale-105'
                                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                                }`}
                        >
                            {cat === 'All' ? 'الكل' : cat}
                        </button>
                    ))}
                </div>
            )}

            {/* Main Slider Area */}
            <div className="relative group">
                <div
                    className="relative aspect-video bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border-4 border-white cursor-pointer"
                    onClick={() => setIsFullscreen(true)}
                >
                    {/* Image */}
                    <img
                        src={currentImage.url}
                        alt={currentImage.title}
                        className="w-full h-full object-contain transition-transform duration-500"
                    />

                    {/* Overlay Info */}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 sm:p-8 pt-20">
                        <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{currentImage.title}</h3>
                        {currentImage.description && (
                            <p className="text-slate-300 text-sm sm:text-base max-w-2xl">{currentImage.description}</p>
                        )}
                    </div>

                    {/* Expand Button */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 bg-black/50 text-white rounded-lg hover:bg-black/70 backdrop-blur-sm">
                            <Maximize2 className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Navigation Arrows (Desktop) */}
                    {filteredScreenshots.length > 1 && (
                        <>
                            <button
                                onClick={(e) => { e.stopPropagation(); prevSlide() }}
                                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/10 transition-all opacity-0 group-hover:opacity-100 hover:scale-110"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </button>
                            <button
                                onClick={(e) => { e.stopPropagation(); nextSlide() }}
                                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/10 transition-all opacity-0 group-hover:opacity-100 hover:scale-110"
                            >
                                <ChevronRight className="w-6 h-6" />
                            </button>
                        </>
                    )}
                </div>

                {/* Navigation Dots */}
                <div className="flex justify-center gap-2 mt-4">
                    {filteredScreenshots.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentIndex(idx)}
                            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-blue-600 w-8' : 'bg-slate-300 hover:bg-blue-400'
                                }`}
                        />
                    ))}
                </div>
            </div>

            {/* Thumbnails Strip */}
            {filteredScreenshots.length > 1 && (
                <div className="flex gap-4 overflow-x-auto pb-4 px-2 snap-x">
                    {filteredScreenshots.map((screenshot, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentIndex(idx)}
                            className={`relative flex-shrink-0 w-32 sm:w-40 aspect-video rounded-xl overflow-hidden border-2 transition-all duration-300 snap-center ${idx === currentIndex
                                    ? 'border-blue-600 shadow-lg shadow-blue-500/20 scale-105'
                                    : 'border-slate-200 opacity-60 hover:opacity-100 hover:border-slate-300'
                                }`}
                        >
                            <img
                                src={screenshot.url}
                                alt={screenshot.title}
                                className="w-full h-full object-cover"
                            />
                        </button>
                    ))}
                </div>
            )}

            {/* Fullscreen Viewer Modal */}
            {isFullscreen && (
                <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4">
                    <button
                        onClick={() => setIsFullscreen(false)}
                        className="absolute top-6 right-6 p-2 text-white/70 hover:text-white bg-white/10 rounded-full hover:bg-white/20 transition"
                    >
                        <X className="w-8 h-8" />
                    </button>

                    <div className="relative w-full max-w-7xl h-full flex flex-col items-center justify-center">
                        <img
                            src={currentImage.url}
                            alt={currentImage.title}
                            className="max-h-[85vh] max-w-full object-contain rounded-lg shadow-2xl"
                        />
                        <div className="mt-6 text-center">
                            <h3 className="text-2xl font-bold text-white mb-2">{currentImage.title}</h3>
                            <p className="text-slate-400">{currentImage.description}</p>
                        </div>

                        {/* Navigation in Modal */}
                        <button
                            onClick={(e) => { e.stopPropagation(); prevSlide() }}
                            className="absolute left-4 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
                        >
                            <ChevronLeft className="w-8 h-8" />
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); nextSlide() }}
                            className="absolute right-4 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
                        >
                            <ChevronRight className="w-8 h-8" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
