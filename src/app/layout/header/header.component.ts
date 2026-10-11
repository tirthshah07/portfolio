import { Component, ElementRef, Inject, PLATFORM_ID, ViewChild, effect } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ToggleSwitchComponent } from "../../Pages/toggle-switch/toggle-switch.component";
import { ActiveSectionService } from '../../services/active-section.service';
import { introduction } from '../../information';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ToggleSwitchComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  menuOpen = false;
  bar = { left: 0, width: 0 };
  resume = introduction.resumeLink;

  items = [
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Work' },
    { id: 'certificates', label: 'Certificates' },
    { id: 'contact', label: 'Contact' },
  ];

  @ViewChild('nav', { static: true }) nav!: ElementRef<HTMLElement>;

  constructor(public sections: ActiveSectionService, @Inject(PLATFORM_ID) platformId: Object) {
    if (!isPlatformBrowser(platformId)) {
      return;
    }
    // Slide the underline to whichever link is active (hidden over the hero)
    effect(() => {
      const id = sections.active();
      requestAnimationFrame(() => this.moveBar(id));
    });
    window.addEventListener('resize', () => this.moveBar(sections.active()), { passive: true });
  }

  private moveBar(id: string): void {
    const link = this.nav.nativeElement.querySelector<HTMLElement>(`[data-id="${id}"]`);
    this.bar = link ? { left: link.offsetLeft, width: link.offsetWidth } : { left: this.bar.left, width: 0 };
  }
}
