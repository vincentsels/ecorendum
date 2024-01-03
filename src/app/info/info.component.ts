import { Component, ElementRef } from '@angular/core';
import { LanguageService } from '../common/language.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrl: './info.component.scss'
})
export class InfoComponent {
  constructor(public languageService: LanguageService, private el: ElementRef) {}
  headings?: Element[];

  markdownLoaded() {
    const mainElement = this.el.nativeElement.querySelector('.responsive-page-content');
    if (mainElement) {
      this.headings = Array.from(mainElement.querySelectorAll('h1, h2, h3, h4, h5, h6'));
    }
  }
}
