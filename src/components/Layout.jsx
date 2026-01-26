import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="bg-[#1e3a5f] text-white py-6">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-sm text-white/70">
            &copy; {new Date().getFullYear()} Académie Soummam Basketball. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  )
}
