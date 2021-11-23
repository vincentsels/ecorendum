import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { PROPOSALS } from './dummyProposals';
import { Proposal, TargetType, Variant } from './proposal';
import { Results } from './results/results';

@Injectable()
export class ProposalService {
  proposals: Proposal[] = [];
  results$ = new BehaviorSubject<Results>(new Results());

  constructor() {
    this.proposals = PROPOSALS;
  }

  updateResults() {
    if (!this.proposals || this.proposals.length === 0) return;
    const selectedVariants = this.proposals.filter(p => p.selected).flatMap(p => p.variants).filter(v => v.selected);

    const ghgReducedKt = this.getTotalAmount(selectedVariants, TargetType.ghgReduction);
    const ghgReductionPercentage = ghgReducedKt / Results.ghgGapCumulativeKt * 100;

    this.results$.next(
      new Results({
        ghgReducedKt,
        ghgReductionPercentage,
        ghgReductionColor: ghgReductionPercentage >= 100 ? 'accent' : 'warn',
      })
    )
  }

  getTotalAmount(selectedVariants: Variant[], targetType: TargetType) {
    return selectedVariants
      .flatMap(v => v.targets.filter(t => t.type === targetType).map(t => t.amount))
      .reduce((a, b) => a + b, 0);
  }
}
