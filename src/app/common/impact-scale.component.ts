import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CostPipe } from './cost.pipe';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-impact-scale',
  template: `
  <div *ngIf="initialized" class="impact-scale-container" [matTooltip]="tooltip!">
    <mat-icon class="inline" *ngIf="isCost && !icon">euro</mat-icon>
    <mat-icon class="inline" *ngIf="icon">{{ icon }}</mat-icon>
    <div class="impact-scale" [style.width]="totalWidth! + 'px'">
      <div *ngFor="let square of squares" class="impact-square bg-color-{{ style }}-semi-transparent"></div>
      <!-- <div *ngIf="truncated()" class="impact-truncated">•••</div> -->
      <div *ngFor="let square of maxSquares" class="impact-square bg-color-{{ style }}-transparent"></div>
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
export class ImpactScaleComponent implements OnInit, OnChanges {
  constructor(private numberPipe: DecimalPipe, private costPipe: CostPipe) {
  }

  @Input({ required: true }) singleOrMin!: number;
  @Input({ required: true }) selected!: number;
  @Input() max?: number;
  @Input({ required: true }) scale!: number;

  @Input() unit?: string;
  @Input() isCost?: boolean = false;
  @Input() icon?: string;

  @Input() style?: 'accent' | 'warn' = 'accent';

  squares?: any[];
  maxSquares?: any[];
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
    const squareCount = Math.ceil(this.selected / this.scale);
    this.squares = !this.selected ? [] : new Array(squareCount);

    const maxSquareCount = !this.max ? 0 : Math.ceil(this.max / this.scale) - Math.ceil(this.selected / this.scale);
    this.maxSquares = !this.max ? [] : new Array(maxSquareCount);

    this.totalWidth = (Math.ceil((squareCount + maxSquareCount) / 2) * 2) * 3;
    // this.totalWidth + (this.truncated() ? 15 : 0) + (this.maxTruncated() ? 15 : 0)
    this.tooltip = this.getTooltip();

    this.initialized = true;
  }

  // truncated = () => this.getSquareCount() > 20;
  // getTruncatedSquareCount = () => Math.min(this.getSquareCount(), 20);

  // maxTruncated = () => this.getMaxSquareCount() > 20;
  // getTruncatedMaxSquareCount = () => Math.min(this.getMaxSquareCount(), 20);

  getTooltip() {
    const suffix = this.unit ? (' ' + this.unit) : '';

    const min = this.isCost ? this.costPipe.transform(this.singleOrMin) : this.numberPipe.transform(this.singleOrMin);
    let text = min + suffix;

    if (this.max) {
      const max = this.isCost ? this.costPipe.transform(this.max) : this.numberPipe.transform(this.max);
      text += ' - ' + max + ' ' + suffix;
    }

    return text;
  }
}
