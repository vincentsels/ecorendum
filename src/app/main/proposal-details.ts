import { Proposal, TranslatedText } from './proposal';

export class ProposalDetail extends Proposal {
  constructor(init: Partial<Proposal | ProposalDetail>) {
    super();
    Object.assign(this, init);
  }

  description: TranslatedText[] = [];

  partyOpinions: PartyOpinion[] = [];
}

export class PartyOpinion {
  constructor(
    public partyId: PartyId,
    public description: TranslatedText[] = [],
    public selected: boolean,
    public variant?: number,
  ) {}
}

export class Party {
  constructor(
    public id: PartyId,
    public abbreviation: TranslatedText[],
    public name: TranslatedText[],
    public logoSmallUrl?: string,
    public logoLargeUrl?: string,
    public website?: string,
    ) {}
}

export enum Parliament {
  chamber = 1,
  flemish = 2,
  walloon = 3,
  brussels = 4,
  french = 5,
  german = 6,
  european = 7,
}

export type PartyId = MajorPartyId | MinorPartyId;

export enum MajorPartyId {
  nva = 1,
  ps = 2,
  vb = 3,
  mr = 4,
  pvdaPtb = 5,
  ecolo = 6,
  cdv = 7,
  openvld = 8,
  vooruit = 9,
  groen = 10,
  cdh = 11,
  defi = 12,
  vivant = 13,
}

export enum MinorPartyId {
  bub = 101,
  beOne = 102,
  cpbPc = 103,
  democratieNationale = 104,
  dierAnimal = 105,
  lspPsl = 106,
  pp = 107,
  rwfRbf = 108,
  referendumPartij = 109,
  sapGa = 110,
  uf = 111,
  volt = 112,
}
