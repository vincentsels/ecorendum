import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Cost, ImpactAmount, ImpactAmountMap, ImpactDomain, ImpactDomainType, ImpactDomainTypeMap, PolicyLevel, Sector, SectorMap, TargetType, Variant } from '../proposals/proposal';
import { Results, SectorEmissionsResult, SectorEmissionsResults, TargetResult, TotalImpact } from './results';
import { TargetsService } from '../targets/targets.service';
import { ParametersService } from '../parameters/parameters.service';
import { ProposalService } from '../proposals/proposal.service';
import { ProposalDetail } from '../proposals/proposal-details';
import { ContextType, ContextService } from '../context/context.service';
import { SectorEmissions } from '../targets/targets';

@Injectable()
export class ResultsService {
  results$: BehaviorSubject<Results>;

  constructor(private proposalService: ProposalService,
    private contextService: ContextService,
    private targetsService: TargetsService,
    private parametersService: ParametersService) {
    this.results$ = new BehaviorSubject<Results>(this.calculateResults());

    this.updateResults();

    // TODO: combine all/latest or something
    this.proposalService.activeProposals$.subscribe(() => this.updateResults());
    this.targetsService.targets$.subscribe(() => this.updateResults());
    this.parametersService.parameters$.subscribe(() => this.updateResults());
  }

  updateResults() {
    const results = this.calculateResults();

    this.results$.next(results);
  }

  calculateResults(forProposals?: ProposalDetail[]): Results {
    const proposals = forProposals || this.proposalService.activeProposals$.value;
    const targets = this.targetsService.targets$.value;
    const sectorEmissions = this.targetsService.sectorEmissions$.value;
    const parameters = this.parametersService.parameters$.value;
    const context = this.contextService.context$.value;

    const selectedVariants = proposals.filter(p => p.selected).flatMap(p => p.variants).filter(v => v.selected);

    const legalGhgReducedKt = this.calculateTotalAmount(selectedVariants, TargetType.ghgReduction, true, context);

    const legalGhgReductionPercentage = legalGhgReducedKt / targets.legalTargetGapGhgKt * 100;
    const legalGhgReductionColor = legalGhgReductionPercentage >= 100 ? 'accent' : 'warn';

    const legalGhgTarget = new TargetResult(targets.legalTargetGapGhgKt, 'kt', parameters.pricePerTonGhg * 1000, legalGhgReducedKt,
      legalGhgReductionColor, legalGhgReductionPercentage);

    const euGhgReducedKt = this.calculateTotalAmount(selectedVariants, TargetType.ghgReduction, false, context);

    const euGhgReductionPercentage = euGhgReducedKt / targets.euTargetGapGhgKt * 100;
    const euGhgTax = (targets.euTargetGapGhgKt - euGhgReducedKt) * parameters.pricePerTonGhg * 1000 * parameters.emissionGapMultiplier;
    const euGhgReductionColor = euGhgReductionPercentage >= 100 ? 'accent' : 'warn';

    const euGhgTarget = new TargetResult(targets.euTargetGapGhgKt, 'kt', parameters.pricePerTonGhg * 1000, euGhgReducedKt,
      euGhgReductionColor, euGhgReductionPercentage);

    const energySavedGwh = this.calculateTotalAmount(selectedVariants, TargetType.energyEfficiency, false, context);
    const energySavedPercentage = energySavedGwh / targets.euTargetGapEeGwh * 100;
    const energySavedColor = energySavedPercentage >= 100 ? 'accent' : 'warn';

    const euEeTarget = new TargetResult(targets.euTargetGapEeGwh, 'GWh', 0, energySavedGwh,
      energySavedColor, energySavedPercentage);

    const reAddedGwh = this.calculateTotalAmount(selectedVariants, TargetType.renewableEnergy, false, context);
    const reAddedPercentage = reAddedGwh / targets.euTargetGapReGwh * 100;
    const renewableEnergyAddedColor = reAddedPercentage >= 100 ? 'accent' : 'warn';

    const euReTarget = new TargetResult(targets.euTargetGapReGwh, 'GWh', 0, reAddedGwh,
      renewableEnergyAddedColor, reAddedPercentage);

    const totalMeasurementCost = selectedVariants.map(v => v.getTotalCost()).reduce((a, b) => a.add(b), new Cost());
    const totalEuGhgTax = euGhgTax;
    const totalLegalPenalty = legalGhgReductionPercentage >= 100 ? 0 : parameters.monthlyLegalPenalty * 12 * 5;
    const totalCostIncludingTax = totalMeasurementCost.add(totalEuGhgTax).add(totalLegalPenalty);

    const sectorEmissionsResults = this.calculateSectorEmissions(selectedVariants, sectorEmissions, context);

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

    const localEnvironmentalImpact = this.getImpactForDomainType(totalImpact, ImpactDomainType.localEnvironmental);
    const localJusticeImpact = this.getImpactForDomainType(totalImpact, ImpactDomainType.localJustice);
    const globalEnvironmentalImpact = this.getImpactForDomainType(totalImpact, ImpactDomainType.globalEnvironmental);
    const globalJusticeImpact = this.getImpactForDomainType(totalImpact, ImpactDomainType.globalJustice);

    const allLocalImpact = [...localEnvironmentalImpact, ...localJusticeImpact].sort((a, b) => b.amount - a.amount);
    const allGlobalImpact = [...localEnvironmentalImpact, ...localJusticeImpact].sort((a, b) => b.amount - a.amount);

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
      sectorEmissionsResults,
      totalMeasurementCost,
      totalEuGhgTax,
      totalLegalPenalty,
      totalCostIncludingTax,
      allLocalImpact,
      allGlobalImpact,
      localEnvironmentalImpact,
      localJusticeImpact,
      globalEnvironmentalImpact,
      globalJusticeImpact,
    );
  }

  private getImpactForDomainType = (totalImpact: TotalImpact[], domainType: ImpactDomainType) => totalImpact.filter(i => ImpactDomainTypeMap[i.domain] === domainType)

  private calculateTotalAmount(selectedVariants: Variant[], targetType: TargetType, includeEts: boolean, context: ContextType) {
    const amount = selectedVariants
      .filter(v => includeEts || v.proposal?.ets === false)
      .flatMap(v => v.getTargetAmount(targetType, context))
      .reduce((a, b) => a + b, 0);

    return amount;
  }

  private calculateSectorEmissions(selectedVariants: Variant[], sectorEmissions: SectorEmissions[], context: ContextType) {
    const maxSectorEmissions = Math.max(...sectorEmissions.map(e => e.emissions));

    const results = sectorEmissions.map((se) => {
        const totalReduction = this.getReductionForSector(selectedVariants, se.sector, context);
        const percentageReduction = Math.round(100 - (totalReduction / se.emissions * 100));
        const percentageOfMax = Math.round(se.emissions / maxSectorEmissions * 100);
        const resultingEmissions = se.emissions - totalReduction;
        const icon = SectorMap[se.sector || Sector.other];

        return new SectorEmissionsResult(se.sector, icon, -totalReduction, se.emissions, resultingEmissions, 'primary',
          percentageReduction, percentageOfMax)
      }
    );

    return new SectorEmissionsResults(results, maxSectorEmissions);
  }

  private getReductionForSector(selectedVariants: Variant[], sector: Sector, context: ContextType) {
    return selectedVariants
      .reduce((t, v) => {
        return t + v.getTargetAmount(TargetType.ghgReduction, context, sector);
      }, 0);
  }
}
