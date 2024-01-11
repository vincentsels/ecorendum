import { Injectable } from "@angular/core";
import { TranslatedText } from "./proposal";
import { LoremIpsumService } from "../../common/lorem-ipsum.service";
import { toss, rnd } from "../../common/helper";
import { PARTY_IDS } from "../party";
import { ProposalDetail, PartyOpinion, Faq, Link } from "./proposal-details";

@Injectable()
export class DummyProposalDataGeneratorService {
  constructor(private loremIpsumService: LoremIpsumService) {}

  public initializeDummyData(proposals: ProposalDetail[]) {
    for (let proposal of proposals) {
      // Random descriptions
      proposal.description = [
        new TranslatedText('nl', this.loremIpsumService.generateParagraphs()),
        new TranslatedText('fr', this.loremIpsumService.generateParagraphs()),
        new TranslatedText('en', this.loremIpsumService.generateParagraphs()),
      ];

      // Random party opinions
      for (let partyId of PARTY_IDS) {
        if (toss()) {
          proposal.partyOpinions?.push(
            new PartyOpinion(partyId, proposal.id, [
              new TranslatedText('nl', this.loremIpsumService.generateParagraphs(1)),
              new TranslatedText('fr', this.loremIpsumService.generateParagraphs(1)),
              new TranslatedText('en', this.loremIpsumService.generateParagraphs(1)),
            ], true, rnd(1, proposal.variants.length))
          );
        } else {
          proposal.partyOpinions?.push(
            new PartyOpinion(partyId, proposal.id, [
              new TranslatedText('nl', this.loremIpsumService.generateParagraphs(1)),
              new TranslatedText('fr', this.loremIpsumService.generateParagraphs(1)),
              new TranslatedText('en', this.loremIpsumService.generateParagraphs(1)),
            ], false)
          );
        }
      }

      // Random links
      for (let i = 0; i < rnd(1, 3); i++) proposal.linksToDebates?.push(this.generateRandomLink(proposal.id));
      for (let i = 0; i < rnd(0, 2); i++) proposal.linksToExamplesAbroad?.push(this.generateRandomLink(proposal.id));
      for (let i = 0; i < rnd(1, 6); i++) proposal.linksToMediaArticles?.push(this.generateRandomLink(proposal.id));
      for (let i = 0; i < rnd(1, 5); i++) proposal.linksToPapers?.push(this.generateRandomLink(proposal.id));
      for (let i = 0; i < rnd(0, 3); i++) proposal.linksToExplainers?.push(this.generateRandomLink(proposal.id));

      // Random faqs
      for (let i = 0; i < rnd(0, 8); i++) {
        proposal.faqs?.push(new Faq(proposal.id + '-' + i, proposal.id, [
          new TranslatedText('nl', this.loremIpsumService.generateWords(rnd(4, 12)) + '?'),
          new TranslatedText('fr', this.loremIpsumService.generateWords(rnd(4, 12)) + ' ?'),
          new TranslatedText('en', this.loremIpsumService.generateWords(rnd(4, 12)) + '?')
        ], [
          new TranslatedText('nl', this.loremIpsumService.generateWords(rnd(4, 12)).replace(' ', '-')),
          new TranslatedText('fr', this.loremIpsumService.generateWords(rnd(4, 12)).replace(' ', '-')),
          new TranslatedText('en', this.loremIpsumService.generateWords(rnd(4, 12)).replace(' ', '-'))
        ], [
          new TranslatedText('nl', this.loremIpsumService.generateParagraphs(1)),
          new TranslatedText('fr', this.loremIpsumService.generateParagraphs(1)),
          new TranslatedText('en', this.loremIpsumService.generateParagraphs(1))
        ],
          toss() ? [] : [
            new TranslatedText('nl', this.loremIpsumService.generateParagraphs(rnd(1, 3))),
            new TranslatedText('fr', this.loremIpsumService.generateParagraphs(rnd(1, 3))),
            new TranslatedText('en', this.loremIpsumService.generateParagraphs(rnd(1, 3)))
          ]
        )
        );
      }
    }
  }

  public generateRandomLink = (proposalId: number) => new Link(proposalId, 'https://ecorendum.be',
    this.loremIpsumService.generateWords(rnd(2, 8)), toss() ? 'nl' : toss() ? 'fr' : 'en');
}
