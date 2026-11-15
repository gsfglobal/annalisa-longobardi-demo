"use client";
import { CameraControls } from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import type { View } from "@/lib/studio-rooms";

/**
 * Controlled camera: predefined, interpolated moves (dolly) between views.
 * Drag/swipe looks around within angular and distance limits around each view
 * (avoids passing through walls and pointless views).
 */
export function StudioCamera({
  view,
  enabled,
  resetKey,
  intro,
  reduced,
  smooth = 0.9,
}: {
  view: View;
  enabled: boolean;
  resetKey: number;
  intro?: boolean;
  reduced: boolean;
  smooth?: number;
}) {
  const ref = useRef<CameraControls>(null);
  const first = useRef(true);

  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const [px, py, pz] = view.pos;
    const [tx, ty, tz] = view.target;
    const dir = new THREE.Vector3(px - tx, py - ty, pz - tz);
    const dist = dir.length();
    const sph = new THREE.Spherical().setFromVector3(dir);
    // limits around the view: ±35° horizontal, ±14° vertical, small dolly
    c.minAzimuthAngle = sph.theta - 0.6;
    c.maxAzimuthAngle = sph.theta + 0.6;
    c.minPolarAngle = Math.max(0.6, sph.phi - 0.25);
    c.maxPolarAngle = Math.min(2.0, sph.phi + 0.25);
    c.minDistance = dist * 0.72;
    c.maxDistance = dist * 1.12;
    if (first.current && !reduced) {
      // entrance: slight dolly from further back
      const back = dir.clone().normalize().multiplyScalar(0.9);
      c.setLookAt(px + back.x, py + back.y + 0.15, pz + back.z, tx, ty, tz, false);
      first.current = false;
    }
    c.setLookAt(px, py, pz, tx, ty, tz, !reduced);
  }, [view, resetKey, reduced]);

  useEffect(() => {
    first.current = true;
  }, [intro]);

  return (
    <CameraControls
      ref={ref}
      enabled={enabled}
      makeDefault
      smoothTime={reduced ? 0 : smooth}
      draggingSmoothTime={0.18}
      azimuthRotateSpeed={-0.35}
      polarRotateSpeed={-0.35}
      dollySpeed={0.25}
      truckSpeed={0}
    />
  );
}
