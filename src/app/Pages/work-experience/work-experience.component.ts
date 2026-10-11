import { Component } from '@angular/core';
import { myJourney } from '../../information';
import { ExperienceCardComponent } from "./experience-card/experience-card.component";
import { RevealDirective } from '../../shared/animations/reveal.directive';
import { SectionHeadingComponent } from '../../shared/section-heading/section-heading.component';

@Component({
  selector: 'app-work-experience',
  standalone: true,
  imports: [ExperienceCardComponent, RevealDirective, SectionHeadingComponent],
  templateUrl: './work-experience.component.html',
  styleUrl: './work-experience.component.scss'
})
export class WorkExperienceComponent {
  workExperience = myJourney;
  // Most recent role first
  items = [...myJourney.experience].reverse();
  selected = 0;

  // Arrow keys move between tabs (WAI-ARIA tabs pattern)
  onKey(event: KeyboardEvent): void {
    const next = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[event.key];
    if (next === undefined) {
      return;
    }
    event.preventDefault();
    this.selected = (this.selected + next + this.items.length) % this.items.length;
    const tab = document.getElementById(`tab-${this.selected}`);
    tab?.focus();
  }
}
