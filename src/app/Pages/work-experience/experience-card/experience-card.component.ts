import { Component, Input } from '@angular/core';
import { IExperienceCard } from '../experience';

@Component({
  selector: 'app-experience-card',
  standalone: true,
  imports: [],
  templateUrl: './experience-card.component.html',
  styleUrl: './experience-card.component.scss'
})
export class ExperienceCardComponent {
  @Input('item') experience!: IExperienceCard;
  @Input() current = false;
}
