import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { PROPOSALS } from './dummyProposals';
import { Impact, ImpactAmount, ImpactAmountMap, ImpactDomain, Proposal, TargetType, Variant } from './proposal';
import { Results, TargetResult, TotalImpact } from './results/results';

const LS_KEY_SELECTED_VARIANTS = 'ecorendum.selection';

@Injectable()
export class ProposalService {
  proposals: Proposal[] = [];
  results$ = new BehaviorSubject<Results>(new Results());

  constructor() {
    this.proposals = PROPOSALS;

    const selectedVariantNumbers = JSON.parse(localStorage.getItem(LS_KEY_SELECTED_VARIANTS) || '[]');
    for (let selectedVariantNumber of selectedVariantNumbers) {
      const selectedProposal = this.proposals.find(p => p.id === selectedVariantNumber.id);
      if (selectedProposal) {
        const selectedVariant = selectedProposal.variants.find(v => v.ambitionLevel === selectedVariantNumber.selectedVariant);
        if (selectedVariant) {
          selectedProposal.selected = true;
          selectedVariant.selected = true;
        }
      }
    }

    this.updateResults();
  }

  updateResults() {
    if (!this.proposals || this.proposals.length === 0) return;

    const selectedVariantNumbers = this.proposals
      .map(p => ({ id: p.id, selectedVariant: p.variants.find(v => v.selected)?.ambitionLevel }))
      .filter(s => s.selectedVariant);
    localStorage.setItem(LS_KEY_SELECTED_VARIANTS, JSON.stringify(selectedVariantNumbers));

    const selectedVariants = this.proposals.filter(p => p.selected).flatMap(p => p.variants).filter(v => v.selected);

    const ghgReducedKt = this.getTotalAmount(selectedVariants, TargetType.ghgReduction);
    const ghgReductionPercentage = ghgReducedKt / Results.ghgGapCumulativeKt * 100;
    const ghgTax = (Results.ghgGapCumulativeKt - ghgReducedKt) * Results.pricePerKtGhg;
    const ghgIncome = (Results.ghgGapCumulativeKt - ghgReducedKt) * -Results.pricePerKtGhg;
    const ghgReductionColor = ghgReductionPercentage >= 100 ? 'accent' : 'warn';

    const ghgTarget = new TargetResult(Results.ghgGapCumulativeKt, 'Kt', Results.pricePerKtGhg, ghgReducedKt,
      ghgReductionColor, ghgReductionPercentage, ghgTax, ghgIncome);

    const energySavedGwh = this.getTotalAmount(selectedVariants, TargetType.energyEfficiency);
    const energySavedPercentage = energySavedGwh / Results.eeGapTargetGwh * 100;
    const energySavedColor = energySavedPercentage >= 100 ? 'accent' : 'warn';

    const eeTarget = new TargetResult(Results.eeGapTargetGwh, 'GWh', 0, energySavedGwh,
      energySavedColor, energySavedPercentage);

    const reAddedGwh = this.getTotalAmount(selectedVariants, TargetType.renewableEnergy);
    const reAddedPercentage = reAddedGwh / Results.reGapTargetGwh * 100;
    const renewableEnergyAddedColor = reAddedPercentage >= 100 ? 'accent' : 'warn';

    const reTarget = new TargetResult(Results.reGapTargetGwh, 'GWh', 0, reAddedGwh,
      renewableEnergyAddedColor, reAddedPercentage);

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

    totalImpact.sort((a, b) => b.amount - a.amount);

    this.results$.next(
      new Results({
        ghgTarget,
        eeTarget,
        reTarget,
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
