import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

import { LanguageService } from './common/language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(languageService: LanguageService, titleService: Title, translate: TranslateService,
    matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
    languageService.setLanguage('en');
    languageService.language.subscribe({
      next: lang => titleService.setTitle('Ecorendum: ' + translate.instant('create your own climate policy'))
    });

    matIconRegistry.addSvgIcon('flanders', domSanitizer.bypassSecurityTrustResourceUrl("../assets/icon_flanders.svg"));
    matIconRegistry.addSvgIcon('belgium', domSanitizer.bypassSecurityTrustResourceUrl("../assets/icon_belgium.svg"));
  }
}
