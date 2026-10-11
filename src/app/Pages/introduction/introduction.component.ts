import { AfterViewInit, Component, ElementRef, Inject, NgZone, OnDestroy, PLATFORM_ID, ViewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { introduction } from '../../information';

@Component({
  selector: 'app-introduction',
  standalone: true,
  imports: [],
  templateUrl: './introduction.component.html',
  styleUrl: './introduction.component.scss'
})
export class IntroductionComponent implements AfterViewInit, OnDestroy {
  greeting = introduction;
  nameWords = introduction.username.split(' ');

  @ViewChild('stage', { static: true }) stage!: ElementRef<HTMLElement>;
  private cleanup?: () => void;
  private destroyed = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private zone: NgZone) { }

  /**
   * Mounts the 3D scene only once the browser is idle, so the headline paints
   * first. three.js is loaded on demand to keep it out of the main bundle.
   * Skipped on Save-Data / 2G connections, where the ember backdrop carries the hero.
   */
  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    if (conn?.saveData || (conn?.effectiveType && /(^|-)2g$/.test(conn.effectiveType))) {
      return;
    }
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.zone.runOutsideAngular(() => {
      const idle = (window as Window & { requestIdleCallback?: (cb: () => void) => number }).requestIdleCallback
        ?? ((cb: () => void) => window.setTimeout(cb, 600));
      idle(() => {
        import('../../shared/three/woven-light').then(({ mountWovenLight }) => {
          if (this.destroyed) {
            return;
          }
          this.stage.nativeElement.classList.add('ready');
          this.cleanup = mountWovenLight(this.stage.nativeElement, still);
        });
      });
    });
  }

  ngOnDestroy(): void {
    this.destroyed = true;
    this.cleanup?.();
  }
}
