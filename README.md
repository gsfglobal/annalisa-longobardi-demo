# PAZZESCO — The Smile Experience (v3 · Ultra Luxury + Immersive Studio)
Immersive 3D demo for Dott.ssa Annalisa Longobardi · Dental Go. **Private demo: do not publish without authorisation.**

## Getting started
```bash
npm install
npm run dev            # http://localhost:3000
npm run build          # static Next.js site in /out
npm run build:preview  # single-page preview (hash routing) in /preview-dist
npm run build:studio   # regenerate the 3 studio GLBs (procedural modelling + meshopt compression)
npm run typecheck && npm run lint
```

## Documentation
- `docs/BRAND_RESEARCH.md` — verified research, sources, access limits
- `docs/REDESIGN_DIFFERENCES.md` — anti-copy audit: original vs v1 vs v2
- `docs/CREATIVE_DIRECTION.md` — concept, grid, typography, materials, motion
- `docs/STUDIO_3D_REFERENCE.md` — architectural analysis of the 10 studio photos
- `docs/DIGITAL_TWIN_READY.md` — 3D pipeline and path to a faithful digital twin
- `docs/REPORT_V3.md` — unverifiable information and missing assets

## Stack
Next.js 15 (App Router, static export) · React 19 · TypeScript · Tailwind 4 · Three.js · React Three Fiber · Drei · GSAP + ScrollTrigger · Lucide.
3D geometry is entirely procedural (`components/three/geometry.ts`): 0 KB of models to download.

## Structure
- `components/experience/*` — the 8 homepage chapters (EXP 01–08)
- `components/three/*` — hero, smile, treatment scenes; `SceneShell` (lazy mount, frameloop paused off-screen, WebGL fallback)
- `components/3d/*` — immersive studio tour (StudioExperience, StudioScene, StudioCamera, StudioLighting, RoomSelector, InteractiveHotspot, StudioLoading, StudioFallback, Reception/Treatment/ConsultationRoom)
- `public/models/studio/*.glb` — real rooms (meshopt, ~360 KB each) · `lib/studio-rooms.ts` — views and hotspots
- `components/pages/*` — inner pages · `components/layout/*` — header/menu, chapter rail, footer, mobile CTA
- `lib/site.ts` — verified data (locations with source) · `styles/brand-tokens.css` — **original palette, untouchable**
- `lib/integrations.ts` — slots for the WhatsApp and phone AI assistants (disabled)

## Enabling composite bonding (after confirmation)
Add the treatment in `lib/site.ts`, a `TreatmentKey` in `TreatmentScene.tsx` (it can reuse `VeneerModel`), and replace the "awaiting confirmation" item in `DiscoverSmile.tsx`.
