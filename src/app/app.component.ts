import { Component, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer, Meta, Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { HelpWidgetComponent } from './common/help-widget.component';

import { LanguageService, LS_KEY_LANGUAGE } from './common/language.service';
import { LanguageType } from './main/proposals/proposal';

const DEFAULT_LANG: LanguageType = 'en'; // TODO: retrieve from browser language

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(languageService: LanguageService, titleService: Title, metaService: Meta, translate: TranslateService,
    matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer, injector: Injector) {
    const lang = <LanguageType>localStorage.getItem(LS_KEY_LANGUAGE) || DEFAULT_LANG;
    translate.setDefaultLang(DEFAULT_LANG);
    languageService.setLanguage(lang);
    languageService.language$.subscribe({
      next: lang => setTimeout(() => {
        titleService.setTitle(translate.instant('siteTitle'));
        metaService.updateTag({ name: 'description', content: translate.instant('siteDescription') });
      })
    });

    matIconRegistry.addSvgIcon('flanders', domSanitizer.bypassSecurityTrustResourceUrl("../assets/icon_flanders.svg"));
    matIconRegistry.addSvgIcon('belgium', domSanitizer.bypassSecurityTrustResourceUrl("../assets/icon_belgium.svg"));
    matIconRegistry.addSvgIcon('brussels', domSanitizer.bypassSecurityTrustResourceUrl("../assets/icon_brussels.svg"));
    matIconRegistry.addSvgIcon('wallonia', domSanitizer.bypassSecurityTrustResourceUrl("../assets/icon_wallonia.svg"));

    const HelpWidgetElement = createCustomElement(HelpWidgetComponent, { injector });
    customElements.define('help-widget', HelpWidgetElement);
  }
}
