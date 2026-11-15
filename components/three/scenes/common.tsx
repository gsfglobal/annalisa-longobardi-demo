"use client";
import { Environment, Lightformer } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { BRAND } from "../materials";

/** Soft studio lighting: white key light, plum rim light. */
export function StudioLights() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[2.5, 4, 5]} intensity={2.4} color={BRAND.white} />
      <directionalLight position={[-3, 1, 3]} intensity={0.8} color={BRAND.white} />
      <pointLight position={[0, 0.5, -3]} intensity={18} color={BRAND.plum} distance={9} />
      <Environment resolution={128} frames={1}>
        <Lightformer intensity={2} position={[0, 5, 4]} scale={[10, 3, 1]} color={BRAND.white} />
        <Lightformer intensity={1} position={[-6, 1, 0]} rotation-y={Math.PI / 2} scale={[8, 4, 1]} color={BRAND.white} />
        <Lightformer intensity={1.4} position={[6, 0, -3]} rotation-y={-Math.PI / 2} scale={[8, 4, 1]} color={BRAND.plum} />
      </Environment>
    </>
  );
}

/** Interpolated camera rig toward a target position/look-at. */
export function CameraRig({ pos, look, speed = 3 }: { pos: [number, number, number]; look: [number, number, number]; speed?: number }) {
  const { camera } = useThree();
  const lookV = new THREE.Vector3();
  const cur = (camera.userData.look as THREE.Vector3) ?? new THREE.Vector3(...look);
  camera.userData.look = cur;
  useFrame((_, dt) => {
    camera.position.x = THREE.MathUtils.damp(camera.position.x, pos[0], speed, dt);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, pos[1], speed, dt);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, pos[2], speed, dt);
    lookV.set(...look);
    cur.lerp(lookV, 1 - Math.exp(-speed * dt));
    camera.lookAt(cur);
  });
  return null;
}
