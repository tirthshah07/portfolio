import { Component } from '@angular/core';
import { AchievementsComponent } from './achievements/achievements.component';
import { achievementSection } from '../../information';
import { RevealDirective } from '../../shared/animations/reveal.directive';
import { SectionHeadingComponent } from '../../shared/section-heading/section-heading.component';

@Component({
  selector: 'app-achievement-section',
  standalone: true,
  imports: [AchievementsComponent, RevealDirective, SectionHeadingComponent],
  templateUrl: './achievement-section.component.html',
  styleUrl: './achievement-section.component.scss'
})
export class AchievementSectionComponent {
  achievementSection = achievementSection;
}
