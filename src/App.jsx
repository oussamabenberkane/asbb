import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Accueil from './pages/Accueil'
import Entrainements from './pages/Entrainements'
import LevelWorkouts from './pages/LevelWorkouts'
import WorkoutDetail from './pages/WorkoutDetail'
import Infos from './pages/Infos'
import Annonces from './pages/Annonces'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Accueil />} />
        <Route path="entrainements" element={<Entrainements />} />
        <Route path="entrainements/:level/:day" element={<LevelWorkouts />} />
        <Route path="entrainements/:level/:day/:workoutId" element={<WorkoutDetail />} />
        <Route path="infos" element={<Infos />} />
        <Route path="annonces" element={<Annonces />} />
      </Route>
    </Routes>
  )
}
