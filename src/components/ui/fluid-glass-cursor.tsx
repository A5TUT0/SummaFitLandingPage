/* eslint-disable react/no-unknown-property */
import * as THREE from "three";
import { Canvas, createPortal, useFrame, useThree } from "@react-three/fiber";
import { MeshTransmissionMaterial, useFBO, useGLTF } from "@react-three/drei";
import { easing } from "maath";
import { Suspense, useEffect, useRef, useState } from "react";

const LENS_MODEL = "/assets/3d/lens.glb";

type PointerPosition = {
  x: number;
  y: number;
};

const vertexShader = /* glsl */ `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  varying vec2 vUv;

  float glow(vec2 point, float radius) {
    return 1.0 - smoothstep(0.0, radius, distance(vUv, point));
  }

  void main() {
    vec3 color = vec3(0.961, 0.969, 0.980);
    color = mix(color, vec3(0.996, 0.459, 0.000), glow(vec2(0.06, 0.92), 0.64) * 0.88);
    color = mix(color, vec3(0.741, 0.408, 0.996), glow(vec2(0.94, 0.90), 0.62) * 0.68);
    color = mix(color, vec3(0.306, 0.871, 0.400), glow(vec2(0.08, 0.06), 0.62) * 0.60);
    color = mix(color, vec3(0.196, 0.690, 0.996), glow(vec2(0.94, 0.08), 0.66) * 0.64);

    gl_FragColor = vec4(color, 1.0);
  }
`;

function Palette({ scene }: { scene: THREE.Scene }) {
  const { viewport, camera } = useThree();
  const currentViewport = viewport.getCurrentViewport(camera, [0, 0, 0]);

  return createPortal(
    <mesh scale={[currentViewport.width, currentViewport.height, 1]}>
      <planeGeometry />
      <shaderMaterial vertexShader={vertexShader} fragmentShader={fragmentShader} />
    </mesh>,
    scene,
  );
}

function FluidLens({ pointer }: { pointer: React.RefObject<PointerPosition> }) {
  const lens = useRef<THREE.Mesh>(null);
  const { nodes } = useGLTF(LENS_MODEL);
  const buffer = useFBO({ samples: 4 });
  const { viewport } = useThree();
  const [backgroundScene] = useState(() => new THREE.Scene());

  useFrame((state, delta) => {
    if (!lens.current) return;

    const currentViewport = state.viewport.getCurrentViewport(
      state.camera,
      [0, 0, 15],
    );
    const targetX = (pointer.current.x * currentViewport.width) / 2;
    const targetY = (pointer.current.y * currentViewport.height) / 2;

    easing.damp3(lens.current.position, [targetX, targetY, 15], 0.13, delta);

    const previousColor = state.gl.getClearColor(new THREE.Color());
    const previousAlpha = state.gl.getClearAlpha();

    state.gl.setRenderTarget(buffer);
    state.gl.setClearColor(0xf5f7fa, 1);
    state.gl.clear();
    state.gl.render(backgroundScene, state.camera);
    state.gl.setRenderTarget(null);
    state.gl.setClearColor(previousColor, previousAlpha);
  });

  return (
    <>
      <Palette scene={backgroundScene} />
      <mesh
        ref={lens}
        scale={Math.min(0.18, viewport.width * 0.026)}
        rotation-x={Math.PI / 2}
        geometry={(nodes.Cylinder as THREE.Mesh | undefined)?.geometry}
      >
        <MeshTransmissionMaterial
          buffer={buffer.texture}
          transmission={1}
          roughness={0.03}
          thickness={5}
          ior={1.15}
          anisotropy={0.01}
          chromaticAberration={0.12}
          clearcoat={1}
          attenuationColor="#ffffff"
          attenuationDistance={0.3}
        />
      </mesh>
    </>
  );
}

export function FluidGlassCursor() {
  const pointer = useRef<PointerPosition>({ x: 0, y: 0 });
  const [isEnabled, setIsEnabled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateAvailability = () => {
      const enabled = finePointer.matches && !reducedMotion.matches;
      setIsEnabled(enabled);
      if (!enabled) setIsVisible(false);
    };

    const handlePointerMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
      setIsVisible(true);
    };

    const handlePointerLeave = () => setIsVisible(false);

    updateAvailability();
    finePointer.addEventListener("change", updateAvailability);
    reducedMotion.addEventListener("change", updateAvailability);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", handlePointerLeave);

    return () => {
      finePointer.removeEventListener("change", updateAvailability);
      reducedMotion.removeEventListener("change", updateAvailability);
      window.removeEventListener("pointermove", handlePointerMove);
      document.documentElement.removeEventListener("mouseleave", handlePointerLeave);
    };
  }, []);

  if (!isEnabled) return null;

  return (
    <div
      className="fluid-glass-cursor"
      data-visible={isVisible ? "true" : "false"}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 20], fov: 15 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
      >
        <Suspense fallback={null}>
          <FluidLens pointer={pointer} />
        </Suspense>
      </Canvas>
    </div>
  );
}
