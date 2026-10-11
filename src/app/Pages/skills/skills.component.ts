import { AfterViewInit, Component, ElementRef, Inject, NgZone, OnDestroy, PLATFORM_ID, ViewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { aboutSection, introduction } from '../../information';
import { RevealDirective } from '../../shared/animations/reveal.directive';
import { CountUpDirective } from '../../shared/animations/count-up.directive';
import { SectionHeadingComponent } from '../../shared/section-heading/section-heading.component';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [RevealDirective, CountUpDirective, SectionHeadingComponent],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent implements AfterViewInit, OnDestroy {
  about = aboutSection;
  name = introduction.username;
  stats = introduction.stats;
  coreStack = ['Angular', 'TypeScript', 'RxJS', 'Angular Signals', 'React', 'SCSS', 'JWT / RBAC', 'i18n'];

  @ViewChild('clock', { static: true }) clock!: ElementRef<HTMLElement>;
  private timer?: ReturnType<typeof setInterval>;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private zone: NgZone) { }

  // Local time in Gandhinagar, so a visitor in another zone knows when a reply is likely
  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    const format = new Intl.DateTimeFormat('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'Asia/Kolkata' });
    const tick = () => this.clock.nativeElement.textContent = format.format(new Date());
    tick();
    this.zone.runOutsideAngular(() => this.timer = setInterval(tick, 30000));
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }
}
