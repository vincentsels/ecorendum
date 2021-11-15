import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from './common/language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(languageService: LanguageService, titleService: Title, translate: TranslateService) {
    languageService.setLanguage('en');
    languageService.language.subscribe({
      next: lang => titleService.setTitle('Ecorendum: ' + translate.instant('create your own climate policy'))
    });
  }
}
