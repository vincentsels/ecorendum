import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { PROPOSALS_FEDERAL } from './proposal-data/proposals-federal';
import { PROPOSALS_FLANDERS } from './proposal-data/proposals-flanders';
import { PROPOSALS_BRUSSELS } from './proposal-data/proposals-brussels';
import { PROPOSALS_WALLONIA } from './proposal-data/proposals-wallonia';
import { ProposalSet, SelectedProposalType, Variant } from './proposal';
import { ProposalDetail } from './proposal-details';
import { ContextService } from '../context/context.service';
import { DummyProposalDataGeneratorService } from './dummy-proposal-data-generator.service';
import { ProposalSetSerializerService } from './proposal-set-serializer.service';
import { PROPOSAL_SET_BEKA, PROPOSAL_SET_VEKA, PROPOSAL_SET_WEKA, ProposalSetType } from './proposal-data/proposal-sets';
import { PartyId } from '../party';

const LS_KEY_SELECTED_VARIANTS = 'ecorendum.selection.v2';
const LS_KEY_SELECTED_PARTY = 'ecorendum.partyId';

@Injectable()
export class ProposalService {
  activeProposals$: BehaviorSubject<ProposalDetail[]> = new BehaviorSubject<ProposalDetail[]>([]);

  committedProposals$: BehaviorSubject<ProposalDetail[]> = new BehaviorSubject<ProposalDetail[]>([]);
  extraProposalsFromSet$: BehaviorSubject<ProposalDetail[]> = new BehaviorSubject<ProposalDetail[]>([]);

  selectedProposalSetType: ProposalSetType = 'wem';
  selectedPartyId?: PartyId;

  selectionKey = '';

  allProposals = [...PROPOSALS_FEDERAL, ...PROPOSALS_FLANDERS, ...PROPOSALS_BRUSSELS, ...PROPOSALS_WALLONIA];

  constructor(private contextService: ContextService,
    private proposalSerializerService: ProposalSetSerializerService,
    private dummyProposalDataGeneratorService: DummyProposalDataGeneratorService) {

    this.initializeProposals(PROPOSALS_FEDERAL);
    this.initializeProposals(PROPOSALS_FLANDERS);
    this.initializeProposals(PROPOSALS_BRUSSELS);
    this.initializeProposals(PROPOSALS_WALLONIA);

    const storedSelectedParty = localStorage.getItem(LS_KEY_SELECTED_PARTY);
    if (storedSelectedParty) {
      this.selectedPartyId = Number(storedSelectedParty);
    }

    this.contextService.context$.subscribe(c => {
      const partiesForContext = this.contextService.getPartiesForContext(c);
      if (this.selectedPartyId && !partiesForContext.includes(this.selectedPartyId)) {
        this.updateSelectedParty(undefined)
      }

      this.loadActiveProposalSet();
    });
  }

  private initializeProposals(proposals: ProposalDetail[]) {
    this.dummyProposalDataGeneratorService.initializeDummyData(proposals);

    for (let proposal of proposals) {
      for (let variant of proposal.variants) {
        variant.proposal = proposal;

        if (variant.impacts && variant.impacts.length > 0) {
          variant.impacts.sort((a, b) => b.amount - a.amount);
        }
      }
    }
  }

  public getProposalSetByType(setType: ProposalSetType, selectedPartyId: PartyId) {
    switch (setType) {
      case 'wem': return []; // Default / WEM: no 'extra' measures
      case 'wam': return []; // Default / WAM: no 'extra' measures
      case 'veka': return PROPOSAL_SET_VEKA;
      case 'beka': return PROPOSAL_SET_BEKA;
      case 'weka': return PROPOSAL_SET_WEKA;
      case 'party':
        if (selectedPartyId === PartyId.example) {
          const context = this.contextService.context$.value;
          switch (context) {
            case 'flanders': return PROPOSAL_SET_VEKA;
            case 'brussels': return PROPOSAL_SET_BEKA;
            case 'wallonia': return PROPOSAL_SET_WEKA;
            default: throw new Error('Unknown proposal set type: ' + setType);
          }
        }

        return []; // For now, none
      default: throw new Error('Unknown proposal set type: ' + setType);
    }
  }

  private getAllCommittedProposals(): ProposalSet {
    const proposals = this.getAllProposalsForSelectedContext();
    return proposals
      .filter(p => p.committed)
      .map(p => ({ id: p.id, variant: p.variants.find(v => v.selected)?.ambitionLevel } as SelectedProposalType))
      .filter(s => s.variant);
  }

  public loadActiveProposalSet(proposalsToActivate?: ActivateProposalType) {
    let proposals = this.getAllProposalsForSelectedContext();

    this.clearSelection(false);

    let selectedProposalSet: ProposalSet;

    if (!proposalsToActivate || proposalsToActivate.setType === 'wem') {
      this.selectedProposalSetType = 'wem';
      selectedProposalSet = [];
      proposals = [];
    } else if (!proposalsToActivate || proposalsToActivate.setType === 'wam') {
      this.selectedProposalSetType = 'wam';
      selectedProposalSet = [];
      proposals = proposals.filter(p => p.committed);
    } else if (proposalsToActivate.set) {
      // TODO: this should be an explicitly different set; "x's set"; as to not override own. also include context.
      this.selectedProposalSetType = 'custom';
      selectedProposalSet = proposalsToActivate.set;
      // We include all possible proposals
    } else if (proposalsToActivate.setType) {
      if (proposalsToActivate.setType === 'custom') {
        this.selectedProposalSetType = 'custom';
        selectedProposalSet = JSON.parse(localStorage.getItem(this.getLocalStorageSelectedVariantsKey()) || '[]') as ProposalSet;
        // We include all possible proposals
      } else {
        if (proposalsToActivate.setType === 'party' && !this.selectedPartyId) {
          const partiesForContext = this.contextService.getPartiesForContext(this.contextService.context$.value);
          this.updateSelectedParty(partiesForContext[0]);
        }

        this.selectedProposalSetType = proposalsToActivate.setType;
        selectedProposalSet = this.getProposalSetByType(proposalsToActivate.setType, this.selectedPartyId!);
        proposals = proposals.filter(p => p.committed || selectedProposalSet.map(s => s.id).includes(p.id));
      }
    } else {
      throw new Error('Unknown type to activate proposals');
    }

    this.selectProposalSet(this.getAllCommittedProposals(), proposals); // Always include already committed proposals
    this.selectProposalSet(selectedProposalSet, proposals);

    this.activeProposals$.next(proposals);
    this.committedProposals$.next(proposals.filter(p => p.committed));
    this.extraProposalsFromSet$.next(proposals.filter(p => !p.committed));
    this.updateSelection(false);
  }

  // TODO: we probably don't want to make this public, and use a better solution to access this from the party selection screen
  public getAllProposalsForSelectedContext(): ProposalDetail[] {
    const context = this.contextService.context$.value;

    let proposals: ProposalDetail[];

    if (context === 'flanders') proposals = [...PROPOSALS_FEDERAL, ...PROPOSALS_FLANDERS];
    else if (context === 'brussels') proposals = [...PROPOSALS_FEDERAL, ...PROPOSALS_BRUSSELS];
    else if (context === 'wallonia') proposals = [...PROPOSALS_FEDERAL, ...PROPOSALS_WALLONIA];
    else throw new Error('Unknown context');

    proposals.sort((a, b) => Number(b.committed) - Number(a.committed));

    return proposals;
  }

  // TODO: we probably don't want to make this public, and use a better solution to access this from the party selection screen
  public selectProposalSet(set: ProposalSet, proposals: ProposalDetail[]) {
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
    this.updateSelection(saveSelection);
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
    this.updateSelection(saveSelection);
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

    this.updateSelection(saveSelection);
  }

  public getLocalStorageSelectedVariantsKey(): string {
    return LS_KEY_SELECTED_VARIANTS + '.' + this.contextService.context$.value;
  }

  public updateSelection(storeSelection: boolean = true) {
    const proposals = this.activeProposals$.value;

    if (!proposals || proposals.length === 0) return;

    const selectedVariantNumbers = this.getSetFromSelectedProposals(proposals);

    this.selectionKey = this.getKey(selectedVariantNumbers);

    if (storeSelection && selectedVariantNumbers.length > 0) {
      localStorage.setItem(this.getLocalStorageSelectedVariantsKey(), JSON.stringify(selectedVariantNumbers));
    }
  }

  public updateSelectedParty(partyId?: PartyId) {
    this.selectedPartyId = partyId;
    if (partyId) localStorage.setItem(LS_KEY_SELECTED_PARTY, partyId.toString());
    else localStorage.removeItem(LS_KEY_SELECTED_PARTY);
  }

  private getSetFromSelectedProposals(proposals: ProposalDetail[]): ProposalSet {
    return proposals
      .filter(p => !p.committed)
      .map(p => ({ id: p.id, variant: p.variants.find(v => v.selected)?.ambitionLevel } as SelectedProposalType))
      .filter(s => s.variant);
  }

  public setFromKey(key: string) {
    const set = this.proposalSerializerService.decode(key);
    this.loadActiveProposalSet({ set: set });
  }

  public getKey(selectedVariantNumbers: ProposalSet): string {
    return this.proposalSerializerService.encode(selectedVariantNumbers);
  }
}

type ActivateProposalType = {
  setType?: ProposalSetType;
  set?: ProposalSet;
}
