import { useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import workoutA from '../data/junior/workout-a.json'
import workoutB from '../data/junior/workout-b.json'
import workoutC from '../data/junior/workout-c.json'
import workoutLegs from '../data/junior/workout-legs.json'
import workoutHome from '../data/junior/workout-home.json'
import VideoModal from '../components/VideoModal'

const workoutsData = {
  junior: {
    samedi: {
      'workout-legs': workoutLegs,
    },
    dimanche: {
      'workout-a': workoutA,
      'workout-b': workoutB,
      'workout-c': workoutC,
    },
  },
}

const levelLabels = {
  junior: 'Junior',
}

const dayLabels = {
  samedi: { label: 'Samedi', subtitle: 'Préparation Physique', color: 'blue' },
  dimanche: { label: 'Dimanche', subtitle: 'Fondamentaux', color: 'green' },
}

export default function WorkoutDetail() {
  const { level, day, workoutId } = useParams()
  const [mode, setMode] = useState('gym') // 'gym' or 'home'
  const [videoModal, setVideoModal] = useState({ isOpen: false, videoUrl: '', videoTitle: '' })

  const gymWorkout = workoutsData[level]?.[day]?.[workoutId]
  const isPhysicalLegsWorkout = workoutId === 'workout-legs'

  // Use home workout data when in home mode and viewing workout-legs
  const workout = isPhysicalLegsWorkout && mode === 'home' ? workoutHome : gymWorkout

  if (!gymWorkout) {
    return <Navigate to="/entrainements" replace />
  }

  const dayInfo = dayLabels[day]
  const isPhysicalWorkout = day === 'dimanche'

  const openVideoModal = (videoUrl, videoTitle) => {
    setVideoModal({ isOpen: true, videoUrl, videoTitle })
  }

  const closeVideoModal = () => {
    setVideoModal({ isOpen: false, videoUrl: '', videoTitle: '' })
  }

  return (
    <div className="py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm">
          <Link to="/entrainements" className="text-[#1e3a5f] hover:underline">
            Entraînements
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link to={`/entrainements/${level}/${day}`} className="text-[#1e3a5f] hover:underline">
            {levelLabels[level]} - {dayInfo.label}
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-600">{workout.titre}</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-3 ${
            isPhysicalWorkout
              ? 'bg-green-100 text-green-700'
              : 'bg-blue-100 text-blue-700'
          }`}>
            {dayInfo.label} - {dayInfo.subtitle}
          </span>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {workout.titre}
          </h1>
          <p className="text-xl text-gray-600">{workout.theme}</p>
          {workout.coach && (
            <p className="text-gray-500 mt-2">Coach: {workout.coach}</p>
          )}
        </div>

        {/* Mode Toggle - Only show for workout-legs */}
        {isPhysicalLegsWorkout && (
          <div className="mb-8">
            <div className="inline-flex rounded-lg bg-gray-100 p-1">
              <button
                onClick={() => setMode('gym')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  mode === 'gym'
                    ? 'bg-[#1e3a5f] text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  Salle
                </span>
              </button>
              <button
                onClick={() => setMode('home')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  mode === 'home'
                    ? 'bg-orange-500 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Maison
                </span>
              </button>
            </div>
            {mode === 'home' && (
              <p className="mt-3 text-sm text-orange-600 flex items-center gap-2">
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="hidden sm:inline">Cliquez sur un exercice pour voir le tutoriel vidéo</span>
                <span className="sm:hidden">Touchez un exercice pour voir le tutoriel</span>
              </p>
            )}
          </div>
        )}

        {/* Objectifs */}
        {workout.objectifs && (
          <Section title="Objectifs">
            <ul className="space-y-2">
              {workout.objectifs.map((obj, i) => (
                <li key={i} className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {/* Échauffement (for physical workouts) */}
        {workout.echauffement && (
          <Section title="Échauffement" subtitle={workout.echauffement.duree}>
            <p className="text-gray-600 mb-4">{workout.echauffement.description}</p>
            <ul className="grid sm:grid-cols-2 gap-2">
              {workout.echauffement.exercices.map((ex, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                  {ex}
                </li>
              ))}
            </ul>
          </Section>
        )}

        {/* Contenu Principal (for technical workouts) */}
        {workout.contenu && (
          <Section title="Contenu Principal">
            <ul className="space-y-3">
              {workout.contenu.map((item, i) => (
                <li key={i} className="flex items-start gap-3 bg-gray-50 p-3 rounded-lg">
                  <span className="bg-[#1e3a5f] text-white text-sm w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">
                    {i + 1}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {/* Exercices (for physical workouts) */}
        {workout.exercices && (
          <Section title="Exercices">
            <div className="space-y-4">
              {workout.exercices.map((ex, i) => {
                const hasVideo = mode === 'home' && ex.videoUrl
                const CardWrapper = hasVideo ? 'button' : 'div'

                return (
                  <CardWrapper
                    key={i}
                    onClick={hasVideo ? () => openVideoModal(ex.videoUrl, ex.videoTitle) : undefined}
                    className={`bg-gray-50 p-4 rounded-lg w-full text-left ${
                      hasVideo
                        ? 'cursor-pointer hover:bg-gray-100 hover:shadow-md transition-all border-2 border-transparent hover:border-orange-300 active:border-orange-400 active:bg-orange-50 group'
                        : ''
                    }`}
                  >
                    {/* Mobile: Stack vertically, Desktop: Row layout */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                      <div className="flex items-center gap-3">
                        {hasVideo && (
                          <span className="shrink-0 w-10 h-10 sm:w-10 sm:h-10 bg-orange-500 rounded-full flex items-center justify-center group-hover:bg-orange-600 group-active:bg-orange-700 transition-colors">
                            <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </span>
                        )}
                        <h4 className="font-semibold text-gray-900">{ex.nom}</h4>
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        <span className="bg-[#1e3a5f] text-white text-sm px-2 py-1 rounded">
                          {ex.series}
                        </span>
                        {ex.repos && (
                          <span className="bg-gray-200 text-gray-700 text-sm px-2 py-1 rounded">
                            Repos: {ex.repos}
                          </span>
                        )}
                      </div>
                    </div>
                    <p className={`text-gray-600 ${hasVideo ? 'sm:pl-13' : ''}`}>{ex.description}</p>
                    {ex.accent && (
                      <p className={`text-orange-600 text-sm mt-2 italic ${hasVideo ? 'sm:pl-13' : ''}`}>
                        {ex.accent}
                      </p>
                    )}
                    {hasVideo && (
                      <p className="text-sm text-[#1e3a5f] mt-3 sm:pl-13 flex items-center gap-1.5 font-medium">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Voir le tutoriel
                      </p>
                    )}
                  </CardWrapper>
                )
              })}
            </div>
          </Section>
        )}

        {/* Gainage (for physical workouts) */}
        {workout.gainage && (
          <Section title="Gainage / Stabilité">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold text-gray-900">{workout.gainage.exercice}</h4>
                <span className="bg-[#1e3a5f] text-white text-sm px-2 py-1 rounded">
                  {workout.gainage.series}
                </span>
              </div>
              <p className="text-gray-600">{workout.gainage.description}</p>
              {workout.gainage.accent && (
                <p className="text-orange-600 text-sm mt-2 italic">
                  {workout.gainage.accent}
                </p>
              )}
            </div>
          </Section>
        )}

        {/* Points Clés */}
        {workout.pointsCles && (
          <Section title="Points Clés">
            <ul className="space-y-2">
              {workout.pointsCles.map((point, i) => (
                <li key={i} className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {/* Résultat */}
        {workout.resultat && (
          <Section title="Résultat Recherché">
            <p className="text-lg text-gray-700 bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
              {workout.resultat}
            </p>
          </Section>
        )}

        {/* Notes */}
        {workout.notes && (
          <Section title="Notes du Coach">
            <ul className="space-y-2">
              {workout.notes.map((note, i) => (
                <li key={i} className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#1e3a5f] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </Section>
        )}
      </div>

      {/* Video Modal */}
      <VideoModal
        isOpen={videoModal.isOpen}
        onClose={closeVideoModal}
        videoUrl={videoModal.videoUrl}
        videoTitle={videoModal.videoTitle}
      />
    </div>
  )
}

function Section({ title, subtitle, children }) {
  return (
    <section className="mb-8">
      <div className="flex items-baseline gap-3 mb-4">
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        {subtitle && <span className="text-gray-500 text-sm">({subtitle})</span>}
      </div>
      {children}
    </section>
  )
}
