import { Directive, ElementRef, Inject, Input, NgZone, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { whenInView } from './in-view';

// Animates a number from 0 to its value when it scrolls into view (21st.dev "Number Ticker" pattern).
@Directive({
  selector: '[appCountUp]',
  standalone: true
})
export class CountUpDirective implements OnInit, OnDestroy {
  @Input('appCountUp') value = 0;
  @Input() suffix = '';
  @Input() duration = 1600;

  private cancel?: () => void;
  private frame = 0;

  constructor(private el: ElementRef<HTMLElement>, private zone: NgZone, @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
    const node = this.el.nativeElement;
    node.textContent = `${this.value}${this.suffix}`;
    if (!isPlatformBrowser(this.platformId)
      || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    node.textContent = `0${this.suffix}`;
    this.zone.runOutsideAngular(() => {
      this.cancel = whenInView(node, () => {
        // Already scrolled past? Just show the final number.
        if (node.getBoundingClientRect().bottom < 0) {
          node.textContent = `${this.value}${this.suffix}`;
          return;
        }
        this.animate(node);
      }, 0.15);
    });
  }

  private animate(node: HTMLElement): void {
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min((now - start) / this.duration, 1);
      const eased = 1 - Math.pow(1 - t, 4);
      node.textContent = `${Math.round(eased * this.value)}${this.suffix}`;
      if (t < 1) {
        this.frame = requestAnimationFrame(step);
      }
    };
    this.frame = requestAnimationFrame(step);
  }

  ngOnDestroy(): void {
    this.cancel?.();
    if (this.frame) {
      cancelAnimationFrame(this.frame);
    }
  }
}
