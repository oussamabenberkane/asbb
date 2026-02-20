import { Link } from 'react-router-dom'
import logo from '../assets/logo.jpg'
import announcements from '../data/announcements.json'

export default function Accueil() {
  const importantAnnouncements = announcements.filter(a => a.important)

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

      {/* Important Announcements */}
      {importantAnnouncements.length > 0 && (
        <section className="relative overflow-hidden bg-gradient-to-b from-[#0f1d2f] to-[#1e3a5f]">
          {/* Decorative background elements */}
          <div className="absolute inset-0 opacity-[0.04]" style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, #f97316 1px, transparent 1px), radial-gradient(circle at 80% 20%, #f97316 1px, transparent 1px)',
            backgroundSize: '60px 60px, 80px 80px'
          }} />
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent" />

          <div className="relative max-w-5xl mx-auto px-4 py-12 md:py-16">
            {importantAnnouncements.map((announcement) => (
              <div key={announcement.id}>
                {/* Section label */}
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                  <span className="text-orange-400 text-sm font-semibold tracking-widest uppercase">
                    Annonce importante
                  </span>
                  <div className="flex-1 h-px bg-gradient-to-r from-orange-500/30 to-transparent" />
                </div>

                {announcement.image ? (
                  /* Layout with image — side by side on desktop */
                  <div className="grid md:grid-cols-2 gap-8 items-start">
                    {/* Image */}
                    <div className="relative group">
                      <div className="absolute -inset-1 bg-gradient-to-br from-orange-500/20 to-orange-600/10 rounded-2xl blur-sm" />
                      <img
                        src={announcement.image}
                        alt={announcement.titre}
                        className="relative w-full rounded-2xl shadow-2xl shadow-black/30"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex flex-col justify-center">
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
                        {announcement.titre}
                      </h3>
                      <div className="text-gray-300 whitespace-pre-line text-[15px] leading-relaxed bg-white/5 rounded-xl p-5 border border-white/10 backdrop-blur-sm">
                        {announcement.contenu}
                      </div>
                      <Link
                        to="/annonces"
                        className="mt-6 inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 text-sm font-medium transition-colors group"
                      >
                        Voir toutes les annonces
                        <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                ) : (
                  /* Layout without image — centered */
                  <div className="max-w-2xl">
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
                      {announcement.titre}
                    </h3>
                    <p className="text-gray-300 whitespace-pre-line text-[15px] leading-relaxed">
                      {announcement.contenu}
                    </p>
                    <Link
                      to="/annonces"
                      className="mt-6 inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 text-sm font-medium transition-colors group"
                    >
                      Voir toutes les annonces
                      <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />
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
