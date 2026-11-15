"use client";
import { RoomModel } from "./RoomModel";
/** Room 03 — Consultation office (reconstruction from MAT03036, MAT03057). */
export function ConsultationRoom({ quality }: { quality: "high" | "low" }) {
  return <RoomModel url="/models/studio/consultation.glb" quality={quality} />;
}
