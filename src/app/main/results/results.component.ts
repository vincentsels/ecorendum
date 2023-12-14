import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { CommonDialogService } from '../../common/dialog.component';

import { EnumsService } from '../../common/enums.service';
import { ProposalService } from '../proposal.service';
import { SubmitDialogComponent } from '../submit-dialog/submit-dialog.component';
import { Results } from './results';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  results$: Observable<Results>;

  euTargetGapGhgKt = Results.euTargetGapGhgKt;
  euTargetGapReGwh = Results.euTargetGapReGwh;
  euTargetGapEeGwh = Results.euTargetGapEeGwh;

  expandedAll = false;

  expandedLegalGhg = false;

  expandedEuGhg = false;
  expandedEuEe = false;
  expandedEuRe = false;

  expandedTotalCost = false;
  expandedTotalImpact = false;

  @Input() dialog = false;

  constructor(service: ProposalService, public enums: EnumsService, private matDialog: MatDialog,
    private commonDialog: CommonDialogService, private translate: TranslateService) {
    this.results$ = service.results$;
  }

  ngOnInit(): void {
    if (this.dialog) {
      this.expandedAll = true;
      this.expandedEuGhg = true;
      this.expandedEuEe = true;
      this.expandedEuRe = true;
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

  toggleAllResults() {
    this.expandedAll = !this.expandedAll;

    this.expandedEuGhg = this.expandedAll;
    this.expandedEuEe = this.expandedAll;
    this.expandedEuRe = this.expandedAll;
    this.expandedTotalCost = this.expandedAll;
    this.expandedTotalImpact = this.expandedAll;
  }

  toggleLegalGhgResult() {
    this.expandedLegalGhg = !this.expandedLegalGhg;
  }

  toggleEuGhgResult() {
    this.expandedEuGhg = !this.expandedEuGhg;
  }

  toggleEuEeResult() {
    this.expandedEuEe = !this.expandedEuEe;
  }

  toggleEuReResult() {
    this.expandedEuRe = !this.expandedEuRe;
  }

  toggleTotalCost() {
    this.expandedTotalCost = !this.expandedTotalCost;
  }

  toggleTotalImpact() {
    this.expandedTotalImpact = !this.expandedTotalImpact;
  }

  showCostComparisonDialog() {
    this.commonDialog.show(
      this.translate.instant('Cost comparison'),
      this.translate.instant('costComparisonExplanation'),
    )
  }
}
