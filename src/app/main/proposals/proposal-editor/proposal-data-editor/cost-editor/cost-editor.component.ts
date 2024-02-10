import { Component, Input } from '@angular/core';
import { Cost } from '../../../proposal';

@Component({
  selector: 'app-cost-editor',
  templateUrl: './cost-editor.component.html',
  styleUrls: ['./cost-editor.component.scss']
})
export class CostEditorComponent {
  @Input({ required: true }) cost!: Cost;
  @Input({ required: true }) label!: string;
  @Input({ required: true }) name!: string;

  minMax = false;

  toggleMinmax() {
    this.minMax = !this.minMax;
    if (this.minMax) {
      this.cost.min = undefined;
      this.cost.max = undefined;
    } else {
      this.cost.estimate = undefined;
    }
  }
}
