import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toggle-switch',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toggle-switch.component.html',
  styleUrl: './toggle-switch.component.scss'
})
export class ToggleSwitchComponent implements OnInit{
  isChecked!: boolean;
  isDark!: boolean;


  constructor(private theme: ThemeService) { }

  ngOnInit(): void {
    this.isDark = this.theme.isDarkMode();
    this.isChecked = this.isDark;
    this.theme.darkTheme$.subscribe((mode)=>{
      this.isDark = mode == true;
    });
  }

  changeState(){
    this.isChecked = !this.isChecked;
    this.theme.changeState()
  }
}
