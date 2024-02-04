import { Component } from '@angular/core';
import { LanguageService } from '../common/language.service';

@Component({
  selector: 'app-explainer',
  templateUrl: './explainer.component.html',
  styleUrl: './explainer.component.scss'
})
export class ExplainerComponent {
  constructor(public languageService: LanguageService) {}

  globalContextExpanded = false;
  flemishTargetsExpanded = false;
  currentAmbitionExpanded = false;
  partyPoliticsExpanded = false;
  alternativesExpanded = false;
  preferendumExpanded = false;
}
