/**
 * Studio tour configuration — independent of the 3D model (ready for a "digital twin").
 * Replacing the GLB files with versions from LiDAR/photogrammetry (same names, same reference system:
 * metres, Y up, origin at the centre of the room floor) keeps views, hotspots and UI working.
 * Hotspot texts: general information only, no clinical/technical attributes not verified.
 */
export type Vec3 = [number, number, number];
export type View = { pos: Vec3; target: Vec3 };
export type Hotspot = {
  id: string;
  title: string;
  text: string;
  at: Vec3;
  view: View;
  /** source of the statement, when it is not a generic description */
  source?: string;
};
export type StudioRoom = {
  id: "reception" | "treatment" | "consultation";
  label: string;
  title: string;
  intro: string;
  model: string;
  entry: View;
  hotspots: Hotspot[];
  photos: { key: string; alt: string; file: string }[];
  /** what is reconstructed from the photos and what is simplified */
  fidelity: string;
};

export const studioRooms: StudioRoom[] = [
  {
    id: "reception",
    label: "Reception",
    title: "Reception & Waiting Lounge",
    intro: "Velluti rosa cipria, superfici che riflettono la luce e l'insegna che firma lo studio: il primo incontro con il sorriso pazzesco.",
    model: "/models/studio/reception.glb",
    entry: { pos: [1.55, 1.5, 1.85], target: [-0.9, 1.15, -1.7] },
    hotspots: [
      {
        id: "neon",
        title: "Seguimi per un sorriso pazzesco",
        text: "L'insegna luminosa riprende lo slogan della dottoressa: la stessa voce che accompagna i pazienti anche sui social.",
        at: [-1.0, 2.2, -2.2],
        view: { pos: [-0.7, 1.55, -0.35], target: [-1.0, 1.75, -2.3] },
      },
      {
        id: "lounge",
        title: "Comfort dell'attesa",
        text: "Sedute morbide in velluto e tavolini rotondi: un'attesa pensata per mettere a proprio agio, dal primo momento.",
        at: [-2.55, 1.0, 0.2],
        view: { pos: [0.3, 1.35, 0.9], target: [-2.4, 0.55, -0.3] },
      },
      {
        id: "light",
        title: "Luce e superfici",
        text: "Luce indiretta dal soffitto, anelli luminosi sospesi e un pavimento effetto onice che moltiplica i riflessi.",
        at: [-0.2, 2.45, -0.3],
        view: { pos: [1.2, 0.95, 1.4], target: [-0.3, 1.9, -0.5] },
      },
      {
        id: "desk",
        title: "Accoglienza",
        text: "Il banco reception, vicino alle porte-finestre: il punto di riferimento per appuntamenti e informazioni.",
        at: [2.25, 1.75, 0.35],
        view: { pos: [0.2, 1.5, 1.4], target: [2.3, 1.1, 0.3] },
      },
    ],
    photos: [
      { key: "studio-attesa", alt: "Sala d'attesa con neon “Pazzesco”", file: "MAT02847-HDR" },
      { key: "studio-lounge", alt: "Sala d'attesa verso la reception", file: "MAT02867-HDR" },
    ],
    fidelity:
      "Ricostruiti dalle foto: pavimento effetto onice, poltrone in velluto, tavolini, neon, parete curva in vetro fumé, anelli luminosi, porte-finestre, banco cilindrico, pouf. Semplificati o stimati: dimensioni della sala, posizione reciproca degli arredi, pareti non fotografate.",
  },
  {
    id: "treatment",
    label: "Sala operativa",
    title: "Operatory Experience",
    intro: "Una delle sale operative dello studio: bianco clinico, luce controllata e l'imbottitura prugna del riunito.",
    model: "/models/studio/treatment.glb",
    entry: { pos: [1.25, 1.45, 1.6], target: [-0.55, 1.05, -1.8] },
    hotspots: [
      {
        id: "clinic",
        title: "Ambiente clinico",
        text: "Superfici chiare e facili da sanificare, luce uniforme dai pannelli a soffitto: un ambiente ordinato per lavorare con precisione.",
        at: [0.35, 1.25, 0.05],
        view: { pos: [-0.9, 1.45, 1.35], target: [0.4, 0.8, -0.1] },
      },
      {
        id: "comfort",
        title: "Comfort del paziente",
        text: "Un riunito imbottito e una sala luminosa, con la luce naturale delle porte-finestre.",
        at: [1.9, 1.6, 0.75],
        view: { pos: [-0.4, 1.4, 0.9], target: [1.9, 1.2, 0.7] },
      },
      {
        id: "details",
        title: "Attenzione ai dettagli",
        text: "Il nome della dottoressa in luce neon, lo specchio ramato e le vetrate bronzo: lo stile dello studio arriva fino alle sale operative.",
        at: [0.95, 2.2, -1.8],
        view: { pos: [0.2, 1.55, 0.6], target: [0.6, 1.75, -1.85] },
      },
      {
        id: "digital",
        title: "Impronta digitale",
        text: "Lo studio esegue le impronte dentali con tecnica digitale, al posto delle impronte tradizionali.",
        at: [-0.5, 1.55, -0.75],
        view: { pos: [0.4, 1.4, 0.6], target: [-0.5, 1.15, -0.8] },
        source: "Pagina Trattamenti del sito ufficiale (“Impronta digitale”)",
      },
    ],
    photos: [
      { key: "studio-operativa-prugna", alt: "Sala operativa con riunito prugna", file: "MAT03026-HDR" },
      { key: "studio-operativa-itero", alt: "Sala operativa con carrello e schermo", file: "MAT03011-HDR" },
    ],
    fidelity:
      "Ricostruiti dalle foto: riunito con imbottitura prugna e scocca bianca, lampada operativa, specchio ramato, porta crema, neon “ANNALISA LONGOBARDI”, vetrate bronzo, pannelli luminosi, sgabelli, carrello con schermo, porta-finestra. Le attrezzature sono forme generiche: nessun modello, marca o specifica tecnica è riprodotto.",
  },
  {
    id: "consultation",
    label: "Ufficio",
    title: "Consultation Office",
    intro: "Lo spazio più raccolto dello studio: parete attrezzata con la nicchia ad arco, scrivania in onice e luce calda.",
    model: "/models/studio/consultation.glb",
    entry: { pos: [0.35, 1.5, 1.45], target: [-0.35, 1.1, -1.6] },
    hotspots: [
      {
        id: "desk",
        title: "Il colloquio",
        text: "Il tavolo in onice è il luogo del confronto: ogni percorso nasce da una valutazione individuale e da un dialogo con il paziente.",
        at: [0.575, 1.2, -0.3],
        view: { pos: [-0.6, 1.3, 0.75], target: [0.6, 0.85, -0.5] },
      },
      {
        id: "arch",
        title: "La nicchia ad arco",
        text: "L'arco della parete attrezzata richiama la curva del sorriso, il segno che attraversa tutta l'identità digitale.",
        at: [-1.25, 2.35, -1.25],
        view: { pos: [-0.6, 1.5, 0.6], target: [-1.25, 1.55, -1.6] },
      },
      {
        id: "light",
        title: "Luce decorativa",
        text: "Il lampadario dorato e la luce indiretta della parete creano un'atmosfera calda e accogliente.",
        at: [0.1, 2.35, -0.3],
        view: { pos: [-0.9, 1.1, 1.0], target: [0.1, 1.95, -0.4] },
      },
    ],
    photos: [
      { key: "studio-direzione", alt: "Ufficio con nicchia ad arco e scrivania", file: "MAT03036-HDR" },
      { key: "studio-reception", alt: "Ufficio verso il corridoio", file: "MAT03057-HDR" },
    ],
    fidelity:
      "Ricostruiti dalle foto: parete attrezzata crema, nicchia ad arco grigia, cantinetta, lampada oro, scrivania ovale in onice con bordo bronzo, sedie rosa, poltrona grigia, lampadario, finestra interna, porta scorrevole in vetro bronzo. Stimati: misure della stanza e posizione delle pareti non fotografate.",
  },
];
