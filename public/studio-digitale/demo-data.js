/* Dati iniziali della versione dimostrativa (pubblica). Nessun dato reale di pazienti: le conversazioni sono esempi. */
window.__DEMO_SEED = (function () {
  const T0 = '2026-11-15T09:00:00Z';
  const SITO = 'Sito ufficiale annalisalongobardi.com';
  const MD = 'MioDottore (profilo pubblico)';
  const kb = [
    ['profilo', 'Dott.ssa Annalisa Longobardi', 'Chi è la Dottoressa', 'La Dott.ssa Annalisa Longobardi è odontoiatra specialista in Ortognatodonzia ed è titolare di studio privato dal 2002. Il motto dello studio è "Il tuo sorriso pazzesco".', 'pubblicato', SITO],
    ['formazione', 'Dott.ssa Annalisa Longobardi', 'Formazione', 'Laurea in Odontoiatria e Protesi Dentaria con lode nel 2001; specializzazione in Ortognatodonzia nel 2005 alla Seconda Università di Napoli. Cultore della materia in Ortognatodonzia all\'Università della Campania "Luigi Vanvitelli".', 'pubblicato', SITO],
    ['affiliazioni', 'Dott.ssa Annalisa Longobardi', 'Società scientifiche', 'Socia ordinaria SIDO (Società Italiana di Ortodonzia), socia SINET e membro della CH Tweed Foundation.', 'pubblicato', SITO],
    ['riconoscimenti', 'Dott.ssa Annalisa Longobardi', 'Riconoscimenti dello studio', 'Lo studio è Diamond Apex Invisalign Provider, Centro di Eccellenza Lumineers per le faccette e Centro d\'Eccellenza per lo sbiancamento BlancOne.', 'pubblicato', SITO],
    ['filosofia', 'Dott.ssa Annalisa Longobardi', 'Approccio della Dottoressa', 'Ogni sorriso viene valutato nella sua unicità, considerando insieme estetica, salute e armonia del volto, partendo dall\'ascolto del paziente. L\'obiettivo sono risultati naturali ed equilibrati.', 'pubblicato', SITO],
    ['invisalign', 'Trattamenti', 'Invisalign', 'Allineatori trasparenti Invisalign per correggere le malocclusioni. Lo studio è Diamond Apex Invisalign Provider. Durata e piano si definiscono in prima visita.', 'pubblicato', SITO],
    ['faccette', 'Trattamenti', 'Faccette in ceramica', 'Faccette in ceramica per migliorare il sorriso mantenendo un aspetto naturale. Lo studio è Centro di Eccellenza Lumineers.', 'pubblicato', SITO],
    ['sbiancamento', 'Trattamenti', 'Sbiancamento dentale', 'Trattamento per schiarire i denti, che nel tempo possono scurirsi per esempio con fumo, tè e caffè. Lo studio è Centro d\'Eccellenza BlancOne.', 'pubblicato', SITO],
    ['ortodonzia', 'Trattamenti', 'Ortodonzia', 'Correzione delle malocclusioni e allineamento dei denti, per bambini e adulti. È la specializzazione della Dottoressa.', 'pubblicato', SITO],
    ['pedodonzia', 'Trattamenti', 'Dentista dei bambini (pedodonzia)', 'Lo studio segue anche i più piccoli: la prima visita è consigliata tra i 18 e i 24 mesi.', 'pubblicato', SITO],
    ['gnatologia', 'Trattamenti', 'Gnatologia', 'Studio delle funzioni e dei disturbi dell\'articolazione temporo-mandibolare (ATM).', 'pubblicato', SITO],
    ['altri-trattamenti', 'Trattamenti', 'Altri trattamenti', 'Lo studio offre anche igiene orale, conservativa, endodonzia, parodontologia, implantologia, protesi fissa e mobile, chirurgia orale e impronta digitale.', 'pubblicato', SITO],
    ['bonding', 'Trattamenti', 'Bonding (composito)', 'Trattamento citato nel nuovo sito ma non presente nelle fonti pubbliche.', 'da_verificare', 'Da confermare con la Dottoressa', 'Non trovato nelle fonti pubbliche: serve conferma prima dell\'uso.'],
    ['sede-napoli', 'Sedi', 'Sede di Napoli', 'Lo studio si trova in Piazza Medaglie d\'Oro 27, 80128 Napoli.', 'pubblicato', SITO],
    ['sede-roma', 'Sedi', 'Sede di Roma', 'Roma: MioDottore riporta Via Salaria 44 (00198) e, in un altro punto, Viale Leonardo da Vinci 114. La sede non compare sul sito ufficiale.', 'discordante', MD, 'Due indirizzi diversi su MioDottore, assente sul sito: Giulia non la usa.'],
    ['sede-milano', 'Sedi', 'Sede di Milano', 'Milano: MioDottore riporta Piazza della Repubblica 32 (20124), senza prenotazione online. Non compare sul sito ufficiale.', 'da_verificare', MD, 'Solo su MioDottore: da confermare.'],
    ['orari', 'Orari', 'Orari dello studio', 'Il sito indica "Lun/Ven 10:00–18:00": non è chiaro se significhi dal lunedì al venerdì.', 'da_verificare', SITO, 'Formula ambigua sul sito: da confermare.'],
    ['contatti', 'Contatti', 'Contatti dello studio', 'Telefono studio: 081 545 3461. WhatsApp: 335 841 0578. Email: annalisalongobardi@hotmail.it.', 'pubblicato', SITO],
    ['telefono-miodottore', 'Contatti', 'Numero su MioDottore', 'MioDottore indica 081 1928 9056, diverso dal numero del sito (081 545 3461).', 'discordante', MD, 'Numeri discordanti: Giulia usa solo quello del sito.'],
    ['prenotare', 'Appuntamenti', 'Come prenotare', 'Si può chiedere un appuntamento per telefono, WhatsApp o email allo studio. La segreteria ricontatta per confermare giorno e orario.', 'pubblicato', SITO],
    ['prima-visita', 'Appuntamenti', 'Prima visita gratuita', 'MioDottore indica la prima visita odontoiatrica gratuita.', 'da_verificare', MD, 'Fonte non ufficiale: da confermare.'],
    ['pagamenti', 'Informazioni amministrative', 'Modalità di pagamento', 'MioDottore indica: contanti, assegno, carte di credito e debito, finanziamento, bonifico.', 'da_verificare', MD],
    ['prezzi', 'FAQ', 'Mi può dire il prezzo?', 'Giulia non comunica tariffe: dipendono dalla valutazione in visita. La segreteria può dare indicazioni.', 'pubblicato', 'Regola dello studio'],
  ];
  const store = {};
  kb.forEach(([id, cat, title, body, state, source, note]) => {
    store['kb/' + id] = { title, body: state === 'pubblicato' ? body : body, cat, createdAt: T0, draft: null, note: note || '', source, sourceUrl: '', state, verifiedAt: T0,
      pub: state === 'pubblicato' ? { approvedAt: T0, approvedBy: 'Verifica fonte ufficiale', body, title, version: 1 } : null };
  });
  store['kb/faq-durata-invisalign'] = { title: 'Quanto dura un trattamento Invisalign?', body: '', cat: 'FAQ', createdAt: T0, note: '', pub: null, source: 'Proposta del supporto tecnico, da approvare', sourceUrl: '', state: 'in_revisione', verifiedAt: T0,
    draft: { at: T0, by: 'Supporto tecnico', title: 'Quanto dura un trattamento Invisalign?', body: 'La durata dipende dal caso: la Dottoressa la indica dopo la prima visita, quando definisce il piano di trattamento.' } };
  store['config/giulia'] = {
    channels: { telefono: { enabled: true, note: 'Numero 081 1929 7944 collegato in prova', state: 'operativo' }, whatsapp: { enabled: true, note: 'WhatsApp 081 1929 7944 collegato in prova', state: 'operativo' }, web: { enabled: true, note: 'Chat di prova e demo vocale', state: 'sandbox' } },
    handoff: { keywords: ['operatore', 'parlare con una persona', 'persona reale', 'segreteria', 'parlare con la dottoressa'], onUnknown: true, onUrgent: true },
    offMsg: 'In questo momento la segreteria non è disponibile: registro la Sua richiesta e verrà ricontattata appena possibile.',
    phoneGreeting: 'Buongiorno, sono Giulia, l\'assistente virtuale dello studio della Dott.ssa Annalisa Longobardi. Come posso aiutarLa?',
    waGreeting: 'Buongiorno! Sono Giulia, l\'assistente virtuale dello studio della Dott.ssa Annalisa Longobardi.\nPosso aiutarLa con informazioni sui trattamenti, sulle sedi o con una richiesta di appuntamento.\nCome posso esserLe utile?',
    tone: 'caldo', updatedAt: T0,
  };
  store['config/studio'] = { avviso: '', email: 'annalisalongobardi@hotmail.it', operatori: ['Segreteria Napoli'], orari: 'Lun/Ven 10:00–18:00 (da confermare)', retention: 90, telefono: '081 545 3461', whatsapp: '335 841 0578', updatedAt: T0,
    sedi: [{ address: 'Piazza Medaglie d\'Oro 27, 80128 Napoli', city: 'Napoli', source: 'Sito ufficiale', state: 'verificata' }, { address: '', city: 'Roma', source: 'Solo MioDottore', state: 'in_verifica' }, { address: '', city: 'Milano', source: 'Solo MioDottore', state: 'in_verifica' }] };

  // Esempi (marcati "esempio" nell'interfaccia): date relative al giorno di apertura
  const d = (days, hh, mm) => { const x = new Date(); x.setDate(x.getDate() - days); x.setHours(hh, mm, 0, 0); return x.toISOString(); };
  const ymd = (days) => { const x = new Date(); x.setDate(x.getDate() + days); return `${x.getFullYear()}-${String(x.getMonth() + 1).padStart(2, '0')}-${String(x.getDate()).padStart(2, '0')}`; };
  const M = (role, text, at) => ({ role, text, at });
  const convs = {
    'ex-c1': { channel: 'telefono', patient: 'Chiara R.', callerNumber: '', sede: 'Napoli', topic: 'Invisalign', createdAt: d(1, 21, 14), updatedAt: d(1, 21, 17), duration: 168, summary: 'Chiede informazioni su Invisalign e lascia una richiesta di prima visita.', status: 'chiusa', labels: ['Invisalign'],
      messages: [M('giulia', 'Buongiorno, sono Giulia, l\'assistente virtuale dello studio della Dott.ssa Annalisa Longobardi. Come posso aiutarLa?', d(1, 21, 14)), M('patient', 'Salve, vorrei informazioni sugli allineatori trasparenti.', d(1, 21, 14)), M('giulia', 'Certo. Lo studio è Diamond Apex Invisalign Provider: durata e piano si definiscono in prima visita. Vuole che registri una richiesta di appuntamento?', d(1, 21, 15)), M('patient', 'Sì, Chiara, 333 000 0000, preferibilmente martedì mattina.', d(1, 21, 16)), M('sys', 'Richiesta di appuntamento registrata in dashboard', d(1, 21, 17))], apptId: 'ex-a1' },
    'ex-c2': { channel: 'telefono', patient: 'Marco D.', sede: 'Napoli', topic: 'Urgenza', createdAt: d(1, 8, 2), updatedAt: d(1, 8, 4), duration: 95, summary: 'Riferisce dolore e gonfiore: segnalato alla segreteria per essere richiamato.', status: 'attesa_operatore', urgent: true, labels: ['urgenza'], handoff: { at: d(1, 8, 4), reason: 'Possibile urgenza riferita al telefono' },
      messages: [M('patient', 'Buongiorno, ho un forte dolore e la guancia gonfia da ieri sera.', d(1, 8, 2)), M('giulia', 'Mi dispiace. Per dolore forte e gonfiore la invito a chiamare lo studio al numero 081 545 3461 appena apre; se peggiora, contatti il 112. Segnalo subito la Sua chiamata alla segreteria.', d(1, 8, 3)), M('sys', 'Da richiamare: segnalata alla segreteria', d(1, 8, 4))] },
    'ex-c3': { channel: 'telefono', patient: 'Giovanni P.', sede: 'Napoli', topic: 'Sedi', createdAt: d(2, 19, 40), updatedAt: d(2, 19, 41), duration: 52, summary: 'Chiede l\'indirizzo dello studio di Napoli.', status: 'chiusa', labels: [],
      messages: [M('patient', 'Dove si trova lo studio?', d(2, 19, 40)), M('giulia', 'Lo studio si trova in Piazza Medaglie d\'Oro 27, a Napoli.', d(2, 19, 41))] },
    'ex-w1': { channel: 'whatsapp', patient: 'Francesca L.', sede: 'Napoli', topic: 'Pedodonzia', createdAt: d(1, 22, 5), updatedAt: d(1, 22, 9), status: 'chiusa', labels: ['bambini'], apptId: 'ex-a2',
      messages: [M('patient', 'Buonasera, a che età si porta un bambino dal dentista?', d(1, 22, 5)), M('giulia', 'Buonasera! Lo studio consiglia la prima visita tra i 18 e i 24 mesi. Desidera una richiesta di appuntamento?', d(1, 22, 6)), M('patient', 'Sì, per mia figlia di 2 anni. Francesca, 347 000 0000, sabato se possibile.', d(1, 22, 8)), M('giulia', 'Perfetto, ho registrato la richiesta: la segreteria La ricontatterà per confermare giorno e orario.', d(1, 22, 9)), M('sys', 'Richiesta di appuntamento registrata in dashboard', d(1, 22, 9))] },
    'ex-w2': { channel: 'whatsapp', patient: 'Luca M.', sede: '', topic: 'Prezzi', createdAt: d(2, 13, 20), updatedAt: d(2, 13, 22), status: 'attesa_operatore', labels: ['preventivo'], handoff: { at: d(2, 13, 22), reason: 'Il paziente chiede una persona' },
      messages: [M('patient', 'Quanto costano le faccette?', d(2, 13, 20)), M('giulia', 'Le tariffe dipendono dalla valutazione in visita, per questo non posso indicarle. Posso farla ricontattare dalla segreteria?', d(2, 13, 21)), M('patient', 'Sì, vorrei parlare con una persona.', d(2, 13, 21)), M('giulia', 'Certo. Ho segnalato la Sua richiesta alla segreteria: una persona dello studio Le risponderà appena possibile.', d(2, 13, 22)), M('sys', 'Conversazione passata alla segreteria · Giulia in pausa', d(2, 13, 22))] },
    'ex-w3': { channel: 'whatsapp', patient: 'Sara T.', sede: 'Napoli', topic: 'Sbiancamento', createdAt: d(3, 23, 30), updatedAt: d(3, 23, 33), status: 'chiusa', labels: [], apptId: 'ex-a3',
      messages: [M('patient', 'Fate lo sbiancamento?', d(3, 23, 30)), M('giulia', 'Sì, lo studio è Centro d\'Eccellenza BlancOne per lo sbiancamento. Desidera prenotare una visita?', d(3, 23, 31)), M('patient', 'Sì, Sara, sara@email.it, giovedì pomeriggio.', d(3, 23, 32)), M('sys', 'Richiesta di appuntamento registrata in dashboard', d(3, 23, 33))] },
  };
  Object.entries(convs).forEach(([id, c]) => { store['convs/' + id] = { demo: true, aiPaused: c.status === 'attesa_operatore', ...c }; });
  const ap = {
    'ex-a1': { channel: 'telefono', name: 'Chiara R.', contact: '333 ••• 00', sede: 'Napoli', tipo: 'Prima visita Invisalign', preferred: 'Martedì mattina', prefDate: ymd(2), status: 'ricevuta', convId: 'ex-c1', createdAt: d(1, 21, 17) },
    'ex-a2': { channel: 'whatsapp', name: 'Francesca L.', contact: '347 ••• 00', sede: 'Napoli', tipo: 'Prima visita bambina', preferred: 'Sabato', prefDate: ymd(6), status: 'in_lavorazione', convId: 'ex-w1', createdAt: d(1, 22, 9) },
    'ex-a3': { channel: 'whatsapp', name: 'Sara T.', contact: 'sara@•••', sede: 'Napoli', tipo: 'Sbiancamento', preferred: 'Giovedì pomeriggio', prefDate: ymd(4), status: 'confermata', convId: 'ex-w3', createdAt: d(3, 23, 33), confirm: { by: 'Segreteria', at: d(2, 10, 0) } },
    'ex-a4': { channel: 'manuale', name: 'Paolo G.', contact: '339 ••• 00', sede: 'Napoli', tipo: 'Controllo ortodontico', preferred: 'Mercoledì 15:00', prefDate: ymd(3), status: 'confermata', createdAt: d(4, 11, 0), confirm: { by: 'Segreteria', at: d(4, 11, 0) } },
  };
  Object.entries(ap).forEach(([id, a]) => { store['appts/' + id] = { demo: true, assignedTo: '', updatedAt: a.createdAt, log: [{ at: a.createdAt, by: 'giulia', st: 'ricevuta' }], ...a }; });
  return store;
})();
