import { Component, Input } from '@angular/core';
import { RevealDirective } from '../animations/reveal.directive';

/**
 * Shared section heading: a large outlined index with a mono label, beside a
 * title whose <em> words get the cyan → indigo gradient, plus an optional lede.
 */
@Component({
  selector: 'app-section-heading',
  standalone: true,
  imports: [RevealDirective],
  template: `
    <header class="sh">
      <p class="sh-eyebrow" appReveal="left">
        <span class="sh-index">{{index}}</span>
        {{eyebrow}}
      </p>
      <div class="sh-body">
        <h2 class="sh-title" appReveal="up" [revealDelay]="60"><ng-content></ng-content></h2>
        @if (description) {
          <p class="sh-desc" appReveal="up" [revealDelay]="120">{{description}}</p>
        }
      </div>
    </header>
  `
})
export class SectionHeadingComponent {
  @Input({ required: true }) index = '';
  @Input({ required: true }) eyebrow = '';
  @Input() description = '';
}
