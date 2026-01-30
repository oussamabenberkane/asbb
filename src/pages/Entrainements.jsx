import { useState } from 'react'
import { Link } from 'react-router-dom'
import schedule from '../data/schedule.json'

const levels = [
  { id: 'minime', label: 'Minime', available: false },
  { id: 'cadet', label: 'Cadet', available: false },
  { id: 'junior', label: 'Junior', available: true },
  { id: 'senior', label: 'Senior', available: false },
]

export default function Entrainements() {
  const [expandedLevel, setExpandedLevel] = useState(null)

  const toggleLevel = (levelId, available) => {
    if (!available) return
    setExpandedLevel(expandedLevel === levelId ? null : levelId)
  }

  return (
    <div className="py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Entraînements</h1>
        <p className="text-gray-600 mb-8">
          Sélectionnez votre catégorie pour voir le planning et les programmes.
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
                {level.available && (
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
                )}
                {!level.available && (
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

              {/* Schedule & Workouts (Collapsible Content) */}
              {expandedLevel === level.id && level.available && schedule[level.id] && (
                <div className="border-t border-gray-100 px-6 py-5 bg-gray-50">
                  <div className="space-y-4">
                    {/* Samedi */}
                    {schedule[level.id].samedi && (
                      <Link
                        to={`/entrainements/${level.id}/samedi`}
                        className="block p-4 rounded-lg border-2 bg-blue-50 border-blue-200 hover:border-blue-400 hover:shadow-md transition-all"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
                                SAMEDI
                              </span>
                              <span className="text-blue-700 font-semibold">
                                {schedule[level.id].samedi.horaire}
                              </span>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">
                              {schedule[level.id].samedi.type}
                            </h3>
                            {schedule[level.id].samedi.note && (
                              <p className="text-sm text-gray-600 mt-1">
                                {schedule[level.id].samedi.note}
                              </p>
                            )}
                            {schedule[level.id].samedi.titre && (
                              <p className="text-sm text-gray-600 mt-1">
                                {schedule[level.id].samedi.titre}
                              </p>
                            )}
                            {schedule[level.id].samedi.rotation && (
                              <div className="flex flex-wrap gap-2 mt-3">
                                {schedule[level.id].samedi.rotation.map((item, i) => (
                                  <span key={i} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                                    S{item.semaine}: {item.titre}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                          <svg
                            className="w-5 h-5 text-blue-400 ml-4 mt-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </div>
                      </Link>
                    )}

                    {/* Dimanche */}
                    {schedule[level.id].dimanche && (
                      <Link
                        to={`/entrainements/${level.id}/dimanche`}
                        className="block p-4 rounded-lg border-2 bg-green-50 border-green-200 hover:border-green-400 hover:shadow-md transition-all"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded">
                                DIMANCHE
                              </span>
                              <span className="text-green-700 font-semibold">
                                {schedule[level.id].dimanche.horaire}
                              </span>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">
                              {schedule[level.id].dimanche.type}
                            </h3>
                            {schedule[level.id].dimanche.titre && (
                              <p className="text-sm text-gray-600 mt-1">
                                {schedule[level.id].dimanche.titre}
                              </p>
                            )}
                            {schedule[level.id].dimanche.note && (
                              <p className="text-sm text-gray-600 mt-1">
                                {schedule[level.id].dimanche.note}
                              </p>
                            )}
                            {schedule[level.id].dimanche.rotation && (
                              <div className="flex flex-wrap gap-2 mt-3">
                                {schedule[level.id].dimanche.rotation.map((item, i) => (
                                  <span key={i} className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                                    S{item.semaine}: {item.titre}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                          <svg
                            className="w-5 h-5 text-green-400 ml-4 mt-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </div>
                      </Link>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
