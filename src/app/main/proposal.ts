export class Proposal {
  constructor(props: Partial<Proposal> = {}) {
    Object.assign(this, props);
  }

  title: TranslatedText[] = [];
  slug: TranslatedText[] = [];
  summary: TranslatedText[] = [];
  description: TranslatedText[] = [];
  policyLevel?: PolicyLevel;
  variants: Variant[] = [];
  sector?: Sector;

  selected: boolean = false;

  getSectorIcon = () => SectorMap[this.sector || Sector.other]
}

export enum PolicyLevel {
  local,
  provincial,
  flemish,
  walonian,
  brussels,
  federal,
}

export enum Sector {
  transport,
  buildings,
  agriculture,
  industry,
  wasteManagement,
  general,
  other
}

export const SectorMap = {
  [Sector.transport]: 'commute',
  [Sector.buildings]: 'location_city',
  [Sector.agriculture]: 'agriculture',
  [Sector.industry]: 'factory',
  [Sector.wasteManagement]: 'delete',
  [Sector.general]: 'open_with',
  [Sector.other]: 'open_with',
}

export class Variant {
  constructor(props: Partial<Variant> = {}) {
    Object.assign(this, props);
  }

  ambitionLevel: number = 1;
  description: TranslatedText[] = [];
  targets: Target[] = [];
  costInitial: number = 0;
  costPerYear?: { [year: number]: number } | number;
  impacts: Impact[] = [];

  selected: boolean = false;

  getTargetAmount = (type: TargetType) => this.targets.find(t => t.type === type)?.amount;
  getTotalCost = () => this.costInitial + (Object.values(this.costPerYear || {}).reduce((a, b) => a + b, 0) || 0);
}

export class Target {
  constructor(props: Partial<Target> = {}) {
    Object.assign(this, props);
  }

  type?: TargetType;
  year?: number;
  amount: number = 0;
}

export enum TargetType {
  /**
   * CO2e-reduction in kilotons by target date.
   */
  ghgReduction,
  /**
   * Reduction of energy consumption in GWh by target date.
   */
  energyEfficiency,
  /**
   * Increase in production of renewable energy in GWh by target date.
   */
  renewableEnergy,
}

export class Impact {
  constructor(public domain: ImpactDomain, public amount: ImpactAmount) {}
}

export enum ImpactDomain {
  biodiversityLoss,
  nitrogenPollution,
  phosphorusPollution,
  oceanAcidification,
  luLuCf,
  waterConsumption,
  ozoneDepletion,
  aerosols,
  chemicalPollution,
  redistributionLocal,
  redistributionGlobal,
  humanRightsLocal,
  humanRightsGlobal,
}

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

export class TranslatedText {
  constructor(public lang: LanguageType, public text: string) {}
}

export type LanguageType = 'en' | 'nl' | 'fr';
