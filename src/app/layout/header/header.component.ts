import { Component, OnInit } from '@angular/core';
import { achievementSection, introduction, myJourney, openSource, skillsSection, socialMediaLinks, splashScreen } from '../../information';
import { ThemeService } from '../../services/theme.service';
import { CommonModule } from '@angular/common';
import { ToggleSwitchComponent } from "../../Pages/toggle-switch/toggle-switch.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, ToggleSwitchComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit  {

  isDark!:boolean;
  greeting = introduction;
  information = {
    introduction,
    socialMediaLinks,
    splashScreen,
    skillsSection,
    myJourney,
    openSource,
    achievementSection
  }

  constructor(private theme: ThemeService){}

  ngOnInit(): void {
    this.isDark = this.theme.isDarkMode();
    this.theme.darkTheme$.subscribe((mode)=>{
      this.isDark = mode == true;
    });
  }
}
