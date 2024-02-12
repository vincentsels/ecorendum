import { Component, Input, OnInit } from "@angular/core";
import { TotalImpact } from "../results";

@Component({
  selector: 'app-impact-results',
  templateUrl: './impact-results.component.html',
  styleUrls: ['../results.component.scss']
})
export class ImpactResultsComponent implements OnInit {
  @Input({ required: true }) environmentalImpact!: TotalImpact[];
  @Input({ required: true }) justiceImpact!: TotalImpact[];
  @Input({ required: true }) global!: boolean;
  @Input({ required: true }) dialog!: boolean;

  expand = true;

  ngOnInit(): void {
    this.expand = this.dialog;
  }

  toggleTotalImpact() {
    this.expand = !this.expand;
  }

  getTotalImpactId = (_: any, item: TotalImpact) => item.domain;
}
