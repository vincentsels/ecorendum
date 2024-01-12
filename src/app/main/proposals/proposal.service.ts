import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { PROPOSALS_FEDERAL } from './proposal-data/proposals-federal';
import { PROPOSALS_FLANDERS } from './proposal-data/proposals-flanders';
import { PROPOSALS_BRUSSELS } from './proposal-data/proposals-brussels';
import { PROPOSALS_WALLONIA } from './proposal-data/proposals-wallonia';
import { ProposalOrigin, ProposalSet, ProposalSetType, SelectedProposal, Variant } from './proposal';
import { ProposalDetail } from './proposal-details';
import { ContextService } from '../context/context.service';
import { DummyProposalDataGeneratorService } from './dummy-proposal-data-generator.service';
import { ProposalSetSerializerService } from './proposal-set-serializer.service';
import { PROPOSAL_SET_BEKA, PROPOSAL_SET_VEKA, PROPOSAL_SET_VEKP, PROPOSAL_SET_WEKA } from './proposal-data/proposal-sets';

const LS_KEY_SELECTED_VARIANTS = 'ecorendum.selection.v2';

@Injectable()
export class ProposalService {
  proposalsLoading = false;

  allProposals$: BehaviorSubject<ProposalDetail[]> = new BehaviorSubject<ProposalDetail[]>([]);

  activeProposals$: BehaviorSubject<ProposalDetail[]> = new BehaviorSubject<ProposalDetail[]>([]);

  committedProposals$: BehaviorSubject<ProposalDetail[]> = new BehaviorSubject<ProposalDetail[]>([]);
  extraProposalsFromSet$: BehaviorSubject<ProposalDetail[]> = new BehaviorSubject<ProposalDetail[]>([]);

  selectionKey = '';

  constructor(private contextService: ContextService,
    private proposalSerializerService: ProposalSetSerializerService,
    private dummyProposalDataGeneratorService: DummyProposalDataGeneratorService) {

    this.initializeProposals(PROPOSALS_FEDERAL);
    this.initializeProposals(PROPOSALS_FLANDERS);
    this.initializeProposals(PROPOSALS_BRUSSELS);
    this.initializeProposals(PROPOSALS_WALLONIA);

    this.loadActiveProposalSet();

    this.contextService.context$.subscribe(() => this.loadActiveProposalSet());
  }

  private initializeProposals(proposals: ProposalDetail[]) {
    this.dummyProposalDataGeneratorService.initializeDummyData(proposals);

    for (let proposal of proposals) {
      for (let variant of proposal.variants) {
        variant.proposal = proposal;
      }
    }
  }

  private getProposalSetByType(setType?: ProposalSetType) {
    switch (setType)
    {
      case 'vekp': return PROPOSAL_SET_VEKP;
      case 'bekp': return PROPOSAL_SET_VEKP;
      case 'wekp': return PROPOSAL_SET_VEKP;
      case 'veka': return PROPOSAL_SET_VEKA;
      case 'beka': return PROPOSAL_SET_BEKA;
      case 'weka': return PROPOSAL_SET_WEKA;
      default: throw new Error('Unknown proposal set type: ' + setType);
    }
  }

  private getAllCommittedProposals(): ProposalSet {
    return this.allProposals$.value
      .filter(p => p.committed)
      .map(p => ({ id: p.id, variant: p.variants.find(v => v.selected)?.ambitionLevel } as SelectedProposal))
      .filter(s => s.variant);
  }

  public loadActiveProposalSet(proposalsToActivate?: ActivateProposalType) {
    const proposals = this.getAllProposalsForSelectedContext();

    this.clearSelection(false);

    let selectedProposalSet: ProposalSet;

    if (!proposalsToActivate) {
      selectedProposalSet = []; // Just use the committed ones; which will always be added
    } else if (proposalsToActivate.set) {
      selectedProposalSet = proposalsToActivate.set;
    } else if (proposalsToActivate.setType) {
      selectedProposalSet = this.getProposalSetByType(proposalsToActivate.setType);
    } else if (proposalsToActivate.custom) {
      selectedProposalSet = JSON.parse(localStorage.getItem(this.getLocalStorageSelectedVariantsKey()) || '[]') as ProposalSet;
    } else {
      throw new Error('Unknown type to activate proposals');
    }

    this.selectProposalSet(this.getAllCommittedProposals(), proposals); // Always include already committed proposals
    this.selectProposalSet(selectedProposalSet, proposals);

    this.activeProposals$.next(proposals);
    this.committedProposals$.next(proposals.filter(p => p.committed));
    this.extraProposalsFromSet$.next(proposals.filter(p => !p.committed));
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

  private selectProposalSet(set: ProposalSet, proposals: ProposalDetail[]) {
    if (set.length > 0) {
      for (let selectedVariantNumber of set) {
        const selectedProposal = proposals.find(p => p.id === selectedVariantNumber.id);
        if (selectedProposal) {
          selectedProposal.selectedAmbitionLevel = selectedVariantNumber.variant;
          const selectedVariant = selectedProposal.variants.find(v => v.ambitionLevel === selectedVariantNumber.variant);
          if (selectedVariant) {
            selectedProposal.selected = true;
            selectedVariant.selected = true;
          }
        }
      }
    }
  }

  public selectVariant(proposal: ProposalDetail, variant: Variant, saveSelection: boolean = true) {
    if (!proposal) return;

    variant.selected = true;

    for (let notClickedVariant of proposal.variants.filter(v => v.ambitionLevel !== variant.ambitionLevel)) {
      notClickedVariant.selected = false;
    }

    proposal.selected = true;
    proposal.selectedAmbitionLevel = variant.ambitionLevel;

    const proposals = [
      ...this.activeProposals$.value
    ];

    proposals[proposals.findIndex(p => p.id === proposal.id)] = new ProposalDetail(proposal);

    this.activeProposals$.next(proposals);
    this.storeSelection(saveSelection);
  }

  public clearVariant(proposal: ProposalDetail, saveSelection: boolean = true) {
    proposal.selected = false;
    proposal.selectedAmbitionLevel = 0;

    for (let notClickedVariant of proposal.variants) {
      notClickedVariant.selected = false;
    }

    const proposals = [
      ...this.activeProposals$.value
    ];

    proposals[proposals.findIndex(p => p.id === proposal.id)] = new ProposalDetail(proposal);

    this.activeProposals$.next(proposals);
    this.storeSelection(saveSelection);
  }

  public clearSelection(saveSelection: boolean = true) {
    const proposals = this.activeProposals$.value;

    proposals.forEach((proposal) => {
      if (proposal.committed) return;
      proposal.selected = false;
      proposal.selectedAmbitionLevel = 0;
      proposal.variants.forEach((variant) => {
        variant.selected = false;
      });
    });

    this.activeProposals$.next(proposals);

    if (saveSelection) {
      localStorage.removeItem(this.getLocalStorageSelectedVariantsKey());
    }

    this.storeSelection(saveSelection);
  }

  public getLocalStorageSelectedVariantsKey(): string {
    return LS_KEY_SELECTED_VARIANTS + '.' + this.contextService.context$.value;
  }

  public storeSelection(saveSelection: boolean = true) {
    const proposals = this.activeProposals$.value;

    if (!proposals || proposals.length === 0) return;

    const selectedVariantNumbers = this.getSetFromSelectedProposals(proposals);

    this.selectionKey = this.getKey(selectedVariantNumbers);

    if (saveSelection && selectedVariantNumbers.length > 0) {
      localStorage.setItem(this.getLocalStorageSelectedVariantsKey(), JSON.stringify(selectedVariantNumbers));
    }
  }

  private getSetFromSelectedProposals(proposals: ProposalDetail[]): ProposalSet {
    return proposals
      .filter(p => !p.committed)
      .map(p => ({ id: p.id, variant: p.variants.find(v => v.selected)?.ambitionLevel } as SelectedProposal))
      .filter(s => s.variant);
  }

  public setFromKey(key: string) {
    const set = this.proposalSerializerService.decodeVariants(key);
    this.loadActiveProposalSet({ set: set });
  }

  public getKey(selectedVariantNumbers: ProposalSet): string {
    return this.proposalSerializerService.encodeVariants(selectedVariantNumbers);
  }
}

type ActivateProposalType = {
  custom?: boolean;
  setType?: ProposalSetType;
  set?: ProposalSet;
}
