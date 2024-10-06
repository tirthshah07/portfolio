import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { myJourney } from '../../information';
import { ThemeService } from '../../services/theme.service';
import { ExperienceCardComponent } from "./experience-card/experience-card.component";

@Component({
  selector: 'app-work-experience',
  standalone: true,
  imports: [CommonModule, ExperienceCardComponent],
  templateUrl: './work-experience.component.html',
  styleUrl: './work-experience.component.scss'
})
export class WorkExperienceComponent implements OnInit{
  isDark = false;
  workExperience = myJourney

  constructor(private theme: ThemeService) {
  }

  ngOnInit(): void {
    this.isDark = this.theme.isDarkMode()
    this.theme.darkTheme$.subscribe((mode) => {
      this.isDark = mode == true
    })
  }
}
