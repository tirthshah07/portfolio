import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-achievements',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './achievements.component.html',
  styleUrl: './achievements.component.scss'
})
export class AchievementsComponent implements OnInit{
  @Input() isDarkMode!: boolean;
  @Input() cardInfo: any;

constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
  }

  openUrlInNewTab(url: string, name: string) {
    if (!url) {
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
