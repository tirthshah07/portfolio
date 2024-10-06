import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ThemeService } from '../../../services/theme.service';
import { IExperienceCard } from '../experience';
import ColorThief from 'colorthief';


@Component({
  selector: 'app-experience-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experience-card.component.html',
  styleUrl: './experience-card.component.scss'
})
export class ExperienceCardComponent implements OnInit{
  isDark = false;
  colorArrays:number[] = [];
  @Input('item') experience!: IExperienceCard;
  @ViewChild('imgRef', {static: false}) img!: ElementRef<HTMLImageElement>;

  constructor(private theme: ThemeService) {
  }

  ngOnInit(): void {
    this.isDark = this.theme.isDarkMode()
    this.theme.darkTheme$.subscribe((mode) => {
      this.isDark = mode
    })
  }

  getColorArrays() {
    const colorThief = new ColorThief();

    if (this.img.nativeElement.complete) {
      this.colorArrays = colorThief.getColor(this.img.nativeElement);
    } else {
      // If not loaded, listen for the load event
      this.img.nativeElement.addEventListener('load', () => {
        this.colorArrays = colorThief.getColor(this.img.nativeElement);
      });
    }
    this.colorArrays = new ColorThief().getColor(this.img.nativeElement);
    // t = new ColorThief().getColor(this.img.nativeElement);
  }

  rgb() {    
    if (this.colorArrays.length === 0) {
      return 'rgb(0, 0, 0)'; // Default to black
    } else if (this.colorArrays.length === 3) {
      return `rgb(${this.colorArrays[0]}, ${this.colorArrays[1]}, ${this.colorArrays[2]})`;
    } else {
      return 'rgb(255, 0, 0)'; // Default to red if colorArrays does not have 3 elements
    }
    // return this.colorArrays.length === 0 ? 'rgb(0,0,0)' : 'rgb(' + this.colorArrays.join(', ') + ')';
  }
}
