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
}

export enum PolicyLevel {
  local,
  provincial,
  regional,
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
