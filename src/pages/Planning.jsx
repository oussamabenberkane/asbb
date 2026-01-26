import { useState } from 'react'
import { Link } from 'react-router-dom'
import schedule from '../data/schedule.json'

const levels = [
  { id: 'minime', label: 'Minime', available: false },
  { id: 'cadet', label: 'Cadet', available: false },
  { id: 'junior', label: 'Junior', available: true },
  { id: 'senior', label: 'Senior', available: false },
]

export default function Planning() {
  const [expandedLevel, setExpandedLevel] = useState(null)

  const toggleLevel = (levelId, available) => {
    if (!available) return
    setExpandedLevel(expandedLevel === levelId ? null : levelId)
  }

  return (
    <div className="py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Planning</h1>
        <p className="text-gray-600 mb-8">
          Retrouvez le planning hebdomadaire par catégorie.
        </p>

        <div className="space-y-3">
          {levels.map((level) => (
            <div
              key={level.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              {/* Level Header */}
              <button
                onClick={() => toggleLevel(level.id, level.available)}
                className={`w-full px-6 py-4 flex items-center justify-between transition-colors ${
                  level.available
                    ? 'hover:bg-gray-50 cursor-pointer'
                    : 'cursor-not-allowed bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <h2 className={`text-xl font-semibold ${
                    level.available ? 'text-gray-900' : 'text-gray-400'
                  }`}>
                    {level.label}
                  </h2>
                  {!level.available && (
                    <span className="bg-orange-100 text-orange-600 text-xs font-medium px-2 py-1 rounded">
                      Bientôt
                    </span>
                  )}
                </div>
                {level.available ? (
                  <svg
                    className={`w-5 h-5 text-gray-400 transition-transform ${
                      expandedLevel === level.id ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5 text-gray-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                )}
              </button>

              {/* Schedule Content (Collapsible) */}
              {expandedLevel === level.id && level.available && schedule[level.id] && (
                <div className="border-t border-gray-100 p-6 bg-gray-50">
                  {/* Samedi */}
                  {schedule[level.id].samedi && (
                    <div className="mb-6">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                          Samedi
                        </span>
                        <span className="text-gray-600">{schedule[level.id].samedi.horaire}</span>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        {schedule[level.id].samedi.type}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">
                        {schedule[level.id].samedi.note}
                      </p>
                      <div className="bg-white rounded-lg p-4 border border-gray-200">
                        <p className="text-sm text-gray-500 mb-3">Rotation des séances :</p>
                        <div className="space-y-2">
                          {schedule[level.id].samedi.rotation.map((item) => (
                            <Link
                              key={item.workout}
                              to={`/entrainements/${level.id}/samedi/${item.workout}`}
                              className="flex items-center justify-between p-2 rounded hover:bg-gray-50 transition-colors"
                            >
                              <span>
                                <span className="text-gray-500 mr-2">Semaine {item.semaine}:</span>
                                <span className="text-gray-900">{item.titre}</span>
                              </span>
                              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Dimanche */}
                  {schedule[level.id].dimanche && (
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                          Dimanche
                        </span>
                        <span className="text-gray-600">{schedule[level.id].dimanche.horaire}</span>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        {schedule[level.id].dimanche.type}
                      </h3>
                      <Link
                        to={`/entrainements/${level.id}/dimanche/${schedule[level.id].dimanche.workout}`}
                        className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                      >
                        <span className="text-gray-900">{schedule[level.id].dimanche.titre}</span>
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
