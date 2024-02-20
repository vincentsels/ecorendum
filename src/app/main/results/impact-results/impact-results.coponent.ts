import { Component, Input, OnInit } from "@angular/core";
import { ImpactItem } from "../results";

@Component({
  selector: 'app-impact-results',
  templateUrl: './impact-results.component.html',
  styleUrls: ['../results.component.scss']
})
export class ImpactResultsComponent implements OnInit {
  @Input({ required: true }) allImpact!: ImpactItem[];
  @Input({ required: true }) environmentalImpact!: ImpactItem[];
  @Input({ required: true }) justiceImpact!: ImpactItem[];
  @Input({ required: true }) global!: boolean;
  @Input({ required: true }) dialog!: boolean;

  expand = true;

  ngOnInit(): void {
    this.expand = this.dialog;
  }

  toggleTotalImpact() {
    this.expand = !this.expand;
  }

  getTotalImpactId = (_: any, item: ImpactItem) => item.domain;
}
