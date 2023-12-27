import { Component, Input } from '@angular/core';
import { TargetResult } from './results';

@Component({
  selector: 'app-result-progress',
  template: `
      <mat-progress-bar *ngIf="target" class="progress" mode="determinate"
        [matTooltip]="(target.total | number) + '/' + (target.target | number) + ' ' + target.unit
          + ' (' + (target.percentage | number:'1.0-0') + '%)'"
        [color]="target.color"
        [value]="target.percentage">
      </mat-progress-bar>
`,
  styles: [
`
.progress {
  width: 100%;
  display: inline-block;
}
`
  ]
})
export class ResultProgressComponent {
  @Input() target?: TargetResult;
}
