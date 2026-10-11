import * as THREE from 'three';
import { addRobotLights, createAvatar } from './avatar';
import { cursor, trackCursor } from './pointer';

/**
 * "Woven light" — a (3,5) torus knot woven from ~10k electric-blue particles that scatter
 * away from the cursor and spring back, framing the robot. Inspired by
 * 21st.dev's Woven Light Hero (dhileepkumargm).
 *
 * Everything is one Points draw call with a tiny custom shader; the physics is
 * a plain CPU spring per particle.
 */

const CYAN = new THREE.Color('#38bdf8');
const INDIGO = new THREE.Color('#6366f1');
const AQUA = new THREE.Color('#22d3ee');
const ICE = new THREE.Color('#e0f2fe');

const vertexShader = /* glsl */ `
  attribute vec3 aColor;
  attribute float aSeed;
  uniform float uTime;
  uniform float uSize;
  uniform float uPixelRatio;
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    float twinkle = 0.65 + 0.35 * sin(uTime * 1.6 + aSeed * 40.0);
    gl_PointSize = uSize * uPixelRatio * twinkle * (1.0 / -mv.z);
    vColor = aColor;
    vAlpha = twinkle;
  }
`;

const fragmentShader = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.0, d);
    gl_FragColor = vec4(vColor, a * a * vAlpha);
  }
`;

function makeMaterial(size: number, pixelRatio: number): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uSize: { value: size },
      uPixelRatio: { value: pixelRatio },
    },
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
}

function createKnot(dense: boolean, pixelRatio: number) {
  const src = new THREE.TorusKnotGeometry(1, 0.22, dense ? 560 : 340, dense ? 32 : 24, 3, 5);
  const base = src.attributes['position'].array as Float32Array;
  const n = base.length / 3;
  const positions = new Float32Array(base.length);
  const colors = new Float32Array(base.length);
  const seeds = new Float32Array(n);
  const c = new THREE.Color();

  for (let i = 0; i < n; i++) {
    const j = i * 3;
    // Jitter off the surface so it reads as woven threads, not a mesh.
    positions[j] = base[j] + (Math.random() - 0.5) * 0.025;
    positions[j + 1] = base[j + 1] + (Math.random() - 0.5) * 0.025;
    positions[j + 2] = base[j + 2] + (Math.random() - 0.5) * 0.025;

    const t = i / n;
    c.copy(CYAN).lerp(t < 0.5 ? INDIGO : AQUA, Math.abs(Math.sin(t * Math.PI * 3)));
    if (Math.random() < 0.06) {
      c.copy(ICE);
    }
    colors[j] = c.r;
    colors[j + 1] = c.g;
    colors[j + 2] = c.b;
    seeds[i] = Math.random();
  }
  src.dispose();

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('aColor', new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1));
  const material = makeMaterial(dense ? 30 : 34, pixelRatio);

  const inner = new THREE.Group();
  inner.add(new THREE.Points(geometry, material));
  const outer = new THREE.Group();
  outer.add(inner);

  return { outer, inner, geometry, material, home: positions.slice(), velocity: new Float32Array(positions.length) };
}

/** Far, faint dust so the knot sits in space rather than on a flat colour. */
function createDust(count: number, pixelRatio: number) {
  const p = new Float32Array(count * 3);
  const col = new Float32Array(count * 3);
  const seeds = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    const r = 4 + Math.random() * 6;
    const th = Math.random() * Math.PI * 2;
    const ph = Math.acos(2 * Math.random() - 1);
    p[i * 3] = r * Math.sin(ph) * Math.cos(th);
    p[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th);
    p[i * 3 + 2] = r * Math.cos(ph) - 4;
    const c = Math.random() < 0.7 ? CYAN : ICE;
    col[i * 3] = c.r * 0.6;
    col[i * 3 + 1] = c.g * 0.6;
    col[i * 3 + 2] = c.b * 0.6;
    seeds[i] = Math.random();
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(p, 3));
  geometry.setAttribute('aColor', new THREE.BufferAttribute(col, 3));
  geometry.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1));
  const material = makeMaterial(28, pixelRatio);
  return { points: new THREE.Points(geometry, material), geometry, material };
}

/** Mounts the hero scene into `host`. Returns a cleanup function. */
export function mountWovenLight(host: HTMLElement, still = false): () => void {
  trackCursor();
  const dense = window.innerWidth >= 768;
  const pixelRatio = Math.min(window.devicePixelRatio, 1.75);

  const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(pixelRatio);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.setClearColor(0x000000, 0);
  const canvas = renderer.domElement;
  canvas.style.display = 'block';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  host.appendChild(canvas);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.set(0, 0, 5);

  const dust = createDust(dense ? 500 : 250, pixelRatio);
  const knot = createKnot(dense, pixelRatio);
  const avatar = createAvatar();
  addRobotLights(scene);
  scene.add(dust.points, knot.outer, avatar.group);

  // The canvas is the 3D stage only: centre the robot and size it to the tighter side.
  const layout = () => {
    const w = host.clientWidth || 1;
    const h = host.clientHeight || 1;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    const vh = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z;
    const vw = vh * camera.aspect;
    const s = Math.min(vw / 2.9, vh / 2.9);
    knot.outer.position.set(0, s * 0.2, -1.2);
    knot.outer.scale.setScalar(s * 1.05);
    // The robot's centre sits ~0.21 units below its origin, so lift it into the halo.
    avatar.group.position.set(0, s * 0.2 + s * 0.95 * 0.21, 0);
    avatar.group.scale.setScalar(s * 0.95);
  };
  layout();
  const resizeObserver = new ResizeObserver(layout);
  resizeObserver.observe(host);

  const mouse = new THREE.Vector3();
  const ray = new THREE.Vector3();
  const clock = new THREE.Clock();
  let frame = 0;
  let visible = true;

  const render = () => {
    const dt = Math.min(clock.getDelta(), 1 / 30);
    const t = clock.elapsedTime;
    knot.material.uniforms['uTime'].value = t;
    dust.material.uniforms['uTime'].value = t;
    dust.points.rotation.y += dt * 0.02;

    // Slow idle spin plus a gentle tilt toward the cursor.
    const g = knot.inner;
    g.rotation.y += dt * 0.12;
    const r = canvas.getBoundingClientRect();
    const nx = cursor.active ? ((cursor.x - r.left) / r.width) * 2 - 1 : 0;
    const ny = cursor.active ? -((cursor.y - r.top) / r.height) * 2 + 1 : 0;
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, 0.35 + THREE.MathUtils.clamp(ny, -1, 1) * 0.25, 0.04);
    g.rotation.z = THREE.MathUtils.lerp(g.rotation.z, -THREE.MathUtils.clamp(nx, -1, 1) * 0.15, 0.04);

    // Cursor projected onto the plane at the knot's depth, then into its local space.
    const planeZ = g.getWorldPosition(mouse).z;
    ray.set(nx, ny, 0.5).unproject(camera).sub(camera.position).normalize();
    const dist = (planeZ - camera.position.z) / ray.z;
    mouse.copy(camera.position).addScaledVector(ray, dist);
    g.worldToLocal(mouse);

    const pos = knot.geometry.attributes['position'].array as Float32Array;
    const { home, velocity } = knot;
    const r2 = 0.55 * 0.55;
    for (let i = 0; i < pos.length; i += 3) {
      const dx = pos[i] - mouse.x;
      const dy = pos[i + 1] - mouse.y;
      const dz = pos[i + 2] - mouse.z;
      const d2 = dx * dx + dy * dy + dz * dz;
      if (cursor.active && d2 < r2) {
        const f = (1 - d2 / r2) * 0.05;
        const inv = 1 / Math.sqrt(d2 + 1e-4);
        velocity[i] += dx * inv * f;
        velocity[i + 1] += dy * inv * f;
        velocity[i + 2] += dz * inv * f;
      }
      velocity[i] += (home[i] - pos[i]) * 0.035;
      velocity[i + 1] += (home[i + 1] - pos[i + 1]) * 0.035;
      velocity[i + 2] += (home[i + 2] - pos[i + 2]) * 0.035;
      velocity[i] *= 0.88;
      velocity[i + 1] *= 0.88;
      velocity[i + 2] *= 0.88;
      pos[i] += velocity[i];
      pos[i + 1] += velocity[i + 1];
      pos[i + 2] += velocity[i + 2];
    }
    knot.geometry.attributes['position'].needsUpdate = true;

    avatar.update(t, dt, camera, canvas);
    renderer.render(scene, camera);
  };

  const loop = () => {
    render();
    frame = visible && !still ? requestAnimationFrame(loop) : 0;
  };

  // Stop rendering entirely once the hero scrolls out of view.
  const io = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible && !frame && !still) {
      clock.getDelta();
      frame = requestAnimationFrame(loop);
    }
  }, { threshold: 0 });
  io.observe(host);
  loop();

  return () => {
    cancelAnimationFrame(frame);
    io.disconnect();
    resizeObserver.disconnect();
    knot.geometry.dispose();
    knot.material.dispose();
    dust.geometry.dispose();
    dust.material.dispose();
    avatar.dispose();
    renderer.dispose();
    canvas.remove();
  };
}
