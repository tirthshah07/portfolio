import { Directive, ElementRef, Inject, Input, NgZone, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { whenInView } from './in-view';

export type RevealVariant = 'up' | 'down' | 'left' | 'right' | 'blur' | 'scale' | 'wipe';

// Fades/slides an element in the first time it scrolls into view.
// Hidden state only applies once index.html marks <html class="anim-ready">,
// so prerendered HTML stays visible without JS.
@Directive({
  selector: '[appReveal]',
  standalone: true,
  host: { class: 'reveal' }
})
export class RevealDirective implements OnInit, OnDestroy {
  @Input('appReveal') variant: RevealVariant | '' = 'up';
  @Input() revealDelay = 0;

  private cancel?: () => void;
  private doneTimer?: ReturnType<typeof setTimeout>;

  constructor(private el: ElementRef<HTMLElement>, private zone: NgZone, @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
    const node = this.el.nativeElement;
    node.classList.add(`reveal-${this.variant || 'up'}`);
    node.style.setProperty('--reveal-delay', `${this.revealDelay}ms`);

    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    this.zone.runOutsideAngular(() => {
      this.cancel = whenInView(node, () => {
        node.classList.add('is-visible');
        // Hand transitions back to hover effects once the reveal has finished
        this.doneTimer = setTimeout(() => node.classList.add('reveal-done'), 1100 + this.revealDelay);
      });
    });
  }

  ngOnDestroy(): void {
    this.cancel?.();
    clearTimeout(this.doneTimer);
  }
}
