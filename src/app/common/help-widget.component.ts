import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-help-widget',
  template:
`
&nbsp;<span [class.dialog]="dialogKey" [matTooltip]="tooltipKey | translate">{{ textKey }}<mat-icon>contact_support</mat-icon></span>
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
  @Input() textKey: string = '';
  @Input() tooltipKey: string = '';
  @Input() dialogKey: string = '';
}
