import { useState, useEffect, useCallback, useRef } from 'react'
import announcements from '../data/announcements.json'

export default function Annonces() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [overflows, setOverflows] = useState(false)
  const cardRef = useRef(null)
  const touchStart = useRef(null)
  const touchDelta = useRef(0)
  const total = announcements.length

  const goTo = useCallback((index, dir) => {
    if (isAnimating || index === current) return
    setDirection(dir)
    setIsAnimating(true)
    setTimeout(() => {
      setCurrent(index)
      setTimeout(() => setIsAnimating(false), 50)
    }, 300)
  }, [isAnimating, current])

  const next = useCallback(() => {
    goTo((current + 1) % total, 1)
  }, [current, total, goTo])

  const prev = useCallback(() => {
    goTo((current - 1 + total) % total, -1)
  }, [current, total, goTo])

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [next, prev])

  // Measure card height vs viewport
  useEffect(() => {
    const measure = () => {
      if (cardRef.current) {
        const headerHeight = 120 // approximate header height
        const availableHeight = window.innerHeight - headerHeight
        setOverflows(cardRef.current.scrollHeight > availableHeight)
      }
    }
    // Measure after render settles
    const timer = setTimeout(measure, 100)
    window.addEventListener('resize', measure)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', measure)
    }
  }, [current, isAnimating])

  // Touch handlers
  const onTouchStart = (e) => {
    touchStart.current = e.touches[0].clientX
    touchDelta.current = 0
  }

  const onTouchMove = (e) => {
    if (touchStart.current === null) return
    touchDelta.current = e.touches[0].clientX - touchStart.current
  }

  const onTouchEnd = () => {
    if (touchStart.current === null) return
    const threshold = 50
    if (touchDelta.current < -threshold) next()
    else if (touchDelta.current > threshold) prev()
    touchStart.current = null
    touchDelta.current = 0
  }

  const announcement = announcements[current]

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#1e3a5f] to-[#2d5a87] py-10 px-4">
        <div className="max-w-5xl mx-auto flex items-end justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Annonces</h1>
            <p className="text-white/60">
              Les dernières actualités de l'académie.
            </p>
          </div>
          {total > 1 && (
            <div className="text-white/40 text-sm font-mono hidden sm:block">
              <span className="text-white font-bold text-lg">{String(current + 1).padStart(2, '0')}</span>
              <span className="mx-1">/</span>
              <span>{String(total).padStart(2, '0')}</span>
            </div>
          )}
        </div>
      </div>

      {/* Carousel */}
      <div
        className={`max-w-5xl mx-auto px-4 pb-12 transition-all duration-300 ${overflows ? '-mt-6' : 'mt-6'}`}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {announcements.length > 0 ? (
          <div>
            {/* Main card */}
            <div
              ref={cardRef}
              className={`bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 ${
                isAnimating
                  ? `opacity-0 ${direction > 0 ? 'translate-x-8' : '-translate-x-8'}`
                  : 'opacity-100 translate-x-0'
              }`}
            >
              {announcement.image ? (
                <div className="md:grid md:grid-cols-5">
                  {/* Image — left */}
                  <div className="relative md:col-span-2">
                    <img
                      src={announcement.image}
                      alt={announcement.titre}
                      className="w-full h-full object-contain md:object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent md:hidden" />
                    <div className="absolute top-0 right-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent hidden md:block" />
                  </div>

                  {/* Content — right */}
                  <div className="md:col-span-3 p-6 md:p-8 flex flex-col justify-center -mt-8 relative z-10 md:mt-0">
                    <div className="flex items-center gap-3 mb-4">
                      {announcement.important && (
                        <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                          Important
                        </span>
                      )}
                      <span className="text-gray-400 text-sm">
                        {formatDate(announcement.date)}
                      </span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-5 leading-tight">
                      {announcement.titre}
                    </h2>
                    <div className="text-gray-600 whitespace-pre-line leading-relaxed text-[15px] bg-gray-50 rounded-xl p-5 border border-gray-100">
                      {announcement.contenu}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-6 md:p-10">
                  <div className="flex items-center gap-3 mb-4">
                    {announcement.important && (
                      <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                        Important
                      </span>
                    )}
                    <span className="text-gray-400 text-sm">
                      {formatDate(announcement.date)}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                    {announcement.titre}
                  </h2>
                  <p className="text-gray-600 whitespace-pre-line leading-relaxed text-[15px] max-w-2xl">
                    {announcement.contenu}
                  </p>
                </div>
              )}
            </div>

            {/* Navigation */}
            {total > 1 && (
              <div className="flex items-center justify-between mt-6">
                <button
                  onClick={prev}
                  className="group flex items-center gap-2 text-gray-500 hover:text-[#1e3a5f] transition-colors"
                >
                  <div className="w-10 h-10 rounded-full border-2 border-gray-200 group-hover:border-[#1e3a5f] flex items-center justify-center transition-all group-hover:bg-[#1e3a5f]/5">
                    <svg className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium hidden sm:inline">Précédent</span>
                </button>

                <div className="flex items-center gap-2">
                  {announcements.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goTo(i, i > current ? 1 : -1)}
                      className={`rounded-full transition-all duration-300 ${
                        i === current
                          ? 'w-8 h-2.5 bg-orange-500'
                          : 'w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={next}
                  className="group flex items-center gap-2 text-gray-500 hover:text-[#1e3a5f] transition-colors"
                >
                  <span className="text-sm font-medium hidden sm:inline">Suivant</span>
                  <div className="w-10 h-10 rounded-full border-2 border-gray-200 group-hover:border-[#1e3a5f] flex items-center justify-center transition-all group-hover:bg-[#1e3a5f]/5">
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <p className="text-gray-400 text-lg">Aucune annonce pour le moment.</p>
          </div>
        )}
      </div>
    </div>
  )
}

function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
