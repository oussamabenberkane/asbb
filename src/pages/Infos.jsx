import coaches from '../data/coaches.json'

export default function Infos() {
  return (
    <div className="py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Informations</h1>
        <p className="text-gray-600 mb-8">
          Tout ce que vous devez savoir sur l'Académie Soummam Basketball.
        </p>

        {/* Philosophie */}
        <section className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="bg-[#1e3a5f]/10 rounded-full p-2">
              <svg className="w-5 h-5 text-[#1e3a5f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </span>
            Notre Philosophie
          </h2>
          <div className="text-gray-600 space-y-4">
            <p>
              À l'Académie Soummam Basketball, nous croyons que le basketball est plus qu'un sport.
              C'est une école de vie qui enseigne la discipline, le travail d'équipe et la persévérance.
            </p>
            <div className="grid sm:grid-cols-3 gap-4 mt-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-1">Les fondamentaux</h4>
                <p className="text-sm">Maîtriser les bases pour construire un jeu solide</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-1">La répétition intelligente</h4>
                <p className="text-sm">Progresser par la pratique régulière avec qualité</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-1">Le développement global</h4>
                <p className="text-sm">Former des joueurs complets, techniquement et physiquement</p>
              </div>
            </div>
          </div>
        </section>

        {/* Nos Coachs */}
        <section className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="bg-[#1e3a5f]/10 rounded-full p-2">
              <svg className="w-5 h-5 text-[#1e3a5f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </span>
            Nos Coachs
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {coaches.map((coach) => (
              <div key={coach.id} className="text-center">
                <div className="w-24 h-24 mx-auto mb-3 rounded-full bg-gray-200 overflow-hidden">
                  <img
                    src={`/coachs/${coach.photo}`}
                    alt={coach.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none'
                    }}
                  />
                </div>
                <h3 className="font-semibold text-gray-900">{coach.name}</h3>
                <p className="text-[#1e3a5f] text-sm font-medium">{coach.role}</p>
                <p className="text-gray-600 text-sm mt-1">{coach.bio}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Localisation */}
        <section className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="bg-[#1e3a5f]/10 rounded-full p-2">
              <svg className="w-5 h-5 text-[#1e3a5f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </span>
            Localisation
          </h2>
          <div className="flex items-start gap-4 mb-4">
            <div>
              <h3 className="font-semibold text-gray-900">Maison de Jeunes d'Akbou</h3>
              <p className="text-gray-600">Abderahmane Farès</p>
              <p className="text-gray-600">Akbou, Algérie</p>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3208.9780944768318!2d4.52344897613178!3d36.45808567234666!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128cfd3f165a0489%3A0x75264e4b5bb9bb6c!2sAkbou&#39;s%20Youth%20Center%2C%20Abderahmane%20Far%C3%A8s!5e0!3m2!1sen!2sdz!4v1769413666187!5m2!1sen!2sdz"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localisation ASBB"
            ></iframe>
          </div>
        </section>

        {/* Contact */}
        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="bg-[#1e3a5f]/10 rounded-full p-2">
              <svg className="w-5 h-5 text-[#1e3a5f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </span>
            Contact
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {/* Phone */}
            <a
              href="tel:+213549697533"
              className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="bg-[#1e3a5f] rounded-full p-3">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <p className="text-gray-500 text-xs">Téléphone</p>
                <p className="text-gray-900 font-medium">+213 549 697 533</p>
              </div>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/asbaskettball"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 rounded-full p-3">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </div>
              <div>
                <p className="text-gray-500 text-xs">Instagram</p>
                <p className="text-gray-900 font-medium">@asbaskettball</p>
              </div>
            </a>

            {/* Facebook */}
            <a
              href="https://www.facebook.com/profile.php?id=61585695802767"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="bg-[#1877f2] rounded-full p-3">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </div>
              <div>
                <p className="text-gray-500 text-xs">Facebook</p>
                <p className="text-gray-900 font-medium">Académie Soummam Basketball</p>
              </div>
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}
