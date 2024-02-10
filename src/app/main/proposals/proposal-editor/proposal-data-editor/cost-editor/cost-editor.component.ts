import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Cost } from '../../../proposal';

@Component({
  selector: 'app-cost-editor',
  templateUrl: './cost-editor.component.html',
  styleUrls: ['./cost-editor.component.scss']
})
export class CostEditorComponent implements OnChanges {
  @Input({ required: true }) cost!: Cost;
  @Input({ required: true }) label!: string;
  @Input({ required: true }) name!: string;

  minMax = false;

  ngOnChanges(changes: SimpleChanges): void {
    const costChanges = changes['cost'];
    if (costChanges) {
      const currVal = costChanges.currentValue as Cost;
      if (currVal.isNull() || currVal.estimate) {
        this.minMax = false;
      } else {
        this.minMax = true;
      }
    }
  }

  toggleMinmax() {
    this.minMax = !this.minMax;
    if (this.minMax) {
      this.cost.estimate = undefined;
    } else {
      this.cost.min = undefined;
      this.cost.max = undefined;
    }
  }
}
