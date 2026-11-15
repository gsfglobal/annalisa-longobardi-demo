"use client";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, PresentationControls } from "@react-three/drei";
import { Arch, type ArchState } from "../Arch";
import { CameraRig, StudioLights } from "./common";

export type SmileMode = "estetica" | "allineamento" | "funzione" | "personalizzazione";

const VIEWS: Record<SmileMode, { pos: [number, number, number]; look: [number, number, number]; state: ArchState }> = {
  // aesthetics: front view, proportion guides on the six front teeth
  estetica: { pos: [0, 0.35, 4.6], look: [0, 0.25, -0.35], state: { focus: (t) => t.index <= 2, guides: 1 } },
  // alignment: occlusal view from above, arch curve
  allineamento: { pos: [0, 4.4, 1.2], look: [0, 0.1, -0.75], state: { wire: 1 } },
  // function: low side view, back teeth (chewing) highlighted
  funzione: { pos: [4.6, 0.45, 1.9], look: [0.1, 0.25, -0.75], state: { focus: (t) => t.index >= 3 } },
  // personalisation: one element isolated for analysis
  personalizzazione: { pos: [2.6, 0.9, 3.3], look: [0.25, 0.25, -0.4], state: { focus: (t) => t.id === 10, lifted: 10 } },
};

export default function SmileScene({ mode, active, compact }: { mode: SmileMode; active: boolean; compact: boolean }) {
  const v = VIEWS[mode];
  return (
    <Canvas
      className="!absolute inset-0 touch-pan-y"
      frameloop={active ? "always" : "never"}
      dpr={compact ? [1, 1.25] : [1, 1.75]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0.6, 4], fov: compact ? 42 : 34 }}
    >
      <StudioLights />
      <CameraRig pos={compact ? [v.pos[0] * 1.15, v.pos[1] * 1.1, v.pos[2] * 1.25] : v.pos} look={v.look} />
      <PresentationControls global={false} cursor snap polar={[-0.25, 0.35]} azimuth={[-0.6, 0.6]} speed={1.2} zoom={1}>
        <group position={[0, -0.05, 0.35]}>
          <Arch state={v.state} />
        </group>
      </PresentationControls>
      <ContactShadows position={[0, -0.12, 0]} opacity={0.35} scale={6} blur={2.6} far={1.5} color="#000000" />
    </Canvas>
  );
}
