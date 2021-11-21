import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Proposal, TargetType, Variant } from '../proposal';
import { Results } from './results';

@Injectable()
export class ResultCalculatorService {
  results$ = new BehaviorSubject<Results>(new Results());

  updateResults(proposals: Proposal[]) {
    if (!proposals || proposals.length === 0) return;
    const selectedVariants = proposals.filter(p => p.selected).flatMap(p => p.variants).filter(v => v.selected);

    const ghgReducedKt = this.getTotalAmount(selectedVariants, TargetType.ghgReduction);
    const ghgReductionPercentage = ghgReducedKt / Results.ghgGapCumulativeKt * 100;

    this.results$.next(
      new Results({
        ghgReducedKt,
        ghgReductionPercentage,
        ghgReductionColor: ghgReductionPercentage >= 100 ? 'primary' : 'warn',
      })
    )
  }

  getTotalAmount(selectedVariants: Variant[], targetType: TargetType) {
    return selectedVariants
      .flatMap(v => v.targets.filter(t => t.type === targetType).map(t => t.amount))
      .reduce((a, b) => a + b);
  }
}
