import { useState, useCallback, useEffect, useRef } from 'react'
import logo from '../assets/logo.jpg'

const NAVY = '#1a2744'
const NAVY_LIGHT = '#2d4a6f'
const GOLD = '#c8834b'
const GOLD_LIGHT = '#d4a574'
const TOURNAMENT = 'ASBB Tournoi 3x3'

const CERTIFICATES = [
  {
    id: 'champion',
    title: '1ÈRE PLACE',
    subtitle: 'Champions du Tournoi',
    description: 'Pour avoir remporté le tournoi avec excellence et détermination.',
    accentColor: GOLD,
    label: 'Équipe',
    icon: '🏆',
    pdfFile: 'certificat-champion.pdf',
  },
  {
    id: 'finaliste',
    title: '2ÈME PLACE',
    subtitle: 'Finaliste du Tournoi',
    description: 'Pour une performance remarquable et un parcours honorable tout au long du tournoi.',
    accentColor: GOLD,
    label: 'Équipe',
    icon: '🥈',
    pdfFile: 'certificat-finalist.pdf',
  },
  {
    id: 'troisieme',
    title: '3ÈME PLACE',
    subtitle: 'Troisième du Tournoi',
    description: 'Pour un parcours méritoire et un esprit sportif exemplaire.',
    accentColor: GOLD,
    label: 'Équipe',
    icon: '🥉',
    pdfFile: 'certificat-third.pdf',
  },
  {
    id: 'mvp',
    title: 'MVP',
    subtitle: 'Joueur Le Plus Précieux',
    description: 'Pour une performance exceptionnelle et un impact décisif sur le tournoi.',
    accentColor: GOLD,
    label: 'Joueur',
    icon: '⭐',
    pdfFile: 'certificat-mvp.pdf',
  },
  {
    id: 'best-scorer',
    title: 'SCORING CHAMPION',
    subtitle: 'Meilleur Scoreur du Tournoi',
    description: "Pour avoir dominé le tableau des scores avec une efficacité remarquable tout au long du tournoi.",
    accentColor: GOLD,
    label: 'Joueur',
    icon: '🔥',
    pdfFile: 'certificat-best-scorer.pdf',
  },
  {
    id: 'defensive',
    title: 'DPOT',
    subtitle: 'Meilleur Défenseur du Tournoi',
    description: "Pour une défense acharnée et un impact défensif exceptionnel tout au long du tournoi.",
    accentColor: GOLD,
    label: 'Joueur',
    icon: '🛡️',
    pdfFile: 'certificat-dpot.pdf',
  },
  {
    id: '6th-man',
    title: '6TH MAN',
    subtitle: 'Meilleur Remplaçant du Tournoi',
    description: "Pour un impact décisif sorti du banc et une contribution essentielle à chaque entrée en jeu.",
    accentColor: GOLD,
    label: 'Joueur',
    icon: '💪',
    pdfFile: 'certificat-6th-man.pdf',
  },
]

const REMERCIEMENTS = [
  {
    id: 'remerciement-mdj',
    recipient: 'La Maison de Jeunes d\'Akbou',
    description: "Pour nous avoir ouvert vos portes dès le premier jour, quand personne d'autre ne l'a fait. Merci à Madame la directrice de la maison de jeunes et tout son effectif pour votre confiance et votre soutien indéfectible depuis la création du club.",
    icon: '🏛️',
    pdfFile: 'remerciement-mdj.pdf',
  },
  {
    id: 'remerciement-maire',
    recipient: 'Mr le Maire d\'Akbou, Mr Mouloud SALHI',
    description: "Pour votre soutien institutionnel et votre engagement envers la promotion du sport au sein de notre ville. Votre appui a été déterminant pour la réussite de cet événement.",
    icon: '🏅',
    pdfFile: 'remerciement-maire.pdf',
  },
  {
    id: 'remerciement-comite',
    recipient: 'Le Comité des Fêtes d\'Akbou',
    description: "Pour votre collaboration précieuse et votre contribution à l'organisation de cet événement sportif. Votre implication a permis d'offrir un tournoi mémorable à tous les participants.",
    icon: '🤝',
    pdfFile: 'remerciement-comite.pdf',
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

/* ─── Diamond ornament divider ─── */
function DiamondDivider({ color = GOLD, width = '60%' }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width, margin: '0 auto' }}>
      <div style={{ flex: 1, height: '1px', background: `linear-gradient(90deg, transparent, ${color})` }} />
      <div style={{ width: 5, height: 5, background: color, transform: 'rotate(45deg)', flexShrink: 0 }} />
      <div style={{ width: 8, height: 8, border: `1.5px solid ${color}`, transform: 'rotate(45deg)', flexShrink: 0 }} />
      <div style={{ width: 5, height: 5, background: color, transform: 'rotate(45deg)', flexShrink: 0 }} />
      <div style={{ flex: 1, height: '1px', background: `linear-gradient(270deg, transparent, ${color})` }} />
    </div>
  )
}

/* ─── Decorative corner brackets ─── */
function CornerBrackets({ color = GOLD, inset = '6mm', size = '18mm', thickness = '2.5px' }) {
  return [
    { top: inset, left: inset, borderTop: `${thickness} solid ${color}`, borderLeft: `${thickness} solid ${color}` },
    { top: inset, right: inset, borderTop: `${thickness} solid ${color}`, borderRight: `${thickness} solid ${color}` },
    { bottom: inset, left: inset, borderBottom: `${thickness} solid ${color}`, borderLeft: `${thickness} solid ${color}` },
    { bottom: inset, right: inset, borderBottom: `${thickness} solid ${color}`, borderRight: `${thickness} solid ${color}` },
  ].map((s, i) => (
    <div key={i} style={{ position: 'absolute', width: size, height: '12mm', pointerEvents: 'none', ...s }} />
  ))
}

/* ─── Seal / medallion SVG ─── */
function SealMedallion({ color = GOLD, size = 72 }) {
  const points = 24
  const outerR = size / 2
  const innerR = outerR * 0.78
  const pathD = Array.from({ length: points * 2 }, (_, i) => {
    const angle = (i * Math.PI) / points - Math.PI / 2
    const r = i % 2 === 0 ? outerR : innerR
    const x = outerR + r * Math.cos(angle)
    const y = outerR + r * Math.sin(angle)
    return `${i === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`
  }).join(' ') + 'Z'

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ overflow: 'visible' }}>
      <path d={pathD} fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <circle cx={outerR} cy={outerR} r={innerR * 0.85} fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      <circle cx={outerR} cy={outerR} r={innerR * 0.65} fill="none" stroke={color} strokeWidth="0.5" opacity="0.3" />
    </svg>
  )
}

/* ═══════════════════════════════════════
   STAT SHEET — Light redesign
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
      {/* Header bar */}
      <div style={{
        background: NAVY,
        color: 'white', padding: '10px 16px 8px',
        display: 'flex', alignItems: 'center', gap: '14px',
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '3px',
          background: `linear-gradient(90deg, ${GOLD}, ${GOLD_LIGHT}, ${GOLD})`,
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
          border: `2px solid ${GOLD}66`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px',
        }}>🏀</div>
      </div>

      {/* Info fields */}
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        gap: '6px 24px', padding: '8px 16px',
        fontSize: '9pt', fontWeight: 500, color: NAVY,
        borderBottom: `1.5px solid ${NAVY}18`,
      }}>
        {['Équipe', 'Date', 'Adversaire', 'Lieu'].map(label => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', fontSize: '8pt' }}>{label} :</span>
            <div style={{ flex: 1, borderBottom: `1.5px solid ${NAVY}33`, minHeight: '16px' }} />
          </div>
        ))}
      </div>

      {/* Table */}
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
              <tr key={i} style={{ background: i % 2 === 0 ? 'white' : '#f7f8fa' }}>
                {STAT_COLUMNS.map(col => (
                  <td key={col.key} style={{
                    borderBottom: `1px solid ${NAVY}12`,
                    borderRight: `1px solid ${NAVY}0a`,
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

      {/* Totals row */}
      <div style={{
        display: 'flex', borderTop: `2px solid ${NAVY}`,
        fontSize: '8pt', fontWeight: 600, color: NAVY, letterSpacing: '1px',
      }}>
        <div style={{ width: '10mm', padding: '4px', textAlign: 'center' }} />
        <div style={{ width: '58mm', padding: '4px 8px', textTransform: 'uppercase' }}>TOTAL ÉQUIPE</div>
        {STAT_COLUMNS.slice(2).map(col => (
          <div key={col.key} style={{
            width: col.width, padding: '4px', textAlign: 'center',
            borderLeft: `1px solid ${NAVY}12`, minHeight: '18px',
          }} />
        ))}
      </div>

      {/* Footer */}
      <div style={{
        padding: '6px 16px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        borderTop: `1px solid ${NAVY}10`,
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
   CERTIFICATE — Prestigious light design
   ═══════════════════════════════════════ */
function Certificate({ title, subtitle, description, accentColor, label }) {
  return (
    <div style={{
      width: '100%', height: '100%', position: 'relative', overflow: 'hidden',
      fontFamily: "'Oswald', sans-serif",
    }}>
      {/* Outer border — navy */}
      <div style={{
        position: 'absolute', inset: '4mm',
        border: `2px solid ${NAVY}20`,
        pointerEvents: 'none',
      }} />

      {/* Inner border — accent color */}
      <div style={{
        position: 'absolute', inset: '6mm',
        border: `1px solid ${accentColor}35`,
        pointerEvents: 'none',
      }} />

      {/* Corner ornaments */}
      <CornerBrackets color={accentColor} />

      {/* Seal watermark — bottom right */}
      <div style={{
        position: 'absolute', bottom: '12mm', right: '14mm',
        opacity: 0.12, pointerEvents: 'none',
      }}>
        <SealMedallion color={accentColor} size={90} />
      </div>

      {/* Seal watermark — top left (mirrored) */}
      <div style={{
        position: 'absolute', top: '12mm', left: '14mm',
        opacity: 0.08, pointerEvents: 'none',
      }}>
        <SealMedallion color={NAVY} size={60} />
      </div>

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 1,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', width: '100%', height: '100%', padding: '12mm 20mm',
      }}>
        {/* Academy name */}
        <div style={{
          fontSize: '7pt', fontWeight: 400, letterSpacing: '5px',
          color: `${NAVY}aa`, textTransform: 'uppercase', marginBottom: '10px',
        }}>Académie Soummam Basketball — Akbou</div>

        {/* Logo */}
        <div style={{ position: 'relative', marginBottom: '10px' }}>
          <img src={logo} alt="ASBB Logo" style={{
            width: '64px', height: '64px', borderRadius: '50%',
            border: `2px solid ${accentColor}77`,
            position: 'relative',
          }} />
        </div>

        {/* Tournament name */}
        <div style={{
          fontSize: '11pt', fontWeight: 600, letterSpacing: '5px',
          color: NAVY, textTransform: 'uppercase', marginBottom: '4px',
        }}>TOURNOI 3x3</div>

        <div style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: '8pt', fontWeight: 400, letterSpacing: '3px',
          color: `${NAVY}99`, textTransform: 'uppercase', marginBottom: '10px',
        }}>Mars 2026</div>

        {/* Diamond divider */}
        <div style={{ marginBottom: '12px', width: '100%' }}>
          <DiamondDivider color={accentColor} width="45%" />
        </div>

        {/* Certificate label */}
        <div style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: '10pt', fontWeight: 500, letterSpacing: '4px',
          color: accentColor, textTransform: 'uppercase', marginBottom: '8px',
        }}>Certificat d'Honneur</div>

        {/* Award title */}
        <div style={{
          fontSize: title.length > 12 ? '24pt' : '34pt',
          fontWeight: 600, letterSpacing: '4px',
          color: NAVY, textTransform: 'uppercase', lineHeight: 1.1,
          marginBottom: '8px',
        }}>{title}</div>

        {/* Subtitle badge */}
        <div style={{
          display: 'inline-block',
          background: accentColor,
          color: 'white', padding: '4px 36px',
          fontSize: '9.5pt', fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase',
          marginBottom: '16px',
          clipPath: 'polygon(4% 0%, 96% 0%, 100% 50%, 96% 100%, 4% 100%, 0% 50%)',
        }}>{subtitle}</div>

        {/* "Décerné à" */}
        <div style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: '11pt', fontStyle: 'italic',
          color: `${NAVY}bb`, marginBottom: '8px',
        }}>Décerné à</div>

        {/* Name line */}
        <div style={{
          width: '50%', maxWidth: '140mm', height: '28px',
          borderBottom: `1.5px solid ${accentColor}88`,
          marginBottom: '10px', position: 'relative',
        }}>
          <span style={{
            position: 'absolute', right: 0, bottom: '6px',
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: '7pt', color: `${NAVY}77`, fontStyle: 'italic',
          }}>({label})</span>
        </div>

        {/* Description */}
        <div style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: '10pt', color: `${NAVY}aa`,
          maxWidth: '55%', lineHeight: 1.7, marginBottom: '18px', fontStyle: 'italic',
        }}>{description}</div>

        {/* Signature lines */}
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '60%', marginTop: '0' }}>
          {['Le Président', 'Date et Cachet'].map(text => (
            <div key={text} style={{ textAlign: 'center' }}>
              <div style={{ width: '44mm', borderBottom: `1px solid ${NAVY}33`, height: '18px', marginBottom: '4px' }} />
              <div style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: '7pt', color: `${NAVY}99`,
                letterSpacing: '1.5px', textTransform: 'uppercase',
              }}>{text}</div>
            </div>
          ))}
        </div>

        {/* Social footer */}
        <div style={{
          marginTop: '12px', display: 'flex', justifyContent: 'center', gap: '24px',
          fontSize: '6pt', color: `${NAVY}77`, letterSpacing: '0.5px',
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
   REMERCIEMENT — Thank-you document
   ═══════════════════════════════════════ */
function Remerciement({ recipient, description }) {
  return (
    <div style={{
      width: '100%', height: '100%', position: 'relative', overflow: 'hidden',
      fontFamily: "'Oswald', sans-serif",
    }}>
      {/* Outer border */}
      <div style={{
        position: 'absolute', inset: '4mm',
        border: `2px solid ${NAVY}35`,
        pointerEvents: 'none',
      }} />
      {/* Inner border */}
      <div style={{
        position: 'absolute', inset: '6mm',
        border: `1px solid ${GOLD}55`,
        pointerEvents: 'none',
      }} />
      <CornerBrackets color={GOLD} />

      {/* Seal watermark — bottom right */}
      <div style={{
        position: 'absolute', bottom: '12mm', right: '14mm',
        opacity: 0.15, pointerEvents: 'none',
      }}>
        <SealMedallion color={GOLD} size={90} />
      </div>
      {/* Seal watermark — top left */}
      <div style={{
        position: 'absolute', top: '12mm', left: '14mm',
        opacity: 0.1, pointerEvents: 'none',
      }}>
        <SealMedallion color={NAVY} size={60} />
      </div>

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 1,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', width: '100%', height: '100%', padding: '12mm 20mm',
      }}>
        {/* Academy name */}
        <div style={{
          fontSize: '7pt', fontWeight: 400, letterSpacing: '5px',
          color: `${NAVY}aa`, textTransform: 'uppercase', marginBottom: '10px',
        }}>Académie Soummam Basketball — Akbou</div>

        {/* Logo */}
        <div style={{ position: 'relative', marginBottom: '10px' }}>
          <img src={logo} alt="ASBB Logo" style={{
            width: '64px', height: '64px', borderRadius: '50%',
            border: `2px solid ${GOLD}77`,
          }} />
        </div>

        {/* Tournament name */}
        <div style={{
          fontSize: '11pt', fontWeight: 600, letterSpacing: '5px',
          color: NAVY, textTransform: 'uppercase', marginBottom: '4px',
        }}>TOURNOI 3x3</div>

        <div style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: '8pt', fontWeight: 400, letterSpacing: '3px',
          color: `${NAVY}99`, textTransform: 'uppercase', marginBottom: '10px',
        }}>Mars 2026</div>

        {/* Diamond divider */}
        <div style={{ marginBottom: '12px', width: '100%' }}>
          <DiamondDivider color={GOLD} width="45%" />
        </div>

        {/* Remerciement label */}
        <div style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: '10pt', fontWeight: 500, letterSpacing: '4px',
          color: GOLD, textTransform: 'uppercase', marginBottom: '8px',
        }}>Lettre de Remerciement</div>

        {/* Title */}
        <div style={{
          fontSize: '34pt', fontWeight: 600, letterSpacing: '4px',
          color: NAVY, textTransform: 'uppercase', lineHeight: 1.1,
          marginBottom: '8px',
        }}>MERCI</div>

        {/* Subtitle badge */}
        <div style={{
          display: 'inline-block',
          background: GOLD,
          color: 'white', padding: '4px 36px',
          fontSize: '9.5pt', fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase',
          marginBottom: '16px',
          clipPath: 'polygon(4% 0%, 96% 0%, 100% 50%, 96% 100%, 4% 100%, 0% 50%)',
        }}>Remerciement Spécial</div>

        {/* "Adressé à" */}
        <div style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: '11pt', fontStyle: 'italic',
          color: `${NAVY}bb`, marginBottom: '8px',
        }}>Adressé à</div>

        {/* Recipient name */}
        <div style={{
          fontSize: '18pt', fontWeight: 600, letterSpacing: '2px',
          color: NAVY, marginBottom: '12px', lineHeight: 1.2,
        }}>{recipient}</div>

        {/* Description */}
        <div style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: '10pt', color: `${NAVY}aa`,
          maxWidth: '55%', lineHeight: 1.7, marginBottom: '18px', fontStyle: 'italic',
        }}>{description}</div>

        {/* Signature lines */}
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '60%', marginTop: '0' }}>
          {['Le Président', 'Date et Cachet'].map(text => (
            <div key={text} style={{ textAlign: 'center' }}>
              <div style={{ width: '44mm', borderBottom: `1px solid ${NAVY}33`, height: '18px', marginBottom: '4px' }} />
              <div style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: '7pt', color: `${NAVY}99`,
                letterSpacing: '1.5px', textTransform: 'uppercase',
              }}>{text}</div>
            </div>
          ))}
        </div>

        {/* Social footer */}
        <div style={{
          marginTop: '12px', display: 'flex', justifyContent: 'center', gap: '24px',
          fontSize: '6pt', color: `${NAVY}77`, letterSpacing: '0.5px',
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
  const containerRef = useRef(null)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    if (!page) return
    const update = () => {
      const PAGE_W = 297 * 3.7795275591
      const PAGE_H = 210 * 3.7795275591
      const vw = window.innerWidth * 0.92
      const vh = window.innerHeight * 0.88
      setScale(Math.min(1, vw / PAGE_W, vh / PAGE_H))
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [page])

  if (!page) return null

  const scaledW = 297 * 3.7795275591 * scale
  const scaledH = 210 * 3.7795275591 * scale

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
        ref={containerRef}
        style={{
          width: `${scaledW}px`,
          height: `${scaledH}px`,
          boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
          borderRadius: '4px', overflow: 'hidden',
          cursor: 'default', position: 'relative',
        }}
      >
        <div style={{
          width: '297mm', height: '210mm',
          transform: scale < 1 ? `scale(${scale})` : undefined,
          transformOrigin: 'top left',
        }}>
          {page.component}
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); onClose() }}
          style={{
            position: 'absolute', top: '8px', right: '8px', zIndex: 10000,
            width: '32px', height: '32px', borderRadius: '50%',
            background: 'rgba(0,0,0,0.7)', color: 'white',
            border: '2px solid rgba(255,255,255,0.3)', fontSize: '16px', cursor: 'pointer',
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

    const PAGE_WIDTH_PX = 281 * 3.7795275591

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
    ...REMERCIEMENTS.map(r => ({
      id: r.id,
      label: `${r.icon} ${r.recipient}`,
      component: <Remerciement {...r} />,
      pdfFile: r.pdfFile,
    })),
  ]

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
                  color={GOLD}
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
