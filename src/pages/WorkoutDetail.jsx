import { useParams, Link, Navigate } from 'react-router-dom'
import workoutA from '../data/junior/workout-a.json'
import workoutB from '../data/junior/workout-b.json'
import workoutC from '../data/junior/workout-c.json'
import workoutLegs from '../data/junior/workout-legs.json'

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

  const workout = workoutsData[level]?.[day]?.[workoutId]

  if (!workout) {
    return <Navigate to="/entrainements" replace />
  }

  const dayInfo = dayLabels[day]
  const isPhysicalWorkout = day === 'dimanche'

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
              {workout.exercices.map((ex, i) => (
                <div key={i} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">{ex.nom}</h4>
                    <div className="flex gap-2">
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
                  <p className="text-gray-600">{ex.description}</p>
                  {ex.accent && (
                    <p className="text-orange-600 text-sm mt-2 italic">
                      {ex.accent}
                    </p>
                  )}
                </div>
              ))}
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
