import { PartyId } from './party';
import { Proposal, TranslatedText } from './proposal';

export class ProposalDetail extends Proposal {
  constructor(init: Partial<Proposal | ProposalDetail>) {
    super();
    Object.assign(this, init);
  }

  description?: TranslatedText[] = [];

  partyOpinions?: PartyOpinion[] = [];
}

export class PartyOpinion {
  constructor(
    public partyId: PartyId,
    public opinion: TranslatedText[] = [],
    public selected: boolean,
    public variant?: number,
  ) {}
}
