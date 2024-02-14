import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { Observable, map } from 'rxjs';
import * as Highcharts from 'highcharts';
import theme from 'highcharts/themes/dark-unica';
theme(Highcharts);

import { CommonDialogService } from '../../common/dialog.component';
import { EnumsService } from '../../common/enums.service';
import { SubmitDialogComponent } from '../submit-dialog/submit-dialog.component';
import { Results, TotalImpact } from './results';
import { ShareDialogComponent } from '../share-dialog/share-dialog.component';
import { ResultsService } from './results.service';
import { ProposalService } from '../proposals/proposal.service';
import { ConfigureParametersDialogComponent } from '../parameters/configure-parameters-dialog/configure-parameters-dialog.component';
import { ParametersService } from '../parameters/parameters.service';
import { Cost } from '../proposals/proposal';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  results$: Observable<Results>;
  risk$: Observable<'high-risk' | 'medium-risk' | 'low-risk'>;

  @Input() dialog = false;

  expandedTotalCost = false;
  expandedTotalImpact = true;
  expandedCo2Reduction = true;

  Highcharts: typeof Highcharts = Highcharts; // required
  chartConstructor: string = 'chart'; // optional string, defaults to 'chart'
  chartOptions: Highcharts.Options = {
    chart: {
      backgroundColor: 'transparent',
      type: 'column'
    },
    plotOptions: {
        column: {
            stacking: 'normal',
            dataLabels: {
                enabled: true
            }
        }
    },
    title: undefined,
    series: [{
      type: 'column',
      name: 'BPL',
      data: [3, 5, 1, 13]
    }, {
      type: 'column',
      name: 'FA Cup',
      data: [14, 8, 8, 12]
    }] }; // required
  updateFlag: boolean = false; // optional boolean
  oneToOneFlag: boolean = true; // optional boolean, defaults to false

  constructor(service: ResultsService, public enums: EnumsService, public proposalService: ProposalService, public parametersService: ParametersService,
    private matDialog: MatDialog, private commonDialog: CommonDialogService, private translate: TranslateService) {
    this.results$ = service.results$;
    this.risk$ = this.results$.pipe(map(r => this.getRisk(r.totalMeasurementCost)));
  }

  ngOnInit(): void {
    if (this.dialog) {
      this.expandedTotalCost = true;
      this.expandedTotalImpact = true;
    }
  }

  submit() {
    this.matDialog.open(SubmitDialogComponent);
  }

  displayImpact(impactAmount: number) {
    if (impactAmount === 0) return '+-';
    const sign = impactAmount < 0 ? '+' : '- ';
    return sign.repeat(Math.abs(impactAmount));
  }

  toggleCo2Reduction = () => this.expandedCo2Reduction = !this.expandedCo2Reduction;
  toggleTotalCost = () => this.expandedTotalCost = !this.expandedTotalCost;

  showCostComparisonDialog() {
    this.commonDialog.show(
      this.translate.instant('Cost comparison'),
      this.translate.instant('costComparisonExplanation'),
    )
  }

  openCopyDialog() {
    this.matDialog.open(ShareDialogComponent);
  }

  openParametersDialog() {
    this.matDialog.open(ConfigureParametersDialogComponent);
  }

  getRisk(cost: Cost) {
    const spread = cost.getMax() - cost.getMin();
    const fraction = spread / cost.getMin();
    if (fraction > 1) return 'high-risk'; // The measures can be more than double as expensive as minimum
    if (fraction > 0.5) return 'medium-risk'; // The measures can be more than 50% more expensive than the minimum
    return 'low-risk';
  }
}
