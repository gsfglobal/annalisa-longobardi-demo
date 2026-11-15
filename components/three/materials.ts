import * as THREE from "three";

/** Materials: brightness and reflections only, no new brand colours. */
export const BRAND = { plum: "#843064", white: "#ffffff", pearl: "#f0f0f0", mist: "#eeeff0", black: "#000000" };

export const pearl = (opts: Partial<THREE.MeshPhysicalMaterialParameters> = {}) =>
  new THREE.MeshPhysicalMaterial({
    color: BRAND.pearl,
    roughness: 0.22,
    metalness: 0,
    clearcoat: 1,
    clearcoatRoughness: 0.12,
    sheen: 0.6,
    sheenColor: new THREE.Color(BRAND.white),
    sheenRoughness: 0.4,
    iridescence: 0.25,
    iridescenceIOR: 1.3,
    ...opts,
  });

export const glass = (opts: Partial<THREE.MeshPhysicalMaterialParameters> = {}) =>
  new THREE.MeshPhysicalMaterial({
    color: BRAND.white,
    roughness: 0.08,
    metalness: 0,
    transmission: 1,
    thickness: 0.35,
    ior: 1.45,
    transparent: true,
    opacity: 1,
    clearcoat: 1,
    ...opts,
  });

export const plumLine = () =>
  new THREE.MeshStandardMaterial({ color: BRAND.plum, emissive: BRAND.plum, emissiveIntensity: 0.6, roughness: 0.4 });
