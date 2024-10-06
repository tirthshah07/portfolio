import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { ThemeService } from '../../../services/theme.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss'
})
export class ProjectComponent implements OnInit{
  @Input() repo: any;
  isDarkMode!: boolean;

  constructor(private theme: ThemeService, @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
    this.isDarkMode = this.theme.isDarkMode()
    this.theme.darkTheme$.subscribe((mode)=>{
      this.isDarkMode = mode == true
    })
  }

  formatFileSizeDisplay = (value: number) => {
    if (value < 1024) {
      return `${value} KB`;
    }
    return `${parseFloat((value / 1024).toFixed(1))} MB`;
  };


  openUrlInNewTab(url: string, name: string) {
    if (!url) {
      console.log(`URL for ${name} not found`);
      return;
    }
    if(isPlatformBrowser(this.platformId)){
      var win = window.open(url, "_blank");
      if(win){
       win.focus();
      }
    }
  }
}
