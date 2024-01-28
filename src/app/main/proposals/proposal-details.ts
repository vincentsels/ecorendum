import { PartyId } from '../party';
import { LanguageType, Proposal, TranslatedText } from './proposal';

export class ProposalDetail extends Proposal {
  constructor(init: Partial<Proposal | ProposalDetail>) {
    super(init);
    Object.assign(this, init);
    this.partyOpinions = (init as ProposalDetail).partyOpinions?.map(p => new PartyOpinion(p.partyId, p.selected, p.variant)) || [];
    this.linksToMediaArticles = (init as ProposalDetail).linksToMediaArticles?.map(l => new Link(l.url, l.title, l.language)) || [];
    this.linksToPapers = (init as ProposalDetail).linksToPapers?.map(l => new Link(l.url, l.title, l.language)) || [];
    this.linksToExplainers = (init as ProposalDetail).linksToExplainers?.map(l => new Link(l.url, l.title, l.language)) || [];
    this.linksToDebates = (init as ProposalDetail).linksToDebates?.map(l => new Link(l.url, l.title, l.language)) || [];
    this.linksToExamplesAbroad = (init as ProposalDetail).linksToExamplesAbroad?.map(l => new Link(l.url, l.title, l.language)) || [];
    this.faqs = (init as ProposalDetail).faqs?.map(f => new Faq(f.id,
      f.question.map(t => new TranslatedText(t.lang, t.text)),
      f.slug.map(t => new TranslatedText(t.lang, t.text)),
      f.shortAnswer.map(t => new TranslatedText(t.lang, t.text)),
      f.detailedAnswer.map(t => new TranslatedText(t.lang, t.text)))) || [];
  }

  partyOpinions?: PartyOpinion[] = [];

  linksToMediaArticles: Link[] = [];
  linksToPapers: Link[] = [];
  linksToExplainers: Link[] = [];
  linksToDebates: Link[] = [];
  linksToExamplesAbroad: Link[] = [];

  faqs: Faq[] = [];
}

export class PartyOpinion {
  constructor(
    public partyId: PartyId,
    // public proposalId: number,
    // public opinion: TranslatedText[] = [],
    public selected: boolean,
    public variant?: number,
  ) {}
}

export class Link {
  constructor(
    // public proposalId: number,
    public url: string,
    public title: string,
    public language: LanguageType) {}
}

export class Faq {
  constructor(
    public id: string,
    // public proposalId: number,
    public question: TranslatedText[] = [],
    public slug: TranslatedText[] = [],
    public shortAnswer: TranslatedText[] = [],
    public detailedAnswer: TranslatedText[] = []) {}
}
