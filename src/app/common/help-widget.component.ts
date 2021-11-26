import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CommonDialogService } from './dialog.component';

@Component({
  selector: 'app-help-widget',
  template:
`<span *ngIf="!withoutSpace && textKey">&nbsp;</span><span [class.dialog]="dialogKey || dialogMdSrc || dialogMdData" [matTooltip]="tooltipKey | translate" (click)="openDialog()">{{ textKey }}<mat-icon>contact_support</mat-icon></span>
`,
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
  ]
})
export class HelpWidgetComponent {
  constructor(private dialogService: CommonDialogService, private translate: TranslateService) {}

  @Input() withoutSpace?: boolean;
  @Input() textKey?: string;
  @Input() tooltipKey: string = '';
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
