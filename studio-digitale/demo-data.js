/* Dati iniziali della versione dimostrativa (pubblica). Parte vuota: compaiono solo le prove fatte in questa pagina. */
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

  // Nessuna conversazione d'esempio: compaiono solo le prove fatte dalla Dottoressa.
  return store;
})();
