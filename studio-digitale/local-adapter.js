/* Versione dimostrativa pubblica: sostituisce i servizi della piattaforma con equivalenti locali.
   - Dati: salvati solo nel browser di chi apre la pagina (localStorage), si azzerano con "Azzera le prove".
   - Giulia di prova: risposte d'esempio basate sulle informazioni approvate dello studio.
   - Voce: sintesi e dettatura del browser, se disponibili. */
'use strict';
(function () {
  window.__DEMO = true;
  const KEY = 'al-studio-digitale-demo-v2';
  let store;
  try { store = JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (e) { store = null; }
  if (!store) store = JSON.parse(JSON.stringify(window.__DEMO_SEED));
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(store)); } catch (e) { /* memoria del browser non disponibile */ } };
  window.__demoReset = () => { try { localStorage.removeItem(KEY); } catch (e) {} location.hash = ''; location.reload(); };

  const listeners = new Set();
  const notify = () => { save(); setTimeout(() => listeners.forEach((f) => f()), 0); };
  const snapCol = (name, q) => {
    let docs = Object.keys(store).filter((k) => k.startsWith(name + '/') && k.split('/').length === 2).map((k) => ({ id: k.split('/')[1], data: () => store[k] }));
    if (q.order) { const [f, dir] = q.order; docs.sort((a, b) => String(a.data()[f] || '').localeCompare(String(b.data()[f] || '')) * (dir === 'desc' ? -1 : 1)); }
    if (q.lim) docs = docs.slice(0, q.lim);
    return { docs };
  };
  function query(name, q = {}) {
    return {
      orderBy: (f, dir) => query(name, { ...q, order: [f, dir] }),
      limit: (n) => query(name, { ...q, lim: n }),
      doc: (id) => db.doc(name + '/' + id),
      onSnapshot(cb) { const f = () => cb(snapCol(name, q)); listeners.add(f); setTimeout(f, 0); return () => listeners.delete(f); },
    };
  }
  const merge = (a, b) => { const o = { ...(a || {}) }; for (const k in b) o[k] = b[k]; return o; };
  const db = {
    collection: (name) => query(name),
    doc(path) {
      return {
        async get() { return { exists: !!store[path], data: () => store[path] }; },
        onSnapshot(cb) { const f = () => cb({ exists: !!store[path], data: () => store[path] }); listeners.add(f); setTimeout(f, 0); return () => listeners.delete(f); },
        async set(d) { store[path] = JSON.parse(JSON.stringify(d)); notify(); },
        async update(d) { store[path] = merge(store[path], JSON.parse(JSON.stringify(d))); notify(); },
        async delete() { delete store[path]; notify(); },
      };
    },
  };
  const user = { isOwner: () => true, id: async () => 'demo-titolare', me: async () => ({ name: 'Dott.ssa Annalisa Longobardi' }), search: async () => [] };

  /* ---- Giulia di prova: risposte d'esempio dalle informazioni approvate ---- */
  const kbPub = () => Object.keys(store).filter((k) => k.startsWith('kb/') && store[k].pub && store[k].state === 'pubblicato').map((k) => ({ id: k.slice(3), ...store[k].pub }));
  const body = (id) => { const k = kbPub().find((x) => x.id === id); return k ? k.body : ''; };
  const TOPICS = [
    [/urgen|dolor|male ai denti|gonfi|sangu|trauma|febbre|rott/, null],
    [/invisalign|allineator|mascherin|apparecchi|storti|ortodon/, 'invisalign', 'Invisalign'],
    [/faccett|lumineers/, 'faccette', 'Faccette'],
    [/sbianc|bianc|blancone/, 'sbiancamento', 'Sbiancamento'],
    [/bambin|figli|piccol|pedodon|anni/, 'pedodonzia', 'Pedodonzia'],
    [/atm|mandibol|gnatolog|mascell|click/, 'gnatologia', 'Gnatologia'],
    [/impiant|igien|pulizia|carie|devitaliz|protesi|gengiv/, 'altri-trattamenti', 'Trattamenti'],
    [/dove|indirizz|sede|napoli|arriv/, 'sede-napoli', 'Sedi'],
    [/telefon|numero|email|contatt|whatsapp/, 'contatti', 'Contatti'],
    [/prezz|cost|quanto vien|tariff|preventiv/, 'prezzi', 'Prezzi'],
    [/chi è|dottoressa|esperienz|laurea|specializ/, 'profilo', 'Dottoressa'],
  ];
  const lastPatient = (prompt) => { const m = [...prompt.matchAll(/PAZIENTE: <<([\s\S]*?)>>/g)]; return m.length ? m[m.length - 1][1] : ''; };
  const transcriptOf = (prompt) => [...prompt.matchAll(/(PAZIENTE|GIULIA|SEGRETERIA): <<([\s\S]*?)>>/g)].map((m) => ({ who: m[1], t: m[2] }));
  function demoReply(prompt) {
    const tr = transcriptOf(prompt);
    const txt = lastPatient(prompt); const t = txt.toLowerCase();
    const phone = /Canale: telefono/.test(prompt);
    const first = tr.filter((x) => x.who === 'GIULIA').length === 0;
    const hi = first ? 'Buongiorno, sono Giulia, l\'assistente virtuale dello studio della Dott.ssa Longobardi. ' : '';
    const outside = /FUORI DISPONIBILITÀ/.test(prompt);
    // richiesta appuntamento in corso
    const askedAppt = tr.some((x) => x.who === 'GIULIA' && /nome, un recapito/.test(x.t));
    if (askedAppt && /\d{3}|@/.test(txt)) {
      const name = (txt.match(/(?:sono|mi chiamo)\s+([A-ZÀ-Ü][a-zà-ü]+)/) || txt.match(/^([A-ZÀ-Ü][a-zà-ü]+)/) || [])[1] || 'Paziente';
      const contact = (txt.match(/[\w.+-]+@[\w-]+\.\w+/) || txt.match(/\+?\d[\d\s]{6,}\d/) || [''])[0];
      const pref = (txt.match(/(luned[iì]|marted[iì]|mercoled[iì]|gioved[iì]|venerd[iì]|sabato)[^,.]*/i) || [''])[0];
      return { reply: `Grazie ${name}, ho registrato la Sua richiesta${pref ? ' per ' + pref : ''}. La segreteria La ricontatterà per confermare giorno e orario.`, intent: 'appuntamento', topic: 'Appuntamento',
        appointment: { name, contact, sede: 'Napoli', tipo: 'Prima visita', preferred: pref || 'Da concordare', prefDate: '' } };
    }
    if (/^(ciao|salve|buongiorno|buonasera|buon pomeriggio)\W*$/.test(t.trim())) return { reply: (hi || 'Buongiorno! ') + 'Come posso aiutarLa?', intent: 'saluto', topic: 'Saluto', appointment: null };
    if (TOPICS[0][0].test(t)) return { reply: 'Mi dispiace. Per dolore forte, gonfiore o un trauma La invito a chiamare subito lo studio al 081 545 3461; se la situazione è grave, contatti il 112. Segnalo la Sua richiesta alla segreteria.', intent: 'urgenza', topic: 'Urgenza', appointment: null };
    if (/appuntament|prenot|visita|venire in studio|disponibilit/.test(t)) return { reply: hi + 'Con piacere registro una richiesta di appuntamento. Mi lascia nome, un recapito e il giorno o la fascia oraria che preferisce?', intent: 'appuntamento', topic: 'Appuntamento', appointment: null };
    if (/orar|aperti|apert|chius/.test(t)) return { reply: hi + 'Gli orari precisi li conferma la segreteria. Se vuole, registro una richiesta e La facciamo ricontattare.', intent: 'non_so', topic: 'Orari', appointment: null, question: txt };
    if (/roma|milano/.test(t)) return { reply: hi + 'Per le sedi di Roma e Milano preferisco farLa ricontattare dalla segreteria, così riceve informazioni precise.', intent: 'non_so', topic: 'Sedi', appointment: null, question: txt };
    for (const [re, id, topic] of TOPICS.slice(1)) {
      if (re.test(t)) { const b = body(id); if (b) return { reply: hi + b + (id === 'prezzi' ? '' : phone ? ' Desidera che registri una richiesta di appuntamento?' : ' Vuole che registri una richiesta di appuntamento?'), intent: 'info', topic, appointment: null }; }
    }
    if (outside && first) return { reply: hi + 'In questo momento lo studio è chiuso: registro la Sua richiesta e verrà ricontattata appena possibile. Come posso aiutarLa?', intent: 'saluto', topic: 'Fuori orario', appointment: null };
    return { reply: hi + 'Su questo non ho un\'informazione verificata: preferisco farLa ricontattare dalla segreteria.', intent: 'non_so', topic: 'Altro', appointment: null, question: txt };
  }
  const sample = { json: async (prompt) => { await new Promise((r) => setTimeout(r, 650)); return demoReply(prompt); } };

  /* ---- voce del browser ---- */
  let tts = null;
  if ('speechSynthesis' in window) {
    tts = {
      speak: (text) => new Promise((res) => { const u = new SpeechSynthesisUtterance(text); u.lang = 'it-IT'; const v = speechSynthesis.getVoices().find((x) => /^it/i.test(x.lang) && /female|alice|elsa|federica|google/i.test(x.name)) || speechSynthesis.getVoices().find((x) => /^it/i.test(x.lang)); if (v) u.voice = v; u.onend = res; u.onerror = res; speechSynthesis.cancel(); speechSynthesis.speak(u); }),
      stop: () => speechSynthesis.cancel(),
    };
  }
  let dictation = null;
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (SR) {
    const cb = { p: () => {}, f: () => {}, s: () => {} }; let rec = null;
    dictation = {
      onPartial: (f) => { cb.p = f; }, onFinal: (f) => { cb.f = f; }, onState: (f) => { cb.s = f; },
      start: () => new Promise((res, rej) => {
        rec = new SR(); rec.lang = 'it-IT'; rec.interimResults = true; rec.continuous = true;
        rec.onresult = (e) => { for (let i = e.resultIndex; i < e.results.length; i++) { const r = e.results[i]; (r.isFinal ? cb.f : cb.p)({ text: r[0].transcript }); } };
        rec.onstart = () => { cb.s({ state: 'listening' }); res(); };
        rec.onerror = (e) => { cb.s({ state: 'idle' }); rej(new Error(e.error === 'not-allowed' ? 'Microfono non autorizzato' : 'Microfono non disponibile')); };
        rec.onend = () => cb.s({ state: 'idle' });
        try { rec.start(); } catch (e) { rej(e); }
      }),
      stop: async () => { if (rec) { rec.stop(); await new Promise((r) => setTimeout(r, 350)); } },
    };
  }

  const caps = { db, user, sample, tts, dictation, mcp: null };
  window.claude = { use: async (n) => caps[n] || null };
})();
