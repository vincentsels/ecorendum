import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Proposal } from '../proposal';
import { ResultCalculatorService } from './result-calculator.service';
import { Results } from './results';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent {
  results$: Observable<Results>;

  constructor(calculator: ResultCalculatorService) {
    this.results$ = calculator.results$;
  }
}
