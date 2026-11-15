"use client";
import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr, PerformanceMonitor } from "@react-three/drei";
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";
import { Suspense, useEffect, useState } from "react";
import * as THREE from "three";
import { studioRooms, type StudioRoom, type View } from "@/lib/studio-rooms";
import { StudioCamera } from "./StudioCamera";
import { StudioLighting } from "./StudioLighting";
import { InteractiveHotspot } from "./InteractiveHotspot";
import { ReceptionRoom } from "./ReceptionRoom";
import { TreatmentRoom } from "./TreatmentRoom";
import { ConsultationRoom } from "./ConsultationRoom";
import { preloadRoom } from "./RoomModel";

export type StudioSceneProps = {
  room: StudioRoom["id"];
  view: View;
  controls: boolean;
  activeHotspot: string | null;
  onHotspot: (id: string) => void;
  showHotspots: boolean;
  highlightHotspot?: string | null;
  resetKey: number;
  introKey: number;
  active: boolean;
  reduced: boolean;
  compact: boolean;
  mode?: "tour" | "preview";
  /** shows only this hotspot (preview) */
  onlyHotspot?: string | null;
};

function Room({ id, quality }: { id: StudioRoom["id"]; quality: "high" | "low" }) {
  if (id === "reception") return <ReceptionRoom quality={quality} />;
  if (id === "treatment") return <TreatmentRoom quality={quality} />;
  return <ConsultationRoom quality={quality} />;
}

export default function StudioScene(p: StudioSceneProps) {
  const [quality, setQuality] = useState<"high" | "low">(p.compact ? "low" : "high");
  const room = studioRooms.find((r) => r.id === p.room)!;
  // QA switches: ?nofx (no post-processing) · ?noshadow (no shadows)
  const [dbg] = useState(() => (typeof window === "undefined" ? "" : window.location.search));
  const fx = quality === "high" && !dbg.includes("nofx");
  const shadows = quality === "high" && !dbg.includes("noshadow");
  useEffect(() => setQuality(p.compact ? "low" : "high"), [p.compact]);
  useEffect(() => {
    if (p.mode === "preview") return;
    // progressive loading: once the first room is ready, load the others in the background
    const t = setTimeout(() => studioRooms.forEach((r) => r.id !== p.room && preloadRoom(r.model)), 2500);
    return () => clearTimeout(t);
  }, [p.room, p.mode]);

  return (
    <Canvas
      className="!absolute inset-0"
      frameloop={p.active ? "always" : "never"}
      shadows={shadows}
      dpr={quality === "high" ? [1, 1.75] : [1, 1.25]}
      gl={{ antialias: true, powerPreference: "high-performance", toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 0.88 }}
      camera={{ position: [1.5, 1.5, 2.5], fov: p.compact ? 62 : 52, near: 0.05, far: 40 }}
    >
      <color attach="background" args={["#0e0c0b"]} />
      <PerformanceMonitor onDecline={() => setQuality("low")} />
      <AdaptiveDpr pixelated={false} />
      <StudioLighting room={p.room} quality={shadows ? "high" : "low"} />
      <Suspense fallback={null}>
        <Room key={p.room} id={p.room} quality={quality} />
        {p.showHotspots &&
          room.hotspots.filter((h) => !p.onlyHotspot || h.id === p.onlyHotspot).map((h) => (
            <InteractiveHotspot key={p.room + h.id} h={h} active={p.activeHotspot === h.id} highlight={p.highlightHotspot === h.id} onSelect={p.onHotspot} />
          ))}
      </Suspense>
      <StudioCamera view={p.view} enabled={p.controls} resetKey={p.resetKey} intro={!!p.introKey} reduced={p.reduced} smooth={p.mode === "preview" ? 3.2 : 0.9} />
      {fx && (
        <EffectComposer multisampling={4}>
          <Bloom mipmapBlur luminanceThreshold={1.1} intensity={0.55} radius={0.6} />
          <Vignette eskil={false} offset={0.25} darkness={0.55} />
        </EffectComposer>
      )}
    </Canvas>
  );
}
