import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { Observable, map } from 'rxjs';

import { CommonDialogService } from '../../common/dialog.component';
import { EnumsService } from '../../common/enums.service';
import { SubmitDialogComponent } from '../submit-dialog/submit-dialog.component';
import { Results } from './results';
import { ShareDialogComponent } from '../share-dialog/share-dialog.component';
import { ResultsService } from './results.service';
import { ProposalService } from '../proposals/proposal.service';
import { ConfigureParametersDialogComponent } from '../parameters/configure-parameters-dialog/configure-parameters-dialog.component';
import { ParametersService } from '../parameters/parameters.service';
import { Cost } from '../proposals/proposal';
import { Targets } from '../targets/targets';
import { TargetsService } from '../targets/targets.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  results$: Observable<Results>;
  risk$: Observable<'high-risk' | 'medium-risk' | 'low-risk'>;
  targets$: Observable<Targets>;

  expandedCo2Reduction = false;
  expandedTotalCost = false;

  @Input() dialog = false;

  constructor(service: ResultsService, public enums: EnumsService, public proposalService: ProposalService,
    public parametersService: ParametersService, targetsService: TargetsService,
    private matDialog: MatDialog, private commonDialog: CommonDialogService, private translate: TranslateService) {
    this.results$ = service.results$;
    this.targets$ = targetsService.targets$;
    this.risk$ = this.results$.pipe(map(r => this.getRisk(r.totalMeasurementCost)));
  }

  ngOnInit(): void {
    if (this.dialog) {
      this.expandedTotalCost = true;
      this.expandedCo2Reduction = true;
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
