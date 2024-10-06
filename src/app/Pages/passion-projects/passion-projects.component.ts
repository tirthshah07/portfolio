import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ButtonComponent } from "../button/button.component";
import { ProjectComponent } from "./project/project.component";
import { GithubService } from '../../services/github.service';
import { ThemeService } from '../../services/theme.service';
import { openSource, socialMediaLinks } from '../../information';

@Component({
  selector: 'app-passion-projects',
  standalone: true,
  imports: [CommonModule, ButtonComponent, ProjectComponent],
  templateUrl: './passion-projects.component.html',
  styleUrl: './passion-projects.component.scss'
})
export class PassionProjectsComponent implements OnInit{

  passionProjects = openSource;
  repo = [];
  isDarkMode!: boolean;
  socialMediaLinks = socialMediaLinks;

  constructor(private theme: ThemeService, private github: GithubService) {
    this.github.getRepositoryData().subscribe((res)=>{
      this.repo = res?.data?.viewer?.repositories?.nodes
    })
  }

  ngOnInit(): void {
    this.isDarkMode = this.theme.isDarkMode();
    this.theme.darkTheme$.subscribe((mode) => {
      this.isDarkMode = mode == true;
    });

  }
}
