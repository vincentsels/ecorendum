import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { LoremIpsumService } from '../common/lorem-ipsum.service';
import { rnd, toss } from '../common/helper';

import { PROPOSALS } from './dummy-proposals';
import { PARTY_IDS } from './party';
import { ImpactAmount, ImpactAmountMap, ProposalOrigin, ProposalSetType, TargetType, TranslatedText, Variant } from './proposal';
import { Faq, Link, PartyOpinion, ProposalDetail } from './proposal-details';
import { Results, TargetResult, TotalImpact } from './results/results';

export const LS_KEY_SELECTED_VARIANTS = 'ecorendum.selection';
export const LS_KEY_SELECTED_CONTEXT = 'ecorendum.context';

export type Context = 'flanders' | 'brussels' | 'wallonia';

@Injectable()
export class ProposalService {
  context$ = new BehaviorSubject<Context>(localStorage.getItem(LS_KEY_SELECTED_CONTEXT) as Context || 'flanders');
  proposals$ = new BehaviorSubject<ProposalDetail[]>(PROPOSALS);
  results$ = new BehaviorSubject<Results>(new Results());

  selectionKey = '';

  constructor(private loremIpsumService: LoremIpsumService) {
    this.loadProposals();
  }

  isFlandersContext$ = this.context$.pipe(map(c => c === 'flanders'));
  isBrusselsContext$ = this.context$.pipe(map(c => c === 'brussels'));
  isWallonianContext$ = this.context$.pipe(map(c => c === 'wallonia'));

  public loadProposals() {
    let proposals = this.proposals$.value;

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
          new TranslatedText('en', this.loremIpsumService.generateWords(rnd(4, 12)) + '?')], [
          new TranslatedText('nl', this.loremIpsumService.generateWords(rnd(4, 12)).replace(' ', '-')),
          new TranslatedText('fr', this.loremIpsumService.generateWords(rnd(4, 12)).replace(' ', '-')),
          new TranslatedText('en', this.loremIpsumService.generateWords(rnd(4, 12)).replace(' ', '-'))], [
          new TranslatedText('nl', this.loremIpsumService.generateParagraphs(1)),
          new TranslatedText('fr', this.loremIpsumService.generateParagraphs(1)),
          new TranslatedText('en', this.loremIpsumService.generateParagraphs(1))],
          toss() ? [] : [
            new TranslatedText('nl', this.loremIpsumService.generateParagraphs(rnd(1, 3))),
            new TranslatedText('fr', this.loremIpsumService.generateParagraphs(rnd(1, 3))),
            new TranslatedText('en', this.loremIpsumService.generateParagraphs(rnd(1, 3)))]
          )
        );
      }
    }

    for (let proposal of proposals) {
      for (let variant of proposal.variants) {
        variant.proposal = proposal;
      }
    }

    // Load selected variants

    this.clearSelection(false);

    const selectedVariantNumbers = JSON.parse(localStorage.getItem(LS_KEY_SELECTED_VARIANTS) || '[]');

    this.selectVariants(selectedVariantNumbers, proposals);

    this.proposals$.next(proposals);
    this.updateResults(false);
  }

  generateRandomLink = (proposalId: number) => new Link(proposalId, 'https://ecorendum.be',
    this.loremIpsumService.generateWords(rnd(2, 8)), toss() ? 'nl' : toss() ? 'fr' : 'en');

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
      localStorage.removeItem(LS_KEY_SELECTED_VARIANTS);
    }

    this.updateResults(saveSelection);
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
      localStorage.setItem(LS_KEY_SELECTED_VARIANTS, JSON.stringify(selectedVariantNumbers));
    }

    const selectedVariants = proposals.filter(p => p.selected).flatMap(p => p.variants).filter(v => v.selected);

    const legalGhgReducedKt = this.getTotalAmount(selectedVariants, TargetType.ghgReduction, true);

    const legalGhgReductionPercentage = legalGhgReducedKt / Results.legalTargetGapGhgKt * 100;
    const legalGhgTax = (Results.legalTargetGapGhgKt - legalGhgReducedKt) * Results.pricePerKtGhg;
    const legalGhgIncome = (Results.legalTargetGapGhgKt - legalGhgReducedKt) * -Results.pricePerKtGhg;
    const legalGhgReductionColor = legalGhgReductionPercentage >= 100 ? 'accent' : 'warn';

    const legalGhgTarget = new TargetResult(Results.legalTargetGapGhgKt, 'Kt', Results.pricePerKtGhg, legalGhgReducedKt,
      legalGhgReductionColor, legalGhgReductionPercentage, legalGhgTax, legalGhgIncome);

    const euGhgReducedKt = this.getTotalAmount(selectedVariants, TargetType.ghgReduction, false);

    const euGhgReductionPercentage = euGhgReducedKt / Results.euTargetGapGhgKt * 100;
    const euGhgTax = (Results.euTargetGapGhgKt - euGhgReducedKt) * Results.pricePerKtGhg;
    const euGhgIncome = (Results.euTargetGapGhgKt - euGhgReducedKt) * -Results.pricePerKtGhg;
    const euGhgReductionColor = euGhgReductionPercentage >= 100 ? 'accent' : 'warn';

    const euGhgTarget = new TargetResult(Results.euTargetGapGhgKt, 'Kt', Results.pricePerKtGhg, euGhgReducedKt,
      euGhgReductionColor, euGhgReductionPercentage, euGhgTax, euGhgIncome);

    const energySavedGwh = this.getTotalAmount(selectedVariants, TargetType.energyEfficiency, false);
    const energySavedPercentage = energySavedGwh / Results.euTargetGapEeGwh * 100;
    const energySavedColor = energySavedPercentage >= 100 ? 'accent' : 'warn';

    const euEeTarget = new TargetResult(Results.euTargetGapEeGwh, 'GWh', 0, energySavedGwh,
      energySavedColor, energySavedPercentage);

    const reAddedGwh = this.getTotalAmount(selectedVariants, TargetType.renewableEnergy, false);
    const reAddedPercentage = reAddedGwh / Results.euTargetGapReGwh * 100;
    const renewableEnergyAddedColor = reAddedPercentage >= 100 ? 'accent' : 'warn';

    const euReTarget = new TargetResult(Results.euTargetGapReGwh, 'GWh', 0, reAddedGwh,
      renewableEnergyAddedColor, reAddedPercentage);

    const totalCost = selectedVariants.map(v => v.getTotalCost()).reduce((a, b) => a + b, 0);
    const totalProfit = totalCost < 0 ? totalCost * -1 : 0;

    const totalTax = legalGhgTax;

    const totalCostIncludingTax = totalCost + totalTax;
    const totalProfitIncludingIncome = (totalCost * -1) + legalGhgIncome;

    const totalImpact: TotalImpact[] = [];

    for (let variant of selectedVariants) {
      for (let impact of variant.impacts) {
        const impactItem = totalImpact.find(i => i.domain === impact.domain);
        if (impactItem) {
          impactItem.amount += (impact.amount - 5);
        } else {
          totalImpact.push(new TotalImpact(impact.domain, impact.amount - 5 ));
        }
      }
    }

    for (let impact of totalImpact) {
      if (impact.amount <= -8) impact.class = ImpactAmountMap[ImpactAmount.extremelyPositive];
      else if (impact.amount <= -6) impact.class = ImpactAmountMap[ImpactAmount.veryPositive];
      else if (impact.amount <= -4) impact.class = ImpactAmountMap[ImpactAmount.moderatelyPositive];
      else if (impact.amount <= -2) impact.class = ImpactAmountMap[ImpactAmount.somewhatPositive];
      else if (impact.amount >= 8) impact.class = ImpactAmountMap[ImpactAmount.extremelyNegative];
      else if (impact.amount >= 6) impact.class = ImpactAmountMap[ImpactAmount.veryNegative];
      else if (impact.amount >= 4) impact.class = ImpactAmountMap[ImpactAmount.moderatelyNegative];
      else if (impact.amount >= 2) impact.class = ImpactAmountMap[ImpactAmount.somewhatNegative];
      else impact.class = ImpactAmountMap[ImpactAmount.neutral];
    }

    totalImpact.sort((a, b) => b.amount - a.amount);

    //let image = '';
    //for (let threshold of Results.moneyImageMap) {
    //  if (totalMoneyToRussia <= threshold.threshold) {
    //    image = threshold.image;
    //    break;
    //  }
    //}

    this.results$.next(
      new Results({
        legalGhgTarget,
        euGhgTarget,
        euEeTarget,
        euReTarget,
        totalCost,
        totalTax,
        totalProfit,
        totalImpact,
        totalCostIncludingTax,
        totalProfitIncludingIncome,
      })
    )
  }

  public getSet(setType: ProposalSetType) {
    // TODO
    if (setType === 'veka') return PROPOSALS.filter(p => p.committed).concat(PROPOSALS.filter(p => p.origin === ProposalOrigin.veka));
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

  public setContext(context: Context) {
    this.context$.next(context);
    localStorage.setItem(LS_KEY_SELECTED_CONTEXT, context);
  }

  private getTotalAmount(selectedVariants: Variant[], targetType: TargetType, includeEts: boolean) {
    return selectedVariants
      .filter(v => includeEts || v.proposal?.ets === false)
      .flatMap(v => v.targets.filter(t => t.type === targetType).map(t => t.amount))
      .reduce((a, b) => a + b, 0);
  }

  private getKey(selectedVariantNumbers: { id: number; selectedVariant: number | undefined; }[]): string {
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
