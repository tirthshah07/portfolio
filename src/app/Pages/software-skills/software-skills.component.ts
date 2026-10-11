import { Component } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { skillsSection } from '../../information';
import { RevealDirective } from '../../shared/animations/reveal.directive';
import { SectionHeadingComponent } from '../../shared/section-heading/section-heading.component';

interface TechItem {
  name: string;
  color: string;
  icon: string | null;
  /** Dark brand colour: tint the icon with the text colour instead so it stays visible. */
  mono: boolean;
}

// shields.io logo names that differ from their simpleicons.org slug
const SLUG_OVERRIDES: Record<string, string> = {
  reactive: 'reactivex',
  css3: 'css',
  'json web tokens': 'jsonwebtokens',
};

@Component({
  selector: 'app-software-skills',
  standalone: true,
  imports: [RevealDirective, SectionHeadingComponent, DecimalPipe],
  templateUrl: './software-skills.component.html',
  styleUrl: './software-skills.component.scss'
})
export class SoftwareSkillsComponent {
  skills = skillsSection;
  techs = skillsSection.softwareSkills.map((s) => this.toTechItem(s));

  // Reuses the brand colour and logo name already encoded in each shields.io badge URL
  private toTechItem(skill: { skillName: string; badgeURL: string }): TechItem {
    const url = new URL(skill.badgeURL);
    const label = decodeURIComponent(url.pathname.split('/').pop() ?? '');
    const hex = label.slice(label.lastIndexOf('-') + 1).replace(/^#/, '').replace(/\.svg$/, '');
    const logo = decodeURIComponent(url.searchParams.get('logo') ?? '').toLowerCase();
    const slug = SLUG_OVERRIDES[logo] ?? logo.replace(/[\s-]/g, '');
    const valid = /^[0-9a-f]{6}$/i.test(hex);
    return {
      name: skill.skillName.replace(/\s*\(.*\)$/, ''),
      color: valid ? `#${hex}` : 'var(--primary)',
      icon: slug ? `https://cdn.simpleicons.org/${slug}` : null,
      mono: valid && this.luminance(hex) < 0.2,
    };
  }

  private luminance(hex: string): number {
    const [r, g, b] = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }
}
