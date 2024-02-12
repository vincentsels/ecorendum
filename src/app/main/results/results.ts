import { Cost, ImpactAmount, ImpactAmountMap, ImpactDomain, ImpactDomainMap } from '../proposals/proposal';

export class Results {
  constructor(
    public legalGhgTarget: TargetResult,
    public euGhgTarget: TargetResult,
    public euEeTarget: TargetResult,
    public euReTarget: TargetResult,
    public totalMeasurementCost: Cost,
    public totalEuGhgTax: number,
    public totalLegalPenalty: number,
    public totalCostIncludingTax: Cost,
    public localEnvironmentalImpact: TotalImpact[],
    public localRedistributiveImpact: TotalImpact[],
    public globalEnvironmentalImpact: TotalImpact[],
    public globalRedistributiveImpact: TotalImpact[],
    public image?: string,
    ) {
      this.localEnvironmentalImpact = localEnvironmentalImpact || [];
      this.localRedistributiveImpact = localRedistributiveImpact || [];
      this.globalEnvironmentalImpact = globalEnvironmentalImpact || [];
      this.globalRedistributiveImpact = globalRedistributiveImpact || [];
    }

  // legalGhgTarget = new TargetResult(Results.legalTargetGapGhgKt, 'Kt', Results.pricePerKtGhg);

  // euGhgTarget = new TargetResult(Results.euTargetGapGhgKt, 'Kt', Results.pricePerKtGhg);
  // euEeTarget = new TargetResult(Results.euTargetGapEeGwh, 'Gwh');
  // euReTarget = new TargetResult(Results.euTargetGapReGwh, 'Gwh');
}

export class TargetResult {
  constructor(public target: number = 0, public unit: string = 'Gwh', public pricePerUnit: number = 0, public total: number = 0,
    public color: string = 'warn', public percentage: number = 0) {}

  public toString = () => this.total + '/' + this.target + ' ' + this.unit + ' (' + this.percentage + '%)';
}

export class TotalImpact {
  constructor(public domain: ImpactDomain, public amount: number) {}

  class: string = ImpactAmountMap[ImpactAmount.neutral];

  getImpactDomainIcon = () => ImpactDomainMap[this.domain];
}
