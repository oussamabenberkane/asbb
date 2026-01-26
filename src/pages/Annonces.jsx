import announcements from '../data/announcements.json'

export default function Annonces() {
  return (
    <div className="py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Annonces</h1>
        <p className="text-gray-600 mb-8">
          Les dernières actualités de l'académie.
        </p>

        <div className="space-y-4">
          {announcements.map((announcement) => (
            <article
              key={announcement.id}
              className={`bg-white rounded-lg shadow-md p-6 ${
                announcement.important ? 'border-l-4 border-orange-500' : ''
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <h2 className="text-xl font-semibold text-gray-900">
                  {announcement.titre}
                </h2>
                {announcement.important && (
                  <span className="bg-orange-100 text-orange-700 text-xs font-medium px-2 py-1 rounded">
                    Important
                  </span>
                )}
              </div>
              <p className="text-gray-500 text-sm mb-3">
                {formatDate(announcement.date)}
              </p>
              <p className="text-gray-600">{announcement.contenu}</p>
            </article>
          ))}
        </div>

        {announcements.length === 0 && (
          <div className="text-center py-12">
            <svg className="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <p className="text-gray-500">Aucune annonce pour le moment.</p>
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
