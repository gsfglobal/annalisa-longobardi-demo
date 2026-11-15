/**
 * Testi di approfondimento per i trattamenti principali.
 * Informazioni mediche di carattere generale, scritte in modo prudente:
 * DA REVISIONARE E APPROVARE DALLA DOTT.SSA prima della pubblicazione.
 */
export type TreatmentDetail = {
  intro: string;
  forWho: string[];
  steps: { title: string; text: string }[];
  faq: { q: string; a: string }[];
  related: string[];
};

export const treatmentDetails: Record<string, TreatmentDetail> = {
  invisalign: {
    intro:
      "Invisalign è un sistema ortodontico basato su allineatori trasparenti e rimovibili, realizzati su misura. Ogni serie di allineatori sposta gradualmente i denti secondo un piano di trattamento progettato in digitale e verificato dall'ortodontista a ogni controllo.",
    forWho: [
      "Adulti e ragazzi con affollamento, spaziature o disallineamenti dentali",
      "Chi desidera un'alternativa discreta all'apparecchio fisso",
      "Pazienti che necessitano di correggere alcune malocclusioni, previa valutazione clinica",
    ],
    steps: [
      { title: "Prima visita", text: "Valutazione ortodontica completa, ascolto delle aspettative e verifica dell'indicazione al trattamento." },
      { title: "Scansione digitale", text: "Impronta digitale intraorale al posto delle impronte tradizionali, per un modello preciso e confortevole." },
      { title: "Piano di trattamento", text: "Simulazione digitale dei movimenti dentali, condivisa con il paziente prima di iniziare." },
      { title: "Allineatori e controlli", text: "Consegna degli allineatori e controlli periodici in studio per monitorare l'andamento." },
      { title: "Contenzione", text: "Al termine, la contenzione aiuta a mantenere stabile il risultato nel tempo." },
    ],
    faq: [
      { q: "Gli allineatori si vedono?", a: "Sono trasparenti e risultano molto discreti nella vita quotidiana." },
      { q: "Quanto dura il trattamento?", a: "La durata dipende dal caso: viene stimata dopo la prima visita e la pianificazione digitale." },
      { q: "Si possono togliere?", a: "Sì, si rimuovono per mangiare e per l'igiene orale. Per funzionare vanno indossati per il numero di ore indicato dall'ortodontista." },
    ],
    related: ["ortodonzia", "impronta-digitale", "gnatologia"],
  },
  "faccette-dentali": {
    intro:
      "Le faccette sono sottili lamine in ceramica applicate sulla superficie visibile dei denti per migliorarne forma, colore e proporzioni. L'obiettivo è un sorriso armonico e naturale, progettato sulle caratteristiche del viso di ciascun paziente. Lo studio è Centro di Eccellenza Lumineers.",
    forWho: [
      "Denti con discromie che non rispondono allo sbiancamento",
      "Piccoli difetti di forma, usura o spazi tra i denti",
      "Chi desidera migliorare l'estetica del sorriso in modo armonico, previa valutazione",
    ],
    steps: [
      { title: "Analisi estetica", text: "Studio del sorriso in relazione a viso, labbra e gengive, e definizione delle aspettative." },
      { title: "Progetto del sorriso", text: "Pianificazione di forma e colore delle faccette, condivisa con il paziente." },
      { title: "Preparazione", text: "Quando necessario, preparazione minima dello smalto secondo l'indicazione clinica." },
      { title: "Applicazione", text: "Cementazione delle faccette e rifinitura per un risultato naturale." },
      { title: "Mantenimento", text: "Igiene professionale e controlli periodici per preservare il risultato." },
    ],
    faq: [
      { q: "Le faccette sembrano naturali?", a: "Vengono progettate su misura per armonizzarsi con il sorriso e il viso del paziente." },
      { q: "Quanto durano?", a: "La durata dipende da molti fattori, tra cui igiene, abitudini e controlli periodici: ne parleremo in visita." },
      { q: "Sono adatte a tutti?", a: "No: l'indicazione viene valutata dopo una visita completa." },
    ],
    related: ["sbiancamento-dentale", "igiene-orale", "ortodonzia"],
  },
  "sbiancamento-dentale": {
    intro:
      "Lo sbiancamento professionale schiarisce il colore dei denti ingialliti da fumo, tè, caffè o dal tempo, sotto controllo odontoiatrico. Lo studio è Centro d'Eccellenza per lo sbiancamento dentale BlancOne.",
    forWho: [
      "Denti naturali con discromie superficiali o da invecchiamento",
      "Chi desidera un sorriso più luminoso prima di un evento o di un trattamento estetico",
      "Pazienti con denti e gengive sani, previa valutazione",
    ],
    steps: [
      { title: "Visita e igiene", text: "Controllo dello stato di salute di denti e gengive e, se indicato, igiene professionale." },
      { title: "Rilevazione del colore", text: "Registrazione del colore di partenza per valutare il risultato." },
      { title: "Seduta di sbiancamento", text: "Applicazione del trattamento professionale in studio, con protezione delle gengive." },
      { title: "Indicazioni a casa", text: "Consigli su alimentazione e igiene per mantenere più a lungo il risultato." },
    ],
    faq: [
      { q: "Lo sbiancamento rovina lo smalto?", a: "Eseguito sotto controllo odontoiatrico e con prodotti professionali, è un trattamento sicuro. La valutazione preliminare serve proprio a questo." },
      { q: "Si può sbiancare una corona o una faccetta?", a: "No, lo sbiancamento agisce sui denti naturali: in presenza di restauri, il piano viene valutato in visita." },
      { q: "Si avverte sensibilità?", a: "In alcuni casi può comparire una sensibilità temporanea: ti spiegheremo come gestirla." },
    ],
    related: ["faccette-dentali", "igiene-orale", "conservativa"],
  },
  ortodonzia: {
    intro:
      "L'ortodonzia si occupa della correzione delle malocclusioni e dell'allineamento dei denti, per migliorare funzione, salute ed estetica del sorriso. Con la specializzazione in Ortognatodonzia, la dottoressa segue bambini, ragazzi e adulti con percorsi personalizzati.",
    forWho: [
      "Bambini: valutazione precoce della crescita e delle abitudini viziate",
      "Ragazzi e adulti con denti storti, affollati o malocclusioni",
      "Pazienti che necessitano di preparazione ortodontica prima di altri trattamenti",
    ],
    steps: [
      { title: "Visita ortodontica", text: "Esame clinico, valutazione del morso e dell'armonia del viso." },
      { title: "Diagnosi", text: "Raccolta della documentazione necessaria, anche tramite impronta digitale." },
      { title: "Piano personalizzato", text: "Scelta della soluzione più adatta: apparecchi fissi, mobili o allineatori trasparenti." },
      { title: "Trattamento e controlli", text: "Monitoraggio periodico dei progressi in studio." },
      { title: "Contenzione", text: "Mantenimento del risultato ottenuto nel tempo." },
    ],
    faq: [
      { q: "A che età fare la prima visita ortodontica?", a: "Una valutazione in età infantile aiuta a intercettare per tempo eventuali problemi di crescita: il momento giusto si decide con l'ortodontista." },
      { q: "Ci sono alternative all'apparecchio fisso?", a: "Sì, in molti casi è possibile valutare gli allineatori trasparenti." },
      { q: "L'ortodonzia è solo estetica?", a: "No: un corretto allineamento contribuisce anche alla funzione masticatoria e alla salute orale." },
    ],
    related: ["invisalign", "pedodonzia", "gnatologia"],
  },
};
