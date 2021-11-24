import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { PROPOSALS } from './dummyProposals';
import { Impact, ImpactAmount, ImpactAmountMap, ImpactDomain, Proposal, TargetType, Variant } from './proposal';
import { Results, TotalImpact } from './results/results';

@Injectable()
export class ProposalService {
  proposals: Proposal[] = [];
  results$ = new BehaviorSubject<Results>(new Results());

  constructor() {
    this.proposals = PROPOSALS;

    this.updateResults();
  }

  updateResults() {
    if (!this.proposals || this.proposals.length === 0) return;
    const selectedVariants = this.proposals.filter(p => p.selected).flatMap(p => p.variants).filter(v => v.selected);

    const ghgReducedKt = this.getTotalAmount(selectedVariants, TargetType.ghgReduction);
    const ghgReductionPercentage = ghgReducedKt / Results.ghgGapCumulativeKt * 100;
    const ghgTax = (Results.ghgGapCumulativeKt - ghgReducedKt) * Results.pricePerKtGhg;
    const ghgIncome = (Results.ghgGapCumulativeKt - ghgReducedKt) * -Results.pricePerKtGhg;

    const energySavedGwh = this.getTotalAmount(selectedVariants, TargetType.energyEfficiency);
    const energySavedPercentage = energySavedGwh / Results.eeGapTargetGwh * 100;

    const reAddedGwh = this.getTotalAmount(selectedVariants, TargetType.renewableEnergy);
    const reAddedPercentage = reAddedGwh / Results.reGapTargetGwh * 100;

    const totalCost = selectedVariants.map(v => v.getTotalCost()).reduce((a, b) => a + b, 0);

    const totalImpact: TotalImpact[] = [];

    for (let variant of selectedVariants) {
      for (let impact of variant.impacts) {
        const impactItem = totalImpact.find(i => i.domain === impact.domain);
        if (impactItem) {
          impactItem.amount += (impact.amount - 5);
        } else {
          totalImpact.push(new TotalImpact(impact.domain, impact.amount - 5 ));
        }
      }
    }

    for (let impact of totalImpact) {
      if (impact.amount <= -8) impact.class = ImpactAmountMap[ImpactAmount.extremelyPositive];
      else if (impact.amount <= -6) impact.class = ImpactAmountMap[ImpactAmount.veryPositive];
      else if (impact.amount <= -4) impact.class = ImpactAmountMap[ImpactAmount.moderatelyPositive];
      else if (impact.amount <= -2) impact.class = ImpactAmountMap[ImpactAmount.somewhatPositive];
      else if (impact.amount >= 8) impact.class = ImpactAmountMap[ImpactAmount.extremelyNegative];
      else if (impact.amount >= 6) impact.class = ImpactAmountMap[ImpactAmount.veryNegative];
      else if (impact.amount >= 4) impact.class = ImpactAmountMap[ImpactAmount.moderatelyNegative];
      else if (impact.amount >= 2) impact.class = ImpactAmountMap[ImpactAmount.somewhatNegative];
      else impact.class = ImpactAmountMap[ImpactAmount.neutral];
    }

    this.results$.next(
      new Results({
        ghgReducedKt,
        ghgReductionPercentage,
        ghgReductionColor: ghgReductionPercentage >= 100 ? 'accent' : 'warn',
        ghgTax,
        ghgIncome,
        energySavedColor: energySavedPercentage >= 100 ? 'accent' : 'warn',
        energySavedGwh,
        energySavedPercentage,
        reAddedGwh,
        reAddedPercentage,
        renewableEnergyAddedColor: reAddedPercentage >= 100 ? 'accent' : 'warn',
        totalCost,
        totalImpact,
      })
    )
  }

  getTotalAmount(selectedVariants: Variant[], targetType: TargetType) {
    return selectedVariants
      .flatMap(v => v.targets.filter(t => t.type === targetType).map(t => t.amount))
      .reduce((a, b) => a + b, 0);
  }
}
