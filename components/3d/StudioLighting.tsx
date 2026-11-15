"use client";
import { Environment, Lightformer } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import type { StudioRoom } from "@/lib/studio-rooms";

/**
 * Architectural lighting: warm fill (like the photos' indirect light), soft key with
 * shadows (desktop), reflections from a studio environment. On room change the light rises
 * gradually (controlled variation, no abrupt switch).
 */
export function StudioLighting({ room, quality }: { room: StudioRoom["id"]; quality: "high" | "low" }) {
  const hemi = useRef<THREE.HemisphereLight>(null);
  const key = useRef<THREE.DirectionalLight>(null);
  const level = useRef(0);
  useFrame((_, dt) => {
    level.current = THREE.MathUtils.damp(level.current, 1, 1.6, dt);
    if (hemi.current) hemi.current.intensity = 1.15 * level.current;
    if (key.current) key.current.intensity = 1.6 * level.current;
  });
  const warm = "#fff1e2";
  const pts: Record<StudioRoom["id"], [number, number, number][]> = {
    reception: [[-1.6, 2.6, -1.2], [1.4, 2.6, -1.2], [-1.6, 2.6, 1.2], [1.4, 2.6, 1.2]],
    treatment: [[0.2, 2.6, -0.7], [0.2, 2.6, 0.4]],
    consultation: [[0.1, 1.95, -0.3], [-1.0, 2.5, 0.8]],
  };
  return (
    <>
      <hemisphereLight key={room + "h"} ref={hemi} args={["#fffaf3", "#d9c7b6", 0]} />
      <directionalLight
        key={room + "k"}
        ref={key}
        position={[1.4, 2.55, 1.6]}
        intensity={0}
        color={warm}
        castShadow={quality === "high"}
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0004}
        shadow-normalBias={0.02}
        shadow-camera-left={-3.5}
        shadow-camera-right={3.5}
        shadow-camera-top={3.5}
        shadow-camera-bottom={-3.5}
        shadow-camera-near={0.1}
        shadow-camera-far={8}
        shadow-radius={6}
      />
      {pts[room].map((p, i) => (
        <pointLight key={room + i} position={p} intensity={room === "consultation" && i === 0 ? 2.2 : 2.6} distance={5.5} decay={1.6} color={warm} />
      ))}
      <Environment resolution={256} frames={1}>
        {/* interior "room" for reflections: light walls instead of empty black */}
        <mesh scale={12}>
          <sphereGeometry args={[1, 32, 16]} />
          <meshBasicMaterial color="#b9b0a7" side={THREE.BackSide} />
        </mesh>
        <Lightformer form="rect" intensity={1.6} position={[0, 4, 0]} rotation-x={Math.PI / 2} scale={[6, 4, 1]} color="#ffffff" />
        <Lightformer form="rect" intensity={0.8} position={[-5, 1.5, 0]} rotation-y={Math.PI / 2} scale={[6, 2.5, 1]} color="#fff4e8" />
        <Lightformer form="rect" intensity={1.1} position={[5, 1.5, 0]} rotation-y={-Math.PI / 2} scale={[6, 2.5, 1]} color="#eef3f7" />
        <Lightformer form="ring" intensity={1.2} position={[0, 2, 5]} scale={2} color="#ffffff" />
      </Environment>
    </>
  );
}
