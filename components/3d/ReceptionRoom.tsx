"use client";
import { RoomModel } from "./RoomModel";
/** Room 01 — Reception & Waiting Lounge (reconstruction from MAT02847, MAT02867). */
export function ReceptionRoom({ quality }: { quality: "high" | "low" }) {
  return <RoomModel url="/models/studio/reception.glb" quality={quality} />;
}
