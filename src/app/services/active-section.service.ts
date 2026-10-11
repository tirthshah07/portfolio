import { Inject, Injectable, NgZone, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/** Section ids in page order; the first is the hero. */
export const SECTION_IDS = ['home', 'about', 'skills', 'experience', 'projects', 'certificates', 'contact'];

/**
 * Tracks which section is in view: the last one whose top has passed 40% of
 * the viewport. Scroll work happens outside Angular; the signal only changes
 * (and triggers change detection) when the active section actually changes.
 */
@Injectable({ providedIn: 'root' })
export class ActiveSectionService {
  readonly active = signal('home');
  readonly scrolled = signal(false);
  readonly progress = signal(0);

  private frame = 0;

  constructor(@Inject(PLATFORM_ID) platformId: Object, private zone: NgZone) {
    if (!isPlatformBrowser(platformId)) {
      return;
    }
    zone.runOutsideAngular(() => {
      const schedule = () => {
        if (!this.frame) {
          this.frame = requestAnimationFrame(() => this.measure());
        }
      };
      window.addEventListener('scroll', schedule, { passive: true });
      window.addEventListener('resize', schedule, { passive: true });
      schedule();
    });
  }

  private measure(): void {
    this.frame = 0;
    const marker = window.innerHeight * 0.4;
    let current = SECTION_IDS[0];
    for (const id of SECTION_IDS) {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= marker) {
        current = id;
      }
    }
    const doc = document.documentElement;
    const max = doc.scrollHeight - window.innerHeight;
    const scrolled = window.scrollY > 20;
    const progress = max > 0 ? Math.min(window.scrollY / max, 1) : 0;

    if (current !== this.active() || scrolled !== this.scrolled()) {
      this.zone.run(() => {
        this.active.set(current);
        this.scrolled.set(scrolled);
      });
    }
    this.progress.set(progress);
  }
}
