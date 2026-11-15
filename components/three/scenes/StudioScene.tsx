"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, useTexture } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import loader from "@/lib/image-loader";
import { BRAND } from "../materials";
import { CameraRig } from "./common";

export type Station = { key: string; title: string; hotspot: string; hx: number; hy: number };

/** Each studio photo is a plane placed in space: the camera travels from one area to the next. */
function Frames({ stations, index }: { stations: Station[]; index: number }) {
  const urls = useMemo(() => stations.map((s) => loader({ src: `/media/${s.key}`, width: 1280 })), [stations]);
  const tex = useTexture(urls);
  const group = useRef<THREE.Group>(null);
  useMemo(() => tex.forEach((t) => (t.colorSpace = THREE.SRGBColorSpace)), [tex]);
  useFrame((_, dt) => {
    group.current?.children.forEach((c, i) => {
      const m = (c as THREE.Group).children[0] as THREE.Mesh;
      const mat = m.material as THREE.MeshBasicMaterial;
      mat.opacity = THREE.MathUtils.damp(mat.opacity, i === index ? 1 : Math.abs(i - index) === 1 ? 0.35 : 0.08, 4, dt);
    });
  });
  return (
    <group ref={group}>
      {stations.map((s, i) => {
        const x = i % 2 === 0 ? -0.6 : 0.6;
        return (
          <group key={s.key} position={[x, 0, -i * 4.2]} rotation={[0, i % 2 === 0 ? 0.12 : -0.12, 0]}>
            <mesh>
              <planeGeometry args={[3.0, 2.0]} />
              <meshBasicMaterial map={tex[i]} transparent opacity={i === 0 ? 1 : 0.1} toneMapped={false} />
            </mesh>
            {/* thin plum frame offset into depth */}
            <mesh position={[0.08, -0.08, -0.06]}>
              <planeGeometry args={[3.0, 2.0]} />
              <meshBasicMaterial color={BRAND.plum} transparent opacity={0.5} />
            </mesh>
            {i === index && (
              <Html position={[s.hx * 1.5, s.hy * 1.0, 0.05]} center zIndexRange={[10, 0]}>
                <div className="pointer-events-none flex items-center gap-2 whitespace-nowrap" aria-hidden="true">
                  <span className="relative flex h-4 w-4 items-center justify-center">
                    <span className="absolute h-4 w-4 animate-ping rounded-full bg-white/60 motion-reduce:animate-none" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white" />
                  </span>
                  <span className="rounded-full bg-black/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white">{s.hotspot}</span>
                </div>
              </Html>
            )}
          </group>
        );
      })}
    </group>
  );
}

export default function StudioScene({ stations, index, active, compact }: { stations: Station[]; index: number; active: boolean; compact: boolean }) {
  const x = index % 2 === 0 ? -0.6 : 0.6;
  const z = -index * 4.2;
  return (
    <Canvas
      className="!absolute inset-0"
      frameloop={active ? "always" : "never"}
      dpr={compact ? [1, 1.25] : [1, 1.6]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, 3.4], fov: compact ? 62 : 45 }}
    >
      <CameraRig pos={[x * 0.85, 0.05, z + (compact ? 3.9 : 2.9)]} look={[x, 0, z]} speed={2.2} />
      <Frames stations={stations} index={index} />
    </Canvas>
  );
}
