import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-toggle-switch',
  standalone: true,
  imports: [],
  templateUrl: './toggle-switch.component.html',
  styleUrl: './toggle-switch.component.scss'
})
export class ToggleSwitchComponent implements OnInit {
  isDark!: boolean;

  constructor(private theme: ThemeService) { }

  ngOnInit(): void {
    this.isDark = this.theme.isDarkMode();
    this.theme.darkTheme$.subscribe((mode) => {
      this.isDark = mode == true;
    });
  }

  // Circular reveal from the button (magicui "Animated Theme Toggler"), where supported
  toggle(event: MouseEvent): void {
    const doc = document as Document & { startViewTransition?: (cb: () => void) => { ready: Promise<void> } };
    if (!doc.startViewTransition || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.theme.changeState();
      return;
    }
    const { clientX: x, clientY: y } = event;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const transition = doc.startViewTransition(() => this.theme.changeState());
    transition.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 600, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', pseudoElement: '::view-transition-new(root)' }
      );
    });
  }
}
