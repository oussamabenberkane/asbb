import { useEffect, useCallback } from 'react'

export default function VideoModal({ isOpen, onClose, videoUrl, videoTitle }) {
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      onClose()
    }
  }, [onClose])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      document.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, handleKeyDown])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 sm:bg-black/70 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-4xl bg-gray-900 rounded-lg shadow-2xl overflow-hidden z-10">
        {/* Header */}
        <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-700">
          <h2 id="video-modal-title" className="text-white font-semibold truncate pr-2 text-sm sm:text-base">
            {videoTitle || 'Tutoriel Vidéo'}
          </h2>
          {/* Close button - larger touch target on mobile */}
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white active:text-white transition-colors p-2 sm:p-1 -mr-1 rounded-lg hover:bg-gray-700 active:bg-gray-600"
            aria-label="Fermer la vidéo"
          >
            <svg className="w-6 h-6 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Video Container - 16:9 Aspect Ratio */}
        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
          <iframe
            className="absolute inset-0 w-full h-full"
            src={videoUrl}
            title={videoTitle || 'Tutoriel Vidéo'}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Footer - Different content for mobile vs desktop */}
        <div className="p-3 bg-gray-800 text-center">
          {/* Desktop: Show keyboard hint */}
          <p className="hidden sm:block text-gray-400 text-sm">
            Appuyez sur <kbd className="px-2 py-1 bg-gray-700 rounded text-gray-300 text-xs">Échap</kbd> ou cliquez à l'extérieur pour fermer
          </p>
          {/* Mobile: Show tap hint */}
          <p className="sm:hidden text-gray-400 text-sm">
            Touchez à l'extérieur ou le <span className="text-gray-300">✕</span> pour fermer
          </p>
        </div>
      </div>
    </div>
  )
}
