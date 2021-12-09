import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

import { EnumsService } from '../../common/enums.service';
import { ProposalService } from '../proposal.service';
import { Results } from './results';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  results$: Observable<Results>;

  ghgGapCumulativeKt = Results.ghgGapCumulativeKt;
  reGapTargetGwh = Results.reGapTargetGwh;
  eeGapTargetGwh = Results.eeGapTargetGwh;

  expandedAll = false;
  expandedGhg = false;
  expandedEe = false;
  expandedRe = false;
  expandedTotalCost = false;
  expandedTotalImpact = false;

  @Input() dialog = false;

  constructor(service: ProposalService, private snackBar: MatSnackBar, public enums: EnumsService) {
    this.results$ = service.results$;
  }

  ngOnInit(): void {
    if (this.dialog) {
      this.expandedAll = true;
      this.expandedGhg = true;
      this.expandedEe = true;
      this.expandedRe = true;
      this.expandedTotalCost = true;
      this.expandedTotalImpact = true;
    }
  }

  submit() {
    this.snackBar.open('This would submit your preferred measures so the government gets an idea of the support for each of them.', 'OK');
  }

  displayImpact(impactAmount: number) {
    if (impactAmount === 0) return '+-';
    const sign = impactAmount < 0 ? '+' : '- ';
    return sign.repeat(Math.abs(impactAmount));
  }

  toggleAllResults() {
    this.expandedAll = !this.expandedAll;

    this.expandedGhg = this.expandedAll;
    this.expandedEe = this.expandedAll;
    this.expandedRe = this.expandedAll;
    this.expandedTotalCost = this.expandedAll;
    this.expandedTotalImpact = this.expandedAll;
  }

  toggleGhgResult() {
    this.expandedGhg = !this.expandedGhg;
  }

  toggleEeResult() {
    this.expandedEe = !this.expandedEe;
  }

  toggleReResult() {
    this.expandedRe = !this.expandedRe;
  }

  toggleTotalCost() {
    this.expandedTotalCost = !this.expandedTotalCost;
  }

  toggleTotalImpact() {
    this.expandedTotalImpact = !this.expandedTotalImpact;
  }
}
