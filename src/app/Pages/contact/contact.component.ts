import { Component } from '@angular/core';
import { introduction, socialMediaLinks } from '../../information';
import { RevealDirective } from '../../shared/animations/reveal.directive';
import { SectionHeadingComponent } from '../../shared/section-heading/section-heading.component';

/**
 * Contact. There is no backend behind this site, so the form does not pretend
 * to send anything: it composes the message and hands it to the visitor's own
 * mail client, addressed and ready to go.
 */
@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [RevealDirective, SectionHeadingComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  email = socialMediaLinks.gmail;
  links = socialMediaLinks;
  resume = introduction.resumeLink;
  location = introduction.location;

  topics = ['Full-time role', 'Freelance / contract', 'Collaboration', 'Just saying hi'];
  topic = this.topics[0];
  copied = false;
  sent = false;

  send(event: Event): void {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const data = new FormData(form);
    const name = String(data.get('name') ?? '').trim();
    const from = String(data.get('email') ?? '').trim();
    const message = String(data.get('message') ?? '').trim();
    const subject = `${this.topic} — from ${name}`;
    const body = `${message}\n\n—\n${name}\n${from}`;
    window.location.href = `mailto:${this.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    this.sent = true;
  }

  async copyEmail(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.email);
      this.copied = true;
      setTimeout(() => this.copied = false, 2000);
    } catch {
      this.copied = false;
    }
  }
}
