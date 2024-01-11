import { ImpactAmount, ImpactAmountMap, ImpactDomain, ImpactDomainMap } from '../proposal';

export class Targets {
  constructor(props: Partial<Targets> = {}) {
    Object.assign(this, props);
  }

  legalTargetGapGhgKt = 34300;

  euTargetGapGhgKt = 27400;
  euTargetGapEeGwh = 10000; // Estimation
  euTargetGapReGwh = 5000; // Estimation

  pricePerKtGhg = 100000;

  moneyImageMap = [
    { threshold: 17000000000, image: './assets/img/putin/7_putin_crying.jpg' },
    { threshold: 20000000000, image: './assets/img/putin/6_putin_sad.jpg' },
    { threshold: 25000000000, image: './assets/img/putin/5_putin_not_amused.jpg' },
    { threshold: 30000000000, image: './assets/img/putin/4_putin_worried.jpg' },
    { threshold: 35000000000, image: './assets/img/putin/3_putin_smile.jpg' },
    { threshold: 40000000000, image: './assets/img/putin/2_putin_big_smile.jpg' },
    { threshold: 99999999999999, image: './assets/img/putin/1_putin_toast.jpg' }
  ]

  legalGhgTarget = new TargetResult(this.legalTargetGapGhgKt, 'Kt', this.pricePerKtGhg);

  euGhgTarget = new TargetResult(this.euTargetGapGhgKt, 'Kt', this.pricePerKtGhg);
  euEeTarget = new TargetResult(this.euTargetGapEeGwh, 'Gwh');
  euReTarget = new TargetResult(this.euTargetGapReGwh, 'Gwh');

  totalMeasurementCost: number = 0;
  totalEuGhgTax: number = 0;
  totalCostIncludingTax: number = 0;

  totalImpact: TotalImpact[] = [];

  image: string = '';
}

export class TargetResult {
  constructor(public target: number = 0, public unit: string = 'Gwh', public pricePerUnit: number = 0, public total: number = 0,
    public color: string = 'warn', public percentage: number = 0, public tax: number = 0,
    public income: number = 0) {}

  public toString = () => this.total + '/' + this.target + ' ' + this.unit + ' (' + this.percentage + '%)';
}

export class TotalImpact {
  constructor(public domain: ImpactDomain, public amount: number) {}

  class: string = ImpactAmountMap[ImpactAmount.neutral];

  getImpactDomainIcon = () => ImpactDomainMap[this.domain];
}