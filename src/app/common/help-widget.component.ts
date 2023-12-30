import { Component, Input, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CommonDialogService } from './dialog.component';
import { LanguageService } from './language.service';
import { Observable } from 'rxjs';
import { LanguageType } from '../main/proposal';

@Component({
  selector: 'app-help-widget',
  template: `<span [class.dialog]="dialogKey || dialogMdSrc || dialogMdData"
    [matTooltip]="tooltipText || (tooltipKey | translate)"
    [matTooltipClass]="{
      'help-widget-tooltip': true,
      'help-widget-tooltip-en': (lang | async) === 'en',
      'help-widget-tooltip-nl': (lang | async) === 'nl',
      'help-widget-tooltip-fr': (lang | async) === 'fr',
      }"
    (click)="openDialog()">{{ text || (textKey && (textKey | translate)) }}<mat-icon>contact_support</mat-icon></span>`,
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
  constructor(private dialogService: CommonDialogService, private translate: TranslateService, languageService: LanguageService) {
    this.lang = languageService.language;
  }

  lang = new Observable<LanguageType>();

  @Input() text?: string;
  @Input() textKey?: string;
  @Input() tooltipKey: string = '';
  @Input() tooltipText: string = '';
  @Input() dialogKey?: string;
  @Input() dialogMdSrc?: string;
  @Input() dialogMdData?: string;

  openDialog() {
    if (this.dialogKey || this.dialogMdSrc || this.dialogMdData) {
      this.dialogService.show(
        this.textKey ? this.translate.instant(this.textKey) : undefined,
        this.dialogKey ? this.translate.instant(this.dialogKey) : undefined,
        undefined,
        '/assets/md/' + this.translate.currentLang + '/' + this.dialogMdSrc + '.md',
        this.dialogMdData);
    }
  }
}
