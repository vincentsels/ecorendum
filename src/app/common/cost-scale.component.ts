import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { CostPipe } from './cost.pipe';
import { Cost } from '../main/proposals/proposal';

@Component({
  selector: 'app-cost-scale',
  template: `
  <div *ngIf="initialized" class="impact-scale-container" [matTooltip]="tooltip!">
    <mat-icon class="inline">euro</mat-icon>
    <div class="impact-scale" [style.width]="totalWidth! + 'px'">
      <div *ngFor="let square of selectedMinSquares" class="impact-square bg-color-{{ style }}-semi-transparent"></div>
      <!-- <div *ngIf="truncated()" class="impact-truncated">•••</div> -->
      <div *ngFor="let square of selectedMaxSquares" class="impact-square bg-color-{{ style }}-transparent"></div>
      <div *ngFor="let square of potentialSquares" class="impact-square bg-color-neutral-transparent"></div>
      <!-- <div *ngIf="maxTruncated()" class="impact-truncated">•••</div> -->
    </div>
  </div>
`,
  styles: [
`
.impact-scale-container {
  display: inline-flex;
  align-items: center;
}

.impact-scale {
  display: inline-flex;
  flex-direction: column;
  height: 10px;
  gap: 2px;
  justify-content: start;
  flex-wrap: wrap;
  align-content: flex-start;
  margin-bottom: 1px; /* To align properly with image */
}

.impact-square {
  width: 4px;
  height: 4px;
}
`
  ],
})
export class CostScaleComponent implements OnInit, OnChanges {
  constructor(private numberPipe: DecimalPipe, private costPipe: CostPipe) {
  }

  @Input({ required: true }) min!: Cost;
  @Input({ required: true }) selected!: Cost;
  @Input() potential?: Cost;
  @Input({ required: true }) scale!: number;

  @Input() style?: 'accent' | 'warn' = 'accent';

  selectedMinSquares?: any[];
  selectedMaxSquares?: any[];
  potentialSquares?: any[];
  totalWidth?: number;
  tooltip?: string;

  initialized = false;

  ngOnInit(): void {
    this.initialize();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // If we receive changes after we've already been initialized; re-initialize
    if (this.initialized) this.initialize();
  }

  private initialize() {
    const minSquareCount = Math.ceil(this.selected.getMin() / this.scale);
    this.selectedMinSquares = !minSquareCount ? [] : new Array(minSquareCount);

    const maxSquareCount = Math.ceil(this.selected.getMax() / this.scale) - Math.ceil(this.selected.getMin() / this.scale);
    this.selectedMaxSquares = !maxSquareCount ? [] : new Array(maxSquareCount);

    const potentialSquareCount = this.potential ? Math.ceil(this.potential.getMax() / this.scale) - Math.ceil(this.selected.getMax() / this.scale) : 0;
    this.potentialSquares = (!potentialSquareCount || potentialSquareCount < 0) ? [] : new Array(potentialSquareCount);

    this.totalWidth = (Math.ceil((minSquareCount + maxSquareCount + potentialSquareCount) / 2) * 2) * 3;
    // this.totalWidth + (this.truncated() ? 15 : 0) + (this.maxTruncated() ? 15 : 0)
    this.tooltip = this.getTooltip();

    this.initialized = true;
  }

  // truncated = () => this.getSquareCount() > 20;
  // getTruncatedSquareCount = () => Math.min(this.getSquareCount(), 20);

  // maxTruncated = () => this.getMaxSquareCount() > 20;
  // getTruncatedMaxSquareCount = () => Math.min(this.getMaxSquareCount(), 20);

  getTooltip() {
    const selected = this.costPipe.transform(this.selected, true);
    return selected;
  }
}
