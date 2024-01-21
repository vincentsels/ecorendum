import { Component, Input } from '@angular/core';
import { CostPipe } from './cost.pipe';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-impact-scale',
  template: `
  <div class="impact-scale-container" [matTooltip]="getTooltip()">
    <mat-icon class="inline" *ngIf="isCost && !icon">euro</mat-icon>
    <mat-icon class="inline" *ngIf="icon">{{ icon }}</mat-icon>
    <div class="impact-scale" [style.width]="getTotalWidth() + 'px'">
      <div *ngFor="let square of getSquares()" class="impact-square bg-color-{{ style }}-semi-transparent"></div>
      <!-- <div *ngIf="truncated()" class="impact-truncated">•••</div> -->
      <div *ngFor="let square of getMaxSquares()" class="impact-square bg-color-{{ style }}-transparent"></div>
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
  margin-bottom: 1px; // To align properly with image
}

.impact-square {
  width: 4px;
  height: 4px;
}
`
  ],
})
export class ImpactScaleComponent {
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

  getSquareCount() {
    return Math.ceil(this.selected / this.scale);
  }

  // truncated = () => this.getSquareCount() > 20;
  // getTruncatedSquareCount = () => Math.min(this.getSquareCount(), 20);
  getSquares = () => !this.selected ? [] : new Array(this.getSquareCount());

  getMaxSquareCount() {
    return !this.max ? 0 : Math.ceil(this.max / this.scale) - Math.ceil(this.selected / this.scale);
  }

  // maxTruncated = () => this.getMaxSquareCount() > 20;
  // getTruncatedMaxSquareCount = () => Math.min(this.getMaxSquareCount(), 20);
  getMaxSquares = () => !this.max ? [] : new Array(this.getMaxSquareCount());

  getTotalWidth() {
    const squareWidth = (Math.ceil((this.getSquareCount() + this.getMaxSquareCount()) / 2) * 2) * 3;
    return squareWidth; // + (this.truncated() ? 15 : 0) + (this.maxTruncated() ? 15 : 0)
  }

  getTooltip() {
    const min = this.isCost ? this.costPipe.transform(this.singleOrMin) : this.numberPipe.transform(this.singleOrMin);
    let text = min + this.getSuffix();

    if (this.max) {
      const max = this.isCost ? this.costPipe.transform(this.max) : this.numberPipe.transform(this.max);
      text += ' - ' + max + ' ' + this.getSuffix();
    }

    return text;
  }

  getSuffix = () => this.unit ? (' ' + this.unit) : '';
}
