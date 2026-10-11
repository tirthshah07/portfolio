import { Component, ElementRef, Inject, NgZone, OnDestroy, PLATFORM_ID, ViewChild, effect } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActiveSectionService } from '../../services/active-section.service';

/**
 * The hero robot, shrunk into a corner companion once the hero scrolls away.
 * It narrates whichever section is in view in a speech bubble, and — only
 * when the visitor turns the speaker on — reads it aloud with the browser's
 * own speech synthesis. Nothing ever autoplays.
 */

const LINES: Record<string, string> = {
  about: 'This is Tirth — a frontend engineer from Gandhinagar, Gujarat. 4+ years in, and currently a Software Engineer at IndiaNIC.',
  skills: 'His daily stack: Angular, TypeScript, RxJS and Signals up front — plus React, SCSS, and Node.js or Django when the backend calls.',
  experience: 'Four companies since 2022: Cutting Edge Infotech, Samcom Technobrains, Arbelos Solution, and now IndiaNIC.',
  projects: 'Side projects and experiments live on GitHub — tap the card to browse them.',
  certificates: 'Courses from LetsUpgrade, Udemy, the University of Michigan and ISRO. Always learning.',
  contact: 'Like what you see? Drop a message — the form opens your email app, ready to send.',
};

const PREFS_KEY = 'companion-prefs';

@Component({
  selector: 'app-scroll-companion',
  standalone: true,
  imports: [],
  templateUrl: './scroll-companion.component.html',
  styleUrl: './scroll-companion.component.scss'
})
export class ScrollCompanionComponent implements OnDestroy {
  visible = false;
  line = '';
  typed = '';
  collapsed = false;
  muted = true;
  quiet = false;
  canSpeak = false;

  @ViewChild('stage') stage?: ElementRef<HTMLElement>;

  private talking = false;
  private typeTimer?: ReturnType<typeof setInterval>;
  private speakTimer?: ReturnType<typeof setTimeout>;
  private collapseTimer?: ReturnType<typeof setTimeout>;
  private cleanup?: () => void;
  private mounting = false;
  private readonly browser: boolean;
  private readonly reduced: boolean = false;

  constructor(private sections: ActiveSectionService, private zone: NgZone, @Inject(PLATFORM_ID) platformId: Object) {
    this.browser = isPlatformBrowser(platformId);
    if (!this.browser) {
      return;
    }
    this.reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.canSpeak = 'speechSynthesis' in window;
    if (this.canSpeak) {
      // Prime Chrome's voice list so it is ready by the time "Listen" is pressed
      window.speechSynthesis.getVoices();
    }
    try {
      const saved = JSON.parse(sessionStorage.getItem(PREFS_KEY) ?? '{}');
      this.muted = saved.muted ?? true;
      this.quiet = saved.quiet ?? false;
    } catch {
      /* per-tab convenience only */
    }

    effect(() => this.onSection(sections.active()));
  }

  private onSection(id: string): void {
    const line = LINES[id];
    this.visible = !!line;
    if (!line || line === this.line) {
      if (!line) {
        this.stopSpeaking();
      }
      return;
    }
    this.line = line;
    this.collapsed = false;
    this.ensureRobot();
    this.typeLine();
    this.speak();
  }

  // Load three.js and mount the mini robot the first time the companion appears
  private ensureRobot(): void {
    if (this.cleanup || this.mounting) {
      return;
    }
    this.mounting = true;
    this.zone.runOutsideAngular(() => {
      // Wait a frame so the @if-rendered stage exists
      requestAnimationFrame(() => {
        import('../../shared/three/avatar').then(({ mountAvatar }) => {
          if (this.stage) {
            this.cleanup = mountAvatar(this.stage.nativeElement, () => this.talking, this.reduced);
          }
          this.mounting = false;
        });
      });
    });
  }

  // Typewriter for the current line; the avatar talks while it types
  private typeLine(): void {
    clearInterval(this.typeTimer);
    clearTimeout(this.collapseTimer);
    if (this.quiet) {
      this.typed = '';
      return;
    }
    if (this.reduced) {
      this.typed = this.line;
      return;
    }
    let i = 0;
    this.typed = '';
    this.talking = true;
    this.typeTimer = setInterval(() => {
      i += 2;
      this.typed = this.line.slice(0, i);
      if (i >= this.line.length) {
        clearInterval(this.typeTimer);
        if (!window.speechSynthesis?.speaking) {
          this.talking = false;
        }
        // On small screens the bubble covers content, so tuck it away after a while
        if (window.matchMedia('(max-width: 639px)').matches) {
          this.collapseTimer = setTimeout(() => this.collapsed = true, 5000);
        }
      }
    }, 22);
  }

  private pickVoice(): SpeechSynthesisVoice | undefined {
    const en = window.speechSynthesis.getVoices().filter((v) => v.lang?.toLowerCase().startsWith('en'));
    return en.find((v) => v.lang === 'en-IN')
      ?? en.find((v) => /google/i.test(v.name) && v.lang === 'en-US')
      ?? en.find((v) => v.lang === 'en-US')
      ?? en[0];
  }

  // Read the line aloud, only when the visitor has switched the voice on
  private speak(): void {
    if (!this.canSpeak) {
      return;
    }
    this.stopSpeaking();
    if (!this.visible || this.muted || this.quiet) {
      return;
    }
    // Chrome drops an utterance queued in the same tick as cancel(), so speak on the next tick
    this.speakTimer = setTimeout(() => {
      const u = new SpeechSynthesisUtterance(this.line);
      const voice = this.pickVoice();
      if (voice) {
        u.voice = voice;
      }
      u.lang = voice?.lang ?? 'en-US';
      u.rate = 1.03;
      u.pitch = 1.08;
      u.onstart = () => this.talking = true;
      u.onend = u.onerror = () => this.talking = false;
      window.speechSynthesis.speak(u);
      window.speechSynthesis.resume();
    }, 80);
  }

  private stopSpeaking(): void {
    clearTimeout(this.speakTimer);
    if (this.canSpeak) {
      window.speechSynthesis.cancel();
    }
    this.talking = false;
  }

  private savePrefs(): void {
    try {
      sessionStorage.setItem(PREFS_KEY, JSON.stringify({ muted: this.muted, quiet: this.quiet }));
    } catch {
      /* per-tab convenience only */
    }
  }

  toggleMute(): void {
    this.muted = !this.muted;
    this.savePrefs();
    this.speak();
  }

  toggleQuiet(): void {
    this.quiet = !this.quiet;
    this.savePrefs();
    this.typeLine();
    this.speak();
  }

  get showBubble(): boolean {
    return this.visible && !this.quiet && !this.collapsed && this.typed.length > 0;
  }

  ngOnDestroy(): void {
    clearInterval(this.typeTimer);
    clearTimeout(this.collapseTimer);
    if (this.browser) {
      this.stopSpeaking();
    }
    this.cleanup?.();
  }
}
