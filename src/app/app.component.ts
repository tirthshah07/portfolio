import { Component } from '@angular/core';
import { AchievementSectionComponent } from "./Pages/achievement-section/achievement-section.component";
import { PassionProjectsComponent } from "./Pages/passion-projects/passion-projects.component";
import { WorkExperienceComponent } from "./Pages/work-experience/work-experience.component";
import { SoftwareSkillsComponent } from "./Pages/software-skills/software-skills.component";
import { SkillsComponent } from "./Pages/skills/skills.component";
import { IntroductionComponent } from "./Pages/introduction/introduction.component";
import { HeaderComponent } from "./layout/header/header.component";
import { ContactComponent } from './Pages/contact/contact.component';
import { FooterComponent } from './layout/footer/footer.component';
import { ScrollCompanionComponent } from './layout/scroll-companion/scroll-companion.component';
import { introduction, socialMediaLinks, splashScreen, skillsSection, myJourney, openSource, achievementSection } from './information';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AchievementSectionComponent, PassionProjectsComponent, WorkExperienceComponent, SoftwareSkillsComponent, SkillsComponent, IntroductionComponent, HeaderComponent, ContactComponent, FooterComponent, ScrollCompanionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'personal-portfolio-website';

  information = {
    introduction,
    socialMediaLinks,
    splashScreen,
    skillsSection,
    myJourney,
    openSource,
    achievementSection
  }
}
