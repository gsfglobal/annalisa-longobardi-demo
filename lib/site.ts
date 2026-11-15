/**
 * Dati centralizzati del sito. Tutto ciò che è qui proviene dal sito ufficiale
 * annalisalongobardi.com (audit del 15/11/2026). I campi marcati `verified: false`
 * sono da confermare con la Dott.ssa prima della pubblicazione.
 */

export const SITE_URL = "https://annalisalongobardi.com";

export const doctor = {
  name: "Annalisa Longobardi",
  fullName: "Dott.ssa Annalisa Longobardi",
  title: "Odontoiatra — Specialista in Ortognatodonzia",
  slogan: "Il tuo sorriso pazzesco",
  vat: "IT07947780636",
};

export const contacts = {
  phoneLabel: "+39 081 5453461",
  phoneHref: "tel:+390815453461",
  whatsappLabel: "+39 335 841 0578",
  whatsappNumber: "393358410578",
  whatsappHref: "https://wa.me/393358410578",
  bookingHref: "https://www.miodottore.it/annalisa-longobardi/dentista-ortodontista/napoli",
  email: "annalisalongobardi@hotmail.it",
  emailHref: "mailto:annalisalongobardi@hotmail.it",
  hours: "Lunedì – Venerdì, 10:00 – 18:00",
};

/**
 * Giulia — assistente virtuale (AI) su WhatsApp. Numero di PROVA Dental Go (081 1929 7944),
 * collegato all'agente ElevenLabs della Dottoressa e alla dashboard. Va sostituito con il
 * numero definitivo dello studio prima della pubblicazione reale.
 */
export const giulia = {
  name: "Giulia",
  role: "Assistente virtuale dello studio",
  number: "3908119297944",
  greeting: "Ciao Giulia, vorrei informazioni sullo studio della Dott.ssa Longobardi.",
};
export const giuliaHref = `https://wa.me/${giulia.number}?text=${encodeURIComponent(giulia.greeting)}`;

export const social = {
  instagram: {
    handle: "@dott.ssa_annalisa_longobardi",
    href: "https://www.instagram.com/dott.ssa_annalisa_longobardi/",
  },
  tiktok: {
    handle: "@dr.annalisalongobardi",
    href: "https://www.tiktok.com/@dr.annalisalongobardi",
  },
};

export type Location = {
  slug: string;
  city: string;
  address: string;
  postalCode: string;
  region: string;
  mapsHref: string;
  bookingHref?: string;
  bookingNote?: string;
  source: string;
  confirmed: boolean;
  coords: { lat: number; lng: number };
};

/**
 * Locations. Naples: official site. Rome and Milan: MioDottore profile (checked 15/11/2026),
 * not listed on the official site → shown with their source, to be confirmed by the studio.
 */
export const locations: Location[] = [
  {
    slug: "napoli",
    city: "Napoli",
    address: "Piazza Medaglie d'Oro, 27",
    postalCode: "80128",
    region: "NA",
    mapsHref: "https://www.google.com/maps/search/?api=1&query=Piazza+Medaglie+d%27Oro+27+80128+Napoli",
    bookingHref: "https://www.miodottore.it/annalisa-longobardi/dentista-ortodontista/napoli",
    source: "Sito ufficiale",
    confirmed: true,
    coords: { lat: 40.8518, lng: 14.2312 },
  },
  {
    slug: "roma",
    city: "Roma",
    address: "Via Salaria, 44",
    postalCode: "00198",
    region: "RM",
    mapsHref: "https://www.google.com/maps/search/?api=1&query=Via+Salaria+44+00198+Roma",
    bookingHref: "https://www.miodottore.it/profilo/annalisa-longobardi",
    source: "MioDottore · 15/11/2026",
    confirmed: false,
    coords: { lat: 41.9131, lng: 12.4996 },
  },
  {
    slug: "milano",
    city: "Milano",
    address: "Piazza della Repubblica, 32",
    postalCode: "20124",
    region: "MI",
    mapsHref: "https://www.google.com/maps/search/?api=1&query=Piazza+della+Repubblica+32+20124+Milano",
    bookingNote: "Prenotazione online non disponibile per questa sede: contatta lo studio.",
    source: "MioDottore · 15/11/2026",
    confirmed: false,
    coords: { lat: 45.4802, lng: 9.2005 },
  },
];

export const nav = [
  { href: "/", label: "Home" },
  { href: "/chi-sono/", label: "Chi sono" },
  { href: "/studio/", label: "Studio" },
  { href: "/trattamenti/", label: "Trattamenti" },
  { href: "/sedi/", label: "Sedi" },
  { href: "/contatti/", label: "Contatti" },
];

/** Credenziali e ruoli riportati sul sito ufficiale (da verificare prima della messa online). */
export const credentials = [
  "Diamond Apex Invisalign Provider",
  "Centro di Eccellenza Lumineers per le faccette dentali",
  "Centro d'Eccellenza per lo sbiancamento dentale BlancOne",
];

export const cv = {
  education: [
    { year: "2001", text: "Laurea con lode in Odontoiatria e Protesi Dentaria" },
    {
      year: "2005",
      text: "Specializzazione in Ortognatodonzia presso la Seconda Università degli Studi di Napoli",
    },
  ],
  career: [
    { year: "dal 2002", text: "Titolare di studio privato" },
    {
      year: "",
      text: "Cultore della materia in Ortognatodonzia presso l'Università degli Studi della Campania “Luigi Vanvitelli”",
    },
    { year: "", text: "Seminarista per lezioni integrative nella Scuola di Specializzazione in Ortognatodonzia" },
    {
      year: "",
      text: "Coordinatrice del Master di II livello in Ortognatodonzia “Basic Orthodontics”, Università “Luigi Vanvitelli”",
    },
    { year: "", text: "Frequentatrice volontaria presso l'Articolazione Organizzativa di Ortognatodonzia" },
    {
      year: "",
      text: "Autrice e coautrice di pubblicazioni e poster nazionali e internazionali; relatrice a corsi e congressi",
    },
  ],
  memberships: [
    "Socio ordinario SIDO — Società Italiana di Ortodonzia",
    "Socio SINET — Società Italiana Terapia non Estrattiva",
    "Membro della CH Tweed Foundation",
    "Dal 2006 partecipa al progetto didattico Colgate “Sorrisi Smaglianti, Futuri Brillanti” sulla prevenzione nelle scuole",
    "Premi e riconoscimenti nelle sessioni Poster di Ortodonzia del Congresso Nazionale del Collegio dei Docenti di Odontoiatria",
  ],
  research: "Interessi di ricerca: diagnosi e abitudini viziate.",
};

export type Treatment = {
  slug: string;
  name: string;
  short: string;
  image: string;
  category: "estetica" | "ortodonzia" | "cura" | "chirurgia" | "tecnologia";
  signature?: boolean;
  detail?: boolean;
};

/** Tutti i trattamenti presenti sul sito originale (nessuno aggiunto). */
export const treatments: Treatment[] = [
  {
    slug: "invisalign",
    name: "Invisalign",
    short: "Allineatori trasparenti e rimovibili per correggere le malocclusioni con discrezione.",
    image: "t-invisalign",
    category: "ortodonzia",
    signature: true,
    detail: true,
  },
  {
    slug: "faccette-dentali",
    name: "Faccette dentali",
    short: "Faccette in ceramica per migliorare forma e colore del sorriso, mantenendone la naturalezza.",
    image: "t-faccette",
    category: "estetica",
    signature: true,
    detail: true,
  },
  {
    slug: "sbiancamento-dentale",
    name: "Sbiancamento dentale",
    short: "Schiarimento professionale dei denti ingialliti da fumo, tè, caffè e tempo.",
    image: "t-sbiancamento",
    category: "estetica",
    signature: true,
    detail: true,
  },
  {
    slug: "ortodonzia",
    name: "Ortodonzia",
    short: "Correzione delle malocclusioni e allineamento dentale, per bambini e adulti.",
    image: "t-ortodonzia",
    category: "ortodonzia",
    signature: true,
    detail: true,
  },
  {
    slug: "gnatologia",
    name: "Gnatologia",
    short: "Studio delle funzioni e dei disturbi dell'articolazione temporo-mandibolare (ATM).",
    image: "t-gnatologia",
    category: "ortodonzia",
  },
  {
    slug: "pedodonzia",
    name: "Pedodonzia",
    short: "Il dentista dei bambini: prima visita consigliata tra i 18 e i 24 mesi.",
    image: "t-pedodonzia",
    category: "cura",
  },
  {
    slug: "igiene-orale",
    name: "Igiene orale",
    short: "Pulizia professionale e indicazioni per una corretta igiene domiciliare quotidiana.",
    image: "t-igiene",
    category: "cura",
  },
  {
    slug: "conservativa",
    name: "Conservativa",
    short: "Cura dei denti colpiti da carie o danneggiati da traumi.",
    image: "t-conservativa",
    category: "cura",
  },
  {
    slug: "endodonzia",
    name: "Endodonzia",
    short: "Cura della polpa dentaria e dei canali radicolari.",
    image: "t-endodonzia",
    category: "cura",
  },
  {
    slug: "parodontologia",
    name: "Parodontologia",
    short: "Prevenzione e cura delle gengive: sanguinamento, mobilità dentale, recessioni.",
    image: "t-parodontologia",
    category: "cura",
  },
  {
    slug: "implantologia",
    name: "Implantologia",
    short: "Sostituzione di uno o più denti mancanti, per estetica e funzione.",
    image: "t-implantologia",
    category: "chirurgia",
  },
  {
    slug: "protesi-fissa",
    name: "Protesi dentale fissa",
    short: "Restauri protesici fissi su denti naturali, a copertura totale o parziale.",
    image: "t-protesi-fissa",
    category: "chirurgia",
  },
  {
    slug: "protesi-mobile",
    name: "Protesi dentale mobile",
    short: "Sostituzione dei denti con protesi rimovibili.",
    image: "t-protesi-mobile",
    category: "chirurgia",
  },
  {
    slug: "chirurgia-orale",
    name: "Chirurgia orale",
    short: "Interventi per problemi biologici e anatomici del cavo orale.",
    image: "t-chirurgia",
    category: "chirurgia",
  },
  {
    slug: "impronta-digitale",
    name: "Impronta digitale",
    short: "Impronte dentali con scansione intraorale, al posto della tecnica tradizionale.",
    image: "t-impronta-digitale",
    category: "tecnologia",
  },
];

export const categories: Record<Treatment["category"], string> = {
  estetica: "Estetica del sorriso",
  ortodonzia: "Ortodonzia e funzione",
  cura: "Prevenzione e cura",
  chirurgia: "Chirurgia e protesi",
  tecnologia: "Tecnologia",
};

export const studioGallery = [
  { key: "studio-reception", alt: "Ufficio della dottoressa verso il corridoio" },
  { key: "studio-attesa", alt: "Sala d'attesa con poltrone rosa e insegna luminosa" },
  { key: "studio-operativa-prugna", alt: "Sala operativa con poltrona color prugna" },
  { key: "studio-lounge", alt: "Sala d'attesa verso la reception e le porte-finestre" },
  { key: "studio-operativa-itero", alt: "Sala operativa con scanner intraorale" },
  { key: "studio-operativa-legno", alt: "Sala operativa con pareti in legno" },
  { key: "studio-direzione", alt: "Ufficio con parete attrezzata e nicchia ad arco" },
  { key: "studio-operativa-faccette", alt: "Sala operativa con insegna luminosa “Faccette dentali”" },
  { key: "studio-ingresso", alt: "Corridoio d'ingresso con vetrata decorata" },
  { key: "studio-sterilizzazione", alt: "Area tecnica bianca dello studio" },
];

export function whatsappLink(text?: string) {
  return text
    ? `${contacts.whatsappHref}?text=${encodeURIComponent(text)}`
    : contacts.whatsappHref;
}
