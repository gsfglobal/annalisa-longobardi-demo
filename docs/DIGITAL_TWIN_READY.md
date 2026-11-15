# DIGITAL_TWIN_READY — From the demo tour to a faithful reconstruction

## Current state (Level A — demo)
- 3 rooms modelled procedurally in Three.js (Node) from the 10 official photos: `scripts/build-studio.mjs`.
- Real GLBs in `public/models/studio/` (reception 366 KB, treatment 351 KB, consultation 357 KB), compressed with meshopt + quantisation (`scripts/compress-studio.mjs`), PBR materials with KHR extensions (sheen for velvet, clearcoat for the onyx and lacquers, emissive strength for the neon signs and light panels).
- Rebuild: `npm run build:studio`.
- Blender **was not used** (not available in the development environment).

## Data-model separation
`lib/studio-rooms.ts` describes each room independently of the geometry:
- `model`: GLB path · `entry`: initial view · `hotspots[]`: 3D position, view, text, source · `photos[]`: real photos · `fidelity`: what is reconstructed.
Coordinate system: **metres, Y up, origin at the centre of the room floor, +Z toward the entrance/camera**.

## Path to Level B (faithful digital twin)
1. **Survey**: dimensioned floor plan + LiDAR scan per room (Polycam / Apple RoomPlan / Matterport) or photogrammetry (80–150 photos per room, RealityCapture/Metashape).
2. **360° panoramas** (8K HDR, 2 points per room): usable both as faithful lighting (HDRI environment) and as a "photo" view mode.
3. **Modelling/clean-up in Blender**: retopology, UV unwrap, materials from the real finishes (furniture data sheets), lightmap bake of the indirect lighting (Cycles) → glTF export.
4. **Export**: same file names (`reception.glb`, `treatment.glb`, `consultation.glb`) and the same reference system → tour, hotspots and UI work without code changes; only the coordinates in `studio-rooms.ts` need updating.
5. **Optimisation**: `gltf-transform` (meshopt/Draco, KTX2 textures), target < 3 MB per room.
6. **Validation**: side-by-side comparison of the photos and the 3D views from the same shooting points.

## Rendering pipeline in the viewer
`components/3d/`: `StudioExperience` (UI on 3 levels) · `StudioScene` (canvas, adaptive quality via PerformanceMonitor, soft bloom on emissives, vignette) · `StudioCamera` (CameraControls with angular/distance limits per view, interpolated transitions) · `StudioLighting` (hemisphere + architectural point lights + key light with shadows on desktop + interior environment for reflections) · `RoomModel` (GLB loading, shadows, glossy onyx floor) · `InteractiveHotspot` (HTML buttons anchored in 3D) · `RoomSelector` · `StudioLoading` · `StudioFallback` (photographic version without WebGL).
Performance: each room is a separate scene loaded on demand; the others are preloaded only after the first one; rendering is suspended off-screen; DPR is capped; on mobile/weak hardware there are no shadows, post-processing or transmission.
