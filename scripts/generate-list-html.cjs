#!/usr/bin/env node
/**
 * Generates a standalone HTML file for the ASBB player list (insurance document).
 * A4 portrait, all styles inlined, with embedded logo.
 */
const fs = require('fs')
const path = require('path')

const OUT = path.join(__dirname, '..', 'public', 'list-html')
const logoBase64 = fs.readFileSync(path.join(OUT, 'logo.jpg'), 'base64')
const LOGO_URI = `data:image/jpeg;base64,${logoBase64}`

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
const GEN_DATE = new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })

// ── Paginate players into A4 pages ──
// Page 1: header + summary + table (~24 rows). Page 2+: table only (~38 rows).
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

// ── HTML Generators ──
function headerHTML(pageNum, totalPages) {
  return `
    <div style="display:flex;align-items:center;gap:16px;padding:8mm 10mm 5mm;border-bottom:3px solid ${NAVY}">
      <img src="${LOGO_URI}" alt="ASBB Logo" style="width:58px;height:58px;border-radius:50%;border:2.5px solid ${GOLD}88;flex-shrink:0">
      <div style="flex:1;min-width:0">
        <div style="font-family:'Oswald',sans-serif;font-size:16pt;font-weight:700;letter-spacing:3px;color:${NAVY};text-transform:uppercase;line-height:1.1">
          LISTE DES JOUEURS — ASBB
        </div>
        <div style="font-family:'Cormorant Garamond',Georgia,serif;font-size:9pt;color:${NAVY}99;letter-spacing:1.5px;margin-top:2px">
          Académie Soummam Basketball — Akbou
        </div>
        <div style="display:flex;gap:16px;margin-top:3px;font-family:'Oswald',sans-serif;font-size:7pt;color:${GOLD};letter-spacing:1px;text-transform:uppercase;font-weight:500">
          <span>Saison 2025–2026</span>
          <span style="color:${NAVY}55">•</span>
          <span>Généré le ${GEN_DATE}</span>
        </div>
      </div>
    </div>`
}

function summaryHTML() {
  const catBreakdown = CATEGORIES.map(c =>
    `<span style="display:inline-flex;align-items:center;gap:4px"><span style="font-weight:600;color:${NAVY}">${c.name}</span> <span style="background:${NAVY}12;padding:1px 8px;border-radius:10px;font-size:7.5pt;font-weight:600;color:${NAVY}">${c.players.length}</span></span>`
  ).join('<span style="color:#ccc;margin:0 6px">|</span>')

  return `
    <div style="margin:5mm 10mm 3mm;padding:10px 16px;background:${NAVY}08;border-radius:6px;border-left:4px solid ${GOLD}">
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:8px 20px;font-family:'Oswald',sans-serif;font-size:8pt;color:${NAVY}">
        <div style="display:flex;align-items:center;gap:6px">
          <span style="font-weight:400;letter-spacing:1px;text-transform:uppercase;color:${NAVY}88">Total Joueurs</span>
          <span style="background:${NAVY};color:white;padding:2px 12px;border-radius:10px;font-weight:700;font-size:9pt">${TOTAL_PLAYERS}</span>
        </div>
        <span style="color:#ccc">|</span>
        <div style="display:flex;align-items:center;gap:8px;font-size:7.5pt">
          <span style="letter-spacing:0.5px">Masculin <strong>${TOTAL_M}</strong></span>
          <span style="color:#ccc">•</span>
          <span style="letter-spacing:0.5px">Féminin <strong>${TOTAL_F}</strong></span>
        </div>
      </div>
      <div style="margin-top:6px;display:flex;flex-wrap:wrap;align-items:center;gap:4px;font-family:'Oswald',sans-serif;font-size:7.5pt;color:${NAVY}cc">
        ${catBreakdown}
      </div>
    </div>`
}

function categoryHeaderHTML(item) {
  return `
    <tr>
      <td colspan="4" style="padding:8px 0 0">
        <div style="background:${NAVY};color:white;padding:6px 14px;font-family:'Oswald',sans-serif;font-size:9.5pt;font-weight:600;letter-spacing:2px;text-transform:uppercase;display:flex;align-items:center;justify-content:space-between">
          <span>${item.name} — ${item.tag}</span>
          <span style="font-size:7.5pt;font-weight:400;opacity:0.7;letter-spacing:1px">${item.count} joueur${item.count > 1 ? 's' : ''}</span>
        </div>
      </td>
    </tr>`
}

function playerRowHTML(item, isEven) {
  const bg = isEven ? 'white' : '#f8f9fb'
  const cellStyle = `padding:5px 10px;font-size:8.5pt;color:${NAVY};border-bottom:1px solid ${NAVY}0a;font-family:'Oswald',sans-serif;font-weight:400`
  return `
    <tr style="background:${bg}">
      <td style="${cellStyle};text-align:center;font-weight:600;color:${NAVY}88;width:32px">${item.num}</td>
      <td style="${cellStyle};font-weight:600;letter-spacing:0.5px;text-transform:uppercase">${item.nom}</td>
      <td style="${cellStyle}">${item.prenom}</td>
      <td style="${cellStyle};text-align:center;letter-spacing:0.5px">${item.dob}</td>
    </tr>`
}

function tableHeadHTML() {
  const thStyle = `padding:6px 10px;font-family:'Oswald',sans-serif;font-size:7.5pt;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:${GOLD};border-bottom:2px solid ${NAVY}22`
  return `
    <thead>
      <tr style="background:${NAVY}06">
        <th style="${thStyle};text-align:center;width:32px">#</th>
        <th style="${thStyle};text-align:left">Nom</th>
        <th style="${thStyle};text-align:left">Prénom</th>
        <th style="${thStyle};text-align:center">Date de Naissance</th>
      </tr>
    </thead>`
}

function footerHTML(pageNum, totalPages) {
  return `
    <div style="position:absolute;bottom:0;left:0;right:0;padding:4mm 10mm;display:flex;justify-content:space-between;align-items:center;border-top:1px solid ${NAVY}15">
      <div style="font-family:'Oswald',sans-serif;font-size:6pt;color:${NAVY}55;letter-spacing:0.5px">
        ACADÉMIE SOUMMAM BASKETBALL — AKBOU
      </div>
      <div style="font-family:'Oswald',sans-serif;font-size:7pt;color:${NAVY}88;font-weight:500;letter-spacing:1px">
        Page ${pageNum} / ${totalPages}
      </div>
    </div>`
}

function generateHTML() {
  const pages = paginate()
  const totalPages = pages.length

  let pagesHTML = ''
  for (let p = 0; p < pages.length; p++) {
    const items = pages[p]
    let playerIndex = 0
    const rows = items.map(item => {
      if (item.type === 'category-header') {
        playerIndex = 0
        return categoryHeaderHTML(item)
      }
      return playerRowHTML(item, playerIndex++ % 2 === 0)
    }).join('\n')

    const isFirst = p === 0

    pagesHTML += `
      <div class="page" style="width:210mm;height:297mm;position:relative;overflow:hidden;background:white;page-break-after:${p < pages.length - 1 ? 'always' : 'auto'};page-break-inside:avoid;box-sizing:border-box">
        ${isFirst ? headerHTML(p + 1, totalPages) : ''}
        ${isFirst ? summaryHTML() : ''}
        <div style="padding:${isFirst ? '2mm' : '6mm'} 10mm 14mm;flex:1">
          <table style="width:100%;border-collapse:collapse;table-layout:auto">
            ${tableHeadHTML()}
            <tbody>
              ${rows}
            </tbody>
          </table>
        </div>
        ${footerHTML(p + 1, totalPages)}
      </div>`
  }

  return `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Liste des Joueurs — ASBB</title>
<link href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap" rel="stylesheet">
<style>
  @page { size: A4 portrait; margin: 0; }
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html, body {
    width: 210mm; margin: 0; padding: 0;
    -webkit-print-color-adjust: exact; print-color-adjust: exact; color-adjust: exact;
  }
  body {
    font-family: 'Oswald', sans-serif;
    background: #e8ecf0;
  }
  .page {
    background: white;
    box-shadow: 0 2px 20px rgba(0,0,0,0.1);
  }
  @media print {
    body { background: white; }
    .page { box-shadow: none; }
  }
</style>
</head>
<body>
${pagesHTML}
</body>
</html>`
}

// ── Write HTML + generate PDF ──
async function main() {
  const html = generateHTML()
  const outPath = path.join(OUT, 'liste-joueurs.html')
  fs.writeFileSync(outPath, html, 'utf8')
  console.log(`  ✓ liste-joueurs.html (${paginate().length} pages, ${TOTAL_PLAYERS} players)`)

  // Generate PDF via Puppeteer
  const puppeteer = require('puppeteer')
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] })
  const page = await browser.newPage()
  await page.goto(`file://${outPath}`, { waitUntil: 'networkidle0' })
  const pdfPath = path.join(__dirname, '..', 'public', 'list-pdfs', 'liste-joueurs.pdf')
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  })
  await browser.close()
  console.log(`  ✓ liste-joueurs.pdf`)
  console.log(`  → ${pdfPath}`)
}

main().catch(err => { console.error(err); process.exit(1) })
