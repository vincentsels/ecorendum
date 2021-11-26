import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { EnumsService } from '../../common/enums.service';

import { Proposal } from '../proposal';
import { ProposalService } from '../proposal.service';
import { Results } from './results';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent {
  results$: Observable<Results>;

  ghgGapCumulativeKt = Results.ghgGapCumulativeKt;
  reGapTargetGwh = Results.reGapTargetGwh;
  eeGapTargetGwh = Results.eeGapTargetGwh;

  constructor(service: ProposalService, private snackBar: MatSnackBar, public enums: EnumsService) {
    this.results$ = service.results$;
  }

  submit() {
    this.snackBar.open('This would submit your preferred measures so the government gets an idea of the support for each of them.', 'OK');
  }

  displayImpact(impactAmount: number) {
    if (impactAmount === 0) return '+-';
    const sign = impactAmount < 0 ? '+' : '- ';
    return sign.repeat(Math.abs(impactAmount));
  }
}
