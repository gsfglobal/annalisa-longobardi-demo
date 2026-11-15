"use client";
import { RoomModel } from "./RoomModel";
/** Room 02 — Plum operatory (reconstruction from MAT03026, MAT03011). */
export function TreatmentRoom({ quality }: { quality: "high" | "low" }) {
  return <RoomModel url="/models/studio/treatment.glb" quality={quality} />;
}
