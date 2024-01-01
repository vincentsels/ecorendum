import { Component } from '@angular/core';
import { LanguageService } from '../common/language.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrl: './info.component.css'
})
export class InfoComponent {
  constructor(public languageService: LanguageService) {}
}
