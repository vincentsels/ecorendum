import { Component } from '@angular/core';
import { LanguageService } from '../common/language.service';

const LS_KEY_HIDE_EXPLAINER = 'ecorendum.hideExplainer';

@Component({
  selector: 'app-explainer',
  templateUrl: './explainer.component.html',
  styleUrl: './explainer.component.scss'
})
export class ExplainerComponent {
  constructor(public languageService: LanguageService) {}

  explainerHidden = localStorage.getItem(LS_KEY_HIDE_EXPLAINER) || false;

  toggleInset(inset: HTMLElement) {
    inset.classList.toggle('hidden');
  }

  closeExplainer() {
    this.explainerHidden = true;
    localStorage.setItem(LS_KEY_HIDE_EXPLAINER, 'true');
  }
}
