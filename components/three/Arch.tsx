"use client";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { archLayout, toothGeometry, type ToothSpec } from "./geometry";
import { BRAND, glass, pearl } from "./materials";

export type ArchState = {
  /** 0..1 per tooth: brightness (dims the teeth that are not involved) */
  focus?: (t: ToothSpec) => boolean;
  /** tooth lifted out of the arch (personalisation) */
  lifted?: number | null;
  /** show the transparent aligner (0 = hidden, 1 = fitted) */
  aligner?: number;
  /** misalignment 1 = misaligned, 0 = aligned (illustrative orthodontics) */
  misalign?: number;
  /** show the arch line */
  wire?: number;
  /** light sweep (illustrative whitening) */
  sweep?: boolean;
  /** proportion guides on the front teeth */
  guides?: number;
};

const rand = (i: number) => {
  const x = Math.sin(i * 91.7) * 43758.5453;
  return x - Math.floor(x);
};

/** Stylised dental arch: 14 procedural teeth + glass base. Shared by the interactive model and the treatments. */
export function Arch({ state }: { state: ArchState }) {
  const { teeth, curve } = useMemo(() => archLayout(), []);
  const geos = useMemo(() => teeth.map((t) => toothGeometry(t.kind, t.w, t.h, t.d)), [teeth]);
  const mats = useMemo(() => teeth.map(() => pearl({ transparent: true })), [teeth]);
  const alignerMat = useMemo(() => glass({ opacity: 0.55, transmission: 0.6, thickness: 0.08, roughness: 0.05 }), []);
  const refs = useRef<(THREE.Group | null)[]>([]);
  const alignerRef = useRef<THREE.Group>(null);
  const wireRef = useRef<THREE.Mesh>(null);
  const sweepRef = useRef<THREE.PointLight>(null);
  const guidesRef = useRef<THREE.Group>(null);

  const baseGeo = useMemo(() => {
    const pts = curve.getPoints(40).map((p) => new THREE.Vector3(p.x, p.y + 0.36, p.z - 0.02));
    return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 120, 0.05, 16, false);
  }, [curve]);
  const wireGeo = useMemo(() => {
    const pts = teeth
      .slice()
      .sort((a, b) => a.pos.x - b.pos.x)
      .map((t) => new THREE.Vector3(t.pos.x, t.pos.y - t.h * 0.15, t.pos.z + t.d * 0.55));
    return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 160, 0.012, 8, false);
  }, [teeth]);
  const front = useMemo(() => teeth.filter((t) => t.index <= 2), [teeth]);

  useFrame((s, dt) => {
    const time = s.clock.elapsedTime;
    teeth.forEach((t, i) => {
      const g = refs.current[i];
      if (!g) return;
      const mis = state.misalign ?? 0;
      const lift = state.lifted === t.id ? 1 : 0;
      const tx = t.pos.x + mis * (rand(i) - 0.5) * 0.09;
      const tz = t.pos.z + mis * (rand(i + 7) - 0.5) * 0.16 + lift * 0.45;
      const ty = t.pos.y - lift * 0.35;
      g.position.x = THREE.MathUtils.damp(g.position.x, tx, 4, dt);
      g.position.y = THREE.MathUtils.damp(g.position.y, ty, 4, dt);
      g.position.z = THREE.MathUtils.damp(g.position.z, tz, 4, dt);
      g.rotation.y = THREE.MathUtils.damp(g.rotation.y, t.rotY + mis * (rand(i + 3) - 0.5) * 0.5 + lift * Math.sin(time) * 0.15, 4, dt);
      g.rotation.z = THREE.MathUtils.damp(g.rotation.z, mis * (rand(i + 11) - 0.5) * 0.18, 4, dt);
      const on = state.focus ? state.focus(t) : true;
      const m = mats[i];
      m.opacity = THREE.MathUtils.damp(m.opacity, on ? 1 : 0.22, 5, dt);
      m.emissive.set(BRAND.white);
      const sweepGlow = state.sweep ? Math.max(0, 1 - Math.abs(t.pos.x - Math.sin(time * 0.9) * 1.6) * 2.2) * 0.35 : 0;
      m.emissiveIntensity = THREE.MathUtils.damp(m.emissiveIntensity, (lift ? 0.18 : 0) + sweepGlow, 6, dt);
      m.depthWrite = m.opacity > 0.6;
    });
    if (alignerRef.current) {
      const a = state.aligner ?? 0;
      alignerRef.current.position.y = THREE.MathUtils.damp(alignerRef.current.position.y, (1 - a) * -0.9, 3, dt);
      alignerMat.opacity = THREE.MathUtils.damp(alignerMat.opacity, a > 0 ? 0.55 : 0, 4, dt);
      alignerRef.current.visible = alignerMat.opacity > 0.02;
    }
    if (wireRef.current) {
      const mat = wireRef.current.material as THREE.MeshStandardMaterial;
      mat.opacity = THREE.MathUtils.damp(mat.opacity, state.wire ?? 0, 4, dt);
      wireRef.current.visible = mat.opacity > 0.02;
    }
    if (sweepRef.current) {
      sweepRef.current.intensity = THREE.MathUtils.damp(sweepRef.current.intensity, state.sweep ? 6 : 0, 4, dt);
      sweepRef.current.position.x = Math.sin(time * 0.9) * 1.6;
    }
    if (guidesRef.current) {
      guidesRef.current.children.forEach((c) => {
        const mat = (c as THREE.Mesh).material as THREE.MeshBasicMaterial;
        mat.opacity = THREE.MathUtils.damp(mat.opacity, (state.guides ?? 0) * 0.85, 4, dt);
      });
      guidesRef.current.visible = (state.guides ?? 0) > 0.01 || true;
    }
  });

  return (
    <group>
      {teeth.map((t, i) => (
        <group
          key={t.id}
          ref={(el) => {
            refs.current[i] = el;
          }}
          position={t.pos}
          rotation={[0, t.rotY, 0]}
        >
          <mesh geometry={geos[i]} material={mats[i]} castShadow />
        </group>
      ))}
      <group ref={alignerRef}>
        {teeth.map((t, i) => (
          <mesh key={t.id} geometry={geos[i]} material={alignerMat} position={t.pos} rotation={[0, t.rotY, 0]} scale={[1.07, 1.05, 1.12]} />
        ))}
      </group>
      <mesh geometry={baseGeo}>
        <meshPhysicalMaterial color={BRAND.white} roughness={0.25} clearcoat={1} transparent opacity={0.28} depthWrite={false} />
      </mesh>
      <mesh ref={wireRef} geometry={wireGeo}>
        <meshStandardMaterial color={BRAND.plum} emissive={BRAND.plum} emissiveIntensity={0.6} transparent opacity={0} />
      </mesh>
      <pointLight ref={sweepRef} position={[0, 0.3, 0.9]} intensity={0} distance={2.2} color={BRAND.white} />
      <group ref={guidesRef}>
        {front.map((t) => (
          <mesh key={t.id} position={[t.pos.x - (Math.sign(t.pos.x) * t.w) / 2, t.pos.y, t.pos.z + t.d * 0.6]}>
            <planeGeometry args={[0.006, t.h * 1.25]} />
            <meshBasicMaterial color={BRAND.white} transparent opacity={0} depthWrite={false} />
          </mesh>
        ))}
        <mesh position={[0, front[0]?.pos.y - (front[0]?.h ?? 0) / 2 - 0.01, 0.2]}>
          <planeGeometry args={[1.9, 0.006]} />
          <meshBasicMaterial color={BRAND.plum} transparent opacity={0} depthWrite={false} />
        </mesh>
      </group>
    </group>
  );
}
