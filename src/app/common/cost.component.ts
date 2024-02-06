import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { CostPipe } from './cost.pipe';
import { Cost } from '../main/proposals/proposal';

@Component({
  selector: 'app-cost',
  template: `
  <span *ngIf="initialized" class="cost" matTooltip="{{ cost | cost:true }}">
    {{ displayCost | cost:full }}
  </span>
`,
  styles: [
`

`
  ],
})
export class CostComponent implements OnInit, OnChanges {
  constructor(private numberPipe: DecimalPipe, private costPipe: CostPipe) { }

  @Input({ required: true }) cost!: Cost;

  @Input() value: 'min-max' | 'min' | 'max' | 'avg' = 'min-max';
  @Input() full: boolean = false;
  @Input() risk: boolean = false;

  displayCost = new Cost();
  initialized = false;

  ngOnInit(): void {
    this.initialize();
  }

  ngOnChanges(): void {
    // If we receive changes after we've already been initialized; re-initialize
    if (this.initialized) this.initialize();
  }

  private initialize() {
    if (this.value === 'min') this.displayCost = new Cost(this.cost.estimate || this.cost.min);
    else if (this.value === 'max') this.displayCost = new Cost(this.cost.estimate || this.cost.max);
    else if (this.value === 'avg') this.displayCost = new Cost(this.cost.estimate || (((this.cost.min || 0) + (this.cost.max || 0)) / 2));
    else this.displayCost = new Cost(this.cost);

    this.initialized = true;
  }
}
