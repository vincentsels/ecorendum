import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CommonDialogService } from './dialog.component';

@Component({
  selector: 'app-help-widget',
  template:
`
&nbsp;<span [class.dialog]="dialogKey" [matTooltip]="tooltipKey | translate" (click)="openDialog()">{{ textKey }}<mat-icon>contact_support</mat-icon></span>
`,
  styles: [
`mat-icon {
  opacity: 0.3;

  font-size: 120%;
  vertical-align: text-bottom;
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

  @Input() textKey?: string;
  @Input() tooltipKey: string = '';
  @Input() dialogKey?: string;

  openDialog() {
    if (this.dialogKey) {
      this.dialogService.show(
        this.textKey ? this.translate.instant(this.textKey) : undefined,
        this.translate.instant(this.dialogKey));
    }
  }
}
