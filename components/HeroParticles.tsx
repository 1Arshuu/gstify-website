'use client';

// ─────────────────────────────────────────────────────────────────────────────
// Neon nebula — gold / teal / violet particle field + aurora ribbons, additive
// glow on deep ink, cursor-reactive. Renders on all devices (respects reduced
// motion). The hero's signature WebGL layer.
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

function softDot() {
  const size = 64;
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d');
  if (!ctx) return null;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.4, 'rgba(255,255,255,0.4)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const t = new THREE.CanvasTexture(c);
  t.minFilter = t.magFilter = THREE.LinearFilter;
  return t;
}

function nebula(seed: number, rgb: string) {
  const rand = seededRandom(seed);
  const size = 320;
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d');
  if (!ctx) return null;
  ctx.translate(size / 2, size / 2);
  for (let i = 0; i < 6; i++) {
    ctx.save();
    ctx.rotate((rand() - 0.5) * Math.PI);
    ctx.scale(1.1 + rand() * 1.1, 0.2 + rand() * 0.22);
    const r = size * (0.26 + rand() * 0.2);
    const g = ctx.createRadialGradient(0, 0, 0, 0, 0, r);
    g.addColorStop(0, `rgba(${rgb},0.85)`);
    g.addColorStop(0.4, `rgba(${rgb},0.4)`);
    g.addColorStop(1, `rgba(${rgb},0)`);
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.globalCompositeOperation = 'destination-in';
  const fade = ctx.createRadialGradient(size / 2, size / 2, size * 0.05, size / 2, size / 2, size * 0.5);
  fade.addColorStop(0, 'rgba(0,0,0,1)');
  fade.addColorStop(0.65, 'rgba(0,0,0,0.8)');
  fade.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = fade;
  ctx.fillRect(0, 0, size, size);
  const t = new THREE.CanvasTexture(c);
  t.minFilter = t.magFilter = THREE.LinearFilter;
  return t;
}

const PALETTE = ['232,201,122', '94,234,212', '167,139,250', '255,233,176'];
const COLORS = PALETTE.map((p) => new THREE.Color(`rgb(${p})`));

function NeonField({ texture, count }: { texture: THREE.Texture; count: number }) {
  const ref = useRef<THREE.Points>(null);
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  const data = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 18;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 11;
      positions[i * 3 + 2] = -2 + Math.random() * 4;
      const col = COLORS[Math.floor(Math.random() * COLORS.length)];
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
      speeds[i] = 0.003 + Math.random() * 0.008;
    }
    return { positions, colors, speeds };
  }, [count]);

  useFrame((state) => {
    const pts = ref.current;
    if (!pts) return;
    const t = state.clock.elapsedTime;
    const arr = pts.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += data.speeds[i];
      arr[i * 3] += Math.sin(t * 0.3 + i) * 0.0016;
      if (arr[i * 3 + 1] > 5.6) arr[i * 3 + 1] = -5.6;
    }
    pts.geometry.attributes.position.needsUpdate = true;
    // parallax toward cursor
    pts.rotation.y += ((pointer.current.x * 0.25 - pts.rotation.y) * 0.04);
    pts.rotation.x += ((-pointer.current.y * 0.18 - pts.rotation.x) * 0.04);
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[data.positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[data.colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        map={texture}
        size={0.11}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.95}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function AuroraRibbons({ textures, count }: { textures: THREE.Texture[]; count: number }) {
  const group = useRef<THREE.Group>(null);
  const sprites = useRef<THREE.Sprite[]>([]);
  const { viewport } = useThree();
  const pointer = useRef({ x: 999, y: 999, active: false });
  const smooth = useRef({ x: 999, y: 999 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth - 0.5) * viewport.width;
      pointer.current.y = -(e.clientY / window.innerHeight - 0.5) * viewport.height;
      pointer.current.active = true;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [viewport.width, viewport.height]);

  const ribbons = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => {
        const rand = seededRandom(i * 23 + 5);
        return {
          baseT: (i / count) * Math.PI * 2,
          tex: i % textures.length,
          ribbon: (rand() - 0.5) * 2.4,
          vy: (rand() - 0.5) * 2.6,
          depth: (rand() - 0.5) * 3,
          scale: 3.4 + rand() * 2.8,
          opacity: 0.1 + rand() * 0.12,
          rot: rand() * Math.PI * 2,
          rotSpeed: (rand() - 0.5) * 0.0014,
          pulse: rand() * Math.PI * 2,
        };
      }),
    [count, textures.length],
  );

  useFrame((state) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    smooth.current.x += (pointer.current.x - smooth.current.x) * 0.08;
    smooth.current.y += (pointer.current.y - smooth.current.y) * 0.08;
    const rx = viewport.width * 0.42;
    const ry = viewport.height * 0.36;
    for (let i = 0; i < ribbons.length; i++) {
      const sp = sprites.current[i];
      if (!sp) continue;
      const d = ribbons[i];
      const tt = d.baseT + t * 0.1;
      let x = Math.sin(tt) * rx;
      let y = Math.sin(tt * 2) * ry + d.vy;
      const z = Math.cos(tt) * 2 + d.depth;
      x += d.ribbon + Math.sin(t * 0.2 + d.baseT) * 0.2;
      if (pointer.current.active) {
        const dx = x - smooth.current.x;
        const dy = y - smooth.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 2.8) {
          const f = (1 - dist / 2.8) * 1.5;
          const sd = dist || 0.001;
          x += (dx / sd) * f;
          y += (dy / sd) * f;
        }
      }
      sp.position.set(x, y, z);
      const breathe = 1 + Math.sin(t * 0.3 + d.pulse) * 0.06;
      sp.scale.set(d.scale * breathe * 1.5, d.scale * breathe * 0.8, 1);
      const m = sp.material as THREE.SpriteMaterial;
      m.rotation = d.rot + t * d.rotSpeed * 45;
      m.opacity = d.opacity * (0.92 + Math.sin(t * 0.2 + d.pulse) * 0.08);
    }
    g.rotation.z = Math.sin(t * 0.03) * 0.05;
  });

  return (
    <group ref={group}>
      {ribbons.map((r, i) => (
        <sprite
          key={i}
          ref={(el) => {
            if (el) sprites.current[i] = el;
          }}
          scale={[r.scale, r.scale, 1]}
        >
          <spriteMaterial
            map={textures[r.tex]}
            transparent
            opacity={r.opacity}
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
  const [tex, setTex] = useState<{ dot: THREE.Texture; ribbons: THREE.Texture[] } | null>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const dot = softDot();
    const ribbons = [
      nebula(3, '232,201,122'),
      nebula(9, '94,234,212'),
      nebula(17, '167,139,250'),
    ].filter(Boolean) as THREE.Texture[];
    if (dot) setTex({ dot, ribbons });
    return () => {
      dot?.dispose();
      ribbons.forEach((t) => t.dispose());
    };
  }, [enabled]);

  if (!enabled || !tex) return null;

  const mobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <div aria-hidden style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      <Canvas
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: false, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0, 10], fov: 44, near: 0.1, far: 100 }}
      >
        <NeonField texture={tex.dot} count={mobile ? 90 : 150} />
        <AuroraRibbons textures={tex.ribbons} count={mobile ? 16 : 26} />
      </Canvas>
    </div>
  );
}
