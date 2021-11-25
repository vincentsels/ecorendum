import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { EnumsService } from '../../common/enums.service';

import { Proposal } from '../proposal';
import { ProposalService } from '../proposal.service';
import { Results } from '../results/results';

@Component({
  selector: 'app-results-mobile-summary',
  templateUrl: './results-mobile-summary.component.html',
  styleUrls: ['./results-mobile-summary.component.scss']
})
export class ResultsMobileSummaryComponent {
  results$: Observable<Results>;

  ghgGapCumulativeKt = Results.ghgGapCumulativeKt;
  reGapTargetGwh = Results.reGapTargetGwh;
  eeGapTargetGwh = Results.eeGapTargetGwh;

  constructor(service: ProposalService, private snackBar: MatSnackBar, public enums: EnumsService) {
    this.results$ = service.results$;
  }
}
