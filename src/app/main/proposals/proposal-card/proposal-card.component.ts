import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';

import { EnumsService } from '../../../common/enums.service';
import { Proposal, Variant } from '../proposal';
import { ProposalDetail } from '../proposal-details';
import { ProposalService } from '../proposal.service';

@Component({
  selector: 'app-proposal-card',
  templateUrl: './proposal-card.component.html',
  styleUrls: ['./proposal-card.component.scss']
})
export class ProposalComponent {
  @Input() proposal?: ProposalDetail;

  showVariantDetails = false;

  constructor(public enums: EnumsService, public service: ProposalService) {}

  getSelectedVariant() {
    if (!this.proposal) return;
    if (!this.proposal.selected) return;

    return this.proposal.variants.find(v => v.selected);
  }

  selectProposal(event: MatCheckboxChange) {
    if (!this.proposal) return;

    if (event.checked) this.updateSelected(this.proposal.variants[0]);
    else this.service.clearVariant(this.proposal);
  }

  updateSelected(variant: Variant) {
    if (!this.proposal || !variant) return;

    this.service.selectVariant(this.proposal, variant);
  }

  clearVariant() {
    if (!this.proposal) return;

    this.service.clearVariant(this.proposal);
  }
}
