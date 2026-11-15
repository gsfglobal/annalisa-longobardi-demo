"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { ribbonGeometry, smileCurve } from "../geometry";
import { BRAND, pearl } from "../materials";

export type Progress = { current: number };

function Sculpture({ progress, reduced, compact }: { progress: Progress; reduced: boolean; compact: boolean }) {
  const group = useRef<THREE.Group>(null);
  const { camera, pointer } = useThree();
  const geo = useMemo(() => {
    const upper = ribbonGeometry(smileCurve(4.6, 0.55, 0.9, 0.0, 11), 0.16, 0.05, 260);
    const lower = ribbonGeometry(smileCurve(4.1, 1.05, 0.25, 0.25, 11), 0.42, 0.09, 260);
    const inner = ribbonGeometry(smileCurve(3.3, 0.78, 0.2, 0.55, 11), 0.05, 0.03, 200);
    return { upper, lower, inner };
  }, []);
  const mats = useMemo(
    () => ({
      pearl: pearl({ iridescence: 0.55 }),
      line: new THREE.MeshStandardMaterial({ color: BRAND.plum, emissive: BRAND.plum, emissiveIntensity: 0.55 }),
    }),
    []
  );
  const light = useRef<THREE.PointLight>(null);
  useFrame((state, dt) => {
    const p = reduced ? 0.35 : progress.current;
    const t = state.clock.elapsedTime;
    const g = group.current;
    if (!g) return;
    // 1) the camera moves gently forward  2) the sculpture changes perspective
    const camZ = THREE.MathUtils.lerp(compact ? 8.2 : 6.6, compact ? 5.4 : 3.9, Math.min(1, p * 1.3));
    const camY = THREE.MathUtils.lerp(0.2, 0.9, p);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, camZ, 4, dt);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, camY, 4, dt);
    camera.lookAt(0, -0.35, 0);
    const px = reduced ? 0 : pointer.x;
    const py = reduced ? 0 : pointer.y;
    const rx = THREE.MathUtils.lerp(0.08, 0.95, p) - py * 0.08 + (reduced ? 0 : Math.sin(t * 0.4) * 0.02);
    const ry = THREE.MathUtils.lerp(-0.18, 0.55, p) + px * 0.14;
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, rx, 3, dt);
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, ry, 3, dt);
    g.position.y = THREE.MathUtils.damp(g.position.y, THREE.MathUtils.lerp(0.15, 0.85, p), 3, dt);
    // light that follows the pointer discreetly (the reflections shift across the material)
    if (light.current) {
      light.current.position.x = THREE.MathUtils.damp(light.current.position.x, px * 3.2, 2.5, dt);
      light.current.position.y = THREE.MathUtils.damp(light.current.position.y, 1 + py * 1.6, 2.5, dt);
    }
  });

  return (
    <>
      <group ref={group}>
        <mesh geometry={geo.upper} material={mats.pearl} />
        <mesh geometry={geo.lower} material={mats.pearl} />
        <mesh geometry={geo.inner} material={mats.line} />
      </group>
      <pointLight ref={light} position={[0, 1, 2.2]} intensity={9} distance={7} color={BRAND.white} />
    </>
  );
}

export default function HeroScene({
  progress,
  active,
  reduced,
  compact,
}: {
  progress: Progress;
  active: boolean;
  reduced: boolean;
  compact: boolean;
}) {
  return (
    <Canvas
      className="!absolute inset-0"
      frameloop={active ? "always" : "never"}
      dpr={compact ? [1, 1.25] : [1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0.2, compact ? 8.2 : 6.6], fov: 35 }}
    >
      <ambientLight intensity={0.25} />
      <directionalLight position={[3, 4, 5]} intensity={2.2} color={BRAND.white} />
      <pointLight position={[0, -1, -3]} intensity={30} color={BRAND.plum} distance={12} />
      <pointLight position={[-4, 1, -2]} intensity={14} color={BRAND.plum} distance={10} />
      <Environment resolution={128} frames={1}>
        <Lightformer intensity={2.4} position={[0, 4, 3]} scale={[8, 2, 1]} color={BRAND.white} />
        <Lightformer intensity={1.2} position={[-5, 0, 1]} rotation-y={Math.PI / 2} scale={[6, 3, 1]} color={BRAND.white} />
        <Lightformer intensity={1.6} position={[5, -1, -2]} rotation-y={-Math.PI / 2} scale={[6, 3, 1]} color={BRAND.plum} />
      </Environment>
      <Sculpture progress={progress} reduced={reduced} compact={compact} />
    </Canvas>
  );
}
