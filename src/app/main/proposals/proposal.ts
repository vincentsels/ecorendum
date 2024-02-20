import { ContextType } from "../context/context.service";
import { ImpactItem } from "../results/results";
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
    return this.getSelectedVariant()?.getTotalCost() || undefined;
  }

  getMaxCost(ignore: boolean) {
    if (ignore) return undefined;
    if (this.variants.length === 1) return undefined;
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
  brusselsGovernment = 3,
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
  brussels = 5,
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

  getTargetAmount(type: TargetType, context: ContextType, sector?: Sector) {
    let targets = this.regionalTargets?.[context] || this.targets;

    return targets
      .filter(t => t.type === type && (sector === undefined || (t.sector || this.proposal!.sector) === sector))
      .reduce((t, a) => t + a.amount, 0);
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

  getMin = () => this.estimate || this.min || 0;
  getMax = () => this.estimate || this.max || 0;
  getAvg = () => this.estimate || ((this.max! + this.min!) / 2);
  isPositive = () => this.getAvg() >= 0;
  isNegative = () => this.getAvg() < 0;
  isNull = () => !this.isNotNull();
  isNotNull = () => this.min || this.max || this.estimate;
}

export class Target {
  constructor(props: Partial<Target> = {}) {
    Object.assign(this, props);
  }

  /** Optional. Leave blank for 'main sector' targets; or fill in for additional or multi-sector targets */
  sector?: Sector;
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
  getImpactDomainType = () => ImpactDomainTypeMap[this.domain];

  toImpactItem = () => new ImpactItem(this.domain, this.amount - 5, ImpactAmountMap[this.amount]);
}

export enum ImpactDomain {
  unknown = 0,
  localBiodiversityLoss = 1,
  localNitrogenPollution = 2,
  localPhosphorusPollution = 3,
  localWaterConsumption = 4,
  localWaterPollution = 5,
  localAirPollution = 6,
  localLandSystemChange = 7,
  localRedistribution = 10,
  localAnimalRights = 11,
  globalBiodiversityLoss = 20,
  globalNitrogenPollution = 21,
  globalPhosphorusPollution = 22,
  globalNovelEntities = 23,
  globalAerosolLoading = 24,
  globalOceanAcidification = 25,
  globalFreshwaterChange = 26,
  globalLandSystemChange = 27,
  globalRedistribution = 30,
  globalHumanRights = 31,
  globalAnimalRights = 32,
}

export enum ImpactDomainType {
  unknown = 0,
  localEnvironmental = 1,
  localJustice = 2,
  globalEnvironmental = 3,
  globalJustice = 4
}

export const ImpactDomainTypeMap = {
  [ImpactDomain.unknown]: ImpactDomainType.unknown,
  [ImpactDomain.localBiodiversityLoss]: ImpactDomainType.localEnvironmental,
  [ImpactDomain.localNitrogenPollution]: ImpactDomainType.localEnvironmental,
  [ImpactDomain.localPhosphorusPollution]: ImpactDomainType.localEnvironmental,
  [ImpactDomain.localWaterConsumption]: ImpactDomainType.localEnvironmental,
  [ImpactDomain.localWaterPollution]: ImpactDomainType.localEnvironmental,
  [ImpactDomain.localAirPollution]: ImpactDomainType.localEnvironmental,
  [ImpactDomain.localLandSystemChange]: ImpactDomainType.localEnvironmental,
  [ImpactDomain.localRedistribution]: ImpactDomainType.localJustice,
  [ImpactDomain.localAnimalRights]: ImpactDomainType.localJustice,
  [ImpactDomain.globalBiodiversityLoss]: ImpactDomainType.globalEnvironmental,
  [ImpactDomain.globalNitrogenPollution]: ImpactDomainType.globalEnvironmental,
  [ImpactDomain.globalPhosphorusPollution]: ImpactDomainType.globalEnvironmental,
  [ImpactDomain.globalNovelEntities]: ImpactDomainType.globalEnvironmental,
  [ImpactDomain.globalAerosolLoading]: ImpactDomainType.globalEnvironmental,
  [ImpactDomain.globalOceanAcidification]: ImpactDomainType.globalEnvironmental,
  [ImpactDomain.globalFreshwaterChange]: ImpactDomainType.globalEnvironmental,
  [ImpactDomain.globalLandSystemChange]: ImpactDomainType.globalEnvironmental,
  [ImpactDomain.globalRedistribution]: ImpactDomainType.globalJustice,
  [ImpactDomain.globalHumanRights]: ImpactDomainType.globalJustice,
  [ImpactDomain.globalAnimalRights]: ImpactDomainType.globalJustice,
}

export const ImpactDomainMap = {
  [ImpactDomain.unknown]: 'flaky',
  [ImpactDomain.localBiodiversityLoss]: 'emoji_nature',
  [ImpactDomain.localNitrogenPollution]: 'agriculture',
  [ImpactDomain.localPhosphorusPollution]: 'compost',
  [ImpactDomain.localWaterConsumption]: 'water_drop',
  [ImpactDomain.localWaterPollution]: 'oil_barrel',
  [ImpactDomain.localAirPollution]: 'factory',
  [ImpactDomain.localLandSystemChange]: 'carpenter',
  [ImpactDomain.localRedistribution]: 'balance',
  [ImpactDomain.localAnimalRights]: 'pets',
  [ImpactDomain.globalBiodiversityLoss]: 'emoji_nature',
  [ImpactDomain.globalNitrogenPollution]: 'agriculture',
  [ImpactDomain.globalPhosphorusPollution]: 'compost',
  [ImpactDomain.globalNovelEntities]: 'factory',
  [ImpactDomain.globalAerosolLoading]: 'masks',
  [ImpactDomain.globalOceanAcidification]: 'water',
  [ImpactDomain.globalFreshwaterChange]: 'water_drop',
  [ImpactDomain.globalLandSystemChange]: 'carpenter',
  [ImpactDomain.globalRedistribution]: 'balance',
  [ImpactDomain.globalHumanRights]: 'volunteer_activism',
  [ImpactDomain.globalAnimalRights]: 'pets',
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
