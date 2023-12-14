import { ImpactAmount, ImpactAmountMap, ImpactDomain, ImpactDomainMap } from '../proposal';

export class Results {
  constructor(props: Partial<Results> = {}) {
    Object.assign(this, props);
  }

  static legalTargetGapGhgKt = 34300;

  static euTargetGapGhgKt = 27400;
  static euTargetGapEeGwh = 10000; // Estimation
  static euTargetGapReGwh = 5000; // Estimation

  static pricePerKtGhg = 100000;

  legalGhgTarget = new TargetResult(Results.legalTargetGapGhgKt, 'Kt', Results.pricePerKtGhg);

  euGhgTarget = new TargetResult(Results.euTargetGapGhgKt, 'Kt', Results.pricePerKtGhg);
  euEeTarget = new TargetResult(Results.euTargetGapEeGwh, 'Gwh');
  euReTarget = new TargetResult(Results.euTargetGapReGwh, 'Gwh');

  totalCost: number = 0;
  totalTax: number = 0;
  totalProfit: number = 0;
  totalCostIncludingTax: number = 0;
  totalProfitIncludingIncome: number = 0;

  totalImpact: TotalImpact[] = [];
}

export class TargetResult {
  constructor(public target: number = 0, public unit: string = 'Gwh', public pricePerUnit: number = 0, public total: number = 0,
    public color: string = 'warn', public percentage: number = 0, public tax: number = 0,
    public income: number = 0) {}
}

export class TotalImpact {
  constructor(public domain: ImpactDomain, public amount: number) {}

  class: string = ImpactAmountMap[ImpactAmount.neutral];

  getImpactDomainIcon = () => ImpactDomainMap[this.domain];
}
