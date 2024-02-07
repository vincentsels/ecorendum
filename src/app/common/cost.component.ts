import { Component, Input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Cost } from '../main/proposals/proposal';

@Component({
  selector: 'app-cost',
  template: `
  <span class="cost" matTooltip="{{ cost | cost:true }}">
    {{ cost | cost:full:valueType }}&nbsp;<small
      *ngIf="risk && valueType === 'avg' && cost.min && cost.max && cost.min !== cost.max && getSpread(); let spread;"
      [ngClass]="{ 'danger': spread === 'extreme-risk', 'warning': spread === 'high-risk' }">({{ spread | translate }})</small>
  </span>
`,
  styles: [
`
`
  ],
})
export class CostComponent {
  constructor(private numberPipe: DecimalPipe) {}

  @Input({ required: true }) cost!: Cost;

  @Input() valueType: 'min-max' | 'min' | 'max' | 'avg' = 'min-max';
  @Input() full: boolean = false;
  @Input() risk: boolean = false;

  initialized = false;

  getSpread() {
    // Here we're sure we have a different min and max
    const spread = this.cost.max! - this.cost.min!;
    const avg = (this.cost.max! - this.cost.min!) / 2;
    if (spread > Math.abs(avg) * 0.5) return 'extreme-risk';
    else if (spread > Math.abs(avg) * 0.25) return 'high-risk';
    else return null;
  }
}
