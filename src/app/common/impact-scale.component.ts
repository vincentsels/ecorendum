import { Component, Input } from '@angular/core';
import { CostPipe } from './cost.pipe';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-impact-scale',
  template: `
  <div class="impact-scale-container" [matTooltip]="getTooltip()">
    <mat-icon class="inline" *ngIf="isCost && !icon">euro</mat-icon>
    <mat-icon class="inline" *ngIf="icon">{{ icon }}</mat-icon>
    <div class="impact-scale" [style.width]="(getTotalColumns() * 3) + 'px'">
      <div *ngFor="let square of getSquares()" class="impact-square bg-color-{{ style }}-semi-transparent"></div>
      <div *ngFor="let square of getMaxSquares()" class="impact-square bg-color-{{ style }}-transparent"></div>
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
  @Input() max?: number;
  @Input({ required: true }) scale!: number;

  @Input() unit?: string;
  @Input() isCost?: boolean = false;
  @Input() icon?: string;

  @Input() style?: 'accent' | 'warn' = 'accent';

  getSquares() {
    return new Array(Math.ceil(this.singleOrMin / this.scale));
  }

  getMaxSquares() {
    return !this.max ? [] : new Array(Math.ceil(this.max / this.scale) - Math.ceil(this.singleOrMin / this.scale));
  }

  getTotalColumns() {
    return (Math.ceil((Math.ceil(this.singleOrMin / this.scale) + (!this.max ? 0 : Math.ceil((this.max - this.singleOrMin) / this.scale))) / 2) * 2) - 1;
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
