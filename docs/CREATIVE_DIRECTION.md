# CREATIVE_DIRECTION — PAZZESCO · The Smile Experience

## Concept
**One curve tells the whole story.** The curve of the smile (and of the dental arch) is the only graphic sign: it is the 3D sculpture of the hero, it becomes the arch of the interactive model, the aligner, the profile of the veneer, the shape of the photo masks (echoing the arched niche of the real studio) and it comes back in the close. No floating teeth, no generic icons.

## Grid
12 columns, 24px gutters (16 on mobile), 1440px max. Chapters are numbered `EXP 01–08`; the main scenes are sticky with scroll-driven progress (no scroll-jacking: native scrolling is always active).

## Original colours (unchanged)
Background world `#000000`/`#1D1D1D`; surfaces `#FFFFFF`/`#F0F0F0`/`#EEEFF0`/`#E8E8E8`; accent and coloured light `#843064`.
In 3D, depth comes **only** from light and brightness: white key light, plum rim light, reflections. No new brand colours.

## Typography
- Display: **Syne** 600–700, uppercase, tight tracking (−0.04em), very large sizes (clamp up to 13vw).
- Editorial accents: **Instrument Serif** italic for the key word ("pazzesco", "visione").
- Text/UI: **Manrope** 400–600.
- Over 3D scenes: text always on its own layer with a gradient behind it for contrast.

## Photographic treatment
Authentic photos, never altered in colour or shape. Masks: "arch window" (rounded top), tall vertical crops, alternating large/detail shots.

## 3D materials
- *Pearl*: MeshPhysicalMaterial white, clearcoat 1, roughness 0.2, light iridescence → teeth and sculpture.
- *Glass*: transmission 1, thickness 0.4, roughness 0.05 → aligner and arch base.
- *Light*: plum line (emissive `#843064`) for curves and guides.

## Lighting
Studio environment (drei `Environment` preset "studio", lightweight), white key light at 45°, plum rim light from behind, soft contact shadows only on the arch.

## Interactions
Pointer: slight parallax of the scene (±4°). Arch: limited rotation (±35° azimuth), touch, no zoom; 3 accessible buttons that move the camera. Treatments: tabs + swipe + arrows. Studio: Previous/Next + hotspots.

## Motion language
"Digital editorial campaign": ease `expo.out` / `power3`, 0.9–1.4s, titles revealed by mask line by line, camera moves interpolated (damping 3–4), no bouncing.
`prefers-reduced-motion`: cameras fixed on their final state, no parallax, video paused.

## Performance
Each canvas is mounted lazily near the viewport (IntersectionObserver + React.lazy), frameloop paused outside the viewport, DPR capped (desktop 1.75, mobile 1.25), procedural geometry (0 KB of models), static fallback when WebGL is not available.
