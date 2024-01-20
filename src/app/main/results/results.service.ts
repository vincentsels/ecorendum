import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ImpactAmount, ImpactAmountMap, TargetType, Variant } from '../proposals/proposal';
import { Results, TargetResult, TotalImpact } from './results';
import { TargetsService } from '../targets/targets.service';
import { ParametersService } from '../parameters/parameters.service';
import { ProposalService } from '../proposals/proposal.service';
import { ProposalDetail } from '../proposals/proposal-details';

@Injectable()
export class ResultsService {
  results$: BehaviorSubject<Results>;

  constructor(private proposalService: ProposalService,
    private targetsService: TargetsService,
    private parametersService: ParametersService) {
    this.results$ = new BehaviorSubject<Results>(this.calculateResults());

    this.updateResults();

    // TODO: combine all/latest or something
    this.proposalService.activeProposals$.subscribe(() => this.updateResults());
    this.targetsService.targets$.subscribe(() => this.updateResults());
  }

  updateResults() {
    const results = this.calculateResults();

    this.results$.next(results);
  }

  calculateResults(forProposals?: ProposalDetail[]): Results {
    const proposals = forProposals || this.proposalService.activeProposals$.value;
    const targets = this.targetsService.targets$.value;
    const parameters = this.parametersService.parameters$.value;

    const selectedVariants = proposals.filter(p => p.selected).flatMap(p => p.variants).filter(v => v.selected);

    const legalGhgReducedKt = this.getTotalAmount(selectedVariants, TargetType.ghgReduction, true);

    const legalGhgReductionPercentage = legalGhgReducedKt / targets.legalTargetGapGhgKt * 100;
    const legalGhgTax = (targets.legalTargetGapGhgKt - legalGhgReducedKt) * parameters.pricePerKtGhg;
    const legalGhgIncome = (targets.legalTargetGapGhgKt - legalGhgReducedKt) * -parameters.pricePerKtGhg;
    const legalGhgReductionColor = legalGhgReductionPercentage >= 100 ? 'accent' : 'warn';

    const legalGhgTarget = new TargetResult(targets.legalTargetGapGhgKt, 'Kt', parameters.pricePerKtGhg, legalGhgReducedKt,
      legalGhgReductionColor, legalGhgReductionPercentage, legalGhgTax, legalGhgIncome);

    const euGhgReducedKt = this.getTotalAmount(selectedVariants, TargetType.ghgReduction, false);

    const euGhgReductionPercentage = euGhgReducedKt / targets.euTargetGapGhgKt * 100;
    const euGhgTax = (targets.euTargetGapGhgKt - euGhgReducedKt) * parameters.pricePerKtGhg;
    const euGhgIncome = (targets.euTargetGapGhgKt - euGhgReducedKt) * -parameters.pricePerKtGhg;
    const euGhgReductionColor = euGhgReductionPercentage >= 100 ? 'accent' : 'warn';

    const euGhgTarget = new TargetResult(targets.euTargetGapGhgKt, 'Kt', parameters.pricePerKtGhg, euGhgReducedKt,
      euGhgReductionColor, euGhgReductionPercentage, euGhgTax, euGhgIncome);

    const energySavedGwh = this.getTotalAmount(selectedVariants, TargetType.energyEfficiency, false);
    const energySavedPercentage = energySavedGwh / targets.euTargetGapEeGwh * 100;
    const energySavedColor = energySavedPercentage >= 100 ? 'accent' : 'warn';

    const euEeTarget = new TargetResult(targets.euTargetGapEeGwh, 'GWh', 0, energySavedGwh,
      energySavedColor, energySavedPercentage);

    const reAddedGwh = this.getTotalAmount(selectedVariants, TargetType.renewableEnergy, false);
    const reAddedPercentage = reAddedGwh / targets.euTargetGapReGwh * 100;
    const renewableEnergyAddedColor = reAddedPercentage >= 100 ? 'accent' : 'warn';

    const euReTarget = new TargetResult(targets.euTargetGapReGwh, 'GWh', 0, reAddedGwh,
      renewableEnergyAddedColor, reAddedPercentage);

    const totalMeasurementCost = selectedVariants.map(v => v.getTotalCost()).reduce((a, b) => a + b, 0);
    const totalEuGhgTax = euGhgTax;
    const totalLegalPenalty = legalGhgReductionPercentage >= 100 ? 0 : 5 * parameters.annualLegalPenalty;
    const totalCostIncludingTax = totalMeasurementCost + totalEuGhgTax + totalLegalPenalty;

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

    //let image = '';
    //for (let threshold of Results.moneyImageMap) {
    //  if (totalMoneyToRussia <= threshold.threshold) {
    //    image = threshold.image;
    //    break;
    //  }
    //}

    return new Results(
      legalGhgTarget,
      euGhgTarget,
      euEeTarget,
      euReTarget,
      totalMeasurementCost,
      totalEuGhgTax,
      totalLegalPenalty,
      totalCostIncludingTax,
      totalImpact,
    );
  }

  private getTotalAmount(selectedVariants: Variant[], targetType: TargetType, includeEts: boolean) {
    return selectedVariants
      .filter(v => includeEts || v.proposal?.ets === false)
      .flatMap(v => v.targets.filter(t => t.type === targetType).map(t => t.amount))
      .reduce((a, b) => a + b, 0);
  }
}
