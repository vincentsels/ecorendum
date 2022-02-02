import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { EnumsService } from '../../common/enums.service';
import { Proposal, Variant } from '../proposal';
import { ProposalService } from '../proposal.service';

@Component({
  selector: 'app-proposal',
  templateUrl: './proposal.component.html',
  styleUrls: ['./proposal.component.scss']
})
export class ProposalComponent implements OnChanges {
  @Input() proposal?: Proposal;

  selectedVariant?: Variant;

  constructor(public enums: EnumsService, public service: ProposalService) {}

  ngOnChanges(changes: SimpleChanges) {
    const proposal = changes.proposal;
    if (proposal && proposal.currentValue) {
      const currentProposal = (proposal.currentValue as Proposal);
      this.selectedVariant = currentProposal.getSelectedVariant();
    }
  }

  clearVariant() {
    if (!this.proposal) return;

    this.selectedVariant = undefined;
    this.proposal.selected = false;

    for (let notClickedVariant of this.proposal.variants) {
      notClickedVariant.selected = false;
    }

    this.service.updateResults();
  }

  selectProposal() {
    if (!this.proposal) return;
    if (this.proposal.selected) return;
    this.proposal.selectedAmbitionLevel = 1;
    this.updateSelected(this.proposal.variants[0]);
  }

  updateSelected(variant: Variant) {
    if (!this.proposal) return;

    variant.selected = true;

    this.selectedVariant = variant;
    for (let notClickedVariant of this.proposal.variants.filter(v => v.ambitionLevel !== variant.ambitionLevel)) {
      notClickedVariant.selected = false;
    }

    this.proposal.selected = this.proposal.variants.some(v => v.selected);
    this.proposal.selectedAmbitionLevel = variant.ambitionLevel;

    this.service.updateResults();
  }
}
