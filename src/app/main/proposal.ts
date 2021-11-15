export class Proposal {
  constructor(props: Partial<Proposal> = {}) {
    Object.assign(this, props);
  }

  title?: TranslatedText[];
  slug?: TranslatedText[];
  summary?: TranslatedText[];
  description?: TranslatedText[];
  policyLevel?: PolicyLevel;
  variants?: Variant[];

}

export enum PolicyLevel {
  local,
  province,
  region,
  federal,
}

export class Variant {
  constructor(props: Partial<Variant> = {}) {
    Object.assign(this, props);
  }

  description?: TranslatedText;
  co2reductionBy2030?: number;
  costOnce?: number;
  impact?: Impact[];
}

export class Impact {
  constructor(props: Partial<Impact> = {}) {
    Object.assign(this, props);
  }

  domain?: ImpactDomain;
  amount?: number;
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
  humanRightsLocal,
  humanRightsGlobal,
}

export class TranslatedText {
  constructor(public lang: LanguageType, public text: string) {}
}

export type LanguageType = 'en' | 'nl' | 'fr';
