import { Component, OnInit } from '@angular/core';
import { socialMediaLinks } from '../../information';
import { ThemeService } from '../../services/theme.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-social-media',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './social-media.component.html',
  styleUrl: './social-media.component.scss'
})
export class SocialMediaComponent implements OnInit{
  isDark: boolean = false;
  socialMediaLinks = socialMediaLinks;

  constructor(private theme: ThemeService) { }

  ngOnInit(): void {
    this.isDark = this.theme.isDarkMode();
    this.theme.darkTheme$.subscribe((mode)=>{
      this.isDark = mode == true;
    })
  }
}
