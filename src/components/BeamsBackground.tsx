import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// SummaFit Brand Palette for Beams
const BEAM_COLORS = [
  '#FE7500', // Orange
  '#BD68FE', // Violet
  '#4EDE66', // Green
  '#32B0FE', // Blue
  '#FF9926', // Bright Orange
];

interface BeamProps {
  color: string;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  speed: number;
  phase: number;
}

function SingleBeam({ color, position, rotation, scale, speed, phase }: BeamProps) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime() * speed + phase;
    meshRef.current.rotation.z = rotation[2] + Math.sin(t * 0.5) * 0.08;
    meshRef.current.rotation.x = rotation[0] + Math.cos(t * 0.3) * 0.05;
    
    // Pulse opacity
    if (meshRef.current.material) {
      (meshRef.current.material as THREE.MeshBasicMaterial).opacity =
        0.18 + Math.sin(t * 0.8) * 0.07;
    }
  });

  return (
    <mesh ref={meshRef} position={position} rotation={rotation} scale={scale}>
      <cylinderGeometry args={[0.08, 1.8, 28, 16, 1, true]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.2}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function FloatingParticles({ count = 60 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const palette = BEAM_COLORS.map((c) => new THREE.Color(c));

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 35;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 25;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15;

      const color = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;
    }
    return [pos, col];
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.getElapsedTime() * 0.15;
    pointsRef.current.rotation.y = t * 0.2;
    pointsRef.current.rotation.x = Math.sin(t * 0.1) * 0.1;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
        vertexColors
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function BeamsScene() {
  const groupRef = useRef<THREE.Group>(null!);

  const beams = useMemo(() => {
    const list: BeamProps[] = [];
    // Generate 12 elegant light beams arranged across the canvas
    const angles = [-0.8, -0.4, -0.15, 0.15, 0.4, 0.8];
    
    angles.forEach((angle, idx) => {
      BEAM_COLORS.forEach((color, cIdx) => {
        if ((idx + cIdx) % 2 === 0) {
          const posX = angle * 18 + (cIdx - 2) * 2.5;
          const posY = (cIdx % 2 === 0 ? 3 : -3) + Math.sin(idx) * 2;
          const posZ = -2 - cIdx * 1.5;
          
          list.push({
            color,
            position: [posX, posY, posZ],
            rotation: [0.3, 0.2 * Math.sign(angle), angle + (Math.random() * 0.1 - 0.05)],
            scale: [1 + Math.random() * 0.8, 1.2 + Math.random() * 0.5, 1],
            speed: 0.4 + Math.random() * 0.4,
            phase: Math.random() * Math.PI * 2,
          });
        }
      });
    });

    return list;
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const { x, y } = state.pointer;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, x * 0.05, 0.05);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -y * 0.05, 0.05);
  });

  return (
    <group ref={groupRef}>
      {beams.map((b, i) => (
        <SingleBeam key={i} {...b} />
      ))}
      <FloatingParticles count={80} />
    </group>
  );
}

export default function BeamsBackground() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 14], fov: 45 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
      >
        <ambientLight intensity={0.5} />
        <BeamsScene />
      </Canvas>
    </div>
  );
}
