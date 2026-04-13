import { useState, useCallback, useEffect, useRef } from 'react'
import logo from '../assets/logo.jpg'

const NAVY = '#1a2744'
const GOLD = '#c8834b'

// ── Player Data (embedded from Google Sheet, April 2026) ──
const CATEGORIES = [
  {
    name: 'Benjamins',
    tag: 'U13',
    players: [
      { nom: 'Benamara', prenom: 'Rabia', dob: '12/07/2014', genre: 'M', tel: '' },
      { nom: 'Hamidouche', prenom: 'Ilyane', dob: '31/12/2015', genre: 'M', tel: '' },
      { nom: 'Oukil', prenom: 'Mohammed Idris', dob: '01/06/2017', genre: 'M', tel: '0552176557' },
      { nom: 'Mecheche', prenom: 'Alice', dob: '25/05/2019', genre: 'F', tel: '0777185745' },
      { nom: 'Haroun', prenom: 'Lilyane', dob: '03/12/2015', genre: 'F', tel: '' },
      { nom: 'Benberkane', prenom: 'Abdelkader', dob: '02/04/2012', genre: 'F', tel: '0773250912' },
      { nom: 'Takorabet', prenom: 'Ayoub', dob: '04/02/2016', genre: 'M', tel: '0540985975' },
      { nom: 'Teffah', prenom: 'Samy', dob: '25/11/2014', genre: 'M', tel: '0770825083' },
      { nom: 'Benberkane', prenom: 'Ayoub', dob: '30/10/2016', genre: 'M', tel: '0773250912' },
      { nom: 'Bellal', prenom: 'Amine', dob: '12/03/2018', genre: 'M', tel: '0556400834' },
    ],
  },
  {
    name: 'Minimes',
    tag: 'U15',
    players: [
      { nom: 'Gerouahen', prenom: 'Adem', dob: '02/05/2012', genre: 'M', tel: '' },
      { nom: 'Benberkane', prenom: 'Smail', dob: '14/09/2011', genre: 'M', tel: '' },
      { nom: 'Benbalagh', prenom: 'Khaled', dob: '13/10/2012', genre: 'M', tel: '' },
      { nom: 'Medjahed', prenom: 'Khalil', dob: '27/10/2012', genre: 'M', tel: '' },
      { nom: 'Baha', prenom: 'Ilyad', dob: '31/07/2013', genre: 'M', tel: '0771094854' },
      { nom: 'Oukil', prenom: 'Mohamed Adem Oualid', dob: '20/01/2013', genre: 'M', tel: '0770177763' },
      { nom: 'Ouartilane', prenom: 'Kamal', dob: '20/11/2013', genre: 'M', tel: '0770442558' },
      { nom: 'Ibelhoulen', prenom: 'Idir', dob: '21/11/2013', genre: 'M', tel: '0772940056' },
      { nom: 'Tabti', prenom: 'Mazigh', dob: '07/11/2012', genre: 'M', tel: '0775925487' },
      { nom: 'Boudraa', prenom: 'Dania', dob: '15/12/2013', genre: 'F', tel: '' },
      { nom: 'Ouartilane', prenom: 'Aghiles', dob: '20/02/2013', genre: 'M', tel: '0772639285' },
      { nom: 'Benkerrou', prenom: 'Ahcene', dob: '03/05/2012', genre: 'M', tel: '0799981802' },
      { nom: 'Bennouchen', prenom: 'Alicia', dob: '06/10/2012', genre: 'F', tel: '0657684308' },
    ],
  },
  {
    name: 'Cadets',
    tag: 'U17',
    players: [
      { nom: 'Aballeche', prenom: 'Axil', dob: '26/10/2011', genre: 'M', tel: '0771104587' },
      { nom: 'Haddad', prenom: 'Samy', dob: '17/11/2010', genre: 'M', tel: '0560093570' },
      { nom: 'Bendahmane', prenom: 'Youlidas', dob: '06/08/2011', genre: 'M', tel: '0773456552' },
      { nom: 'Bennouchen', prenom: 'Youran', dob: '30/07/2010', genre: 'M', tel: '' },
      { nom: 'Mansouri', prenom: 'Ahcen', dob: '08/05/2011', genre: 'M', tel: '0782971260' },
      { nom: 'Lahdir', prenom: 'Ikram', dob: '24/09/2009', genre: 'F', tel: '' },
      { nom: 'Benmedjkoune', prenom: 'Wassim', dob: '29/05/2010', genre: 'M', tel: '0541124164' },
    ],
  },
  {
    name: 'Juniors',
    tag: 'U20',
    players: [
      { nom: 'Zeboudj', prenom: 'Md Cherif', dob: '02/11/2009', genre: 'M', tel: '0799212797' },
      { nom: 'Chettouh', prenom: 'Selma', dob: '25/03/2007', genre: 'F', tel: '0656013968' },
      { nom: 'Ait Ouali', prenom: 'Malika', dob: '08/12/2008', genre: 'F', tel: '0696598075' },
      { nom: 'Ouazan', prenom: 'Mayssa', dob: '18/11/2006', genre: 'F', tel: '0778807505' },
      { nom: 'Bossekine', prenom: 'Amine', dob: '15/02/2008', genre: 'M', tel: '0791003906' },
      { nom: 'Hamiche', prenom: 'Md Tahar', dob: '08/05/2007', genre: 'M', tel: '0699133041' },
      { nom: 'Benabbas', prenom: 'Md Islam', dob: '13/08/2008', genre: 'M', tel: '0796387664' },
      { nom: 'Ait Hadji', prenom: 'Arcel', dob: '04/06/2008', genre: 'M', tel: '0773591340' },
      { nom: 'Bibi', prenom: 'Racim', dob: '03/06/2008', genre: 'M', tel: '0795184100' },
      { nom: 'Cherdouh', prenom: 'Arezki', dob: '12/09/2006', genre: 'M', tel: '0540257028' },
      { nom: 'Bendiab', prenom: 'Merzouk', dob: '28/11/2006', genre: 'M', tel: '0699891372' },
      { nom: 'Laradi', prenom: 'Sidali', dob: '24/10/2006', genre: 'M', tel: '0542267493' },
    ],
  },
  {
    name: 'Seniors',
    tag: 'Senior',
    players: [
      { nom: 'Amarkhodja', prenom: 'Farhat', dob: '29/07/1999', genre: 'M', tel: '' },
      { nom: 'Benberkane', prenom: 'Oussama', dob: '25/05/2000', genre: 'M', tel: '0549697533' },
      { nom: 'Tizzaoui', prenom: 'Amar', dob: '02/04/2000', genre: 'M', tel: '0541353422' },
      { nom: 'Mazouzi', prenom: 'Yanis', dob: '29/01/2000', genre: 'M', tel: '0791021308' },
    ],
  },
]

const TOTAL_PLAYERS = CATEGORIES.reduce((sum, c) => sum + c.players.length, 0)
const TOTAL_M = CATEGORIES.reduce((sum, c) => sum + c.players.filter(p => p.genre === 'M').length, 0)
const TOTAL_F = TOTAL_PLAYERS - TOTAL_M

// ── Paginate into A4 pages ──
function paginate() {
  const FIRST_PAGE_ROWS = 26
  const NEXT_PAGE_ROWS = 38
  const pages = []
  let currentPage = []
  let rowsLeft = FIRST_PAGE_ROWS
  let globalNum = 1

  for (const cat of CATEGORIES) {
    if (rowsLeft < 3) {
      pages.push(currentPage)
      currentPage = []
      rowsLeft = NEXT_PAGE_ROWS
    }
    currentPage.push({ type: 'category-header', name: cat.name, tag: cat.tag, count: cat.players.length })
    rowsLeft -= 1

    for (const player of cat.players) {
      if (rowsLeft <= 0) {
        pages.push(currentPage)
        currentPage = []
        rowsLeft = NEXT_PAGE_ROWS
      }
      currentPage.push({ type: 'player', ...player, num: globalNum++, category: `${cat.name} (${cat.tag})` })
      rowsLeft--
    }
  }
  if (currentPage.length > 0) pages.push(currentPage)
  return pages
}

const ALL_PAGES = paginate()

/* ─── SVG Icons ─── */
function IconView() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

function IconPrint() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 6 2 18 2 18 9" />
      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
      <rect x="6" y="14" width="12" height="8" />
    </svg>
  )
}

function IconDownload() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  )
}

/* ─── Action Button ─── */
function ActionButton({ icon, label, onClick, href, color = NAVY }) {
  const [hovered, setHovered] = useState(false)
  const Tag = href ? 'a' : 'button'
  const extraProps = href ? { href, download: true } : { onClick }
  return (
    <Tag
      {...extraProps}
      className="action-btn"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      title={label}
      style={{
        display: 'flex', alignItems: 'center', gap: '5px',
        background: hovered ? color : 'white',
        color: hovered ? 'white' : color,
        border: `1.5px solid ${color}33`,
        padding: '5px 12px',
        fontFamily: "'Oswald', sans-serif",
        fontSize: '7.5pt', fontWeight: 500, letterSpacing: '0.5px',
        cursor: 'pointer', borderRadius: '4px',
        transition: 'all 0.15s ease',
        textTransform: 'uppercase', textDecoration: 'none',
      }}
    >
      {icon}
      <span>{label}</span>
    </Tag>
  )
}

/* ─── Summary Bar ─── */
function SummaryBar() {
  return (
    <div style={{
      margin: '5mm 10mm 3mm', padding: '10px 16px',
      background: `${NAVY}08`, borderRadius: '6px',
      borderLeft: `4px solid ${GOLD}`,
    }}>
      <div style={{
        display: 'flex', flexWrap: 'wrap', alignItems: 'center',
        gap: '8px 20px', fontFamily: "'Oswald', sans-serif", fontSize: '8pt', color: NAVY,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontWeight: 400, letterSpacing: '1px', textTransform: 'uppercase', color: `${NAVY}88` }}>Total Joueurs</span>
          <span style={{ background: NAVY, color: 'white', padding: '2px 12px', borderRadius: '10px', fontWeight: 700, fontSize: '9pt' }}>{TOTAL_PLAYERS}</span>
        </div>
        <span style={{ color: '#ccc' }}>|</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '7.5pt' }}>
          <span style={{ letterSpacing: '0.5px' }}>Masculin <strong>{TOTAL_M}</strong></span>
          <span style={{ color: '#ccc' }}>•</span>
          <span style={{ letterSpacing: '0.5px' }}>Féminin <strong>{TOTAL_F}</strong></span>
        </div>
      </div>
      <div style={{
        marginTop: '6px', display: 'flex', flexWrap: 'wrap', alignItems: 'center',
        gap: '4px', fontFamily: "'Oswald', sans-serif", fontSize: '7.5pt', color: `${NAVY}cc`,
      }}>
        {CATEGORIES.map((c, i) => (
          <span key={c.name} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            {i > 0 && <span style={{ color: '#ccc', margin: '0 6px' }}>|</span>}
            <span style={{ fontWeight: 600, color: NAVY }}>{c.name}</span>
            <span style={{ background: `${NAVY}12`, padding: '1px 8px', borderRadius: '10px', fontSize: '7.5pt', fontWeight: 600, color: NAVY }}>{c.players.length}</span>
          </span>
        ))}
      </div>
    </div>
  )
}

/* ─── Table Head ─── */
function TableHead() {
  const thStyle = {
    padding: '6px 10px', fontFamily: "'Oswald', sans-serif",
    fontSize: '7.5pt', fontWeight: 600, letterSpacing: '1.5px',
    textTransform: 'uppercase', color: GOLD, borderBottom: `2px solid ${NAVY}22`,
  }
  return (
    <thead>
      <tr style={{ background: `${NAVY}06` }}>
        <th style={{ ...thStyle, textAlign: 'center', width: '32px' }}>#</th>
        <th style={{ ...thStyle, textAlign: 'left' }}>Nom</th>
        <th style={{ ...thStyle, textAlign: 'left' }}>Prénom</th>
        <th style={{ ...thStyle, textAlign: 'center' }}>Date de Naissance</th>
      </tr>
    </thead>
  )
}

/* ─── Page Content ─── */
function PageContent({ items, pageNum, totalPages, isFirst }) {
  let playerIndex = 0
  return (
    <div style={{
      width: '100%', height: '100%', position: 'relative', overflow: 'hidden',
      fontFamily: "'Oswald', sans-serif",
    }}>
      {/* Header (first page only) */}
      {isFirst && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: '16px',
          padding: '8mm 10mm 5mm', borderBottom: `3px solid ${NAVY}`,
        }}>
          <img src={logo} alt="ASBB Logo" style={{
            width: '58px', height: '58px', borderRadius: '50%',
            border: `2.5px solid ${GOLD}88`, flexShrink: 0,
          }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              fontSize: '16pt', fontWeight: 700, letterSpacing: '3px',
              color: NAVY, textTransform: 'uppercase', lineHeight: 1.1,
            }}>LISTE DES JOUEURS — ASBB</div>
            <div style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: '9pt', color: `${NAVY}99`, letterSpacing: '1.5px', marginTop: '2px',
            }}>Académie Soummam Basketball — Akbou</div>
            <div style={{
              display: 'flex', gap: '16px', marginTop: '3px',
              fontSize: '7pt', color: GOLD, letterSpacing: '1px',
              textTransform: 'uppercase', fontWeight: 500,
            }}>
              <span>Saison 2025–2026</span>
            </div>
          </div>
        </div>
      )}

      {/* Summary (first page only) */}
      {isFirst && <SummaryBar />}

      {/* Table */}
      <div style={{ padding: `${isFirst ? '2mm' : '6mm'} 10mm 14mm` }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'auto' }}>
          <TableHead />
          <tbody>
            {items.map((item, i) => {
              if (item.type === 'category-header') {
                playerIndex = 0
                return (
                  <tr key={`cat-${item.name}`}>
                    <td colSpan={4} style={{ padding: '8px 0 0' }}>
                      <div style={{
                        background: NAVY, color: 'white', padding: '6px 14px',
                        fontSize: '9.5pt', fontWeight: 600, letterSpacing: '2px',
                        textTransform: 'uppercase',
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      }}>
                        <span>{item.name} — {item.tag}</span>
                        <span style={{ fontSize: '7.5pt', fontWeight: 400, opacity: 0.7, letterSpacing: '1px' }}>
                          {item.count} joueur{item.count > 1 ? 's' : ''}
                        </span>
                      </div>
                    </td>
                  </tr>
                )
              }
              const isEven = playerIndex++ % 2 === 0
              const cellStyle = {
                padding: '5px 10px', fontSize: '8.5pt', color: NAVY,
                borderBottom: `1px solid ${NAVY}0a`, fontWeight: 400,
              }
              return (
                <tr key={`p-${item.num}`} style={{ background: isEven ? 'white' : '#f8f9fb' }}>
                  <td style={{ ...cellStyle, textAlign: 'center', fontWeight: 600, color: `${NAVY}88`, width: '32px' }}>{item.num}</td>
                  <td style={{ ...cellStyle, fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase' }}>{item.nom}</td>
                  <td style={cellStyle}>{item.prenom}</td>
                  <td style={{ ...cellStyle, textAlign: 'center', letterSpacing: '0.5px' }}>{item.dob}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '4mm 10mm', display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', borderTop: `1px solid ${NAVY}15`,
      }}>
        <div style={{ fontSize: '6pt', color: `${NAVY}55`, letterSpacing: '0.5px' }}>
          ACADÉMIE SOUMMAM BASKETBALL — AKBOU
        </div>
        <div style={{ fontSize: '7pt', color: `${NAVY}88`, fontWeight: 500, letterSpacing: '1px' }}>
          Page {pageNum} / {totalPages}
        </div>
      </div>
    </div>
  )
}

/* ─── Fullscreen Viewer (all pages, scrollable) ─── */
function FullscreenViewer({ open, pages, onClose }) {
  const [scale, setScale] = useState(1)

  useEffect(() => {
    if (!open) return
    const update = () => {
      const PAGE_W = 210 * 3.7795275591
      const vw = window.innerWidth * 0.92
      setScale(Math.min(1, vw / PAGE_W))
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [open])

  if (!open) return null

  const scaledW = 210 * 3.7795275591 * scale

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(0,0,0,0.85)',
        overflowY: 'auto', padding: '24px 0',
        cursor: 'zoom-out', backdropFilter: 'blur(4px)',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: `${scaledW}px`, margin: '0 auto',
          display: 'flex', flexDirection: 'column', gap: '16px',
          cursor: 'default', position: 'relative',
        }}
      >
        {pages.map((pageItems, i) => (
          <div key={i} style={{
            width: `${scaledW}px`,
            height: `${297 * 3.7795275591 * scale}px`,
            boxShadow: '0 10px 40px rgba(0,0,0,0.4)',
            borderRadius: '4px', overflow: 'hidden',
          }}>
            <div style={{
              width: '210mm', height: '297mm',
              transform: scale < 1 ? `scale(${scale})` : undefined,
              transformOrigin: 'top left', background: 'white',
            }}>
              <PageContent
                items={pageItems}
                pageNum={i + 1}
                totalPages={pages.length}
                isFirst={i === 0}
              />
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={(e) => { e.stopPropagation(); onClose() }}
        style={{
          position: 'fixed', top: '12px', right: '12px', zIndex: 10000,
          width: '36px', height: '36px', borderRadius: '50%',
          background: 'rgba(0,0,0,0.7)', color: 'white',
          border: '2px solid rgba(255,255,255,0.3)', fontSize: '16px',
          cursor: 'pointer', display: 'flex', alignItems: 'center',
          justifyContent: 'center', transition: 'background 0.2s',
        }}
        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.9)'}
        onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.7)'}
      >✕</button>
    </div>
  )
}

/* ─── Scaled Page (portrait A4) ─── */
function ScaledPage({ children }) {
  const containerRef = useRef(null)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const PAGE_WIDTH_PX = 210 * 3.7795275591
    const observer = new ResizeObserver(([entry]) => {
      const available = entry.contentRect.width
      setScale(Math.min(1, available / PAGE_WIDTH_PX))
    })
    observer.observe(container)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={containerRef} className="list-page-wrapper">
      <div style={{
        height: scale < 1 ? `${297 * scale * 3.7795275591}px` : undefined,
        overflow: 'hidden',
      }}>
        <div
          className="print-page list-print-page"
          style={{
            width: '210mm', height: '297mm',
            background: 'white',
            boxShadow: '0 2px 16px rgba(0,0,0,0.1)',
            overflow: 'hidden',
            borderRadius: scale < 1 ? `${4 / scale}px` : '4px',
            transform: scale < 1 ? `scale(${scale})` : undefined,
            transformOrigin: 'top left',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

/* ─── Password Gate ─── */
const LIST_AUTH_KEY = 'asbb_list_auth'

function isRemembered() {
  try {
    const stored = localStorage.getItem(LIST_AUTH_KEY)
    if (!stored) return false
    const expiry = JSON.parse(stored)
    return Date.now() < expiry
  } catch { return false }
}

function rememberAuth() {
  localStorage.setItem(LIST_AUTH_KEY, JSON.stringify(Date.now() + 24 * 60 * 60 * 1000))
}

function PasswordGate({ onUnlock }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    if (password === 'akbou.asbb') {
      rememberAuth()
      onUnlock()
    } else {
      setError(true)
    }
  }

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: `linear-gradient(135deg, ${NAVY} 0%, #2d4a6f 50%, ${NAVY} 100%)`,
      fontFamily: "'Oswald', sans-serif", padding: '20px',
    }}>
      <div style={{
        background: 'white', borderRadius: '12px', padding: '40px 36px',
        width: '100%', maxWidth: '380px', textAlign: 'center',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
      }}>
        <img src={logo} alt="ASBB" style={{
          width: '72px', height: '72px', borderRadius: '50%',
          border: `3px solid ${GOLD}66`, margin: '0 auto 16px',
          display: 'block',
        }} />
        <div style={{
          fontSize: '14pt', fontWeight: 700, letterSpacing: '3px',
          color: NAVY, textTransform: 'uppercase', marginBottom: '4px',
        }}>ASBB</div>
        <div style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: '10pt', color: `${NAVY}88`, marginBottom: '24px', fontStyle: 'italic',
        }}>Liste des Joueurs — Accès Restreint</div>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(false) }}
            placeholder="Mot de passe"
            autoFocus
            style={{
              width: '100%', padding: '12px 16px',
              border: `2px solid ${error ? '#ef4444' : `${NAVY}22`}`,
              borderRadius: '8px', fontSize: '10pt',
              fontFamily: "'Oswald', sans-serif",
              outline: 'none', transition: 'border-color 0.2s',
              background: error ? '#fef2f2' : 'white',
            }}
            onFocus={(e) => { if (!error) e.target.style.borderColor = GOLD }}
            onBlur={(e) => { if (!error) e.target.style.borderColor = `${NAVY}22` }}
          />
          {error && (
            <div style={{ color: '#ef4444', fontSize: '8pt', marginTop: '6px', letterSpacing: '0.5px' }}>
              Mot de passe incorrect.
            </div>
          )}
          <button type="submit" style={{
            width: '100%', marginTop: '16px', padding: '12px',
            background: NAVY, color: 'white', border: 'none',
            borderRadius: '8px', fontSize: '10pt', fontWeight: 600,
            letterSpacing: '2px', textTransform: 'uppercase',
            cursor: 'pointer', fontFamily: "'Oswald', sans-serif",
            transition: 'background 0.2s',
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = '#2d4a6f'}
          onMouseLeave={(e) => e.currentTarget.style.background = NAVY}
          >
            Accéder
          </button>
        </form>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════
   MAIN EXPORT
   ═══════════════════════════════════════ */
export default function ListPrint() {
  const [authenticated, setAuthenticated] = useState(isRemembered)
  const [viewerOpen, setViewerOpen] = useState(false)
  const pages = ALL_PAGES

  const handlePrintAll = useCallback(() => {
    window.print()
  }, [])

  if (!authenticated) {
    return <PasswordGate onUnlock={() => setAuthenticated(true)} />
  }

  return (
    <div style={{ background: '#E8ECF0', minHeight: '100vh' }}>
      <FullscreenViewer open={viewerOpen} pages={pages} onClose={() => setViewerOpen(false)} />

      {/* Header bar */}
      <div className="no-print list-header" style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: `linear-gradient(135deg, ${NAVY} 0%, #2d4a6f 100%)`,
        color: 'white', padding: '14px 24px',
        fontFamily: "'Oswald', sans-serif",
        boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
      }}>
        <div style={{
          maxWidth: '900px', margin: '0 auto',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: '12px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
            <img src={logo} alt="ASBB" style={{ width: 36, height: 36, borderRadius: '50%', flexShrink: 0 }} />
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: '14pt', fontWeight: 600, letterSpacing: '2px' }}>
                LISTE DES JOUEURS
              </div>
              <div style={{ fontSize: '8pt', opacity: 0.7, letterSpacing: '1px' }}>
                ASBB — {TOTAL_PLAYERS} JOUEURS — {pages.length} PAGES
              </div>
            </div>
          </div>
          <div className="list-card-actions" style={{ display: 'flex', gap: '6px' }}>
            <ActionButton
              icon={<IconView />}
              label="Voir"
              onClick={() => setViewerOpen(true)}
            />
            <ActionButton
              icon={<IconPrint />}
              label="Imprimer"
              onClick={handlePrintAll}
            />
            <ActionButton
              icon={<IconDownload />}
              label="PDF"
              href="/list-pdfs/liste-joueurs.pdf"
              color={GOLD}
            />
          </div>
        </div>
      </div>

      {/* Pages */}
      <div className="list-content" style={{
        maxWidth: '900px', margin: '0 auto',
        padding: '24px 24px 40px',
        display: 'flex', flexDirection: 'column', gap: '24px',
      }}>
        {pages.map((pageItems, i) => (
          <ScaledPage key={i}>
            <PageContent
              items={pageItems}
              pageNum={i + 1}
              totalPages={pages.length}
              isFirst={i === 0}
            />
          </ScaledPage>
        ))}
      </div>
    </div>
  )
}
