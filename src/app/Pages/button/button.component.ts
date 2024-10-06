import { Component, Input, OnInit } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent implements OnInit{
  isDarkMode!: boolean;

  @Input() className!: string;
  @Input('link') destination!: string;
  @Input() text!: string;

  constructor(private theme:ThemeService) { }

  ngOnInit(): void {
this.isDarkMode = this.theme.isDarkMode()
    this.theme.darkTheme$.subscribe((mode)=>{
      this.isDarkMode = mode == true
    })
  }
}
