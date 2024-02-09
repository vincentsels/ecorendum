import { ContextType } from "../context/context.service";
import { ProposalDetail } from "./proposal-details";

export class Proposal {
  constructor(props: Partial<Proposal> = {}) {
    Object.assign(this, props);
    this.variants = props.variants?.map(v => {
      const variant = new Variant(v);
      variant.proposal = this;
      return variant;
    }) || [];
  }

  id: number = 0;
  policyLevel: PolicyLevel = PolicyLevel.unknown;
  variants: Variant[] = [];
  sector: Sector = Sector.unknown;
  committed: boolean = false;
  ets: boolean = false;
  origin: ProposalOrigin = ProposalOrigin.unknown;
  slugNl: string = '';
  slugEn: string = '';
  slugFr: string = '';

  pictureThumb?: string;
  icon?: string;

  selected: boolean = false;
  selectedAmbitionLevel: number = 0;

  hasKnownSector = () => this.sector && ![Sector.other, Sector.unknown, Sector.general].includes(this.sector);

  getSectorIcon = () => SectorMap[this.sector || Sector.other];
  getSelectedVariant = () => (this.variants || []).find(v => v.selected);

  getSingleOrMinCost() {
    return this.variants[0].getTotalCost();
  }

  getSelectedCost() {
    return this.getSelectedVariant()?.getTotalCost() || 0;
  }

  getMaxCost(ignore: boolean) {
    if (ignore) return 0;
    if (this.variants.length === 1) return 0;
    return this.variants[this.variants.length - 1].getTotalCost();
  }

  getSingleOrMinTargetAmount(targetType: TargetType, context: ContextType) {
    return this.variants[0].getTargetAmount(targetType, context);
  }

  getSelectedTargetAmount(targetType: TargetType, context: ContextType) {
    return this.getSelectedVariant()?.getTargetAmount(targetType, context) || 0;
  }

  getMaxTargetAmount(targetType: TargetType, ignore: boolean, context: ContextType) {
    if (ignore) return 0;
    if (this.variants.length === 1) return 0;
    return this.variants[this.variants.length - 1].getTargetAmount(targetType, context);
  }

  // getSlugTextInLanguage(lang: LanguageType): string {
  //   let slug = this.slug.find(s => s.lang === lang);
  //   if (!slug) slug = this.slug.find(s => s.lang === 'en');
  //   if (!slug) slug = this.slug[0];

  //   return slug.text;
  // }

  serialize(includeDetails: boolean) {
    const clone = new Proposal(this);
    if (!includeDetails) {
      const details = clone as any;
      delete details.partyOpinions;
      delete details.linksToMediaArticles;
      delete details.linksToPapers;
      delete details.linksToExplainers;
      delete details.linksToDebates;
      delete details.linksToExamplesAbroad;
      delete details.faqs;
    }

    clone.variants.forEach(v => v.proposal = undefined);
    return JSON.stringify(clone);
  }
}

export enum ProposalOrigin {
  general = 0,
  federalGovernment = 1,
  flemishGovernment = 2,
  brusselianGovernment = 3,
  wallonianGovernment = 4,
  veka = 5,
  unknown = 99,
}

export enum PolicyLevel {
  unknown = 0,
  local = 1,
  provincial = 2,
  flemish = 3,
  wallonian = 4,
  brusselian = 5,
  federal = 6,
}

export enum Sector {
  unknown = 0,
  transport = 1,
  buildings = 2,
  agriculture = 3,
  industry = 4,
  wasteManagement = 5,
  electricityProduction = 6,
  general = 10,
  other = 11,
}

export const SectorMap = {
  [Sector.unknown]: 'question_mark',
  [Sector.transport]: 'commute',
  [Sector.buildings]: 'location_city',
  [Sector.agriculture]: 'agriculture',
  [Sector.industry]: 'factory',
  [Sector.wasteManagement]: 'delete',
  [Sector.electricityProduction]: 'bolt',
  [Sector.general]: 'open_with',
  [Sector.other]: 'open_with',
}

export class Variant {
  constructor(props: Partial<Variant> = {}) {
    Object.assign(this, props);
    this.targets = props?.targets?.map(t => new Target(t)) || [];
    this.regionalTargets = props?.regionalTargets ? {
      flanders: props?.regionalTargets?.flanders,
      brussels: props?.regionalTargets?.brussels,
      wallonia: props?.regionalTargets?.wallonia,
    } : undefined;
    this.impacts = props?.impacts?.map(i => new Impact(i.domain, i.amount)) || [];
  }

  ambitionLevel: number = 1;
  costInitial: Cost = new Cost();
  costPerYearFixed: Cost = new Cost();
  costPerYearVariable?: { [year: number]: Cost };

  targets: Target[] = [];
  regionalTargets?: { [region in ContextType]: Target[] };

  impacts: Impact[] = [];

  selected: boolean = false;

  /** Reference the parent proposal. Should be set manually after creating a new variant. Should be set to undefined before serializing. */
  proposal?: Proposal;

  getTargetAmount(type: TargetType, context: ContextType) {
    if (this.regionalTargets && this.regionalTargets[context]) {
      return this.regionalTargets[context].find(t => t.type === type)?.amount || 0;
    }

    return this.targets.find(t => t.type === type)?.amount || 0;
  }

  getTotalCost() {
    const remainingYears = 2030 - new Date().getFullYear();
    const yearlyCostFixed = this.costPerYearFixed.multiply(remainingYears);

    const yearlyCostVariable = Object.values(this.costPerYearVariable || {}).reduce((a, b) => a.add(b), new Cost()) || new Cost();

    const totalCost = new Cost(this.costInitial).add(yearlyCostFixed).add(yearlyCostVariable);

    return totalCost;
  };
}

export class Cost {
  constructor (props: number | Partial<Cost> = {}, max?: number) {
    if (max && typeof props === 'number') {
      this.min = props;
      this.max = max;
    } else if (typeof props === 'number') {
      this.estimate = props;
    } else {
      Object.assign(this, props);
    }
  }

  min?: number;
  max?: number;
  estimate?: number;

  add(other: Cost | number) {
    return new Cost({
      min: (this.min || this.estimate || 0) + (typeof other === 'number' ? other : (other.min || other.estimate || 0)),
      max: (this.max || this.estimate || 0) + (typeof other === 'number' ? other : (other.max || other.estimate || 0)),
    });
  }

  multiply(amt: number) {
    return new Cost({
      min: ((this.min || this.estimate || 0) * amt),
      max: ((this.max || this.estimate || 0) * amt),
    });
  }

  avg = () => this.estimate || ((this.max! + this.min!) / 2);
  isPositive = () => this.avg() >= 0;
  isNegative = () => this.avg() < 0;
  any = () => this.min || this.max || this.estimate;
}

export class Target {
  constructor(props: Partial<Target> = {}) {
    Object.assign(this, props);
  }

  type?: TargetType;
  amount: number = 0;
}

export enum TargetType {
  none = 0,
  /**
   * CO2e-reduction in kilotons by target date.
   */
  ghgReduction = 1,
  /**
   * Reduction of energy consumption in GWh by target date.
   */
  energyEfficiency = 2,
  /**
   * Increase in production of renewable energy in GWh by target date.
   */
  renewableEnergy = 3,
}

export class Impact {
  constructor(public domain: ImpactDomain, public amount: ImpactAmount) {}

  getImpactDomainIcon = () => ImpactDomainMap[this.domain];
  getImpactAmountClass = () => ImpactAmountMap[this.amount];
}

export enum ImpactDomain {
  unknown = 0,
  biodiversityLoss = 1,
  nitrogenPollution = 2,
  phosphorusPollution = 3,
  oceanAcidification = 4,
  luLuCf = 5,
  waterConsumption = 6,
  ozoneDepletion = 7,
  aerosols = 8,
  chemicalPollution = 9,
  redistributionLocal = 10,
  redistributionGlobal = 11,
  humanRightsLocal = 12,
  humanRightsGlobal = 13,
}

export const ImpactDomainMap = {
  [ImpactDomain.unknown]: 'question_mark',
  [ImpactDomain.biodiversityLoss]: 'grass',
  [ImpactDomain.nitrogenPollution]: 'cloud_queue',
  [ImpactDomain.phosphorusPollution]: 'cloud_queue',
  [ImpactDomain.oceanAcidification]: 'waves',
  [ImpactDomain.luLuCf]: 'forest',
  [ImpactDomain.waterConsumption]: 'water_drop',
  [ImpactDomain.ozoneDepletion]: 'public',
  [ImpactDomain.aerosols]: 'ac_unit',
  [ImpactDomain.chemicalPollution]: 'science',
  [ImpactDomain.redistributionLocal]: 'balance',
  [ImpactDomain.redistributionGlobal]: 'public',
  [ImpactDomain.humanRightsLocal]: 'volunteer_activism',
  [ImpactDomain.humanRightsGlobal]: 'volunteer_activism',
}

/**
 * Subtract -5 to get weighed amount.
 */
export enum ImpactAmount {
  extremelyPositive = 1,
  veryPositive = 2,
  moderatelyPositive = 3,
  somewhatPositive = 4,
  neutral = 5,
  somewhatNegative = 6,
  moderatelyNegative = 7,
  veryNegative = 8,
  extremelyNegative = 9,
}

export const ImpactAmountMap = {
  [ImpactAmount.extremelyPositive]: 'impact-extremely-positive',
  [ImpactAmount.veryPositive]: 'impact-very-positive',
  [ImpactAmount.moderatelyPositive]: 'impact-moderately-positive',
  [ImpactAmount.somewhatPositive]: 'impact-somewhat-positive',
  [ImpactAmount.neutral]: 'impact-neutral',
  [ImpactAmount.somewhatNegative]: 'impact-somewhat-negative',
  [ImpactAmount.moderatelyNegative]: 'impact-moderately-negative',
  [ImpactAmount.veryNegative]: 'impact-very-negative',
  [ImpactAmount.extremelyNegative]: 'impact-extremely-negative',
}

export class TranslatedText {
  constructor(public lang: LanguageType, public text: string) {}
}

export type LanguageType = 'en' | 'nl' | 'fr';

export type SelectedProposalType = {
  id: number,
  variant: number,
};

export type ProposalSet = SelectedProposalType[];
