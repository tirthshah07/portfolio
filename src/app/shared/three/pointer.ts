/**
 * The cursor in viewport (client) pixels, shared by every 3D canvas, so each
 * scene can work out directions against its own on-screen position.
 * Browser-only: call trackCursor() from code that already runs in the browser.
 */
export const cursor = { x: 0, y: 0, active: false };

let listening = false;

export function trackCursor(): void {
  if (listening) {
    return;
  }
  listening = true;

  const set = (x: number, y: number) => {
    cursor.x = x;
    cursor.y = y;
    cursor.active = true;
  };

  window.addEventListener('pointermove', (e) => set(e.clientX, e.clientY), { passive: true });
  window.addEventListener('pointerdown', (e) => set(e.clientX, e.clientY), { passive: true });
  // Cursor left the window: let the robots relax back to looking ahead.
  document.documentElement.addEventListener('pointerleave', () => (cursor.active = false));
}
