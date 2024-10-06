import { Component, OnInit } from '@angular/core';
import { ButtonComponent } from "../button/button.component";
import { SocialMediaComponent } from "../social-media/social-media.component";
import { introduction } from '../../information';
import { ThemeService } from '../../services/theme.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-introduction',
  standalone: true,
  imports: [ButtonComponent, SocialMediaComponent, CommonModule],
  templateUrl: './introduction.component.html',
  styleUrl: './introduction.component.scss'
})
export class IntroductionComponent implements OnInit{

  isDark = true;
  greeting = introduction;
  constructor(private theme: ThemeService) { }

  ngOnInit(): void {
    this.isDark = this.theme.isDarkMode()
    this.theme.darkTheme$.subscribe((mode)=>{
      this.isDark = mode == true
    })
  }
}
