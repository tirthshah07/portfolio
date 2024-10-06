import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AchievementSectionComponent } from "./Pages/achievement-section/achievement-section.component";
import { PassionProjectsComponent } from "./Pages/passion-projects/passion-projects.component";
import { WorkExperienceComponent } from "./Pages/work-experience/work-experience.component";
import { SoftwareSkillsComponent } from "./Pages/software-skills/software-skills.component";
import { SkillsComponent } from "./Pages/skills/skills.component";
import { IntroductionComponent } from "./Pages/introduction/introduction.component";
import { HeaderComponent } from "./layout/header/header.component";
import { introduction, socialMediaLinks, splashScreen, skillsSection, myJourney, openSource, achievementSection } from './information';
import { ThemeService } from './services/theme.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AchievementSectionComponent, PassionProjectsComponent, WorkExperienceComponent, SoftwareSkillsComponent, SkillsComponent, IntroductionComponent, HeaderComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'personal-portfolio-website';
  isDarkMode!: boolean;

  information = {
    introduction,
    socialMediaLinks,
    splashScreen,
    skillsSection,
    myJourney,
    openSource,
    achievementSection
  }

  constructor(private theme:ThemeService){}

  ngOnInit(): void {
    this.isDarkMode = this.theme.isDarkMode();
    this.theme.darkTheme$.subscribe((mode) => {
      this.isDarkMode = mode == true;
    })
  }
}
