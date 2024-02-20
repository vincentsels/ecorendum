import { Component, Input, OnInit } from "@angular/core";
import { SectorEmissionsResult, SectorEmissionsResults, ImpactItem } from "../results";

@Component({
  selector: 'app-emissions-chart',
  templateUrl: './emissions-chart.component.html',
  styleUrls: ['./emissions-chart.component.scss']
})
export class EmissionsChartComponent {
  @Input({ required: true }) sectorEmissionsResults!: SectorEmissionsResults;

  getSectorType = (_: any, sector: SectorEmissionsResult) => sector.sector;
}
