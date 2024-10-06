import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID, Renderer2, RendererFactory2 } from '@angular/core';
import {BehaviorSubject} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkTheme!:boolean;
  private renderer: Renderer2;

  darkTheme$ !: BehaviorSubject<boolean>;
  constructor(@Inject(PLATFORM_ID) private platformId: Object, rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
    let initialValue = false;
    if(isPlatformBrowser(this.platformId)){
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        initialValue = true;
      }

      const item = window.localStorage.getItem('darkTheme');
    this.darkTheme = item ? (item == 'yes') : initialValue;
    if(this.darkTheme) {
      const body = this.renderer.selectRootElement('body', true);
      this.renderer.addClass(body, 'dark-mode');
      // (document.getElementById('body') as HTMLElement).classList.add('dark-mode');
    }
    this.darkTheme$ = new BehaviorSubject<boolean>(this.darkTheme)
    }
    
   }


   changeState(){
    this.darkTheme = !this.darkTheme;
    const body = this.renderer.selectRootElement('body', true);
    if(this.darkTheme) {
      this.renderer.addClass(body, 'dark-mode');
      // (document.getElementById('body') as HTMLElement).classList.add('dark-mode');
    }else{
      // const body = this.renderer.selectRootElement('body', true);
      this.renderer.removeClass(body, 'dark-mode');
      // (document.getElementById('body') as HTMLElement).classList.remove('dark-mode');
    }

    window.localStorage.setItem('darkTheme',this.darkTheme? 'yes':'no');
    this.darkTheme$.next(this.darkTheme);
  }

  isDarkMode(){
    return this.darkTheme === true;
  }
}
