import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { skillsSection } from '../../information';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent implements OnInit{

  isDark: boolean = false;
  skillsImage!: string;
  skillsSection = skillsSection;

  constructor(private theme: ThemeService) { }

  ngOnInit(): void {
    this.skillsImage = skillsSection.skillsAvatar;
    this.isDark = this.theme.isDarkMode();
    this.theme.darkTheme$.subscribe((mode)=>{
      this.isDark = mode == true;
    })
  }
}
