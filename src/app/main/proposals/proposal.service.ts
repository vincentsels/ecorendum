import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { PROPOSALS_FEDERAL } from './proposal-data/proposals-federal';
import { PROPOSALS_FLANDERS } from './proposal-data/proposals-flanders';
import { PROPOSALS_BRUSSELS } from './proposal-data/proposals-brussels';
import { PROPOSALS_WALLONIA } from './proposal-data/proposals-wallonia';
import { ProposalOrigin, ProposalSetType, Variant } from './proposal';
import { ProposalDetail } from './proposal-details';
import { ContextService } from '../context/context.service';
import { DummyProposalDataGeneratorService } from './dummy-proposal-data-generator.service';

const LS_KEY_SELECTED_VARIANTS = 'ecorendum.selection';

@Injectable()
export class ProposalService {
  proposalsLoading = false;
  proposals$: BehaviorSubject<ProposalDetail[]> = new BehaviorSubject<ProposalDetail[]>([]);

  selectionKey = '';

  constructor(private contextService: ContextService,
    private dummyProposalDataGeneratorService: DummyProposalDataGeneratorService) {

    this.initializeProposals(PROPOSALS_FEDERAL);
    this.initializeProposals(PROPOSALS_FLANDERS);
    this.initializeProposals(PROPOSALS_BRUSSELS);
    this.initializeProposals(PROPOSALS_WALLONIA);

    this.loadProposals(true);

    this.contextService.context$.subscribe(() => this.loadProposals());
  }

  private initializeProposals(proposals: ProposalDetail[]) {
    this.dummyProposalDataGeneratorService.initializeDummyData(proposals);

    for (let proposal of proposals) {
      for (let variant of proposal.variants) {
        variant.proposal = proposal;
      }
    }
  }

  public loadProposals(initial = false) {
    this.proposalsLoading = true;

    const proposals = this.getAllProposalsForSelectedContext();

    // Load selected variants

    this.clearSelection(false);

    const selectedVariantNumbers = JSON.parse(localStorage.getItem(this.getLocalStorageSelectedVariantsKey()) || '[]');

    this.selectVariants(selectedVariantNumbers, proposals);

    this.proposals$.next(proposals);

    // if (!initial) this.updateSelection(false);
  }

  private getAllProposalsForSelectedContext(): ProposalDetail[] {
    const context = this.contextService.context$.value;

    let proposals: ProposalDetail[];

    if (context === 'flanders') proposals = [...PROPOSALS_FEDERAL, ...PROPOSALS_FLANDERS];
    else if (context === 'brussels') proposals = [...PROPOSALS_FEDERAL, ...PROPOSALS_BRUSSELS];
    else if (context === 'wallonia') proposals = [...PROPOSALS_FEDERAL, ...PROPOSALS_WALLONIA];
    else throw new Error('Unknown context');

    proposals.sort((a, b) => Number(b.committed) - Number(a.committed));

    return proposals;
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
    this.updateSelection(saveSelection);
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
    this.updateSelection(saveSelection);
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

    this.updateSelection(saveSelection);
  }

  getLocalStorageSelectedVariantsKey(): string {
    return LS_KEY_SELECTED_VARIANTS + '.' + this.contextService.context$.value;
  }

  updateSelection(saveSelection: boolean = true) {
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
    const allProposals = this.getAllProposalsForSelectedContext();
    if (setType === 'nekp') return allProposals.filter(p => p.committed);
    else if (setType === 'veka') return allProposals.filter(p => p.committed).concat(allProposals.filter(p => p.origin === ProposalOrigin.veka));
    else return allProposals.filter(p => p.committed).concat(allProposals.filter(p => !p.committed && Math.random() > 0.3));
  }

  public setFromKey(key: string) {
    const variants = this.decodeVariantArray(key);

    this.clearSelection();
    let proposals = PROPOSALS_FLANDERS;
    this.selectVariants(variants, proposals);
    this.proposals$.next(proposals);
    this.updateSelection(false);
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
