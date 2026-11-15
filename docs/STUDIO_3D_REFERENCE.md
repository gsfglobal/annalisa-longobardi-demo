# STUDIO_3D_REFERENCE — Studio Dott.ssa Annalisa Longobardi
Piazza Medaglie d'Oro 27, Napoli · Analisi del 15/11/2026 · Fonte: galleria ufficiale https://annalisalongobardi.com/studio/ (10 foto, 1293–1298 × 862–865 px, scattate con obiettivo grandangolare, bilanciamento del bianco caldo).

> Strumenti: Blender **non è disponibile** in questo ambiente. Le stanze sono modellate in modo procedurale con Three.js (Node) ed esportate in GLB reali con glTF-Transform (`scripts/build-studio.mjs`).

## 1. Elenco immagini e ambienti identificati
| File | Ambiente | Inquadratura |
|---|---|---|
| MAT02847-HDR | **A · Sala d'attesa** | Verso la parete con neon "Seguimi per un sorriso PAZZESCO", parete curva in vetro fumé a destra |
| MAT02867-HDR | **A · Sala d'attesa / reception** | Verso parete TV, porte-finestre, banco reception cilindrico |
| MAT03057-HDR | **F · Ufficio** | Dall'interno verso il corridoio (porta scorrevole in vetro bronzo) |
| MAT03036-HDR | **F · Ufficio** | Verso la parete attrezzata con nicchia ad arco e la finestra interna |
| MAT03026-HDR | **B · Sala operativa "prugna"** | Riunito con imbottitura viola, specchio ramato, neon "ANNALISA LONGOBARDI" |
| MAT03011-HDR | **B · Sala operativa "prugna"** | Riunito viola, vetrata bronzo, carrello con schermo, porta-finestra |
| MAT02942-HDR | **C · Sala operativa beige con pannelli bronzo** | Riunito beige, pannelli curvi ramati |
| MAT02927-HDR | **D · Sala operativa "Faccette dentali"** | Neon "FACCETTE DENTALI Sorriso Pazzesco", specchio a nuvola, riunito beige |
| MAT02932-HDR | **D · Sala operativa "Faccette dentali"** | Stessa sala: mobile con lavabo e pensili in vetro satinato |
| MAT03006-HDR | **E · Corridoio** | Porta zona radiologica, colonna retroilluminata Invisalign |

**Ricostruiti in 3D:** A (Reception & waiting lounge), B (Operatory — sala prugna, 2 foto coerenti), F (Consultation office, 2 foto).
**Non ricostruiti:** C e D (sale beige: non mescolate con B come richiesto), E (corridoio: insufficiente per una stanza).

## 2. Elementi visibili e verificabili
### A · Sala d'attesa e reception
- Pavimento in gres/marmo lucido effetto onice, toni avorio–pesca con venature ambrate; riflessi speculari marcati.
- Pareti bianche lisce; battiscopa scuro bronzo.
- Soffitto con ribassamento perimetrale e **vela centrale con luce indiretta**; lampada a sospensione con **due anelli LED intrecciati**.
- **Poltrone in velluto rosa cipria**: 2 poltrone girevoli "a conchiglia" con base a 4 razze scure; fila di 5–6 poltroncine a pozzetto lungo la parete sinistra con gambe scure.
- **Tavolini rotondi** con bordo bronzo e piano a specchio/vetro (2, a diverse altezze).
- **Neon** "Seguimi per un sorriso / PAZZESCO" (bianco/lilla con emoji) sulla parete principale; insegna retroilluminata "Seguimi per un sorriso Pazzesco" su pannello beige; neon a firma/logo sulla parete sinistra.
- **Parete curva in vetro fumé** con base bronzo (angolo verso il corridoio).
- **Banco reception cilindrico** bianco/crema con monitor; sgabello alto oro e rosso.
- Mobile TV: pannello crema con TV nera e mensola scura, davanti a vetro satinato curvo con logo "AL" serigrafato.
- 3 **pouf** colorati (azzurro, giallo, verde) con cinghie in cuoio.
- **Porte-finestre** a due ante con telaio bianco e balconi con ringhiera.

### B · Sala operativa "prugna"
- Riunito odontoiatrico con **imbottitura viola/prugna** e scocca bianca; lampada operativa su braccio; faretra strumenti e tavoletta operatore; sgabello operatore viola.
- Carrello mobile con schermo (immagine di arcata visibile: scanner intraorale — marca **non** riportata nel sito).
- Pareti bianche, pavimento effetto onice come A.
- **Vetrate scorrevoli in vetro bronzo fumé** con telaio scuro.
- **Specchio rettangolare in cornice/vetro ramato** (alto ~1,8 m stimati).
- **Neon "ANNALISA LONGOBARDI"** (bianco) + "odontoiatra specialista in ortognatodonzia" (rosa) a parete.
- Pannelli luminosi rettangolari a soffitto; TV a parete; 2 sgabelli tondi in tessuto grigio con gambe oro; porta-finestra.

### F · Ufficio / consulenza
- Parete attrezzata a tutta altezza in **laccato crema**; **nicchia ad arco** con ante grigio antracite; vano con cantinetta, lampada da tavolo oro, macchina caffè, cornice.
- **Scrivania ovale con piano effetto onice** e bordo bronzo su basamento crema.
- 2 **sedie ospite in velluto rosa** con gambe bronzo; **poltrona direzionale grigia** imbottita.
- **Lampadario a stelo multiplo dorato** (sospensione).
- Monitor, tastiera, telefono; nicchia con monitor a parete.
- **Finestra interna** verso un altro ambiente; porta scorrevole in vetro bronzo verso il corridoio.

## 3. Geometrie stimabili (non misurate)
| Elemento | Stima | Base della stima |
|---|---|---|
| Altezza interna | ~2,90 m (ribassamento ~2,70 m) | proporzione porte (~2,10 m) |
| Sala d'attesa | ~6,0 × 4,6 m | numero sedute + tavolini + 2 porte-finestre |
| Sala operativa B | ~3,8 × 3,6 m | ingombro riunito standard (~1,9 m) |
| Ufficio F | ~3,4 × 3,2 m | parete attrezzata ~3 m, scrivania ~1,6 m |
| Poltrona attesa | seduta ~0,45 m, larghezza ~0,75 m | rapporto con tavolino |

## 4. Collegamenti spaziali NON documentati
- Posizione reciproca delle stanze e planimetria: **sconosciute** → nel tour si usa un **selettore ambienti**, non corridoi inventati.
- Pareti non inquadrate (es. parete di ingresso della sala operativa, parete dietro la scrivania): **minimali e neutre** nel modello.
- Contenuto e modelli delle attrezzature: riprodotti come forme generiche, senza marchi né specifiche tecniche.

## 5. Palette dei materiali (dalle foto, neutralizzata dalla dominante calda)
Campioni medi grezzi → valore usato nel modello:
pavimento #C99F89 → #E6D3C4 (venature #B48E78) · velluto rosa #C1968D → #D9B3AA · vetro fumé #5E4C46 → #3A302B · bronzo #593A21 → #5A3E2B (metallo) · crema laccato #F8E6C9 → #EADCC6 · grigio nicchia #8F8984 → #6E6B69 · imbottitura riunito #91417F → #8E3B7C · onice scrivania #C7AD91 → #D6BFA6 · oro lampadario #EFDCB0 → #C9A45C (metallo) · rame specchio #7E4E2B → #9A6040 (metallo).
Questi colori **riproducono gli interni** e non entrano nella palette del brand.

## 6. Informazioni mancanti per un digital twin fedele
1. Planimetria quotata (PDF/DWG) di tutto lo studio.
2. Misure di arredi fissi (reception, parete attrezzata, vetrate).
3. Panoramiche equirettangolari 360° da almeno 2 punti per stanza (ideali 8K HDR).
4. Scansione LiDAR (es. iPhone Pro/iPad Pro con Polycam/RoomPlan) o fotogrammetria (80–150 foto per stanza).
5. Schede degli arredi di design (poltrone, lampadari) per modelli fedeli o GLB dei produttori.
6. Autorizzazione all'uso delle foto e dei loghi/insegne nel modello.

## 7. Livelli di implementazione
- **Livello A (consegnato):** ricostruzione digitale dimostrativa photo-referenced, dichiarata come tale nel tour.
- **Livello B (predisposto):** `lib/studio-rooms.ts` descrive stanze, viste e hotspot in modo indipendente dal modello; sostituendo i GLB con versioni da LiDAR/fotogrammetria (stessi nomi file) tour, hotspot e UI restano invariati.
