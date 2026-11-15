"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Edges, Float, PresentationControls } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Arch, type ArchState } from "../Arch";
import { toothGeometry } from "../geometry";
import { BRAND, glass, pearl } from "../materials";
import { CameraRig, StudioLights } from "./common";

export type TreatmentKey = "invisalign" | "faccette-dentali" | "ortodonzia" | "sbiancamento-dentale";

/** Illustrative veneer: a single enlarged tooth with a thin shell approaching the front surface. */
function VeneerModel({ play }: { play: number }) {
  const tooth = useMemo(() => toothGeometry("central", 1.2, 1.55, 1.0), []);
  const shell = useMemo(() => toothGeometry("central", 1.22, 1.5, 0.22), []);
  const mats = useMemo(() => ({ tooth: pearl(), shell: glass({ thickness: 0.2, roughness: 0.18, opacity: 0.95 }) }), []);
  const shellRef = useRef<THREE.Mesh>(null);
  const start = useRef(0);
  useEffect(() => {
    start.current = performance.now();
  }, [play]);
  useFrame((_, dt) => {
    const t = Math.min(1, (performance.now() - start.current) / 2200);
    const e = 1 - Math.pow(1 - t, 3);
    if (shellRef.current) {
      shellRef.current.position.z = THREE.MathUtils.damp(shellRef.current.position.z, THREE.MathUtils.lerp(1.6, 0.47, e), 6, dt);
      shellRef.current.rotation.y = THREE.MathUtils.lerp(0.5, 0, e);
    }
  });
  return (
    <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.2}>
      <group position={[0, 0.15, 0]}>
        <mesh geometry={tooth} material={mats.tooth} />
        <mesh ref={shellRef} geometry={shell} material={mats.shell} position={[0, 0.02, 1.6]}>
          <Edges threshold={30} color={BRAND.plum} />
        </mesh>
      </group>
    </Float>
  );
}

function ArchTreatment({ k, play }: { k: TreatmentKey; play: number }) {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    setPhase(0);
    const id = setTimeout(() => setPhase(1), 450);
    return () => clearTimeout(id);
  }, [k, play]);
  const state: ArchState =
    k === "invisalign"
      ? { aligner: phase }
      : k === "ortodonzia"
        ? { misalign: 1 - phase, wire: phase }
        : { sweep: true };
  return <Arch state={state} />;
}

const CAM: Record<TreatmentKey, { pos: [number, number, number]; look: [number, number, number] }> = {
  invisalign: { pos: [2.0, 1.3, 4.6], look: [0, 0.2, -0.45] },
  "faccette-dentali": { pos: [1.1, 0.4, 5.6], look: [0, 0.1, 0] },
  ortodonzia: { pos: [0, 4.9, 2.4], look: [0, 0.1, -0.7] },
  "sbiancamento-dentale": { pos: [0, 0.45, 5.0], look: [0, 0.2, -0.35] },
};

export default function TreatmentScene({ k, play, active, compact }: { k: TreatmentKey; play: number; active: boolean; compact: boolean }) {
  const c = CAM[k];
  return (
    <Canvas
      className="!absolute inset-0 touch-pan-y"
      frameloop={active ? "always" : "never"}
      dpr={compact ? [1, 1.25] : [1, 1.75]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 1, 4], fov: compact ? 42 : 34 }}
    >
      <StudioLights />
      <CameraRig pos={compact ? [c.pos[0] * 1.1, c.pos[1] * 1.1, c.pos[2] * 1.3] : c.pos} look={c.look} speed={2.6} />
      <PresentationControls global={false} cursor snap polar={[-0.2, 0.3]} azimuth={[-0.5, 0.5]} speed={1.1}>
        <group position={[0, -0.05, 0.3]}>{k === "faccette-dentali" ? <VeneerModel play={play} /> : <ArchTreatment k={k} play={play} />}</group>
      </PresentationControls>
      <ContactShadows position={[0, -0.15, 0]} opacity={0.3} scale={6} blur={2.6} far={1.6} color="#000000" />
    </Canvas>
  );
}
