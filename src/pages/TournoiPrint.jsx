import { useState, useCallback, useEffect, useRef } from 'react'
import logo from '../assets/logo.jpg'

const NAVY = '#1e3a5f'
const NAVY_LIGHT = '#2d5a87'
const ORANGE = '#f97316'
const TOURNAMENT = 'ASBB Tournoi Ramadan 2026'

const CERTIFICATES = [
  {
    id: 'champion',
    title: 'CHAMPIONS',
    subtitle: '1ère Place',
    description: 'Pour avoir remporté le tournoi avec excellence et détermination.',
    accentColor: '#C9A84C',
    label: 'Équipe',
    icon: '🏆',
    pdfFile: 'certificat-champion.pdf',
  },
  {
    id: 'finaliste',
    title: 'FINALIST',
    subtitle: '2ème Place',
    description: 'Pour une performance remarquable et un parcours honorable tout au long du tournoi.',
    accentColor: '#8B95A3',
    label: 'Équipe',
    icon: '🥈',
    pdfFile: 'certificat-finalist.pdf',
  },
  {
    id: 'troisieme',
    title: 'THIRD PLACE',
    subtitle: '3ème Place',
    description: 'Pour un parcours méritoire et un esprit sportif exemplaire.',
    accentColor: '#B87333',
    label: 'Équipe',
    icon: '🥉',
    pdfFile: 'certificat-third.pdf',
  },
  {
    id: 'mvp',
    title: 'MVP',
    subtitle: 'Joueur Le Plus Précieux',
    description: 'Pour une performance exceptionnelle et un impact décisif sur le tournoi.',
    accentColor: ORANGE,
    label: 'Joueur',
    icon: '⭐',
    pdfFile: 'certificat-mvp.pdf',
  },
  {
    id: 'three-point',
    title: '3-POINT CONTEST CHAMPION',
    subtitle: 'Concours à 3 Points',
    description: "Pour avoir démontré une adresse remarquable derrière la ligne à trois points.",
    accentColor: ORANGE,
    label: 'Joueur',
    icon: '🎯',
    pdfFile: 'certificat-3pt.pdf',
  },
  {
    id: 'defensive',
    title: 'DPOT',
    subtitle: 'Meilleur Défenseur du Tournoi',
    description: "Pour une défense acharnée et un impact défensif exceptionnel tout au long du tournoi.",
    accentColor: ORANGE,
    label: 'Joueur',
    icon: '🛡️',
    pdfFile: 'certificat-dpot.pdf',
  },
]

const STAT_COLUMNS = [
  { key: 'num', label: '#', width: '10mm' },
  { key: 'joueur', label: 'JOUEUR', width: '58mm' },
  { key: 'pts', label: 'PTS', width: '40mm' },
  { key: 'reb', label: 'REB', width: '40mm' },
  { key: 'ast', label: 'AST', width: '40mm' },
  { key: 'stl', label: 'STL', width: '40mm' },
  { key: '3pm', label: '3PM', width: '40mm' },
]

const PLAYER_ROWS = 13

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

/* ─── Action button for document cards ─── */
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
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        background: hovered ? color : 'white',
        color: hovered ? 'white' : color,
        border: `1.5px solid ${color}33`,
        padding: '5px 12px',
        fontFamily: "'Oswald', sans-serif",
        fontSize: '7.5pt',
        fontWeight: 500,
        letterSpacing: '0.5px',
        cursor: 'pointer',
        borderRadius: '4px',
        transition: 'all 0.15s ease',
        textTransform: 'uppercase',
        textDecoration: 'none',
      }}
    >
      {icon}
      <span>{label}</span>
    </Tag>
  )
}

/* ─── Social footer strip ─── */
function SocialFooter({ color = NAVY, size = '7pt' }) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      gap: '28px',
      fontFamily: "'Oswald', sans-serif",
      fontSize: size,
      color,
      letterSpacing: '0.5px',
      opacity: 0.7,
    }}>
      <span>Instagram: @asbaskettball</span>
      <span>•</span>
      <span>Facebook: @Académie Soummam Basketball</span>
    </div>
  )
}

/* ═══════════════════════════════════════
   STAT SHEET
   ═══════════════════════════════════════ */
function StatSheet() {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: "'Oswald', sans-serif",
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.02,
        backgroundImage: `repeating-linear-gradient(45deg, ${NAVY} 0px, ${NAVY} 1px, transparent 1px, transparent 8px)`,
        pointerEvents: 'none',
      }} />

      <div style={{
        background: `linear-gradient(135deg, ${NAVY} 0%, ${NAVY_LIGHT} 100%)`,
        color: 'white', padding: '10px 16px 8px',
        display: 'flex', alignItems: 'center', gap: '14px',
        borderRadius: '4px 4px 0 0', position: 'relative',
      }}>
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '3px',
          background: `linear-gradient(90deg, ${ORANGE}, ${ORANGE}CC, ${ORANGE})`,
        }} />
        <img src={logo} alt="ASBB Logo" style={{ width: '48px', height: '48px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.3)' }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '18pt', fontWeight: 700, letterSpacing: '2px', lineHeight: 1.1 }}>
            {TOURNAMENT.toUpperCase()}
          </div>
          <div style={{ fontSize: '9pt', fontWeight: 400, opacity: 0.8, letterSpacing: '1px', marginTop: '2px' }}>
            FICHE DE STATISTIQUES
          </div>
        </div>
        <div style={{
          width: 40, height: 40, borderRadius: '50%',
          border: '2px solid rgba(255,255,255,0.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px',
        }}>🏀</div>
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        gap: '6px 24px', padding: '8px 16px',
        fontSize: '9pt', fontWeight: 500, color: NAVY,
        borderBottom: `1.5px solid ${NAVY}22`,
      }}>
        {['Équipe', 'Date', 'Adversaire', 'Lieu'].map(label => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', fontSize: '8pt' }}>{label} :</span>
            <div style={{ flex: 1, borderBottom: `1.5px solid ${NAVY}44`, minHeight: '16px' }} />
          </div>
        ))}
      </div>

      <div style={{ flex: 1, padding: '4px 0 0', display: 'flex', flexDirection: 'column' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed', flex: 1 }}>
          <colgroup>
            {STAT_COLUMNS.map(col => <col key={col.key} style={{ width: col.width }} />)}
          </colgroup>
          <thead>
            <tr>
              {STAT_COLUMNS.map(col => (
                <th key={col.key} style={{
                  background: NAVY, color: 'white',
                  padding: '5px 6px', fontSize: '8.5pt', fontWeight: 600,
                  letterSpacing: '1.5px',
                  textAlign: col.key === 'joueur' ? 'left' : 'center',
                  borderRight: col.key !== '3pm' ? '1px solid rgba(255,255,255,0.15)' : 'none',
                }}>{col.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: PLAYER_ROWS }, (_, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? 'white' : '#F4F7FA' }}>
                {STAT_COLUMNS.map(col => (
                  <td key={col.key} style={{
                    borderBottom: `1px solid ${NAVY}18`,
                    borderRight: `1px solid ${NAVY}12`,
                    padding: col.key === 'joueur' ? '2px 8px' : '2px 4px',
                    textAlign: col.key === 'joueur' || col.key === 'num' ? 'left' : 'center',
                    fontSize: '9pt',
                    height: `${Math.floor(128 / PLAYER_ROWS)}mm`,
                    verticalAlign: 'middle', color: NAVY,
                    fontWeight: col.key === 'num' ? 600 : 400,
                  }}>{col.key === 'num' ? i + 1 : ''}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{
        display: 'flex', borderTop: `2px solid ${NAVY}`,
        fontSize: '8pt', fontWeight: 600, color: NAVY, letterSpacing: '1px',
      }}>
        <div style={{ width: '10mm', padding: '4px', textAlign: 'center' }} />
        <div style={{ width: '58mm', padding: '4px 8px', textTransform: 'uppercase' }}>TOTAL ÉQUIPE</div>
        {STAT_COLUMNS.slice(2).map(col => (
          <div key={col.key} style={{
            width: col.width, padding: '4px', textAlign: 'center',
            borderLeft: `1px solid ${NAVY}18`, minHeight: '18px',
          }} />
        ))}
      </div>

      <div style={{
        padding: '6px 16px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        borderTop: `1px solid ${NAVY}15`,
      }}>
        <SocialFooter size="6.5pt" />
        <div style={{
          fontFamily: "'Oswald', sans-serif",
          fontSize: '6pt', color: NAVY, opacity: 0.4, letterSpacing: '0.5px',
        }}>ACADÉMIE SOUMMAM BASKETBALL — AKBOU</div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════
   CERTIFICATE — Bold sports poster style
   ═══════════════════════════════════════ */
function Certificate({ title, subtitle, description, accentColor, label }) {
  return (
    <div style={{
      width: '100%', height: '100%', position: 'relative', overflow: 'hidden',
      background: `linear-gradient(160deg, #050d1a 0%, #0c1f3d 30%, ${NAVY} 60%, ${NAVY_LIGHT} 100%)`,
      fontFamily: "'Oswald', sans-serif",
    }}>
      <div style={{
        position: 'absolute', top: '5%', left: '50%', transform: 'translateX(-50%)',
        width: '700px', height: '700px', borderRadius: '50%',
        background: `radial-gradient(circle, ${accentColor}25 0%, ${accentColor}08 40%, transparent 70%)`,
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)',
        width: '100%', height: '80%',
        background: `conic-gradient(from 0deg at 50% 20%, transparent 0deg, ${accentColor}06 10deg, transparent 20deg, transparent 40deg, ${accentColor}04 50deg, transparent 60deg, transparent 80deg, ${accentColor}06 90deg, transparent 100deg, transparent 160deg, ${accentColor}04 170deg, transparent 180deg, transparent 200deg, ${accentColor}06 210deg, transparent 220deg, transparent 280deg, ${accentColor}04 290deg, transparent 300deg, transparent 340deg, ${accentColor}06 350deg, transparent 360deg)`,
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', top: 0, right: '-5%', width: '35%', height: '100%',
        background: `linear-gradient(135deg, transparent 0%, ${accentColor}08 20%, ${accentColor}12 21%, transparent 22%, transparent 40%, ${accentColor}06 60%, ${accentColor}10 61%, transparent 62%)`,
        transform: 'skewX(-12deg)', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', top: 0, left: '-5%', width: '35%', height: '100%',
        background: `linear-gradient(225deg, transparent 0%, ${accentColor}06 30%, ${accentColor}10 31%, transparent 32%)`,
        transform: 'skewX(12deg)', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.06,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundSize: '150px 150px', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', inset: '4mm', border: `2px solid ${accentColor}44`,
        boxShadow: `inset 0 0 30px ${accentColor}08, 0 0 30px ${accentColor}08`,
        pointerEvents: 'none',
      }} />
      <div style={{ position: 'absolute', inset: '6mm', border: '0.5px solid rgba(255,255,255,0.06)', pointerEvents: 'none' }} />
      {[
        { top: '4mm', left: '4mm', borderTop: `4px solid ${accentColor}`, borderLeft: `4px solid ${accentColor}` },
        { top: '4mm', right: '4mm', borderTop: `4px solid ${accentColor}`, borderRight: `4px solid ${accentColor}` },
        { bottom: '4mm', left: '4mm', borderBottom: `4px solid ${accentColor}`, borderLeft: `4px solid ${accentColor}` },
        { bottom: '4mm', right: '4mm', borderBottom: `4px solid ${accentColor}`, borderRight: `4px solid ${accentColor}` },
      ].map((s, i) => (
        <div key={i} style={{ position: 'absolute', width: '22mm', height: '14mm', pointerEvents: 'none', ...s }} />
      ))}

      <div style={{
        position: 'relative', zIndex: 1,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', width: '100%', height: '100%', padding: '8mm 14mm',
      }}>
        <div style={{
          fontSize: '7.5pt', fontWeight: 500, letterSpacing: '6px',
          color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', marginBottom: '4px',
        }}>Académie Soummam Basketball — Akbou</div>

        <div style={{ position: 'relative', marginBottom: '6px' }}>
          <div style={{
            position: 'absolute', inset: '-20px', borderRadius: '50%',
            background: `radial-gradient(circle, ${accentColor}30 0%, transparent 70%)`,
            pointerEvents: 'none',
          }} />
          <img src={logo} alt="ASBB Logo" style={{
            width: '85px', height: '85px', borderRadius: '50%',
            border: `3px solid ${accentColor}88`,
            boxShadow: `0 0 40px ${accentColor}44, 0 0 80px ${accentColor}18`,
            position: 'relative',
          }} />
        </div>

        <div style={{
          fontSize: '12pt', fontWeight: 700, letterSpacing: '6px',
          color: 'rgba(255,255,255,0.85)', textTransform: 'uppercase', marginBottom: '4px',
        }}>TOURNOI RAMADAN 2026</div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px', width: '65%' }}>
          <div style={{ flex: 1, height: '1.5px', background: `linear-gradient(90deg, transparent, ${accentColor})` }} />
          <div style={{ width: 6, height: 6, background: accentColor, transform: 'rotate(45deg)', boxShadow: `0 0 8px ${accentColor}66` }} />
          <div style={{ width: 9, height: 9, border: `2px solid ${accentColor}`, transform: 'rotate(45deg)' }} />
          <div style={{ width: 6, height: 6, background: accentColor, transform: 'rotate(45deg)', boxShadow: `0 0 8px ${accentColor}66` }} />
          <div style={{ flex: 1, height: '1.5px', background: `linear-gradient(270deg, transparent, ${accentColor})` }} />
        </div>

        <div style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: '11pt', fontWeight: 600, letterSpacing: '5px',
          color: accentColor, textTransform: 'uppercase', marginBottom: '2px',
          textShadow: `0 0 20px ${accentColor}44`,
        }}>Certificat d'Honneur</div>

        <div style={{
          fontSize: title.length > 12 ? '28pt' : '40pt',
          fontWeight: 700, letterSpacing: '6px',
          color: 'white', textTransform: 'uppercase', lineHeight: 1.05,
          textShadow: `0 0 30px ${accentColor}55, 0 2px 20px ${accentColor}33, 0 0 60px rgba(0,0,0,0.4)`,
          marginBottom: '2px',
          WebkitTextStroke: title.length <= 12 ? `0.5px ${accentColor}44` : 'none',
        }}>{title}</div>

        <div style={{
          display: 'inline-block',
          background: `linear-gradient(135deg, ${accentColor}, ${accentColor}DD)`,
          color: 'white', padding: '6px 42px',
          fontSize: '11pt', fontWeight: 700, letterSpacing: '4px', textTransform: 'uppercase',
          marginBottom: '14px',
          boxShadow: `0 4px 20px ${accentColor}55, 0 0 40px ${accentColor}22`,
          clipPath: 'polygon(4% 0%, 96% 0%, 100% 50%, 96% 100%, 4% 100%, 0% 50%)',
        }}>{subtitle}</div>

        <div style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: '13pt', fontStyle: 'italic',
          color: 'rgba(255,255,255,0.7)', marginBottom: '4px',
        }}>Décerné à</div>

        <div style={{
          width: '60%', maxWidth: '160mm', height: '32px',
          borderBottom: `2.5px solid ${accentColor}88`,
          marginBottom: '4px', position: 'relative',
          boxShadow: `0 2px 10px ${accentColor}22`,
        }}>
          <span style={{
            position: 'absolute', right: 0, bottom: '6px',
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: '7pt', color: 'rgba(255,255,255,0.4)', fontStyle: 'italic',
          }}>({label})</span>
        </div>

        <div style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: '11pt', color: 'rgba(255,255,255,0.65)',
          maxWidth: '65%', lineHeight: 1.6, marginBottom: '12px', fontStyle: 'italic',
        }}>{description}</div>

        <div style={{ display: 'flex', justifyContent: 'space-between', width: '70%', marginTop: '2px' }}>
          {['Le Président', 'Date et Cachet'].map(text => (
            <div key={text} style={{ textAlign: 'center' }}>
              <div style={{ width: '48mm', borderBottom: '1px solid rgba(255,255,255,0.2)', height: '18px', marginBottom: '3px' }} />
              <div style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: '7pt', color: 'rgba(255,255,255,0.5)',
                letterSpacing: '1.5px', textTransform: 'uppercase',
              }}>{text}</div>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: '6px', display: 'flex', justifyContent: 'center', gap: '24px',
          fontSize: '6.5pt', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.5px',
        }}>
          <span>Instagram: @asbaskettball</span>
          <span>•</span>
          <span>Facebook: @Académie Soummam Basketball</span>
        </div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════
   FULLSCREEN VIEWER
   ═══════════════════════════════════════ */
function FullscreenViewer({ page, onClose }) {
  if (!page) return null
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(0,0,0,0.85)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'zoom-out', backdropFilter: 'blur(4px)',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '95vw', maxWidth: '1200px',
          maxHeight: '90vh',
          aspectRatio: '297 / 210',
          boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
          borderRadius: '4px', overflow: 'hidden',
          cursor: 'default', position: 'relative',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
          {page.component}
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); onClose() }}
          style={{
            position: 'absolute', top: '12px', right: '12px', zIndex: 10000,
            width: '36px', height: '36px', borderRadius: '50%',
            background: 'rgba(0,0,0,0.7)', color: 'white',
            border: '2px solid rgba(255,255,255,0.3)', fontSize: '18px', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background 0.2s',
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.9)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.7)'}
        >✕</button>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════ */
/* ─── Responsive page scaler ─── */
function ScaledPage({ children }) {
  const containerRef = useRef(null)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const PAGE_WIDTH_PX = 281 * 3.7795275591 // 281mm in px

    const observer = new ResizeObserver(([entry]) => {
      const availableWidth = entry.contentRect.width
      const newScale = Math.min(1, availableWidth / PAGE_WIDTH_PX)
      setScale(newScale)
    })

    observer.observe(container)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={containerRef} className="tournoi-page-wrapper">
      <div style={{
        height: scale < 1 ? `${194 * scale * 3.7795275591}px` : undefined,
        overflow: 'hidden',
      }}>
        <div
          className="print-page"
          style={{
            width: '281mm',
            height: '194mm',
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

export default function TournoiPrint() {
  const [hoveredBtn, setHoveredBtn] = useState(null)
  const [viewerPage, setViewerPage] = useState(null)

  const pages = [
    {
      id: 'stats',
      label: 'Fiche de Stats',
      component: <StatSheet />,
      pdfFile: 'fiche-stats.pdf',
    },
    ...CERTIFICATES.map(c => ({
      id: c.id,
      label: `${c.icon} ${c.title}`,
      component: <Certificate {...c} />,
      pdfFile: c.pdfFile,
    })),
  ]

  const handlePrintAll = () => window.print()

  const handlePrintSingle = useCallback((pageIndex) => {
    const allPages = document.querySelectorAll('.print-page')
    allPages.forEach((page, i) => {
      page.style.display = i === pageIndex ? '' : 'none'
    })
    window.print()
    setTimeout(() => {
      allPages.forEach(page => { page.style.display = '' })
    }, 500)
  }, [])

  return (
    <div style={{ background: '#E8ECF0', minHeight: '100vh' }}>
      <FullscreenViewer page={viewerPage} onClose={() => setViewerPage(null)} />

      <div className="no-print tournoi-header">
        <div style={{
          maxWidth: '1100px', margin: '0 auto',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: '12px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
            <img className="tournoi-header-logo" src={logo} alt="ASBB" style={{ width: 36, height: 36, borderRadius: '50%', flexShrink: 0 }} />
            <div style={{ minWidth: 0 }}>
              <div className="tournoi-header-title" style={{ fontSize: '14pt', fontWeight: 600, letterSpacing: '2px' }}>
                DOCUMENTS DU TOURNOI
              </div>
              <div className="tournoi-header-subtitle" style={{ fontSize: '8pt', opacity: 0.7, letterSpacing: '1px' }}>
                {TOURNAMENT.toUpperCase()} — {pages.length} PAGES
              </div>
            </div>
          </div>
          <button
            className="tournoi-print-all-btn"
            onClick={handlePrintAll}
            onMouseEnter={() => setHoveredBtn('all')}
            onMouseLeave={() => setHoveredBtn(null)}
            style={{
              background: hoveredBtn === 'all' ? ORANGE : 'white',
              color: hoveredBtn === 'all' ? 'white' : NAVY,
              border: 'none', padding: '8px 20px',
              fontFamily: "'Oswald', sans-serif",
              fontSize: '10pt', fontWeight: 600, letterSpacing: '1px',
              cursor: 'pointer', borderRadius: '3px', transition: 'all 0.2s',
              display: 'flex', alignItems: 'center', gap: '8px',
            }}
          ><IconPrint /> TOUT IMPRIMER</button>
        </div>
      </div>

      <div className="tournoi-content" style={{
        maxWidth: '1100px', margin: '0 auto',
        padding: '24px 24px 40px',
        display: 'flex', flexDirection: 'column', gap: '32px',
      }}>
        {pages.map((page, i) => (
          <div key={page.id}>
            <div className="no-print tournoi-card-header" style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              marginBottom: '8px', padding: '0 4px',
            }}>
              <div className="tournoi-card-label" style={{
                fontFamily: "'Oswald', sans-serif",
                fontSize: '10pt', fontWeight: 600, color: NAVY,
                letterSpacing: '1px', textTransform: 'uppercase',
                display: 'flex', alignItems: 'center', gap: '8px',
              }}>
                <span style={{
                  background: NAVY, color: 'white',
                  width: '22px', height: '22px', borderRadius: '4px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '8pt', fontWeight: 700, flexShrink: 0,
                }}>{i + 1}</span>
                {page.label}
              </div>

              <div className="tournoi-card-actions">
                <ActionButton
                  icon={<IconView />}
                  label="Voir"
                  onClick={() => setViewerPage(page)}
                />
                <ActionButton
                  icon={<IconPrint />}
                  label="Imprimer"
                  onClick={() => handlePrintSingle(i)}
                />
                <ActionButton
                  icon={<IconDownload />}
                  label="PDF"
                  href={`/tournoi-pdfs/${page.pdfFile}`}
                  color={ORANGE}
                />
              </div>
            </div>

            <ScaledPage>
              {page.component}
            </ScaledPage>
          </div>
        ))}
      </div>
    </div>
  )
}
