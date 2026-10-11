import { Component } from '@angular/core';
import { socialMediaLinks } from '../../information';

@Component({
  selector: 'app-social-media',
  standalone: true,
  imports: [],
  templateUrl: './social-media.component.html',
  styleUrl: './social-media.component.scss'
})
export class SocialMediaComponent {
  socialMediaLinks = socialMediaLinks;
}
