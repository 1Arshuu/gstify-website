'use client';

// ─────────────────────────────────────────────────────────────────────────────
// SMOKE TEST (revertible): golden WebGL smoke + gold dust for the home hero.
// Desktop-only — renders nothing on touch / reduced-motion / narrow screens.
// To revert: delete this file and undo the marked block in app/page.tsx, then
// `npm uninstall three @react-three/fiber @types/three`.
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = Math.sin(s) * 10000;
    return s - Math.floor(s);
  };
}

function createSoftDotTexture() {
  const size = 64;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, 'rgba(255,255,255,1)');
  gradient.addColorStop(0.35, 'rgba(255,255,255,0.35)');
  gradient.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  return texture;
}

// Golden smoke body (was rose-red in the original).
function createStructuredSmokeTexture(seed = 1) {
  const rand = seededRandom(seed);
  const size = 384;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  ctx.clearRect(0, 0, size, size);
  ctx.translate(size / 2, size / 2);

  for (let i = 0; i < 7; i++) {
    ctx.save();
    const angle = (rand() - 0.5) * Math.PI * 0.8;
    const x = (rand() - 0.5) * size * 0.16;
    const y = (rand() - 0.5) * size * 0.12;
    const sx = 1.2 + rand() * 1.1;
    const sy = 0.18 + rand() * 0.22;
    const radius = size * (0.26 + rand() * 0.2);

    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.scale(sx, sy);

    const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, radius);
    // Golden body — brightened additively so it reads as warm gold light.
    gradient.addColorStop(0, 'rgba(232, 201, 122, 0.95)');
    gradient.addColorStop(0.35, 'rgba(216, 178, 100, 0.60)');
    gradient.addColorStop(0.7, 'rgba(184, 150, 79, 0.30)');
    gradient.addColorStop(1, 'rgba(150, 110, 40, 0)');

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  ctx.save();
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  for (let i = 0; i < 14; i++) {
    const startX = -size * 0.32 + rand() * size * 0.64;
    const startY = -size * 0.15 + rand() * size * 0.3;
    const cp1x = startX + (rand() - 0.5) * size * 0.28;
    const cp1y = startY + (rand() - 0.5) * size * 0.18;
    const cp2x = startX + (rand() - 0.5) * size * 0.42;
    const cp2y = startY + (rand() - 0.5) * size * 0.24;
    const endX = startX + (rand() - 0.5) * size * 0.6;
    const endY = startY + (rand() - 0.5) * size * 0.24;

    ctx.strokeStyle = `rgba(216, 178, 100, ${0.02 + rand() * 0.05})`;
    ctx.lineWidth = 3 + rand() * 10;
    ctx.filter = `blur(${1.5 + rand() * 3.5}px)`;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, endX, endY);
    ctx.stroke();
  }
  ctx.restore();

  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.globalCompositeOperation = 'destination-in';
  const fade = ctx.createRadialGradient(size / 2, size / 2, size * 0.05, size / 2, size / 2, size * 0.5);
  fade.addColorStop(0, 'rgba(0,0,0,1)');
  fade.addColorStop(0.64, 'rgba(0,0,0,0.86)');
  fade.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = fade;
  ctx.fillRect(0, 0, size, size);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

function GoldDust({ texture, count = 32 }: { texture: THREE.Texture; count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const data = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    const phases = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 9;
      positions[i * 3 + 2] = -1.5 + Math.random() * 2.5;
      speeds[i] = 0.004 + Math.random() * 0.007;
      phases[i] = Math.random() * Math.PI * 2;
    }
    return { positions, speeds, phases };
  }, [count]);

  useFrame((state) => {
    const points = pointsRef.current;
    if (!points) return;
    const elapsed = state.clock.elapsedTime;
    const positions = points.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      positions[i * 3 + 1] += data.speeds[i];
      positions[i * 3] += Math.sin(elapsed * 0.25 + data.phases[i]) * 0.002;
      if (positions[i * 3 + 1] > 4.7) {
        positions[i * 3 + 1] = -4.7;
        positions[i * 3] = (Math.random() - 0.5) * 16;
      }
    }
    points.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[data.positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        map={texture}
        transparent
        size={0.075}
        sizeAttenuation
        color="#E8C97A"
        opacity={0.25}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function PremiumGoldenSmoke({ textures, count = 34 }: { textures: THREE.Texture[]; count?: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const spriteRefs = useRef<THREE.Sprite[]>([]);
  const { viewport } = useThree();

  const pointer = useRef({ x: 999, y: 999, active: false });
  const smoothPointer = useRef({ x: 999, y: 999 });

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth - 0.5) * viewport.width;
      pointer.current.y = -(event.clientY / window.innerHeight - 0.5) * viewport.height;
      pointer.current.active = true;
    };
    const handlePointerLeave = () => {
      pointer.current.active = false;
      pointer.current.x = 999;
      pointer.current.y = 999;
    };
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerleave', handlePointerLeave);
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, [viewport.width, viewport.height]);

  const smoke = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const rand = seededRandom(i * 19 + 7);
      return {
        baseT: (i / count) * Math.PI * 2,
        textureIndex: i % textures.length,
        // Wider scatter so the haze fills the whole hero, not a central ribbon.
        ribbonOffset: (rand() - 0.5) * 2.6,
        verticalOffset: (rand() - 0.5) * 3.2,
        depthOffset: (rand() - 0.5) * 2.8,
        scale: 3.8 + rand() * 2.8,
        // Tuned for additive blending (each sprite adds a little warm gold light).
        opacity: 0.025 + rand() * 0.023,
        rotation: rand() * Math.PI * 2,
        rotationSpeed: (rand() - 0.5) * 0.0012,
        pulse: rand() * Math.PI * 2,
      };
    });
  }, [count, textures.length]);

  useFrame((state) => {
    const group = groupRef.current;
    if (!group) return;
    const time = state.clock.elapsedTime;

    smoothPointer.current.x += (pointer.current.x - smoothPointer.current.x) * 0.08;
    smoothPointer.current.y += (pointer.current.y - smoothPointer.current.y) * 0.08;

    // Span (almost) the full hero width and height instead of a thin band.
    const radiusX = viewport.width * 0.5;
    const radiusY = viewport.height * 0.46;
    const radiusZ = 2.4;
    const repelRadius = 2.5;
    const repelStrength = 1.25;

    for (let i = 0; i < smoke.length; i++) {
      const sprite = spriteRefs.current[i];
      if (!sprite) continue;
      const data = smoke[i];
      const t = data.baseT + time * 0.12;

      let x = Math.sin(t) * radiusX;
      let y = Math.sin(t * 2) * radiusY;
      const z = Math.cos(t) * radiusZ + data.depthOffset;

      const tangentX = Math.cos(t);
      const tangentY = Math.cos(t * 2) * 2;
      const normalX = -tangentY;
      const normalY = tangentX;
      const normalLength = Math.sqrt(normalX * normalX + normalY * normalY) || 1;

      const breathingOffset = data.ribbonOffset + Math.sin(time * 0.22 + data.baseT * 2) * 0.12;
      x += (normalX / normalLength) * breathingOffset;
      y += (normalY / normalLength) * breathingOffset + data.verticalOffset;

      if (pointer.current.active) {
        const dx = x - smoothPointer.current.x;
        const dy = y - smoothPointer.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < repelRadius) {
          const force = (1 - distance / repelRadius) * repelStrength;
          const safeDistance = distance || 0.001;
          x += (dx / safeDistance) * force;
          y += (dy / safeDistance) * force;
        }
      }

      sprite.position.set(x, y, z);

      const breathe = 1 + Math.sin(time * 0.28 + data.pulse) * 0.055;
      const finalScale = data.scale * breathe;
      sprite.scale.set(finalScale * 1.55, finalScale * 0.78, 1);

      const material = sprite.material as THREE.SpriteMaterial;
      material.rotation =
        data.rotation + time * data.rotationSpeed * 45 + Math.sin(time * 0.08 + data.pulse) * 0.045;
      material.opacity = data.opacity * (0.94 + Math.sin(time * 0.18 + data.pulse) * 0.06);
    }

    group.rotation.x = Math.sin(time * 0.025) * 0.035;
    group.rotation.y = Math.sin(time * 0.032) * 0.09;
    group.rotation.z = Math.cos(time * 0.026) * 0.035;
  });

  return (
    <group ref={groupRef}>
      {smoke.map((s, i) => (
        <sprite
          key={i}
          ref={(el) => {
            if (el) spriteRefs.current[i] = el;
          }}
          scale={[s.scale, s.scale, 1]}
        >
          <spriteMaterial
            map={textures[s.textureIndex]}
            color="#E8C97A"
            transparent
            opacity={s.opacity}
            depthWrite={false}
            depthTest={false}
            blending={THREE.AdditiveBlending}
          />
        </sprite>
      ))}
    </group>
  );
}

export default function HeroParticles() {
  const [enabled, setEnabled] = useState(false);
  const [smokeTextures, setSmokeTextures] = useState<THREE.Texture[] | null>(null);
  const [dustTexture, setDustTexture] = useState<THREE.Texture | null>(null);

  // Desktop-only gate: mouse pointer, motion allowed, wide enough screen.
  useEffect(() => {
    const ok =
      window.matchMedia('(pointer: fine)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches &&
      window.innerWidth >= 768;
    setEnabled(ok);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const createdSmoke = [
      createStructuredSmokeTexture(3),
      createStructuredSmokeTexture(12),
      createStructuredSmokeTexture(25),
    ].filter(Boolean) as THREE.Texture[];
    const createdDust = createSoftDotTexture();
    setSmokeTextures(createdSmoke);
    setDustTexture(createdDust);
    return () => {
      createdSmoke.forEach((t) => t.dispose());
      createdDust?.dispose();
    };
  }, [enabled]);

  if (!enabled || !smokeTextures || !dustTexture) return null;

  return (
    <div aria-hidden style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      <Canvas
        dpr={[1, 1.25]}
        gl={{ alpha: true, antialias: false, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0, 10], fov: 42, near: 0.1, far: 100 }}
      >
        <PremiumGoldenSmoke textures={smokeTextures} count={44} />
        <GoldDust texture={dustTexture} count={40} />
      </Canvas>
    </div>
  );
}
