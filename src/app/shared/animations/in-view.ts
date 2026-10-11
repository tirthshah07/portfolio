// Shared "has this element entered (or been scrolled past) the viewport?" watcher.
// Unlike IntersectionObserver it also fires for elements a fast scroll or an
// anchor jump skipped over entirely, so nothing stays hidden or stuck at 0.

interface Pending {
  el: HTMLElement;
  offset: number;
  callback: () => void;
}

const pending = new Set<Pending>();
let listening = false;
let frame = 0;

function check(): void {
  frame = 0;
  const viewport = window.innerHeight;
  for (const item of pending) {
    if (item.el.getBoundingClientRect().top < viewport * (1 - item.offset)) {
      pending.delete(item);
      item.callback();
    }
  }
  if (!pending.size) {
    stop();
  }
}

function schedule(): void {
  if (!frame) {
    frame = requestAnimationFrame(check);
  }
}

function start(): void {
  if (listening) {
    return;
  }
  listening = true;
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule, { passive: true });
}

function stop(): void {
  listening = false;
  window.removeEventListener('scroll', schedule);
  window.removeEventListener('resize', schedule);
}

/**
 * Calls `callback` once, as soon as the element's top is above
 * `offset` (fraction of viewport height) from the bottom. Returns a cancel function.
 * Must only be called in the browser, ideally outside Angular's zone.
 */
export function whenInView(el: HTMLElement, callback: () => void, offset = 0.1): () => void {
  const item: Pending = { el, offset, callback };
  pending.add(item);
  start();
  schedule();
  return () => pending.delete(item);
}
