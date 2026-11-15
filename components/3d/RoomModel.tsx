"use client";
import { useGLTF } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader, type GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useLayoutEffect, useMemo } from "react";
import * as THREE from "three";
import { asset } from "@/lib/asset";

/**
 * In the single-page preview the artifact host only serves a few file types, so the
 * same GLB bytes are shipped base64-wrapped in a .json file and parsed with GLTFLoader.parse.
 * The real site (Next build) always loads the .glb files directly.
 */
const EXT = process.env.NEXT_PUBLIC_MODEL_EXT;
const modelUrl = (url: string) => asset(EXT ? url.replace(/\.glb$/, EXT) : url);

class JsonGLTFLoader extends GLTFLoader {
  load(url: string, onLoad: (g: GLTF) => void, _p?: unknown, onError?: (e: unknown) => void) {
    fetch(url)
      .then((r) => r.json())
      .then((j: { glb: string }) => {
        const bin = atob(j.glb);
        const buf = new Uint8Array(bin.length);
        for (let i = 0; i < bin.length; i++) buf[i] = bin.charCodeAt(i);
        this.parse(buf.buffer, "", onLoad, onError as (e: ErrorEvent) => void);
      })
      .catch((e) => onError?.(e));
  }
}

export const useRoomGLTF = (url: string): GLTF =>
  EXT === ".json"
    ? // eslint-disable-next-line react-hooks/rules-of-hooks
      (useLoader(JsonGLTFLoader, modelUrl(url)) as GLTF)
    : // eslint-disable-next-line react-hooks/rules-of-hooks
      (useGLTF(modelUrl(url), false, true) as unknown as GLTF);
export const preloadRoom = (url: string) =>
  EXT === ".json" ? useLoader.preload(JsonGLTFLoader, modelUrl(url)) : useGLTF.preload(modelUrl(url), false, true);

/**
 * Loads a room GLB, sets up shadows and replaces the floor with a reflective surface
 * (planar reflection: the glossy onyx floor seen in the photos).
 */
export function RoomModel({ url, quality }: { url: string; quality: "high" | "low" }) {
  const gltf = useRoomGLTF(url);
  const scene = useMemo(() => gltf.scene.clone(true), [gltf.scene]);
  const floor = useMemo(() => {
    let found: THREE.Mesh | null = null;
    scene.traverse((o) => {
      if ((o as THREE.Mesh).isMesh && o.name.startsWith("shell_marble")) found = o as THREE.Mesh;
    });
    if (!found) return null;
    const m = found as THREE.Mesh;
    // world-space size (the GLBs are quantised: local geometry is normalised and scaled by the node)
    scene.updateMatrixWorld(true);
    const bb = new THREE.Box3().setFromObject(m);
    const w = bb.max.x - bb.min.x;
    const d = bb.max.z - bb.min.z;
    const src = (m.material as THREE.MeshStandardMaterial).map;
    const map = src ? src.clone() : null;
    if (map) {
      map.wrapS = map.wrapT = THREE.RepeatWrapping;
      map.repeat.set(w / 2.4, d / 2.4);
      map.colorSpace = THREE.SRGBColorSpace;
      map.anisotropy = 8;
      map.needsUpdate = true;
    }
    return { mesh: m, w, d, map, cx: (bb.max.x + bb.min.x) / 2, cz: (bb.max.z + bb.min.z) / 2 };
  }, [scene]);

  useLayoutEffect(() => {
    scene.traverse((o) => {
      const mesh = o as THREE.Mesh;
      if (!mesh.isMesh) return;
      const mat = mesh.material as THREE.MeshPhysicalMaterial;
      const emissive = mat.emissiveIntensity > 0 && mat.emissive && mat.emissive.getHex() !== 0;
      const structural = /^(shell|ceiling|cove|pendant)|_(ceiling|cove|wall|lightPanel|daylight|clearGlass|neon\w*)$/.test(mesh.name);
      mesh.castShadow = quality === "high" && !emissive && !structural && !mat.transparent;
      mesh.receiveShadow = quality === "high";
      if (mat.envMapIntensity !== undefined) mat.envMapIntensity = 0.9;
      if (mat.transmission > 0 && quality === "low") {
        // weak hardware: replace transmission with simple transparency
        mat.transmission = 0;
        mat.transparent = true;
      }
    });
    if (floor) floor.mesh.visible = false;
  }, [scene, floor, quality]);

  return (
    <group>
      <primitive object={scene} />
      {floor && (
        <mesh rotation-x={-Math.PI / 2} position={[floor.cx, 0.001, floor.cz]} receiveShadow>
          <planeGeometry args={[floor.w, floor.d]} />
          <meshPhysicalMaterial map={floor.map ?? undefined} roughness={0.16} clearcoat={1} clearcoatRoughness={0.04} envMapIntensity={1.25} />
        </mesh>
      )}
    </group>
  );
}
