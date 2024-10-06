import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AchievementsComponent } from './achievements/achievements.component';
import { achievementSection } from '../../information';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-achievement-section',
  standalone: true,
  imports: [CommonModule, AchievementsComponent],
  templateUrl: './achievement-section.component.html',
  styleUrl: './achievement-section.component.scss'
})
export class AchievementSectionComponent implements OnInit{
  isDarkMode!: boolean;
  achievementSection = achievementSection;

  constructor(private theme: ThemeService) { }

  ngOnInit(): void {
    this.isDarkMode = this.theme.isDarkMode()
    this.theme.darkTheme$.subscribe((mode)=>{
      this.isDarkMode = mode == true
    })
  }
}
