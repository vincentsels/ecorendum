import { Cost, ImpactAmount, ImpactAmountMap, ImpactDomain, ImpactDomainMap, Sector } from '../proposals/proposal';

export class Results {
  constructor(
    public legalGhgTarget: TargetResult,
    public euGhgTarget: TargetResult,
    public euEeTarget: TargetResult,
    public euReTarget: TargetResult,
    public sectorEmissionsResults: SectorEmissionsResults,
    public totalMeasurementCost: Cost,
    public totalEuGhgTax: number,
    public totalLegalPenalty: number,
    public totalCostIncludingTax: Cost,
    public allLocalImpact: ImpactItem[],
    public allGlobalImpact: ImpactItem[],
    public localEnvironmentalImpact: ImpactItem[],
    public localJusticeImpact: ImpactItem[],
    public globalEnvironmentalImpact: ImpactItem[],
    public globalJusticeImpact: ImpactItem[],
    public image?: string,
    ) {
      this.localEnvironmentalImpact = localEnvironmentalImpact || [];
      this.localJusticeImpact = localJusticeImpact || [];
      this.globalEnvironmentalImpact = globalEnvironmentalImpact || [];
      this.globalJusticeImpact = globalJusticeImpact || [];
    }

  // legalGhgTarget = new TargetResult(Results.legalTargetGapGhgKt, 'kt', Results.pricePerKtGhg);

  // euGhgTarget = new TargetResult(Results.euTargetGapGhgKt, 'kt', Results.pricePerKtGhg);
  // euEeTarget = new TargetResult(Results.euTargetGapEeGwh, 'Gwh');
  // euReTarget = new TargetResult(Results.euTargetGapReGwh, 'Gwh');
}

export class TargetResult {
  constructor(
    public target: number = 0,
    public unit: string = 'Gwh',
    public pricePerUnit: number = 0,
    public total: number = 0,
    public color: string = 'warn',
    public percentage: number = 0
  ) {}

  public toString = () => this.total + '/' + this.target + ' ' + this.unit + ' (' + this.percentage + '%)';
}

export class SectorEmissionsResults {
  constructor(
    public sectors: SectorEmissionsResult[],
    public max: number,
  ) {
  }
}

export class SectorEmissionsResult {
  constructor(
    public sector: Sector,
    public sectorIcon: string,
    public reducedEmissions: number,
    public currentEmissions: number,
    public resultingEmissions: number,
    public colorClass: string,
    public percentageReduction: number,
    public percentageOfMax: number,
  ) {}
}

export class ImpactItem {
  constructor(
    public domain: ImpactDomain,
    public amount: number,
    public cssClass: string = ImpactAmountMap[ImpactAmount.neutral]) {
  }

  getImpactDomainIcon = () => ImpactDomainMap[this.domain];
}
