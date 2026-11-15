/* Piattaforma dello studio — Home, Sito, moduli attivabili (Avatar AI, Social, Gestionale). */
'use strict';

const SITE_URL = 'https://gsfglobal.github.io/annalisa-longobardi-demo/';
const TOUR_URL = SITE_URL + 'studio/experience/';

const sv = (p) => `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
const ICON = {
  home: sv('<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/>'),
  cal: sv('<rect x="3" y="4.5" width="18" height="16.5" rx="2"/><path d="M3 9.5h18M8 2.5v4M16 2.5v4"/><path d="M8.5 14.5l2.2 2.2 4.8-4.7"/>'),
  site: sv('<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M7 6.5h.01M10 6.5h.01"/>'),
  ai: sv('<path d="M12 3l1.8 4.6L18 9l-4.2 1.4L12 15l-1.8-4.6L6 9l4.2-1.4z"/><path d="M19 15l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z"/>'),
  avatar: sv('<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/><path d="M18 3l1 2 2 1-2 1-1 2-1-2-2-1 2-1z"/>'),
  social: sv('<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/>'),
  gestionale: sv('<rect x="3" y="4" width="18" height="17" rx="2"/><path d="M3 9h18M8 2v4M16 2v4M7 13h4M7 17h7"/>'),
  team: sv('<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6.5 6.5 0 0 1 3.5 6"/>'),
  gear: sv('<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>'),
  lock: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>',
  grid: sv('<rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/>'),
  menu: sv('<path d="M4 7h16M4 12h16M4 17h16"/>'),
  phone: sv('<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/>'),
  wa: sv('<path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 21l2.1-5.5A8.4 8.4 0 1 1 21 11.5z"/>'),
  arrow: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  check: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
  play: '<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>',
};

const MODS = {
  avatar: {
    name: 'Avatar AI', kicker: 'Video con il tuo volto e la tua voce',
    title: 'La Dottoressa, sempre in video. Senza registrare ogni volta.',
    lead: 'Il tuo avatar digitale realizza brevi video per social, sito e WhatsApp: spiega i trattamenti, risponde alle domande frequenti e accoglie i nuovi pazienti. Tu approvi ogni video prima che esca.',
    feats: [
      ['Video in pochi minuti', 'Scrivi o scegli un tema: il video è pronto, con il tuo volto e la tua voce.'],
      ['Risposte video alle FAQ', 'Invisalign, faccette, prima visita: un video chiaro per ogni domanda ricorrente.'],
      ['Anche in altre lingue', 'Lo stesso video in inglese o in altre lingue, per i pazienti stranieri.'],
      ['Sempre sotto controllo', 'Nessun video esce senza la tua approvazione; ogni contenuto è dichiarato come realizzato con AI.'],
    ],
  },
  social: {
    name: 'Social', kicker: 'Instagram, Facebook e TikTok in un posto solo',
    title: 'I tuoi social curati ogni settimana, approvati dal telefono.',
    lead: 'Un calendario di post e reel preparati per lo studio, nel tuo stile e nel rispetto delle regole deontologiche. Li approvi con un tocco e vengono pubblicati da soli.',
    feats: [
      ['Calendario editoriale', 'Ogni settimana i contenuti pronti, già scritti e impaginati.'],
      ['Approvazione con un tocco', 'Vedi l\'anteprima, approvi o chiedi una modifica, anche dal cellulare.'],
      ['Pubblicazione automatica', 'Instagram, Facebook e TikTok all\'orario migliore, senza pensarci.'],
      ['Risultati chiari', 'Quante persone ti hanno visto e quante hanno chiesto informazioni.'],
    ],
  },
  gestionale: {
    name: 'Gestionale', kicker: 'Agenda, pazienti e preventivi',
    title: 'Lo studio organizzato, collegato a Giulia.',
    lead: 'Agenda, schede paziente, preventivi e promemoria in un unico gestionale semplice. Le richieste raccolte da Giulia al telefono e su WhatsApp entrano direttamente in agenda.',
    feats: [
      ['Agenda condivisa', 'Poltrone, sedi e collaboratori in un colpo d\'occhio, da computer e cellulare.'],
      ['Schede paziente', 'Storico, documenti e piani di trattamento sempre a portata di mano.'],
      ['Preventivi e piani', 'Preventivi chiari da inviare al paziente e seguire fino all\'accettazione.'],
      ['Promemoria automatici', 'Messaggi di conferma e promemoria: meno appuntamenti saltati.'],
    ],
  },
};

const greet = () => { const hh = new Date().getHours(); return hh < 13 ? 'Buongiorno' : hh < 18 ? 'Buon pomeriggio' : 'Buonasera'; };
const reqOf = (k) => S.reqs.filter((q) => q.module === k).sort((a, b) => (b.at || '').localeCompare(a.at || ''))[0];

function giuliaTabs() {
  return `<div class="subnav"><div class="sn-h"><span class="sn-ic">${ICON.ai}</span><div><b>Assistente AI · Giulia</b><small>Telefono e WhatsApp <span class="livedot"></span> attiva</small></div></div>
  <div class="sn-t" role="tablist">${GIULIA_TABS.map(([k, l]) => `<a href="#${k}" class="${S.route === k ? 'on' : ''}" ${S.route === k ? 'aria-current="page"' : ''}>${l}</a>`).join('')}</div></div>`;
}

/* ================= HOME ================= */
function vPlatformHome() {
  const cv = visibleConvs();
  const loaded = S.loaded.convs && S.loaded.appts;
  const n = (x) => (loaded ? x : '…');
  const calls = cv.filter((c) => c.channel === 'telefono');
  const wa = cv.filter((c) => c.channel === 'whatsapp');
  const waiting = cv.filter((c) => c.status === 'attesa_operatore').sort((a, b) => (b.updatedAt || '').localeCompare(a.updatedAt || ''));
  const apOpen = (can('conv.read') ? S.appts : []).filter((a) => a.status === 'ricevuta' || a.status === 'in_lavorazione');
  const review = S.kb.filter((k) => ['in_revisione', 'da_verificare', 'discordante'].includes(k.state)).length;
  const today = new Date().toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'long' });
  const todo = [
    ...waiting.slice(0, 3).map((c) => ({ t: h(c.patient || 'Paziente'), s: `${chanLabel[c.channel]} · ${h((c.handoff && c.handoff.reason) || 'Chiede di essere ricontattato')}`, act: `data-act="open-conv" data-id="${c.id}"`, tag: '<span class="tag plum">Da richiamare</span>' })),
    ...apOpen.slice(0, 3).map((a) => ({ t: h(a.name), s: `Richiesta di appuntamento · ${h(a.tipo || 'visita')}`, act: `data-act="appt-open" data-id="${a.id}"`, tag: '<span class="tag">Appuntamento</span>' })),
    ...(review ? [{ t: `${review} informazioni da confermare`, s: 'Le risposte di Giulia aspettano il tuo ok', href: '#conoscenza', tag: '<span class="tag">Giulia</span>' }] : []),
  ];
  const prod = (href, ic, name, status, big, sub) => `<a class="prod card" href="#${href}"><div class="prod-h"><span class="pi">${ICON[ic]}</span><span class="tag plum"><span class="dot"></span>${status}</span></div><div class="prod-n">${name}</div><div class="prod-v serif">${big}</div><div class="small muted">${sub}</div><span class="prod-go">Apri ${ICON.arrow}</span></a>`;
  return `
  <section class="welcome">
    <div class="w-txt"><small>${h(today)}</small><h1>${greet()}, Dottoressa</h1><p>Il tuo studio digitale: agenda, assistente al telefono e su WhatsApp, tutto in un unico posto.</p>
      <div class="row" style="margin-top:18px"><a class="btn plum" href="#panoramica">Vedi cosa ha fatto Giulia</a><a class="btn ghost light" href="#agenda">Apri l'agenda</a></div></div>
    <img src="media/ritratto.webp" alt="">
  </section>

  <div class="grid g3" style="margin-bottom:22px">
    ${prod('agenda', 'cal', 'Agenda', 'Gestita da Giulia', n(apOpen.length), apOpen.length === 1 ? 'appuntamento da confermare, da telefono e WhatsApp' : 'appuntamenti da confermare, da telefono e WhatsApp')}
    ${prod('whatsapp', 'wa', 'Assistente WhatsApp', 'Attivo', n(wa.length), wa.length === 1 ? 'chat gestita da Giulia' : 'chat gestite da Giulia')}
    ${prod('chiamate', 'phone', 'Assistente telefonico', 'Attivo', n(calls.length), calls.length === 1 ? 'chiamata gestita da Giulia' : 'chiamate gestite da Giulia')}
  </div>

  <div class="grid g2x" style="margin-bottom:28px">
    <div class="card"><div class="pad sec-t" style="margin:0;padding-bottom:4px"><h2>Da gestire</h2><span class="small muted">${loaded ? (todo.length ? todo.length + ' elementi' : '') : ''}</span></div>
      ${todo.length ? `<div class="todo">${todo.map((x) => { const inner = `<div class="sp"><b>${x.t}</b><div class="small muted">${x.s}</div></div>${x.tag}`; return x.act ? `<div class="td" role="button" tabindex="0" ${x.act}>${inner}</div>` : `<a class="td" href="${x.href}">${inner}</a>`; }).join('')}</div>`
        : `<div class="empty">${loaded ? `<div class="okc">${ICON.check}</div>Tutto in ordine: nessun paziente da richiamare.` : 'Caricamento…'}</div>`}
    </div>
    <div class="card pad"><div class="sec-t"><h2>Giulia oggi</h2></div>
      <div class="gstat"><div><b class="serif">${n(apOpen.length)}</b><span>richieste di appuntamento aperte</span></div><div><b class="serif">${n(waiting.length)}</b><span>pazienti da richiamare</span></div></div>
      <div class="small muted" style="margin-top:14px">Giulia risponde al numero ${REF_NUMBER} al telefono e su WhatsApp, giorno e notte, e passa alla segreteria ciò che richiede una persona.</div>
      <a class="btn sm ghost" href="#panoramica" style="margin-top:14px">Apri l'assistente</a>
    </div>
  </div>

  <div class="sec-t"><h2>Fai crescere il tuo studio</h2><span class="small muted">Si attivano quando vuoi, nello stesso software</span></div>
  <div class="grid g3">${['avatar', 'social', 'gestionale'].map((k) => { const m = MODS[k]; const rq = reqOf(k); return `<a class="mod card" href="#${k}"><div class="mod-art art-${k}"></div><div class="pad"><div class="row" style="justify-content:space-between"><span class="pi">${ICON[k]}</span><span class="tag ${rq ? 'dark' : 'out'}">${rq ? 'Attivazione richiesta' : ICON.lock + ' Non attivo'}</span></div><div class="prod-n" style="margin-top:12px">${m.name}</div><div class="small muted">${m.kicker}</div><span class="prod-go">Scopri ${ICON.arrow}</span></div></a>`; }).join('')}</div>`;
}

/* ================= SITO ================= */
function vSito() {
  const chapters = ['Apertura', 'La Dottoressa', 'Smile Architecture 3D', 'Trattamenti', 'Lo studio', 'Storie di sorrisi', 'Tre città', 'Prenota'];
  const rq = reqOf('sito');
  return hdr('Sito web', 'Il nuovo sito dello studio, pronto in anteprima.', `<a class="btn plum" href="${SITE_URL}" target="_blank" rel="noopener">Apri il sito ↗</a>`) + `
  <div class="site-hero card">
    <div class="browser"><div class="bar"><i></i><i></i><i></i><span>annalisalongobardi.com</span></div>
      <a class="shot" href="${SITE_URL}" target="_blank" rel="noopener"><img src="media/reception.webp" alt="Anteprima del nuovo sito"><div class="shot-t"><small>IL TUO SORRISO PAZZESCO</small><b class="serif">Annalisa Longobardi</b><span>Ortognatodonzia ed estetica dentale · Napoli</span></div><span class="gbtn"><img src="media/ritratto.webp" alt="">Chatta con Giulia</span></a></div>
    <div class="site-side pad">
      <div class="kv"><span>Stato</span><b><span class="tag plum"><span class="dot"></span>Anteprima pronta</span></b></div>
      <div class="kv"><span>Sito attuale</span><b>Online e invariato</b></div>
      <div class="kv"><span>Pulsante Giulia</span><b>Attivo su WhatsApp</b></div>
      <div class="kv"><span>Versione</span><b>Computer e cellulare</b></div>
      <div class="row" style="margin-top:16px"><a class="btn sm" href="${SITE_URL}" target="_blank" rel="noopener">Apri l'anteprima</a><a class="btn sm ghost" href="${TOUR_URL}" target="_blank" rel="noopener">Tour 3D dello studio ↗</a></div>
    </div>
  </div>
  <div class="grid g2x" style="margin-top:20px">
    <div class="card pad"><div class="sec-t"><h2>Cosa c'è nel nuovo sito</h2></div>
      <ol class="chap">${chapters.map((c, i) => `<li><span>${String(i + 1).padStart(2, '0')}</span>${c}</li>`).join('')}</ol>
      <div class="small muted" style="margin-top:10px">Più il tour 3D con reception, sala operativa e ufficio, e la versione pensata per il cellulare.</div>
    </div>
    <div class="card pad"><div class="sec-t"><h2>Vuoi cambiare qualcosa?</h2></div>
      <p class="muted" style="margin-top:0">Scrivi cosa vorresti modificare: testi, foto, trattamenti, orari. Ci pensiamo noi.</p>
      ${rq ? `<div class="banner info" style="margin:0 0 12px"><span>${ICON.check}</span><div>Ultima richiesta inviata il ${fmtDT(rq.at)}<div class="small muted">${h(rq.note || '')}</div></div></div>` : ''}
      <form data-act="req-send" data-mod="sito"><textarea name="note" placeholder="Es. aggiungere la sede di Roma, cambiare la foto della reception…" required></textarea><button class="btn plum" style="margin-top:10px">Invia la richiesta</button></form>
    </div>
  </div>`;
}

/* ================= MODULI ================= */
function modPreview(k) {
  if (k === 'avatar') return `<div class="mp-phone"><div class="mp-vid"><img src="media/ritratto.webp" alt=""><span class="mp-play">${ICON.play}</span><div class="mp-cap"><small>Video FAQ</small><b>Quanto dura un trattamento con allineatori?</b></div><span class="mp-ai">Realizzato con AI</span></div>
    <div class="mp-row"><span class="tag plum">Da approvare</span><span class="small muted">0:42 · Italiano</span></div><div class="mp-row"><span class="mp-btn">Approva</span><span class="mp-btn ghost">Chiedi modifica</span></div></div>`;
  if (k === 'social') {
    const days = [['Lun', 'Reel', 'Il primo giorno con gli allineatori', 'Pubblicato'], ['Mer', 'Carosello', '3 cose da sapere sullo sbiancamento', 'Da approvare'], ['Ven', 'Post', 'Benvenuti nel nostro studio', 'Programmato']];
    return `<div class="mp-cal">${days.map(([d, t, x, s]) => `<div class="mp-post"><div class="mp-day">${d}</div><div class="mp-img ${t === 'Reel' ? 'r' : ''}" style="background-image:url(media/${t === 'Post' ? 'reception' : 'ritratto'}.webp)"></div><div class="small"><b>${t}</b><div class="muted">${x}</div></div><span class="tag ${s === 'Da approvare' ? 'plum' : s === 'Pubblicato' ? 'dark' : ''}">${s}</span></div>`).join('')}</div>`;
  }
  const ag = [['09:00', 'Prima visita ortodontica', 'Poltrona 1', 'Giulia'], ['10:30', 'Controllo allineatori', 'Poltrona 2', ''], ['12:00', 'Sbiancamento', 'Poltrona 1', ''], ['15:00', 'Consulenza faccette', 'Ufficio', 'Giulia']];
  return `<div class="mp-ag"><div class="mp-agh"><b class="serif">Oggi</b><span class="small muted">Napoli · 4 appuntamenti</span></div>${ag.map(([t, x, p, g]) => `<div class="mp-slot"><span class="mp-t">${t}</span><div class="sp"><b>${x}</b><div class="small muted">Paziente di esempio · ${p}</div></div>${g ? '<span class="tag plum">da Giulia</span>' : ''}</div>`).join('')}</div>`;
}
function vModule(k) {
  const m = MODS[k]; const rq = reqOf(k);
  return `<section class="mhero">
    <div class="mh-txt"><span class="tag out">${ICON.lock} Non ancora attivo</span><small>${m.kicker}</small><h1>${m.title}</h1><p>${m.lead}</p>
      <div class="row" style="margin-top:20px">${rq ? `<span class="tag dark" style="padding:8px 14px">${ICON.check} Attivazione richiesta il ${fmtD(rq.at)}</span><button class="btn ghost" data-act="mod-req" data-mod="${k}">Aggiungi una nota</button>` : `<button class="btn plum" data-act="mod-req" data-mod="${k}">Richiedi attivazione</button>`}</div>
      <div class="small muted" style="margin-top:10px">Nessun impegno: ti contattiamo per mostrarti come funziona.</div></div>
    <div class="mh-prev"><span class="prev-lbl">Anteprima</span>${modPreview(k)}</div>
  </section>
  <div class="grid g4">${m.feats.map(([t, d]) => `<div class="card pad feat"><span class="fc">${ICON.check}</span><b>${t}</b><p class="small muted">${d}</p></div>`).join('')}</div>`;
}
function reqModal(k) {
  const m = k === 'sito' ? { name: 'Sito web' } : MODS[k];
  modal(`<h3>Attiva ${h(m.name)}</h3><p class="muted">Inviamo la tua richiesta al team che gestisce il software: ti contattiamo per mostrarti il modulo e attivarlo quando vuoi.</p>
  <form data-act="req-send" data-mod="${k}"><label class="f"><span>Vuoi aggiungere qualcosa? (facoltativo)</span><textarea name="note" placeholder="Es. preferisco essere chiamata il martedì mattina"></textarea></label>
  <div class="row"><button class="btn plum">Invia richiesta</button><button type="button" class="btn ghost" data-act="close-modal">Annulla</button></div></form>`);
}

document.addEventListener('click', (e) => {
  const el = e.target.closest('[data-act]'); if (!el) return;
  if (el.dataset.act === 'mod-req') reqModal(el.dataset.mod);
  if (el.dataset.act === 'demo-reset' && window.__demoReset) window.__demoReset();
  if (el.dataset.act === 'menu') $('#side').classList.add('open'), $('#scrim').classList.add('on');
});
$('#scrim').addEventListener('click', () => { $('#side').classList.remove('open'); $('#scrim').classList.remove('on'); });
window.addEventListener('hashchange', () => $('#scrim').classList.remove('on'));
document.addEventListener('submit', async (e) => {
  const f = e.target; if (f.dataset.act !== 'req-send') return;
  e.preventDefault();
  const k = f.dataset.mod; const note = (new FormData(f).get('note') || '').toString().trim().slice(0, 600);
  if (k === 'sito' && !note) return;
  try {
    await write('requests/' + uid('rq'), { module: k, note, at: now(), by: S.me.id || '', byName: S.me.name || '', status: 'inviata' });
    audit('richiesta', (k === 'sito' ? 'Modifica sito' : 'Attivazione ' + MODS[k].name) + (note ? ': ' + note.slice(0, 120) : ''));
    closeModal(); f.reset && f.reset();
    toast(window.__DEMO ? 'Richiesta registrata' : k === 'sito' ? 'Richiesta inviata: ti aggiorniamo presto' : 'Richiesta inviata: ti contattiamo presto');
  } catch (err) { toast(errMsg(err)); }
});

/* ================= AGENDA ================= */
function srcTag(a) {
  const m = { telefono: ['phone', 'Telefono'], whatsapp: ['wa', 'WhatsApp'], web: ['ai', 'Chat'], manuale: ['team', 'Segreteria'] }[a.channel] || ['team', 'Segreteria'];
  return `<span class="src src-${h(a.channel || 'manuale')}">${ICON[m[0]].replace(/width="20" height="20"/, 'width="12" height="12"')}${m[1]}</span>`;
}
function agendaTop(list) {
  const open = list.filter((a) => a.status === 'ricevuta' || a.status === 'in_lavorazione').length;
  const k = (ic, l, v) => `<div class="card pad ak"><span class="pi">${ICON[ic]}</span><div><div class="v serif">${S.loaded.appts ? v : '…'}</div><div class="small muted">${l}</div></div></div>`;
  return `<div class="grid g3 akg" style="margin-bottom:12px">${k('phone', 'raccolti da Giulia al telefono', list.filter((a) => a.channel === 'telefono').length)}${k('wa', 'raccolti da Giulia su WhatsApp', list.filter((a) => a.channel === 'whatsapp').length)}${k('cal', 'da confermare con il paziente', open)}</div>
  <div class="banner info"><span>${ICON.ai}</span><div>Giulia raccoglie nome, recapito, sede, tipo di visita e giorno preferito. <b>La conferma la dà sempre lo studio</b>: un appuntamento diventa "Confermato" solo dopo il contatto con il paziente.</div></div>`;
}

/* ================= QUANDO RISPONDE GIULIA ================= */
const DAYN = ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'];
const WEEK = [1, 2, 3, 4, 5, 6, 0];
const toMin = (t) => { const [x, y] = String(t || '0:0').split(/[:.]/).map(Number); return (x || 0) * 60 + (y || 0); };
const inRange = (m, f, t) => (f <= t ? m >= f && m < t : m >= f || m < t);
function studioProfile() {
  const st = S.studio || {};
  const txt = st.orari || '';
  const mm = txt.match(/(\d{1,2}[:.]\d{2})\s*[–-]\s*(\d{1,2}[:.]\d{2})/);
  const days = /dom/i.test(txt) ? [0, 1, 2, 3, 4, 5, 6] : /sab/i.test(txt) ? [1, 2, 3, 4, 5, 6] : [1, 2, 3, 4, 5];
  const sedi = (st.sedi || []).filter((x) => x.city);
  return { from: mm ? mm[1].replace('.', ':') : '10:00', to: mm ? mm[2].replace('.', ':') : '18:00', days, raw: txt, unsure: /confermar|verific/i.test(txt), sedi };
}
const studioOpen = (d, p = studioProfile()) => p.days.includes(d.getDay()) && inRange(d.getHours() * 60 + d.getMinutes(), toMin(p.from), toMin(p.to));
const SCHED_DEF = {
  telefono: { mode: 'chiuso', wait: '0', sedi: ['tutte'], nFrom: '20:00', nTo: '08:00', cFrom: '09:00', cTo: '19:00', cDays: [1, 2, 3, 4, 5] },
  whatsapp: { mode: 'sempre', wait: '0', sedi: ['tutte'], nFrom: '20:00', nTo: '08:00', cFrom: '09:00', cTo: '19:00', cDays: [1, 2, 3, 4, 5] },
};
const getSched = (ch) => ({ ...SCHED_DEF[ch], ...((S.cfg && S.cfg.schedule && S.cfg.schedule[ch]) || {}) });
function activeAt(sc, d, p) {
  const m = d.getHours() * 60 + d.getMinutes();
  if (sc.mode === 'sempre') return true;
  if (sc.mode === 'chiuso') return !studioOpen(d, p);
  if (sc.mode === 'notte') return inRange(m, toMin(sc.nFrom), toMin(sc.nTo));
  if (sc.mode === 'orari') return (sc.cDays || []).map(Number).includes(d.getDay()) && inRange(m, toMin(sc.cFrom), toMin(sc.cTo));
  return true;
}
function giuliaActive(ch, d) { return activeAt(getSched(ch), d, studioProfile()); }
function sedeRule(channel) {
  const sc = getSched(channel === 'telefono' ? 'telefono' : 'whatsapp');
  const s = (sc.sedi || []).filter((x) => x !== 'tutte');
  if (!s.length || (sc.sedi || []).includes('tutte')) return '';
  return `7b. Gestisci solo le richieste per ${s.length > 1 ? 'le sedi' : 'la sede'} di ${s.join(', ')}. Per le altre sedi spiega con cortesia che lo studio ricontatterà il paziente e raccogli nome e recapito.\n`;
}
const WAITS = { telefono: [['0', 'Subito, al primo squillo'], ['3', 'Dopo 3 squilli senza risposta'], ['5', 'Dopo 5 squilli senza risposta']], whatsapp: [['0', 'Subito'], ['5', 'Dopo 5 minuti senza risposta'], ['15', 'Dopo 15 minuti senza risposta'], ['30', 'Dopo 30 minuti senza risposta']] };
function schedSummary(ch, sc, p) {
  const who = ch === 'telefono' ? 'al telefono' : 'su WhatsApp';
  const when = { sempre: 'sempre, 24 ore su 24', chiuso: `solo quando lo studio è chiuso (fuori da ${dayRange(p.days)} ${p.from}–${p.to})`, notte: `solo di notte, dalle ${sc.nFrom} alle ${sc.nTo}`, orari: `${dayRange((sc.cDays || []).map(Number))} dalle ${sc.cFrom} alle ${sc.cTo}` }[sc.mode];
  const sedi = (sc.sedi || []).includes('tutte') || !(sc.sedi || []).length ? 'per tutte le sedi' : 'solo per ' + sc.sedi.join(', ');
  const w = sc.wait && sc.wait !== '0' ? (ch === 'telefono' ? `, dopo ${sc.wait} squilli se nessuno risponde` : `, dopo ${sc.wait} minuti se la segreteria non ha risposto`) : '';
  return `Giulia risponde ${who} <b>${when}</b>, ${sedi}${w}.`;
}
function dayRange(days) {
  const o = WEEK.filter((d) => days.includes(d));
  if (!o.length) return 'nessun giorno';
  if (o.length === 7) return 'tutti i giorni';
  const idx = o.map((d) => WEEK.indexOf(d));
  const contig = idx.every((v, i) => i === 0 || v === idx[i - 1] + 1);
  return contig && o.length > 2 ? `${DAYN[o[0]]}–${DAYN[o[o.length - 1]]}` : o.map((d) => DAYN[d]).join(', ');
}
function weekGrid(sc, p) {
  const nowD = new Date();
  return `<div class="wk">${WEEK.map((wd) => {
    const cells = [...Array(24)].map((_, hh) => { const d = new Date(2026, 10, 15 + ((wd - 0 + 7) % 7), hh, 30); const on = activeAt(sc, d, p); const op = studioOpen(d, p); const cur = nowD.getDay() === wd && nowD.getHours() === hh; return `<i class="${on ? 'on' : ''} ${op ? 'op' : ''} ${cur ? 'cur' : ''}"></i>`; }).join('');
    return `<div class="wk-r"><span>${DAYN[wd]}</span><div class="wk-c">${cells}</div></div>`;
  }).join('')}<div class="wk-r wk-l"><span></span><div class="wk-c lbl"><b>0</b><b>6</b><b>12</b><b>18</b><b>24</b></div></div>
  <div class="wk-leg"><span><i class="on"></i>Risponde Giulia</span><span><i class="op"></i>Studio aperto</span><span><i></i>Studio chiuso</span></div></div>`;
}
function schedPanel(ch) {
  const sc = getSched(ch); const p = studioProfile(); const ed = can('giulia.config');
  const dis = ed ? '' : 'disabled';
  const nowOn = activeAt(sc, new Date(), p);
  const opt = (v, t, d) => `<label class="mo ${sc.mode === v ? 'on' : ''}"><input type="radio" name="mode" value="${v}" ${sc.mode === v ? 'checked' : ''} ${dis}><b>${t}</b><span>${d}</span></label>`;
  const sedeChip = (v, l, note) => `<label class="chip"><input type="checkbox" name="sedi" value="${h(v)}" ${(sc.sedi || []).includes(v) ? 'checked' : ''} ${dis}><span>${h(l)}${note ? ` <em>${note}</em>` : ''}</span></label>`;
  return `<form class="card sched" data-act="sched-save" data-ch="${ch}" style="margin-bottom:18px">
  <div class="pad sec-t" style="margin:0;padding-bottom:8px"><div><h2>Quando risponde Giulia ${ch === 'telefono' ? 'al telefono' : 'su WhatsApp'}</h2><div class="small muted" style="margin-top:2px">Le opzioni partono dal profilo dello studio della Dottoressa.</div></div><span class="tag ${nowOn ? 'plum' : 'dark'}" id="now-${ch}"><span class="dot"></span>${nowOn ? 'Adesso risponde Giulia' : 'Adesso risponde lo studio'}</span></div>
  <div class="pad" style="padding-top:6px">
    <div class="prof"><span>${ICON.gear}</span><div><b>Profilo dello studio</b><div class="small">Orari: ${h(dayRange(p.days))} ${h(p.from)}–${h(p.to)}${p.unsure ? ' <span class="tag out">da confermare</span>' : ''} · Sedi: ${p.sedi.map((x) => h(x.city) + (x.state !== 'verificata' ? ' <em>(in verifica)</em>' : '')).join(', ') || '—'}</div></div><a class="small" href="#impostazioni">Modifica</a></div>
    <div class="sl">Quando</div>
    <div class="modes">
      ${opt('sempre', 'Sempre', '24 ore su 24, ogni giorno')}
      ${opt('chiuso', 'Quando lo studio è chiuso', `Sere, notti e giorni di chiusura: fuori da ${dayRange(p.days)} ${p.from}–${p.to}`)}
      ${opt('notte', 'Solo di notte', `<span class="tm"><input type="time" name="nFrom" value="${h(sc.nFrom)}" ${dis}> – <input type="time" name="nTo" value="${h(sc.nTo)}" ${dis}></span>`)}
      ${opt('orari', 'Orari personalizzati', `<span class="tm"><input type="time" name="cFrom" value="${h(sc.cFrom)}" ${dis}> – <input type="time" name="cTo" value="${h(sc.cTo)}" ${dis}></span><span class="dys">${WEEK.map((d) => `<label><input type="checkbox" name="cDays" value="${d}" ${(sc.cDays || []).map(Number).includes(d) ? 'checked' : ''} ${dis}><span>${DAYN[d]}</span></label>`).join('')}</span>`)}
    </div>
    <div class="grid g2" style="margin-top:16px;gap:16px">
      <div><div class="sl">Dopo quanto tempo</div><select name="wait" ${dis}>${WAITS[ch].map(([v, l]) => `<option value="${v}" ${String(sc.wait) === v ? 'selected' : ''}>${l}</option>`).join('')}</select><div class="small muted" style="margin-top:6px">${ch === 'telefono' ? 'Prima squilla in studio: se nessuno risponde, risponde Giulia.' : 'Prima può rispondere la segreteria: se non lo fa, risponde Giulia.'}</div></div>
      <div><div class="sl">Per quali sedi</div><div class="chips">${sedeChip('tutte', 'Tutte le sedi')}${p.sedi.map((x) => sedeChip(x.city, x.city, x.state !== 'verificata' ? 'in verifica' : '')).join('')}</div></div>
    </div>
    <div class="sl" style="margin-top:18px">La tua settimana</div>
    <div id="wk-${ch}">${weekGrid(sc, p)}</div>
    <div class="sum" id="sum-${ch}">${schedSummary(ch, sc, p)}</div>
    <div class="row" style="margin-top:14px">${ed ? '<button class="btn plum">Salva</button>' : '<span class="small muted">Solo la Dottoressa e l\'amministratore possono modificare.</span>'}<span class="small muted">Le chat di prova seguono già queste regole.</span></div>
  </div></form>`;
}
function readSched(f) {
  const fd = new FormData(f);
  let sedi = fd.getAll('sedi').map(String);
  return { mode: String(fd.get('mode') || 'sempre'), wait: String(fd.get('wait') || '0'), sedi: sedi.length ? sedi : ['tutte'], nFrom: String(fd.get('nFrom') || '20:00'), nTo: String(fd.get('nTo') || '08:00'), cFrom: String(fd.get('cFrom') || '09:00'), cTo: String(fd.get('cTo') || '19:00'), cDays: fd.getAll('cDays').map(Number) };
}
document.addEventListener('change', (e) => {
  const f = e.target.closest && e.target.closest('form[data-act="sched-save"]'); if (!f) return;
  const ch = f.dataset.ch;
  if (e.target.name === 'sedi') {
    const boxes = [...f.querySelectorAll('input[name="sedi"]')];
    if (e.target.value === 'tutte' && e.target.checked) boxes.forEach((b) => { if (b.value !== 'tutte') b.checked = false; });
    else if (e.target.value !== 'tutte' && e.target.checked) boxes.forEach((b) => { if (b.value === 'tutte') b.checked = false; });
    if (!boxes.some((b) => b.checked)) boxes[0].checked = true;
  }
  f.querySelectorAll('.mo').forEach((l) => l.classList.toggle('on', l.querySelector('input[name="mode"]').checked));
  const sc = readSched(f); const p = studioProfile();
  $('#wk-' + ch).innerHTML = weekGrid(sc, p);
  $('#sum-' + ch).innerHTML = schedSummary(ch, sc, p);
  const on = activeAt(sc, new Date(), p); const t = $('#now-' + ch);
  t.className = 'tag ' + (on ? 'plum' : 'dark'); t.innerHTML = '<span class="dot"></span>' + (on ? 'Adesso risponde Giulia' : 'Adesso risponde lo studio');
});
document.addEventListener('submit', async (e) => {
  const f = e.target; if (f.dataset.act !== 'sched-save') return;
  e.preventDefault();
  if (!can('giulia.config')) return toast('Non disponibile per il tuo ruolo');
  const ch = f.dataset.ch; const sc = readSched(f);
  if (sc.mode === 'orari' && !sc.cDays.length) return toast('Scegli almeno un giorno');
  try {
    const all = { ...((S.cfg && S.cfg.schedule) || {}) }; all[ch] = sc;
    await write('config/giulia', { schedule: all, updatedAt: now(), updatedBy: S.me.id }, true);
    audit('disponibilita_giulia', `${ch}: ${schedSummary(ch, sc, studioProfile()).replace(/<[^>]+>/g, '')}`);
    toast('Salvato: ' + (ch === 'telefono' ? 'telefono' : 'WhatsApp') + ' aggiornato');
  } catch (err) { toast(errMsg(err)); }
});
