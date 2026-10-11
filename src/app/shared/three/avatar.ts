import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { cursor, trackCursor } from './pointer';

/**
 * A small ember robot that keeps an eye on the visitor: the head turns toward
 * the cursor, the body follows more lazily, the pupils slide inside the visor
 * and it blinks every few seconds. Built from primitives — no model download.
 * Inspired by 21st.dev's "Robot Hero" (alexperezcedeno), in an electric-blue palette.
 */

const SHELL = '#1c2f4f';
const TRIM = '#38bdf8';
const GLOW = '#67e8f9';

const damp = THREE.MathUtils.damp;
const clamp = THREE.MathUtils.clamp;

export interface Avatar {
  group: THREE.Group;
  /** Advance the animation. `talking` makes it nod and pulse its eyes. */
  update(t: number, dt: number, camera: THREE.Camera, canvas: HTMLCanvasElement, talking?: boolean): void;
  dispose(): void;
}

function roundedBox(w: number, h: number, d: number, radius: number, segments: number, material: THREE.Material): THREE.Mesh {
  return new THREE.Mesh(new RoundedBoxGeometry(w, h, d, segments, radius), material);
}

/** Builds the robot. `look` scales how far the head turns toward the cursor (1 = full). */
export function createAvatar(look = 1): Avatar {
  const shell = new THREE.MeshStandardMaterial({ color: SHELL, metalness: 0.55, roughness: 0.32 });
  const visorMat = new THREE.MeshStandardMaterial({ color: '#02050c', metalness: 0.9, roughness: 0.1 });
  const trim = new THREE.MeshStandardMaterial({ color: TRIM, emissive: TRIM, emissiveIntensity: 0.7, metalness: 0.3, roughness: 0.4 });
  const eyeMat = new THREE.MeshBasicMaterial({ color: GLOW, toneMapped: false });
  const bulbMat = new THREE.MeshBasicMaterial({ color: GLOW, toneMapped: false });
  const chestMat = new THREE.MeshBasicMaterial({ color: GLOW, toneMapped: false });

  const root = new THREE.Group();

  // Body
  const body = new THREE.Group();
  body.position.set(0, -0.78, 0);
  body.add(roundedBox(0.82, 0.62, 0.5, 0.18, 4, shell));
  const chest = new THREE.Mesh(new THREE.CircleGeometry(0.07, 24), chestMat);
  chest.position.set(0, 0.02, 0.252);
  const ring = new THREE.Mesh(new THREE.RingGeometry(0.09, 0.11, 32), trim);
  ring.position.set(0, 0.02, 0.251);
  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.13, 0.16, 20), shell);
  neck.position.set(0, 0.38, 0);
  body.add(chest, ring, neck);

  // Head
  const head = new THREE.Group();
  head.add(roundedBox(0.92, 0.74, 0.7, 0.24, 5, shell));
  const visor = roundedBox(0.72, 0.4, 0.1, 0.08, 4, visorMat);
  visor.position.set(0, 0.02, 0.31);
  head.add(visor);

  const eyeGeo = new THREE.CapsuleGeometry(0.055, 0.07, 8, 16);
  const eyeL = new THREE.Mesh(eyeGeo, eyeMat);
  const eyeR = new THREE.Mesh(eyeGeo, eyeMat);
  eyeL.position.set(-0.13, 0.02, 0.36);
  eyeR.position.set(0.13, 0.02, 0.36);
  head.add(eyeL, eyeR);

  for (const s of [-1, 1]) {
    const ear = new THREE.Group();
    ear.position.set(s * 0.48, 0, 0);
    ear.rotation.set(0, 0, (s * Math.PI) / 2);
    ear.add(new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.13, 0.1, 24), shell));
    const torus = new THREE.Mesh(new THREE.TorusGeometry(0.08, 0.018, 12, 32), trim);
    torus.position.set(0, s * -0.055, 0);
    torus.rotation.set(Math.PI / 2, 0, 0);
    ear.add(torus);
    head.add(ear);
  }

  const antenna = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.02, 0.22, 8), shell);
  antenna.position.set(0, 0.47, 0);
  const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.055, 20, 20), bulbMat);
  bulb.position.set(0, 0.6, 0);
  head.add(antenna, bulb);

  root.add(body, head);

  const headPos = new THREE.Vector3();
  const blink = { next: 2.5, t: -1 };

  const update: Avatar['update'] = (t, dt, camera, canvas, talking = false) => {
    // Real look-at: where is the head on screen, and where is the cursor
    // relative to it? The cursor is treated as a point ~500px in front of
    // the screen, so a cursor on the robot reads as "looking at you".
    let yaw = 0;
    let pitch = 0;
    if (cursor.active) {
      head.getWorldPosition(headPos).project(camera);
      const r = canvas.getBoundingClientRect();
      const sx = r.left + ((headPos.x + 1) / 2) * r.width;
      const sy = r.top + ((1 - headPos.y) / 2) * r.height;
      yaw = Math.atan2(cursor.x - sx, 500);
      pitch = Math.atan2(sy - cursor.y, 500);
    }
    const px = clamp(yaw / 1.1, -1.2, 1.2);
    const py = clamp(pitch / 1.1, -1.2, 1.2);

    // Head tracks the cursor; the body lags behind at a fraction of the angle.
    head.rotation.y = damp(head.rotation.y, px * 0.7 * look, 6, dt);
    const nod = talking ? Math.sin(t * 9) * 0.06 : 0;
    head.rotation.x = damp(head.rotation.x, -py * 0.45 * look + nod, 6, dt);
    head.rotation.z = damp(head.rotation.z, -px * 0.08, 4, dt);
    body.rotation.y = damp(body.rotation.y, px * 0.25 * look, 3, dt);
    root.position.y = Math.sin(t * 1.4) * 0.05;

    // Pupils slide toward the cursor inside the visor.
    const ex = clamp(px, -1, 1) * 0.05;
    const ey = clamp(py, -1, 1) * 0.035;

    // Blink: a quick squash every 2.5–5.5s.
    if (blink.t < 0 && t > blink.next) {
      blink.t = 0;
    }
    let squash = 1;
    if (blink.t >= 0) {
      blink.t += dt;
      squash = Math.abs(Math.cos(Math.min(blink.t / 0.16, 1) * Math.PI)) || 0.08;
      if (blink.t > 0.16) {
        blink.t = -1;
        blink.next = t + 2.5 + Math.random() * 3;
      }
    }

    for (const [eye, base] of [[eyeL, -0.13], [eyeR, 0.13]] as const) {
      eye.position.x = damp(eye.position.x, base + ex, 10, dt);
      eye.position.y = damp(eye.position.y, 0.02 + ey, 10, dt);
      const chatter = talking ? 1 + 0.22 * Math.abs(Math.sin(t * 14)) : 1;
      eye.scale.y = Math.max(squash, 0.08) * chatter;
    }

    const pulse = 0.6 + 0.4 * Math.sin(t * 3);
    bulbMat.color.setRGB(0.25 * pulse, 0.85 * pulse + 0.1, 1);
    chestMat.color.setRGB(0.2 * pulse, 0.75 * pulse + 0.1, 0.95 * pulse + 0.05);
  };

  const dispose = () => {
    root.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        obj.geometry.dispose();
      }
    });
    [shell, visorMat, trim, eyeMat, bulbMat, chestMat].forEach((m) => m.dispose());
  };

  return { group: root, update, dispose };
}

/**
 * Mounts just the robot into `host` (used by the scroll companion).
 * `isTalking` is polled every frame. Returns a cleanup function.
 */
export function mountAvatar(host: HTMLElement, isTalking: () => boolean, still = false): () => void {
  trackCursor();
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.setClearColor(0x000000, 0);
  const canvas = renderer.domElement;
  canvas.style.display = 'block';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  host.appendChild(canvas);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 50);
  camera.position.set(0, 0, 3.3);
  scene.add(new THREE.AmbientLight(0xffffff, 0.8));
  const key = new THREE.DirectionalLight('#dbeafe', 2.6);
  key.position.set(2, 3, 4);
  const rim1 = new THREE.PointLight('#38bdf8', 10, 8);
  rim1.position.set(-2, 1, 2);
  const rim2 = new THREE.PointLight('#6366f1', 12, 6);
  rim2.position.set(1.4, 0.6, -1.2);
  scene.add(key, rim1, rim2);

  const avatar = createAvatar(0.85);
  avatar.group.position.set(0, 0.15, 0);
  avatar.group.scale.setScalar(0.95);
  scene.add(avatar.group);

  const layout = () => {
    const w = host.clientWidth || 1;
    const h = host.clientHeight || 1;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  layout();
  const resizeObserver = new ResizeObserver(layout);
  resizeObserver.observe(host);

  const clock = new THREE.Clock();
  let frame = 0;
  const loop = () => {
    const dt = Math.min(clock.getDelta(), 1 / 30);
    avatar.update(clock.elapsedTime, dt, camera, canvas, isTalking());
    renderer.render(scene, camera);
    frame = still ? 0 : requestAnimationFrame(loop);
  };
  loop();

  return () => {
    cancelAnimationFrame(frame);
    resizeObserver.disconnect();
    avatar.dispose();
    renderer.dispose();
    canvas.remove();
  };
}

/** The shared warm lighting rig used wherever the robot appears. */
export function addRobotLights(scene: THREE.Scene, x = 0, y = 0): void {
  scene.add(new THREE.AmbientLight(0xffffff, 0.7));
  const key = new THREE.DirectionalLight('#dbeafe', 2.6);
  key.position.set(2.5, 3, 4);
  const rim1 = new THREE.PointLight('#38bdf8', 14, 9);
  rim1.position.set(x - 2.2, y + 1.2, 2);
  const rim2 = new THREE.PointLight('#6366f1', 18, 6);
  rim2.position.set(x + 1.4, y + 0.6, -1.2);
  scene.add(key, rim1, rim2);
}
