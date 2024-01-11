import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { LoremIpsumService } from '../../common/lorem-ipsum.service';
import { rnd, toss } from '../../common/helper';
import { PROPOSALS } from './dummy-proposals';
import { PARTY_IDS } from '../party';
import { ProposalOrigin, ProposalSetType, TranslatedText, Variant } from './proposal';
import { Faq, Link, PartyOpinion, ProposalDetail } from './proposal-details';
import { ContextService } from '../context/context.service';
import { TargetsService } from '../targets/targets.service';
import { ParametersService } from '../parameters/parameters.service';

const LS_KEY_SELECTED_VARIANTS = 'ecorendum.selection';

@Injectable()
export class ProposalService {
  proposals$: BehaviorSubject<ProposalDetail[]>;

  selectionKey = '';

  initialized = false;

  constructor(private contextService: ContextService,
    private targetsService: TargetsService,
    private parametersService: ParametersService,
    private loremIpsumService: LoremIpsumService) {
    this.proposals$ = new BehaviorSubject<ProposalDetail[]>(PROPOSALS); // TODO: Actually get them from the BE,...

    this.loadProposals(true);

    this.updateResults(false);

    this.targetsService.targets$.subscribe(() => this.updateResults());
  }

  public loadProposals(initial = false) {
    let proposals = this.proposals$.value;

    this.initializeDummyData(proposals);

    for (let proposal of proposals) {
      for (let variant of proposal.variants) {
        variant.proposal = proposal;
      }
    }

    // Load selected variants

    if (!initial) this.clearSelection(false);

    const selectedVariantNumbers = JSON.parse(localStorage.getItem(this.getLocalStorageSelectedVariantsKey()) || '[]');

    this.selectVariants(selectedVariantNumbers, proposals);

    this.proposals$.next(proposals);

    if (!initial) this.updateResults(false);
  }

  public generateRandomLink = (proposalId: number) => new Link(proposalId, 'https://ecorendum.be',
    this.loremIpsumService.generateWords(rnd(2, 8)), toss() ? 'nl' : toss() ? 'fr' : 'en');

  private initializeDummyData(proposals: ProposalDetail[]) {
    if (this.initialized) return;
    this.initialized = true;

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

  private selectVariants(selectedVariantNumbers: any, proposals: ProposalDetail[]) {
    if (selectedVariantNumbers.length > 0) {
      for (let selectedVariantNumber of selectedVariantNumbers) {
        const selectedProposal = proposals.find(p => p.id === selectedVariantNumber.id);
        if (selectedProposal) {
          selectedProposal.selectedAmbitionLevel = selectedVariantNumber.selectedVariant;
          const selectedVariant = selectedProposal.variants.find(v => v.ambitionLevel === selectedVariantNumber.selectedVariant);
          if (selectedVariant) {
            selectedProposal.selected = true;
            selectedVariant.selected = true;
          }
        }
      }
    }
  }

  selectVariant(proposal: ProposalDetail, variant: Variant, saveSelection: boolean = true) {
    if (!proposal) return;

    variant.selected = true;

    for (let notClickedVariant of proposal.variants.filter(v => v.ambitionLevel !== variant.ambitionLevel)) {
      notClickedVariant.selected = false;
    }

    proposal.selected = true;
    proposal.selectedAmbitionLevel = variant.ambitionLevel;

    const proposals = [
      ...this.proposals$.value
    ];

    proposals[proposals.findIndex(p => p.id === proposal.id)] = new ProposalDetail(proposal);

    this.proposals$.next(proposals);
    this.updateResults(saveSelection);
  }

  clearVariant(proposal: ProposalDetail, saveSelection: boolean = true) {
    proposal.selected = false;
    proposal.selectedAmbitionLevel = 0;

    for (let notClickedVariant of proposal.variants) {
      notClickedVariant.selected = false;
    }

    const proposals = [
      ...this.proposals$.value
    ];

    proposals[proposals.findIndex(p => p.id === proposal.id)] = new ProposalDetail(proposal);

    this.proposals$.next(proposals);
    this.updateResults(saveSelection);
  }

  clearSelection(saveSelection: boolean = true) {
    const proposals = [
      ...this.proposals$.value,
    ];

    proposals.forEach((proposal) => {
      if (proposal.committed) return;
      proposal.selected = false;
      proposal.selectedAmbitionLevel = 0;
      proposal.variants.forEach((variant) => {
        variant.selected = false;
      });
    });

    this.proposals$.next(proposals);

    if (saveSelection) {
      localStorage.removeItem(this.getLocalStorageSelectedVariantsKey());
    }

    this.updateResults(saveSelection);
  }

  getLocalStorageSelectedVariantsKey(): string {
    return LS_KEY_SELECTED_VARIANTS + '.' + this.contextService.context$.value;
  }

  updateResults(saveSelection: boolean = true) {
    const proposals = this.proposals$.value;

    if (!proposals || proposals.length === 0) return;

    const selectedVariantNumbers = proposals
      .filter(p => !p.committed)
      .map(p => ({ id: p.id, selectedVariant: p.variants.find(v => v.selected)?.ambitionLevel }))
      .filter(s => s.selectedVariant);

    this.selectionKey = this.getKey(selectedVariantNumbers);

    if (saveSelection && selectedVariantNumbers.length > 0) {
      localStorage.setItem(this.getLocalStorageSelectedVariantsKey(), JSON.stringify(selectedVariantNumbers));
    }
  }

  public getSet(setType: ProposalSetType) {
    if (setType === 'nekp') return PROPOSALS.filter(p => p.committed);
    else if (setType === 'veka') return PROPOSALS.filter(p => p.committed).concat(PROPOSALS.filter(p => p.origin === ProposalOrigin.veka));
    else return PROPOSALS.filter(p => p.committed).concat(PROPOSALS.filter(p => !p.committed && Math.random() > 0.3));
  }

  public setFromKey(key: string) {
    const variants = this.decodeVariantArray(key);

    this.clearSelection();
    let proposals = PROPOSALS;
    this.selectVariants(variants, proposals);
    this.proposals$.next(proposals);
    this.updateResults(false);
  }

  public getKey(selectedVariantNumbers: { id: number; selectedVariant: number | undefined; }[]): string {
    return this.encodeVariantArray(selectedVariantNumbers);
  }

  private getSafeCharacter(index: number): string {
    if (index < 26) return String.fromCharCode(65 + index); // A-Z
    if (index < 52) return String.fromCharCode(97 + index - 26); // a-z
    if (index < 62) return String.fromCharCode(48 + index - 52); // 0-9
    return ['-', '_', '.', '~'][index - 62];
  }

  private encodeVariantArray(variants: { id: number; selectedVariant: number | undefined; }[]): string {
    let encoded = '';
    for (const variant of variants) {
        const idChar = this.getSafeCharacter(variant.id);
        const variantChar = variant.selectedVariant === undefined ? '.' : this.getSafeCharacter(variant.selectedVariant - 1);
        encoded += idChar + variantChar;
    }
    return encoded;
  }

  private decodeVariantArray(encoded: string): { id: number; selectedVariant: number | undefined; }[] {
    const variants = [];
    for (let i = 0; i < encoded.length; i += 2) {
        const idChar = encoded[i];
        const variantChar = encoded[i + 1];

        const id = idChar.charCodeAt(0) <= 90 ? idChar.charCodeAt(0) - 65
                : idChar.charCodeAt(0) <= 122 ? idChar.charCodeAt(0) - 71
                : idChar.charCodeAt(0) <= 57 ? idChar.charCodeAt(0) + 4
                : ['-', '_', '.', '~'].indexOf(idChar);

        const selectedVariant = variantChar === '.' ? undefined
                              : variantChar.charCodeAt(0) <= 90 ? variantChar.charCodeAt(0) - 64
                              : variantChar.charCodeAt(0) <= 122 ? variantChar.charCodeAt(0) - 70
                              : variantChar.charCodeAt(0) <= 57 ? variantChar.charCodeAt(0) + 5
                              : ['-', '_', '.', '~'].indexOf(variantChar) + 1;

        variants.push({ id, selectedVariant });
    }
    return variants;
  }
}
