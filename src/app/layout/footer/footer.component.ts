import { Component } from '@angular/core';
import { introduction, socialMediaLinks } from '../../information';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  year = new Date().getFullYear();
  name = introduction.username;
  email = socialMediaLinks.gmail;

  nav = [
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#experience', label: 'Experience' },
    { href: '#projects', label: 'Work' },
    { href: '#contact', label: 'Contact' },
  ];

  elsewhere = [
    { href: socialMediaLinks.github, label: 'GitHub' },
    { href: socialMediaLinks.linkedin, label: 'LinkedIn' },
    { href: introduction.resumeLink, label: 'Resume' },
  ];
}
