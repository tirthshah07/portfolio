import { Component, Input } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-achievements',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './achievements.component.html',
  styleUrl: './achievements.component.scss'
})
export class AchievementsComponent {
  @Input() cardInfo: any;
  @Input() index = 1;
}
