import { Component, Input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Cost } from '../main/proposals/proposal';

@Component({
  selector: 'app-cost',
  template: `
  <span class="cost" matTooltip="{{ cost | cost:true }}">
    {{ cost | cost:full:valueType }}
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
}
