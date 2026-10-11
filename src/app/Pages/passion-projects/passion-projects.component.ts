import { Component } from '@angular/core';
import { ProjectComponent } from "./project/project.component";
import { GithubService } from '../../services/github.service';
import { openSource, socialMediaLinks } from '../../information';
import { RevealDirective } from '../../shared/animations/reveal.directive';
import { SectionHeadingComponent } from '../../shared/section-heading/section-heading.component';

@Component({
  selector: 'app-passion-projects',
  standalone: true,
  imports: [ProjectComponent, RevealDirective, SectionHeadingComponent],
  templateUrl: './passion-projects.component.html',
  styleUrl: './passion-projects.component.scss'
})
export class PassionProjectsComponent {

  passionProjects = openSource;
  repo: any[] = [];
  socialMediaLinks = socialMediaLinks;
  githubHandle = socialMediaLinks.github.replace(/^https?:\/\/(www\.)?/, '');

  constructor(private github: GithubService) {
    this.github.getRepositoryData().subscribe({
      next: (res) => {
        this.repo = res?.data?.viewer?.repositories?.nodes ?? [];
      },
      // Without a valid token only the GitHub card is shown
      error: () => this.repo = []
    })
  }
}
