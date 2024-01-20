import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

import { CommonDialogService } from './dialog.component';
import { LanguageService } from './language.service';
import { LanguageType } from '../main/proposals/proposal';
import { ContextService } from '../main/context/context.service';

@Component({
  selector: 'app-help-widget',
  template: `<span [class.dialog]="dialogKey || dialogMdSrc || dialogMdData"
    [matTooltip]="tooltipText || (tooltipKey | translate:(tooltipParameters || { region: (contextService.context$ | async) || '' | translate }))"
    [matTooltipClass]="{
      'help-widget-tooltip': dialogKey || dialogMdSrc || dialogMdData,
      'help-widget-tooltip-en': (dialogKey || dialogMdSrc || dialogMdData) && (lang | async) === 'en',
      'help-widget-tooltip-nl': (dialogKey || dialogMdSrc || dialogMdData) && (lang | async) === 'nl',
      'help-widget-tooltip-fr': (dialogKey || dialogMdSrc || dialogMdData) && (lang | async) === 'fr',
      }"
    (click)="openDialog()">{{
      text || (textKey && (textKey | translate)) }}<mat-icon>contact_support</mat-icon></span>`,
  styles: [
`mat-icon {
  opacity: 0.3;

  font-size: 110%;
  vertical-align: text-top;
  margin-left: 6px;
  height: unset;
  width: unset;
}

span {
  cursor: default;
}

span.dialog {
  cursor: pointer;
}

span:hover {
  mat-icon {
    opacity: 0.8;
  }
}
`
  ],
})
export class HelpWidgetComponent {
  constructor(private dialogService: CommonDialogService, private translate: TranslateService,
    public contextService: ContextService, languageService: LanguageService) {
    this.lang = languageService.language;
  }

  lang = new Observable<LanguageType>();

  @Input() text?: string;
  @Input() textKey?: string;
  @Input() tooltipKey: string = '';
  @Input() tooltipParameters?: {};
  @Input() tooltipText: string = '';
  @Input() dialogKey?: string;
  @Input() dialogParameters?: {};
  @Input() dialogMdSrc?: string;
  @Input() dialogMdData?: string;

  openDialog() {
    if (this.dialogKey || this.dialogMdSrc || this.dialogMdData) {
      this.dialogService.show(
        this.textKey ? this.translate.instant(this.textKey, this.tooltipParameters) : undefined,
        this.dialogKey ? this.translate.instant(this.dialogKey,
          this.dialogParameters || { region: this.translate.instant(this.contextService.context$.value) }) : undefined,
        undefined,
        this.dialogMdSrc ? '/assets/md/' + this.translate.currentLang + '/' + this.dialogMdSrc + '.md' : undefined,
        this.dialogMdData);
    }
  }
}
