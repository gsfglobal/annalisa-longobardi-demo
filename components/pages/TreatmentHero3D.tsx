"use client";
import { lazy, useState } from "react";
import { SceneShell, useIsMobile } from "@/components/three/SceneShell";
import { ArchFallback } from "@/components/three/Fallbacks";
import type { TreatmentKey } from "@/components/three/scenes/TreatmentScene";

const TreatmentScene = lazy(() => import("@/components/three/scenes/TreatmentScene"));

export function TreatmentHero3D({ k, label }: { k: TreatmentKey; label: string }) {
  const mobile = useIsMobile();
  const [play, setPlay] = useState(0);
  return (
    <div className="relative">
      <SceneShell eager className="h-[48svh] w-full md:h-[66vh]" label={label} fallback={<div className="flex h-full items-center justify-center p-10"><ArchFallback /></div>}>
        {(active) => <TreatmentScene k={k} play={play} active={active} compact={mobile} />}
      </SceneShell>
      <div className="mt-3 flex items-center justify-between text-[11px] text-white/60">
        <span>Modello illustrativo · non rappresenta un risultato clinico</span>
        <button type="button" onClick={() => setPlay((p) => p + 1)} className="tag hover:text-white">Ripeti</button>
      </div>
    </div>
  );
}
