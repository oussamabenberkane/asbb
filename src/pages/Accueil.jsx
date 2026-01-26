import { Link } from 'react-router-dom'
import logo from '../assets/logo.jpg'
import announcements from '../data/announcements.json'

export default function Accueil() {
  const latestAnnouncement = announcements.find(a => a.important) || announcements[0]

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1e3a5f] to-[#2d5a87] text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <img
            src={logo}
            alt="ASBB Logo"
            className="w-32 h-32 mx-auto mb-6 rounded-full shadow-xl"
          />
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Académie Soummam Basketball
          </h1>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Former les joueurs de demain avec passion, discipline et excellence.
            Rejoignez notre académie et développez votre potentiel.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/entrainements"
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Voir les entraînements
            </Link>
            <Link
              to="/infos"
              className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg transition-colors border border-white/30"
            >
              À propos
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Announcement */}
      {latestAnnouncement && (
        <section className="py-8 px-4 bg-orange-50">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-orange-500">
              <div className="flex items-start gap-4">
                <div className="bg-orange-100 rounded-full p-2">
                  <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{latestAnnouncement.titre}</h3>
                  <p className="text-gray-600 mt-1">{latestAnnouncement.contenu}</p>
                  <Link to="/annonces" className="text-orange-500 hover:text-orange-600 text-sm mt-2 inline-block">
                    Voir toutes les annonces &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Quick Info Section */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Notre Approche
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="bg-[#1e3a5f]/10 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-[#1e3a5f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Fondamentaux</h3>
              <p className="text-gray-600 text-sm">
                Maîtriser les bases du basketball pour construire un jeu solide.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="bg-[#1e3a5f]/10 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-[#1e3a5f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Passion</h3>
              <p className="text-gray-600 text-sm">
                Aimer le jeu et progresser avec plaisir à chaque entraînement.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="bg-[#1e3a5f]/10 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-[#1e3a5f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Collectif</h3>
              <p className="text-gray-600 text-sm">
                Grandir ensemble et apprendre à jouer en équipe.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
