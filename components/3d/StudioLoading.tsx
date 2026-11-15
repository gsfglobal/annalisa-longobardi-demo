"use client";
import { useProgress } from "@react-three/drei";

/** Progressive loading indicator (does not block the page: only the viewer waits). */
export function StudioLoading() {
  const { active, progress } = useProgress();
  if (!active) return null;
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[2px] bg-white/10" role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100} aria-label="Caricamento dell'ambiente 3D">
      <div className="h-full bg-white transition-[width] duration-300" style={{ width: `${progress}%` }} />
    </div>
  );
}
