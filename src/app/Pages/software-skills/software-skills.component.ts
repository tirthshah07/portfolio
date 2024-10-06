import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { skillsSection } from '../../information';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-software-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './software-skills.component.html',
  styleUrl: './software-skills.component.scss'
})
export class SoftwareSkillsComponent implements OnInit{
  skills = skillsSection
  softwareSkills = skillsSection.softwareSkills;
  skillsSectionHeading = skillsSection.softwareSkillsHeader;
  isDark!: boolean;
  constructor(private theme: ThemeService) { }

  ngOnInit(): void {
    this.isDark = this.theme.isDarkMode();
    this.theme.darkTheme$.subscribe((mode)=>{
      this.isDark = mode == true;
    })
  }
}
