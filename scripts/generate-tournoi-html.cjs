#!/usr/bin/env node
/**
 * Generates standalone HTML files for all tournament documents.
 * Each file is A4 landscape, all styles inlined, with embedded logo.
 */
const fs = require('fs')
const path = require('path')

const OUT = path.join(__dirname, '..', 'public', 'tournoi-html')
const logoBase64 = fs.readFileSync(path.join(OUT, 'logo.jpg'), 'base64')
const LOGO_URI = `data:image/jpeg;base64,${logoBase64}`

const NAVY = '#1a2744'
const GOLD = '#c8834b'

// ── Certificate data ──
const CERTIFICATES = [
  {
    id: 'champion',
    filename: 'certificat-champion.html',
    title: '1ÈRE PLACE',
    subtitle: 'Champions du Tournoi',
    description: 'Pour avoir remporté le tournoi avec excellence et détermination.',
    accentColor: GOLD,
    label: 'Équipe',
    htmlTitle: 'Certificat — 1ère Place',
  },
  {
    id: 'finalist',
    filename: 'certificat-finalist.html',
    title: '2ÈME PLACE',
    subtitle: 'Finaliste du Tournoi',
    description: 'Pour une performance remarquable et un parcours honorable tout au long du tournoi.',
    accentColor: GOLD,
    label: 'Équipe',
    htmlTitle: 'Certificat — 2ème Place',
  },
  {
    id: 'third',
    filename: 'certificat-third.html',
    title: '3ÈME PLACE',
    subtitle: 'Troisième du Tournoi',
    description: 'Pour un parcours méritoire et un esprit sportif exemplaire.',
    accentColor: GOLD,
    label: 'Équipe',
    htmlTitle: 'Certificat — 3ème Place',
  },
  {
    id: 'mvp',
    filename: 'certificat-mvp.html',
    title: 'MVP',
    subtitle: 'Joueur Le Plus Précieux',
    description: 'Pour une performance exceptionnelle et un impact décisif sur le tournoi.',
    accentColor: GOLD,
    label: 'Joueur',
    htmlTitle: 'Certificat — MVP',
  },
  {
    id: 'best-scorer',
    filename: 'certificat-best-scorer.html',
    title: 'SCORING CHAMPION',
    subtitle: 'Meilleur Scoreur du Tournoi',
    description: "Pour avoir dominé le tableau des scores avec une efficacité remarquable tout au long du tournoi.",
    accentColor: GOLD,
    label: 'Joueur',
    htmlTitle: 'Certificat — Scoring Champion',
  },
  {
    id: 'dpot',
    filename: 'certificat-dpot.html',
    title: 'DPOT',
    subtitle: 'Meilleur Défenseur du Tournoi',
    description: "Pour une défense acharnée et un impact défensif exceptionnel tout au long du tournoi.",
    accentColor: GOLD,
    label: 'Joueur',
    htmlTitle: 'Certificat — DPOT',
  },
  {
    id: '6th-man',
    filename: 'certificat-6th-man.html',
    title: '6TH MAN',
    subtitle: 'Meilleur Remplaçant du Tournoi',
    description: "Pour un impact décisif sorti du banc et une contribution essentielle à chaque entrée en jeu.",
    accentColor: GOLD,
    label: 'Joueur',
    htmlTitle: 'Certificat — 6th Man',
  },
]

// ── SVG helpers ──
function sealMedallionSVG(color, size) {
  const points = 24
  const outerR = size / 2
  const innerR = outerR * 0.78
  const pathParts = []
  for (let i = 0; i < points * 2; i++) {
    const angle = (i * Math.PI) / points - Math.PI / 2
    const r = i % 2 === 0 ? outerR : innerR
    const x = outerR + r * Math.cos(angle)
    const y = outerR + r * Math.sin(angle)
    pathParts.push(`${i === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`)
  }
  const pathD = pathParts.join(' ') + 'Z'
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" style="overflow:visible">
    <path d="${pathD}" fill="none" stroke="${color}" stroke-width="1.5" opacity="0.5"/>
    <circle cx="${outerR}" cy="${outerR}" r="${(innerR * 0.85).toFixed(2)}" fill="none" stroke="${color}" stroke-width="1" opacity="0.4"/>
    <circle cx="${outerR}" cy="${outerR}" r="${(innerR * 0.65).toFixed(2)}" fill="none" stroke="${color}" stroke-width="0.5" opacity="0.3"/>
  </svg>`
}

function diamondDividerHTML(color, width) {
  return `<div style="display:flex;align-items:center;gap:12px;width:${width};margin:0 auto">
    <div style="flex:1;height:1px;background:linear-gradient(90deg,transparent,${color})"></div>
    <div style="width:5px;height:5px;background:${color};transform:rotate(45deg);flex-shrink:0"></div>
    <div style="width:8px;height:8px;border:1.5px solid ${color};transform:rotate(45deg);flex-shrink:0"></div>
    <div style="width:5px;height:5px;background:${color};transform:rotate(45deg);flex-shrink:0"></div>
    <div style="flex:1;height:1px;background:linear-gradient(270deg,transparent,${color})"></div>
  </div>`
}

function cornerBracketsHTML(color) {
  const inset = '6mm'
  const size = '18mm'
  const thickness = '2.5px'
  const corners = [
    `top:${inset};left:${inset};border-top:${thickness} solid ${color};border-left:${thickness} solid ${color}`,
    `top:${inset};right:${inset};border-top:${thickness} solid ${color};border-right:${thickness} solid ${color}`,
    `bottom:${inset};left:${inset};border-bottom:${thickness} solid ${color};border-left:${thickness} solid ${color}`,
    `bottom:${inset};right:${inset};border-bottom:${thickness} solid ${color};border-right:${thickness} solid ${color}`,
  ]
  return corners.map(s => `<div style="position:absolute;width:${size};height:12mm;pointer-events:none;${s}"></div>`).join('\n')
}

// ── Certificate HTML generator ──
function generateCertificateHTML(cert) {
  const titleFontSize = cert.title.length > 12 ? '24pt' : '34pt'
  return `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${cert.htmlTitle}</title>
<link href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet">
<style>
  @page { size: A4 landscape; margin: 0; }
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html, body {
    width: 297mm; height: 210mm; margin: 0; padding: 0;
    -webkit-print-color-adjust: exact; print-color-adjust: exact; color-adjust: exact;
  }
  body {
    font-family: 'Oswald', sans-serif;
    background: transparent;
    position: relative; overflow: hidden;
  }
</style>
</head>
<body>
  <!-- Outer border -->
  <div style="position:absolute;inset:4mm;border:2px solid ${NAVY}35;pointer-events:none"></div>
  <!-- Inner border -->
  <div style="position:absolute;inset:6mm;border:1px solid ${cert.accentColor}55;pointer-events:none"></div>
  <!-- Corner ornaments -->
  ${cornerBracketsHTML(cert.accentColor)}
  <!-- Seal watermark bottom-right -->
  <div style="position:absolute;bottom:12mm;right:14mm;opacity:0.15;pointer-events:none">
    ${sealMedallionSVG(cert.accentColor, 90)}
  </div>
  <!-- Seal watermark top-left -->
  <div style="position:absolute;top:12mm;left:14mm;opacity:0.1;pointer-events:none">
    ${sealMedallionSVG(NAVY, 60)}
  </div>
  <!-- Content -->
  <div style="position:relative;z-index:1;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;width:100%;height:100%;padding:12mm 20mm">
    <!-- Academy name -->
    <div style="font-size:7pt;font-weight:400;letter-spacing:5px;color:${NAVY}aa;text-transform:uppercase;margin-bottom:10px">
      Académie Soummam Basketball — Akbou
    </div>
    <!-- Logo -->
    <div style="position:relative;margin-bottom:12px">
      <img src="${LOGO_URI}" alt="ASBB Logo" style="width:110px;height:110px;border-radius:50%;border:2.5px solid ${cert.accentColor}88">
    </div>
    <!-- Tournament name -->
    <div style="font-size:11pt;font-weight:600;letter-spacing:5px;color:${NAVY};text-transform:uppercase;margin-bottom:4px">
      TOURNOI 3x3
    </div>
    <!-- Date -->
    <div style="font-family:'Cormorant Garamond',Georgia,serif;font-size:8pt;font-weight:400;letter-spacing:3px;color:${NAVY}99;text-transform:uppercase;margin-bottom:10px">
      Mars 2026
    </div>
    <!-- Diamond divider -->
    <div style="margin-bottom:12px;width:100%">
      ${diamondDividerHTML(cert.accentColor, '45%')}
    </div>
    <!-- Certificate label -->
    <div style="font-family:'Cormorant Garamond',Georgia,serif;font-size:10pt;font-weight:500;letter-spacing:4px;color:${cert.accentColor};text-transform:uppercase;margin-bottom:8px">
      Certificat d'Honneur
    </div>
    <!-- Award title -->
    <div style="font-size:${titleFontSize};font-weight:600;letter-spacing:4px;color:${NAVY};text-transform:uppercase;line-height:1.1;margin-bottom:8px">
      ${cert.title}
    </div>
    <!-- Subtitle badge -->
    <div style="display:inline-block;background:${cert.accentColor};color:white;padding:4px 36px;font-size:9.5pt;font-weight:600;letter-spacing:3px;text-transform:uppercase;margin-bottom:16px;clip-path:polygon(4% 0%,96% 0%,100% 50%,96% 100%,4% 100%,0% 50%)">
      ${cert.subtitle}
    </div>
    <!-- Décerné à -->
    <div style="font-family:'Cormorant Garamond',Georgia,serif;font-size:11pt;font-style:italic;color:${NAVY}bb;margin-bottom:8px">
      Décerné à
    </div>
    <!-- Name line -->
    <div style="width:50%;max-width:140mm;height:28px;border-bottom:1.5px solid ${cert.accentColor}88;margin-bottom:10px;position:relative">
      <span style="position:absolute;right:0;bottom:6px;font-family:'Cormorant Garamond',Georgia,serif;font-size:7pt;color:${NAVY}77;font-style:italic">(${cert.label})</span>
    </div>
    <!-- Description -->
    <div style="font-family:'Cormorant Garamond',Georgia,serif;font-size:10pt;color:${NAVY}aa;max-width:55%;line-height:1.7;margin-bottom:18px;font-style:italic">
      ${cert.description}
    </div>
    <!-- Signature lines -->
    <div style="display:flex;justify-content:space-between;width:60%;margin-top:0">
      <div style="text-align:center">
        <div style="width:44mm;border-bottom:1px solid ${NAVY}33;height:18px;margin-bottom:4px"></div>
        <div style="font-family:'Cormorant Garamond',Georgia,serif;font-size:7pt;color:${NAVY}99;letter-spacing:1.5px;text-transform:uppercase">Le Président</div>
      </div>
      <div style="text-align:center">
        <div style="width:44mm;border-bottom:1px solid ${NAVY}33;height:18px;margin-bottom:4px"></div>
        <div style="font-family:'Cormorant Garamond',Georgia,serif;font-size:7pt;color:${NAVY}99;letter-spacing:1.5px;text-transform:uppercase">Date et Cachet</div>
      </div>
    </div>
    <!-- Social footer -->
    <div style="margin-top:12px;display:flex;justify-content:center;gap:24px;font-size:6pt;color:${NAVY}77;letter-spacing:0.5px">
      <span>Instagram: @asbaskettball</span>
      <span>•</span>
      <span>Facebook: @Académie Soummam Basketball</span>
    </div>
  </div>
</body>
</html>`
}

// ── Stat Sheet HTML generator ──
function generateStatSheetHTML() {
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

  const colgroup = STAT_COLUMNS.map(c => `<col style="width:${c.width}">`).join('')
  const thead = STAT_COLUMNS.map(c =>
    `<th style="background:${NAVY};color:white;padding:5px 6px;font-size:8.5pt;font-weight:600;letter-spacing:1.5px;text-align:${c.key === 'joueur' ? 'left' : 'center'};border-right:${c.key !== '3pm' ? '1px solid rgba(255,255,255,0.15)' : 'none'}">${c.label}</th>`
  ).join('')

  let tbody = ''
  for (let i = 0; i < PLAYER_ROWS; i++) {
    const bg = i % 2 === 0 ? 'white' : '#f7f8fa'
    const rowHeight = `${Math.floor(128 / PLAYER_ROWS)}mm`
    const cells = STAT_COLUMNS.map(c => {
      const textAlign = (c.key === 'joueur' || c.key === 'num') ? 'left' : 'center'
      const padding = c.key === 'joueur' ? '2px 8px' : '2px 4px'
      const fontWeight = c.key === 'num' ? 600 : 400
      const content = c.key === 'num' ? i + 1 : ''
      return `<td style="border-bottom:1px solid ${NAVY}12;border-right:1px solid ${NAVY}0a;padding:${padding};text-align:${textAlign};font-size:9pt;height:${rowHeight};vertical-align:middle;color:${NAVY};font-weight:${fontWeight}">${content}</td>`
    }).join('')
    tbody += `<tr style="background:${bg}">${cells}</tr>\n`
  }

  const totalCols = STAT_COLUMNS.slice(2).map(c =>
    `<div style="width:${c.width};padding:4px;text-align:center;border-left:1px solid ${NAVY}12;min-height:18px"></div>`
  ).join('')

  const infoFields = ['Équipe', 'Date', 'Adversaire', 'Lieu'].map(label =>
    `<div style="display:flex;align-items:center;gap:6px">
      <span style="font-weight:600;text-transform:uppercase;letter-spacing:1px;font-size:8pt">${label} :</span>
      <div style="flex:1;border-bottom:1.5px solid ${NAVY}33;min-height:16px"></div>
    </div>`
  ).join('\n')

  return `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Fiche de Statistiques</title>
<link href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
  @page { size: A4 landscape; margin: 0; }
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html, body {
    width: 297mm; height: 210mm; margin: 0; padding: 0;
    -webkit-print-color-adjust: exact; print-color-adjust: exact; color-adjust: exact;
  }
  body {
    font-family: 'Oswald', sans-serif;
    background: transparent;
    position: relative; overflow: hidden;
  }
  .page-wrap {
    width: 100%; height: 100%;
    display: flex; flex-direction: column;
    position: relative; overflow: hidden;
  }
</style>
</head>
<body>
<div class="page-wrap">
  <!-- Header bar -->
  <div style="background:${NAVY};color:white;padding:10px 16px 8px;display:flex;align-items:center;gap:14px;position:relative">
    <div style="position:absolute;bottom:0;left:0;right:0;height:3px;background:linear-gradient(90deg,${GOLD},#d4a574,${GOLD})"></div>
    <img src="${LOGO_URI}" alt="ASBB Logo" style="width:48px;height:48px;border-radius:50%;border:2px solid rgba(255,255,255,0.3)">
    <div style="flex:1">
      <div style="font-size:18pt;font-weight:700;letter-spacing:2px;line-height:1.1">ASBB TOURNOI 3X3</div>
      <div style="font-size:9pt;font-weight:400;opacity:0.8;letter-spacing:1px;margin-top:2px">FICHE DE STATISTIQUES</div>
    </div>
    <div style="width:40px;height:40px;border-radius:50%;border:2px solid ${GOLD}66;display:flex;align-items:center;justify-content:center;font-size:20px">🏀</div>
  </div>
  <!-- Info fields -->
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px 24px;padding:8px 16px;font-size:9pt;font-weight:500;color:${NAVY};border-bottom:1.5px solid ${NAVY}18">
    ${infoFields}
  </div>
  <!-- Table -->
  <div style="flex:1;padding:4px 0 0;display:flex;flex-direction:column">
    <table style="width:100%;border-collapse:collapse;table-layout:fixed;flex:1">
      <colgroup>${colgroup}</colgroup>
      <thead><tr>${thead}</tr></thead>
      <tbody>${tbody}</tbody>
    </table>
  </div>
  <!-- Totals row -->
  <div style="display:flex;border-top:2px solid ${NAVY};font-size:8pt;font-weight:600;color:${NAVY};letter-spacing:1px">
    <div style="width:10mm;padding:4px;text-align:center"></div>
    <div style="width:58mm;padding:4px 8px;text-transform:uppercase">TOTAL ÉQUIPE</div>
    ${totalCols}
  </div>
  <!-- Footer -->
  <div style="padding:6px 16px;display:flex;justify-content:space-between;align-items:center;border-top:1px solid ${NAVY}10">
    <div style="display:flex;justify-content:center;gap:28px;font-family:'Oswald',sans-serif;font-size:6.5pt;color:${NAVY};letter-spacing:0.5px;opacity:0.7">
      <span>Instagram: @asbaskettball</span>
      <span>•</span>
      <span>Facebook: @Académie Soummam Basketball</span>
    </div>
    <div style="font-family:'Oswald',sans-serif;font-size:6pt;color:${NAVY};opacity:0.4;letter-spacing:0.5px">ACADÉMIE SOUMMAM BASKETBALL — AKBOU</div>
  </div>
</div>
</body>
</html>`
}

// ── Remerciement data ──
const REMERCIEMENTS = [
  {
    id: 'remerciement-mdj',
    filename: 'remerciement-mdj.html',
    recipient: "La Maison de Jeunes d'Akbou",
    description: "Pour nous avoir ouvert vos portes dès le premier jour, quand personne d'autre ne l'a fait. Merci à Madame la directrice de la maison de jeunes et tout son effectif pour votre confiance et votre soutien indéfectible depuis la création du club.",
    htmlTitle: 'Remerciement — Maison de Jeunes',
  },
  {
    id: 'remerciement-maire',
    filename: 'remerciement-maire.html',
    recipient: "Mr le Maire d'Akbou, Mr Mouloud SALHI",
    description: "Pour votre soutien institutionnel et votre engagement envers la promotion du sport au sein de notre ville. Votre appui a été déterminant pour la réussite de cet événement.",
    htmlTitle: 'Remerciement — Maire',
  },
  {
    id: 'remerciement-comite',
    filename: 'remerciement-comite.html',
    recipient: "Le Comité des Fêtes d'Akbou",
    description: "Pour votre collaboration précieuse et votre contribution à l'organisation de cet événement sportif. Votre implication a permis d'offrir un tournoi mémorable à tous les participants.",
    htmlTitle: 'Remerciement — Comité des Fêtes',
  },
]

// ── Remerciement HTML generator ──
function generateRemerciementHTML(rem) {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${rem.htmlTitle}</title>
<link href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet">
<style>
  @page { size: A4 landscape; margin: 0; }
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html, body {
    width: 297mm; height: 210mm; margin: 0; padding: 0;
    -webkit-print-color-adjust: exact; print-color-adjust: exact; color-adjust: exact;
  }
  body {
    font-family: 'Oswald', sans-serif;
    background: transparent;
    position: relative; overflow: hidden;
  }
</style>
</head>
<body>
  <!-- Outer border -->
  <div style="position:absolute;inset:4mm;border:2px solid ${NAVY}35;pointer-events:none"></div>
  <!-- Inner border -->
  <div style="position:absolute;inset:6mm;border:1px solid ${GOLD}55;pointer-events:none"></div>
  <!-- Corner ornaments -->
  ${cornerBracketsHTML(GOLD)}
  <!-- Seal watermark bottom-right -->
  <div style="position:absolute;bottom:12mm;right:14mm;opacity:0.15;pointer-events:none">
    ${sealMedallionSVG(GOLD, 90)}
  </div>
  <!-- Seal watermark top-left -->
  <div style="position:absolute;top:12mm;left:14mm;opacity:0.1;pointer-events:none">
    ${sealMedallionSVG(NAVY, 60)}
  </div>
  <!-- Content -->
  <div style="position:relative;z-index:1;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;width:100%;height:100%;padding:12mm 20mm">
    <!-- Academy name -->
    <div style="font-size:7pt;font-weight:400;letter-spacing:5px;color:${NAVY}aa;text-transform:uppercase;margin-bottom:10px">
      Académie Soummam Basketball — Akbou
    </div>
    <!-- Logo -->
    <div style="position:relative;margin-bottom:12px">
      <img src="${LOGO_URI}" alt="ASBB Logo" style="width:110px;height:110px;border-radius:50%;border:2.5px solid ${GOLD}88">
    </div>
    <!-- Tournament name -->
    <div style="font-size:11pt;font-weight:600;letter-spacing:5px;color:${NAVY};text-transform:uppercase;margin-bottom:4px">
      TOURNOI 3x3
    </div>
    <!-- Date -->
    <div style="font-family:'Cormorant Garamond',Georgia,serif;font-size:8pt;font-weight:400;letter-spacing:3px;color:${NAVY}99;text-transform:uppercase;margin-bottom:10px">
      Mars 2026
    </div>
    <!-- Diamond divider -->
    <div style="margin-bottom:12px;width:100%">
      ${diamondDividerHTML(GOLD, '45%')}
    </div>
    <!-- Remerciement label -->
    <div style="font-family:'Cormorant Garamond',Georgia,serif;font-size:10pt;font-weight:500;letter-spacing:4px;color:${GOLD};text-transform:uppercase;margin-bottom:8px">
      Lettre de Remerciement
    </div>
    <!-- Title -->
    <div style="font-size:34pt;font-weight:600;letter-spacing:4px;color:${NAVY};text-transform:uppercase;line-height:1.1;margin-bottom:8px">
      MERCI
    </div>
    <!-- Subtitle badge -->
    <div style="display:inline-block;background:${GOLD};color:white;padding:4px 36px;font-size:9.5pt;font-weight:600;letter-spacing:3px;text-transform:uppercase;margin-bottom:16px;clip-path:polygon(4% 0%,96% 0%,100% 50%,96% 100%,4% 100%,0% 50%)">
      Remerciement Spécial
    </div>
    <!-- Adressé à -->
    <div style="font-family:'Cormorant Garamond',Georgia,serif;font-size:11pt;font-style:italic;color:${NAVY}bb;margin-bottom:8px">
      Adressé à
    </div>
    <!-- Recipient name -->
    <div style="font-size:18pt;font-weight:600;letter-spacing:2px;color:${NAVY};margin-bottom:12px;line-height:1.2">
      ${rem.recipient}
    </div>
    <!-- Description -->
    <div style="font-family:'Cormorant Garamond',Georgia,serif;font-size:10pt;color:${NAVY}aa;max-width:55%;line-height:1.7;margin-bottom:18px;font-style:italic">
      ${rem.description}
    </div>
    <!-- Signature lines -->
    <div style="display:flex;justify-content:space-between;width:60%;margin-top:0">
      <div style="text-align:center">
        <div style="width:44mm;border-bottom:1px solid ${NAVY}33;height:18px;margin-bottom:4px"></div>
        <div style="font-family:'Cormorant Garamond',Georgia,serif;font-size:7pt;color:${NAVY}99;letter-spacing:1.5px;text-transform:uppercase">Le Président</div>
      </div>
      <div style="text-align:center">
        <div style="width:44mm;border-bottom:1px solid ${NAVY}33;height:18px;margin-bottom:4px"></div>
        <div style="font-family:'Cormorant Garamond',Georgia,serif;font-size:7pt;color:${NAVY}99;letter-spacing:1.5px;text-transform:uppercase">Date et Cachet</div>
      </div>
    </div>
    <!-- Social footer -->
    <div style="margin-top:12px;display:flex;justify-content:center;gap:24px;font-size:6pt;color:${NAVY}77;letter-spacing:0.5px">
      <span>Instagram: @asbaskettball</span>
      <span>•</span>
      <span>Facebook: @Académie Soummam Basketball</span>
    </div>
  </div>
</body>
</html>`
}

// ── Generate all files ──
console.log('Generating tournament HTML files...\n')

// Certificates
for (const cert of CERTIFICATES) {
  const html = generateCertificateHTML(cert)
  const outPath = path.join(OUT, cert.filename)
  fs.writeFileSync(outPath, html, 'utf8')
  console.log(`  ✓ ${cert.filename}`)
}

// Stat sheet
const statsHTML = generateStatSheetHTML()
fs.writeFileSync(path.join(OUT, 'fiche-stats.html'), statsHTML, 'utf8')
console.log('  ✓ fiche-stats.html')

// Remerciements
for (const rem of REMERCIEMENTS) {
  const html = generateRemerciementHTML(rem)
  const outPath = path.join(OUT, rem.filename)
  fs.writeFileSync(outPath, html, 'utf8')
  console.log(`  ✓ ${rem.filename}`)
}

console.log(`\nDone — ${CERTIFICATES.length + 1} files written to ${OUT}`)
