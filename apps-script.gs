/**
 * Better Than Others — raccolta prenotazioni del nuovo drop e lista in un Google Sheet.
 * Incolla tutto questo in: Google Sheet › Estensioni › Apps Script.
 * Poi: Esegui il deployment › Nuovo deployment › App web
 *      Esegui come: Me · Chi ha accesso: Chiunque
 * Copia l'URL che finisce con /exec e mettilo in SHEET_URL dentro index.html.
 */
const SHEET_NAME = 'Iscrizioni';
const HEADERS = ['Data', 'Tipo', 'Taglia', 'Email', 'Instagram', 'Consenso',
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term',
  'fbclid', 'gclid', 'Referrer', 'Pagina'];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sh = ss.getSheetByName(SHEET_NAME);
    if (!sh) {
      sh = ss.insertSheet(SHEET_NAME);
      sh.appendRow(HEADERS);
      sh.setFrozenRows(1);
    }
    const p = (e && e.parameter) || {};
    if (p.website) return ContentService.createTextOutput('ok'); // bot
    // taglia la lunghezza e blocca le formule (=, +, -, @) nelle celle
    const c = v => String(v || '').slice(0, 300).replace(/^[=+\-@]/, "'$&");
    sh.appendRow([new Date(), c(p.tipo), c(p.taglia), c(p.email).toLowerCase(),
      c(p.instagram), c(p.consenso), c(p.utm_source), c(p.utm_medium),
      c(p.utm_campaign), c(p.utm_content), c(p.utm_term), c(p.fbclid),
      c(p.gclid), c(p.referrer), c(p.pagina)]);
    return ContentService.createTextOutput('ok');
  } finally {
    lock.releaseLock();
  }
}

// Apri l'URL /exec nel browser: se vedi "attivo" il deployment funziona.
function doGet() {
  return ContentService.createTextOutput('attivo');
}
