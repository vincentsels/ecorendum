import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { EnumsService } from '../../common/enums.service';
import { Proposal, Variant } from '../proposal';
import { ProposalService } from '../proposal.service';

@Component({
  selector: 'app-proposal',
  templateUrl: './proposal.component.html',
  styleUrls: ['./proposal.component.scss']
})
export class ProposalComponent {
  @Input() proposal?: Proposal;

  constructor(public enums: EnumsService, public service: ProposalService) {}

  clearVariant() {
    if (!this.proposal) return;

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

  getSelectedVariant() {
    if (!this.proposal) return;
    if (!this.proposal.selected) return;

    return this.proposal.variants.find(v => v.selected);
  }

  updateSelected(variant: Variant) {
    if (!this.proposal || !variant) return;

    this.service.updateSelectedVariant(this.proposal, variant);
    this.service.updateResults();
  }
}
