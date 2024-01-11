import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';

import { EnumsService } from '../../../common/enums.service';
import { Proposal, Variant } from '../proposal';
import { ProposalDetail } from '../proposal-details';
import { ProposalService } from '../proposal.service';

@Component({
  selector: 'app-proposal',
  templateUrl: './proposal.component.html',
  styleUrls: ['./proposal.component.scss']
})
export class ProposalComponent {
  @Input() proposal?: ProposalDetail;

  showVariantDetails = false;

  constructor(public enums: EnumsService, public service: ProposalService) {}

  getBackgroundImage(proposal: Proposal) {
    const gradient = proposal.committed
      ? '145deg, rgba(48, 48, 48, 1) 40%, rgba(48, 48, 48, 0.9) 60%, rgba(48, 48, 48, 0.1) 100%'
      : '145deg, rgba(66, 66, 66, 1) 40%, rgba(66, 66, 66, 0.9) 60%, rgba(66, 66, 66, 0.1) 100%';

    return 'background-image: linear-gradient(' + gradient + '), url(' + proposal.pictureThumb + ')'
  }

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
