import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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

  constructor(service: ProposalService) {
    this.results$ = service.results$;
  }
}
