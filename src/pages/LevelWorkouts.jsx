import { useParams, Link, Navigate } from 'react-router-dom'
import workoutA from '../data/junior/workout-a.json'
import workoutB from '../data/junior/workout-b.json'
import workoutC from '../data/junior/workout-c.json'
import workoutLegs from '../data/junior/workout-legs.json'

const workoutsByLevel = {
  junior: [workoutA, workoutB, workoutC, workoutLegs],
}

const levelLabels = {
  junior: 'Junior',
  cadet: 'Cadet',
  minime: 'Minime',
  senior: 'Senior',
}

const dayLabels = {
  samedi: 'Samedi',
  dimanche: 'Dimanche',
}

export default function LevelWorkouts() {
  const { level, day } = useParams()

  // Redirect if level is not available
  if (!workoutsByLevel[level]) {
    return <Navigate to="/entrainements" replace />
  }

  // Filter workouts by day
  const allWorkouts = workoutsByLevel[level]
  const workouts = day ? allWorkouts.filter(w => w.jour === day) : allWorkouts

  return (
    <div className="py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <Link to="/entrainements" className="text-[#1e3a5f] hover:underline">
            Entraînements
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-600">{levelLabels[level]}</span>
          {day && (
            <>
              <span className="mx-2 text-gray-400">/</span>
              <span className="text-gray-600">{dayLabels[day]}</span>
            </>
          )}
        </nav>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {levelLabels[level]} {day && `- ${dayLabels[day]}`}
        </h1>
        <p className="text-gray-600 mb-8">
          {day
            ? `Programmes d'entraînement du ${dayLabels[day].toLowerCase()} pour la catégorie ${levelLabels[level]}.`
            : `Programmes d'entraînement disponibles pour la catégorie ${levelLabels[level]}.`
          }
        </p>

        <div className="space-y-4">
          {workouts.map((workout) => (
            <Link
              key={workout.id}
              to={`/entrainements/${level}/${workout.jour}/${workout.id}`}
              className="block bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className={`inline-block px-2 py-1 rounded text-xs font-medium mb-2 ${
                    workout.jour === 'samedi'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-green-100 text-green-700'
                  }`}>
                    {workout.jour === 'samedi' ? 'Samedi - Fondamentaux' : 'Dimanche - Physique'}
                  </span>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {workout.titre}
                  </h2>
                  <p className="text-gray-600 mt-1">{workout.theme}</p>
                </div>
                <svg
                  className="w-6 h-6 text-gray-400 flex-shrink-0 mt-1"
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
          ))}
        </div>
      </div>
    </div>
  )
}
