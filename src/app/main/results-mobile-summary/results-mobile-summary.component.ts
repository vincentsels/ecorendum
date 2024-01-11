import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { EnumsService } from '../../common/enums.service';

import { Results } from '../results/results';
import { ResultsService } from '../results.service';

@Component({
  selector: 'app-results-mobile-summary',
  templateUrl: './results-mobile-summary.component.html',
  styleUrls: ['./results-mobile-summary.component.scss']
})
export class ResultsMobileSummaryComponent {
  results$: Observable<Results>;

  constructor(service: ResultsService, public enums: EnumsService) {
    this.results$ = service.results$;
  }
}
