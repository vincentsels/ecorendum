import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DateAdapter } from '@angular/material/core';
import { BehaviorSubject, map } from 'rxjs';
import { LanguageType } from '../main/proposals/proposal';

export const LOCAL_STORAGE_KEY_LANGUAGE = 'language';

@Injectable()
export class LanguageService {
  constructor(private translate: TranslateService, private adapter: DateAdapter<any>) {
  }

  language$ = new BehaviorSubject<LanguageType>(<LanguageType>localStorage.getItem(LOCAL_STORAGE_KEY_LANGUAGE) || 'en');
  isEn$ = this.language$.pipe(map(l => l === 'en'));
  isNl$ = this.language$.pipe(map(l => l === 'nl'));
  isFr$ = this.language$.pipe(map(l => l === 'fr'));

  setLanguage(inputLang: LanguageType) {
    localStorage.setItem(LOCAL_STORAGE_KEY_LANGUAGE, inputLang);
    this.translate.use(inputLang);
    this.adapter.setLocale(inputLang + '-BE');
    setTimeout(() => this.language$.next(inputLang));
  }
}
