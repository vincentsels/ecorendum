import { Component, Input } from '@angular/core';
import { TargetResult, TotalImpact } from '../results';

@Component({
  selector: 'app-impact-result',
  template: `
    <div class="impact-item">
      <div class="impact-gauge">
        <div dir="rtl" class="progress-container">
          <mat-progress-bar class="progress" mode="determinate"
            color="warn" [value]="impactItem.amount > 0 ? (impactItem.amount * 8) : 0">
          </mat-progress-bar>
        </div>
        <span>
          <mat-icon class="inline impact-icon" [class]="impactItem.class" matTooltip="{{ impactItem.domain | translateEnum:'ImpactDomain' | async }}">
            {{ impactItem.getImpactDomainIcon() }}
          </mat-icon>
        </span>
        <mat-progress-bar class="progress" mode="determinate"
          color="accent" [value]="impactItem.amount < 0 ? (impactItem.amount * -8) : 0">
        </mat-progress-bar>
      </div>
      <span class="impact-header">{{ impactItem.domain | translateEnum:'ImpactDomain' | async }}</span>
    </div>
`,
  styles: [
`
.progress-container {
  width: 100%;
  display: flex;
}

.progress {
  display: inline-block;
}

.impact-item {
  display: flex;
  gap: 12px;
}

.impact-icon {
  margin-left: 4px;
  margin-right: 4px;
}

.impact-header {
  flex: 1
}

.impact-gauge {
  flex: 1;
  display: flex;
  align-items: center;
}
`
  ]
})
export class ImpactResultComponent {
  @Input({ required: true }) impactItem!: TotalImpact;
}
